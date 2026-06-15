const express = require("express");
const cors = require("cors");
const fs = require("fs");
const path = require("path");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const { randomUUID } = require("crypto");
const sharp = require("sharp");
const ffmpeg = require("fluent-ffmpeg");
const ffmpegStatic = require("ffmpeg-static");
const AdmZip = require("adm-zip");
const { PDFDocument } = require("pdf-lib");
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");

ffmpeg.setFfmpegPath(ffmpegStatic);

const app = express();
app.use((req, res, next) => {
  if (req.url.startsWith('/api')) {
    req.url = req.url.substring(4) || '/';
  }
  next();
});
app.use(helmet({ contentSecurityPolicy: false })); // Disable CSP so frontend static assets still load correctly
app.use(cors({
  origin: process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : 'http://localhost:3000',
  credentials: true
}));
app.use(express.json({ limit: '50mb' }));

const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 10,
  message: { message: "Too many login attempts from this IP, please try again after 15 minutes" }
});

const JWT_SECRET = process.env.JWT_SECRET || "fallback-dev-secret-12345";
const UPLOADS_DIR = process.env.UPLOADS_DIR || "/tmp/local_uploads";
const DB_FILE = process.env.DB_FILE || "/tmp/db.json";

if (!fs.existsSync(UPLOADS_DIR)) fs.mkdirSync(UPLOADS_DIR, { recursive: true });
if (!fs.existsSync(DB_FILE))
  fs.writeFileSync(DB_FILE, JSON.stringify({ users: [], files: [] }));

// Serialized DB access to prevent race conditions during concurrent uploads
let dbLock = Promise.resolve();
const db = {
  read: () => JSON.parse(fs.readFileSync(DB_FILE)),
  write: (data) => fs.writeFileSync(DB_FILE, JSON.stringify(data, null, 2)),
  // Atomically read-modify-write: queues all operations so they run one at a time
  transaction: (fn) => {
    dbLock = dbLock.then(() => {
      const data = JSON.parse(fs.readFileSync(DB_FILE));
      const result = fn(data);
      fs.writeFileSync(DB_FILE, JSON.stringify(data, null, 2));
      return result;
    }).catch(err => {
      console.error("DB transaction error:", err);
      throw err;
    });
    return dbLock;
  }
};

const authenticate = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Missing token" });
  }
  const token = authHeader.split(" ")[1];
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(401).json({ message: "Invalid token" });
  }
};

// Auth Routes
app.post("/auth/signup", authLimiter, async (req, res) => {
  const { Username, Password, UserAttributes } = req.body;
  const nameAttr =
    UserAttributes?.find((a) => a.Name === "name")?.Value ||
    Username.split("@")[0];
  const data = db.read();

  if (data.users.find((u) => u.email === Username)) {
    return res.status(400).json({ message: "User already exists" });
  }

  const hashedPassword = await bcrypt.hash(Password, 10);
  const newUser = {
    id: randomUUID(),
    email: Username,
    name: nameAttr,
    password: hashedPassword,
  };
  data.users.push(newUser);
  db.write(data);

  res.json({ success: true });
});

app.post("/auth/login", authLimiter, async (req, res) => {
  const { USERNAME, PASSWORD } = req.body;
  const data = db.read();

  const user = data.users.find((u) => u.email === USERNAME);
  if (!user || !(await bcrypt.compare(PASSWORD, user.password))) {
    return res.status(400).json({ message: "Invalid credentials" });
  }

  const accessToken = jwt.sign(
    { sub: user.id, email: user.email, name: user.name },
    JWT_SECRET,
    { expiresIn: "24h" },
  );
  res.json({
    AuthenticationResult: { AccessToken: accessToken, IdToken: accessToken },
  });
});

app.get("/auth/me", authenticate, (req, res) => {
  res.json({
    UserAttributes: [
      { Name: "sub", Value: req.user.sub },
      { Name: "email", Value: req.user.email },
      { Name: "name", Value: req.user.name },
    ],
  });
});

// File Routes
app.get("/files", authenticate, (req, res) => {
  const data = db.read();
  const userFiles = data.files.filter((f) => f.userId === req.user.sub);
  res.json({ files: userFiles });
});

app.post("/files/bulk-download", authenticate, (req, res) => {
  const { fileIds } = req.body;
  if (!fileIds || !Array.isArray(fileIds) || fileIds.length === 0) {
    return res.status(400).json({ message: "No files specified" });
  }

  const data = db.read();
  const userFiles = data.files.filter(
    (f) => f.userId === req.user.sub && fileIds.includes(f.fileId),
  );

  if (userFiles.length === 0) {
    return res.status(404).json({ message: "Files not found" });
  }

  try {
    const AdmZip = require("adm-zip");
    const zip = new AdmZip();
    userFiles.forEach((file) => {
      const filePath = path.join(UPLOADS_DIR, file.s3Key);
      if (fs.existsSync(filePath)) {
        zip.addLocalFile(filePath, "", file.fileName);
      }
    });

    const zipBuffer = zip.toBuffer();
    res.set(
      "Content-Disposition",
      `attachment; filename="CloudVault_Download_${Date.now()}.zip"`,
    );
    res.set("Content-Type", "application/zip");
    res.send(zipBuffer);
  } catch (err) {
    res.status(500).json({ message: "Bulk download failed: " + err.message });
  }
});

app.post("/upload/presign", authenticate, (req, res) => {
  const { fileName } = req.body;
  const fileId = randomUUID();
  const s3Key = `${req.user.sub}/${fileId}-${fileName.replace(/\s+/g, "_")}`;
  const uploadUrl = `http://localhost:3001/upload/local/${fileId}`;

  const userDir = path.join(UPLOADS_DIR, req.user.sub);
  if (!fs.existsSync(userDir)) fs.mkdirSync(userDir, { recursive: true });

  res.json({ uploadUrl, fileId, s3Key });
});

// Direct PUT stream
app.put("/upload/local/:fileId", authenticate, (req, res) => {
  const { fileId } = req.params;
  const userDir = path.join(UPLOADS_DIR, req.user.sub);
  if (!fs.existsSync(userDir)) fs.mkdirSync(userDir, { recursive: true });

  const tempPath = path.resolve(path.join(userDir, fileId + ".tmp"));
  if (!tempPath.startsWith(path.resolve(UPLOADS_DIR))) return res.status(403).send("Forbidden");
  const writeStream = fs.createWriteStream(tempPath);
  req.pipe(writeStream);

  writeStream.on("finish", () => res.status(200).send("OK"));
  writeStream.on("error", (err) => {
    console.error("Upload write error:", err);
    if (!res.headersSent) res.status(500).send("Error");
  });
  req.on("error", (err) => {
    console.error("Upload request error:", err);
    if (!res.headersSent) res.status(500).send("Error");
  });
});

app.post("/upload/confirm", authenticate, async (req, res) => {
  const { fileId, fileName, fileSize, fileType, s3Key } = req.body;

  const userDir = path.join(UPLOADS_DIR, req.user.sub);
  const tempPath = path.join(userDir, fileId + ".tmp");
  const finalPath = path.join(UPLOADS_DIR, s3Key);

  if (fs.existsSync(tempPath)) {
    fs.renameSync(tempPath, finalPath);
  }

  let resolution = null;
  if (fs.existsSync(finalPath)) {
    try {
      const ext = path.extname(fileName).toLowerCase();
      const isImg = [
        ".jpg",
        ".jpeg",
        ".png",
        ".webp",
        ".tiff",
        ".gif",
      ].includes(ext);
      const isVid = [".mp4", ".mov", ".avi", ".mkv", ".webm"].includes(ext);

      if (isImg) {
        const meta = await sharp(finalPath).metadata();
        if (meta.width && meta.height)
          resolution = `${meta.width}x${meta.height}`;
      } else if (isVid) {
        resolution = await new Promise((resolve) => {
          ffmpeg.ffprobe(finalPath, (err, metadata) => {
            if (!err && metadata && metadata.streams) {
              const videoStream = metadata.streams.find(
                (s) => s.width && s.height,
              );
              if (videoStream)
                resolve(`${videoStream.width}x${videoStream.height}`);
              else resolve(null);
            } else resolve(null);
          });
        });
      }
    } catch (err) {
      console.error("Failed to extract resolution", err);
    }
  }

  const newFile = {
    fileId,
    fileName,
    fileSize,
    fileType,
    s3Key,
    userId: req.user.sub,
    uploadedAt: new Date().toISOString(),
    downloadUrl: `http://localhost:3001/download/${s3Key}`,
    resolution,
  };

  await db.transaction((data) => {
    data.files.unshift(newFile);
  });
  res.json({ success: true });
});

app.get(/^\/download\/(.+)$/, (req, res) => {
  const s3Key = decodeURIComponent(req.params[0]);
  const filePath = path.resolve(path.join(UPLOADS_DIR, s3Key));
  if (!filePath.startsWith(path.resolve(UPLOADS_DIR))) return res.status(403).send("Forbidden");
  if (fs.existsSync(filePath)) {
    if (req.query.dl === "1") {
      const fileName = path.basename(filePath).substring(37) || "download";
      res.download(filePath, fileName);
    } else {
      res.sendFile(filePath);
    }
  } else {
    res.status(404).send("File not found");
  }
});

app.get(/^\/download-enhanced\/(.+)$/, async (req, res) => {
  const s3Key = decodeURIComponent(req.params[0]);
  const filePath = path.resolve(path.join(UPLOADS_DIR, s3Key));
  if (!filePath.startsWith(path.resolve(UPLOADS_DIR))) return res.status(403).send("Forbidden");
  const resolution = req.query.res;

  if (!fs.existsSync(filePath)) {
    return res.status(404).send("File not found");
  }

  const originalFileName = path.basename(filePath).substring(37) || "download";
  let width;

  if (resolution === "2k") width = 2560;
  else if (resolution === "4k") width = 3840;
  else return res.download(filePath, originalFileName);

  try {
    const ext = path.extname(originalFileName).toLowerCase();
    const isImage = [
      ".jpg",
      ".jpeg",
      ".png",
      ".webp",
      ".tiff",
      ".gif",
    ].includes(ext);
    const isVid = [".mp4", ".mov", ".avi", ".mkv", ".webm"].includes(ext);

    if (isImage) {
      const mimeType =
        ext === ".jpg" || ext === ".jpeg"
          ? "image/jpeg"
          : ext === ".png"
            ? "image/png"
            : ext === ".webp"
              ? "image/webp"
              : ext === ".gif"
                ? "image/gif"
                : "application/octet-stream";

      const enhancedName = originalFileName.replace(
        ext,
        `_${resolution.toUpperCase()}${ext}`,
      );
      res.setHeader(
        "Content-Disposition",
        `attachment; filename="${enhancedName}"`,
      );
      res.setHeader("Content-Type", mimeType);

      const transform = sharp()
        .resize({ width, withoutEnlargement: false, fastShrinkOnLoad: false })
        .normalize()
        .sharpen({ sigma: 1.5, m1: 1, m2: 2, x1: 2, y2: 10, y3: 20 });

      fs.createReadStream(filePath).pipe(transform).pipe(res);
    } else if (isVid) {
      const enhancedName = originalFileName.replace(
        ext,
        `_${resolution.toUpperCase()}.mp4`,
      );
      res.setHeader(
        "Content-Disposition",
        `attachment; filename="${enhancedName}"`,
      );
      res.setHeader("Content-Type", "video/mp4");

      const height = resolution === "2k" ? 1440 : 2160;

      ffmpeg(filePath)
        .videoCodec("libx264")
        .outputOptions([
          "-preset fast",
          "-crf 23",
          `-vf scale=-2:${height},unsharp=5:5:1.0:5:5:0.0`,
          "-movflags frag_keyframe+empty_moov",
        ])
        .format("mp4")
        .on("error", (err) => {
          console.error("Video enhancement failed:", err);
          if (!res.headersSent)
            res.status(500).send("Video processing failed: " + err.message);
        })
        .pipe(res, { end: true });
    } else {
      return res.download(filePath, originalFileName);
    }
  } catch (err) {
    res.status(500).send("Processing failed: " + err.message);
  }
});

app.get(/^\/stream\/(.+)$/, (req, res) => {
  const s3Key = decodeURIComponent(req.params[0]);
  const filePath = path.resolve(path.join(UPLOADS_DIR, s3Key));
  if (!filePath.startsWith(path.resolve(UPLOADS_DIR))) return res.status(403).send("Forbidden");
  const resolution = req.query.res || "original";
  const startTime = req.query.t || 0;

  if (!fs.existsSync(filePath)) {
    return res.status(404).send("File not found");
  }

  if (resolution === "original") {
    const stat = fs.statSync(filePath);
    const fileSize = stat.size;
    const range = req.headers.range;

    if (range) {
      const parts = range.replace(/bytes=/, "").split("-");
      const start = parseInt(parts[0], 10);
      const end = parts[1] ? parseInt(parts[1], 10) : fileSize - 1;
      const chunksize = end - start + 1;
      const file = fs.createReadStream(filePath, { start, end });
      const head = {
        "Content-Range": `bytes ${start}-${end}/${fileSize}`,
        "Accept-Ranges": "bytes",
        "Content-Length": chunksize,
        "Content-Type": "video/mp4",
      };
      res.writeHead(206, head);
      file.pipe(res);
    } else {
      const head = {
        "Content-Length": fileSize,
        "Content-Type": "video/mp4",
      };
      res.writeHead(200, head);
      fs.createReadStream(filePath).pipe(res);
    }
    return;
  }

  res.setHeader("Content-Type", "video/mp4");
  res.setHeader("Accept-Ranges", "none");

  let height = 720;
  if (resolution === "4k") height = 2160;
  else if (resolution === "1080p") height = 1080;
  else if (resolution === "720p") height = 720;

  let command = ffmpeg(filePath);

  if (startTime > 0) {
    command = command.setStartTime(startTime);
  }

  command
    .videoCodec("libx264")
    .audioCodec("aac")
    .outputOptions([
      "-preset veryfast",
      "-crf 20",
      `-vf scale=-2:${height}:flags=lanczos,unsharp=5:5:1.2:5:5:0.0`,
      "-movflags frag_keyframe+empty_moov+default_base_moof",
      "-b:a 192k",
    ])
    .format("mp4")
    .on("error", (err) => {
      console.error("Stream error:", err);
      if (!res.headersSent) res.status(500).send("Stream failed");
    })
    .pipe(res, { end: true });
});

app.delete("/files/:fileId", authenticate, async (req, res) => {
  await db.transaction((data) => {
    const fileIndex = data.files.findIndex(
      (f) => f.fileId === req.params.fileId && f.userId === req.user.sub,
    );

    if (fileIndex !== -1) {
      const file = data.files[fileIndex];
      const filePath = path.join(UPLOADS_DIR, file.s3Key);
      if (fs.existsSync(filePath)) fs.unlinkSync(filePath);

      data.files.splice(fileIndex, 1);
    }
  });
  res.json({ success: true });
});

app.post("/convert", authenticate, async (req, res) => {
  const { fileId, targetFormat } = req.body;
  const data = db.read();
  const file = data.files.find(
    (f) => f.fileId === fileId && f.userId === req.user.sub,
  );

  if (!file) return res.status(404).json({ message: "File not found" });

  const inputPath = path.join(UPLOADS_DIR, file.s3Key);
  if (!fs.existsSync(inputPath)) return res.status(404).json({ message: "Source file missing from disk" });
  const newFileId = randomUUID();
  const baseName = file.fileName.replace(/\.[^.]+$/, "");
  const newFileName = `${baseName}.${targetFormat}`;
  const newS3Key = `${req.user.sub}/${newFileId}-${newFileName.replace(/\s+/g, "_")}`;
  const outputPath = path.join(UPLOADS_DIR, newS3Key);

  try {
    const isVideo =
      ["mp4", "mov", "avi"].includes(
        baseName.split(".").pop()?.toLowerCase() || "",
      ) ||
      ["mp4", "mov", "avi"].includes(
        file.fileName.split(".").pop()?.toLowerCase() || "",
      ) ||
      file.fileType?.startsWith("video/");
    const isTargetVideo = ["mp4", "mov", "avi", "gif"].includes(
      targetFormat.toLowerCase(),
    );
    const isTargetPdf = targetFormat.toLowerCase() === "pdf";

    if (file.fileType?.startsWith("image/") && isTargetPdf) {
      const pdfDoc = await PDFDocument.create();
      const imgBytes = fs.readFileSync(inputPath);
      let img;
      const ext = baseName.split(".").pop()?.toLowerCase();
      if (ext === "png") {
        img = await pdfDoc.embedPng(imgBytes);
      } else if (ext === "jpg" || ext === "jpeg") {
        img = await pdfDoc.embedJpg(imgBytes);
      } else {
        const jpgBytes = await sharp(imgBytes).jpeg().toBuffer();
        img = await pdfDoc.embedJpg(jpgBytes);
      }
      const page = pdfDoc.addPage([img.width, img.height]);
      page.drawImage(img, { x: 0, y: 0, width: img.width, height: img.height });
      const pdfBytes = await pdfDoc.save();
      fs.writeFileSync(outputPath, pdfBytes);
      finishConversion();
    } else if (file.fileType?.startsWith("image/") && !isTargetVideo) {
      await sharp(inputPath).toFormat(targetFormat).toFile(outputPath);
      finishConversion();
    } else if (isVideo || isTargetVideo) {
      let command = ffmpeg(inputPath).toFormat(targetFormat);
      if (targetFormat.toLowerCase() === "mp4") {
        command = command.videoCodec("libx264");
      }
      command
        .on("end", () => finishConversion())
        .on("error", (err) =>
          res
            .status(500)
            .json({ message: "Video conversion failed: " + err.message }),
        )
        .save(outputPath);
    } else {
      fs.copyFileSync(inputPath, outputPath);
      finishConversion();
    }

    function finishConversion() {
      const newFileSize = fs.statSync(outputPath).size;
      const convertedFile = {
        fileId: newFileId,
        fileName: newFileName,
        fileSize: newFileSize,
        fileType: isTargetPdf
          ? "application/pdf"
          : isTargetVideo
            ? targetFormat === "gif"
              ? "image/gif"
              : `video/${targetFormat}`
            : `image/${targetFormat}`,
        s3Key: newS3Key,
        userId: req.user.sub,
        uploadedAt: new Date().toISOString(),
        downloadUrl: `http://localhost:3001/download/${newS3Key}`,
      };

      db.transaction((data) => {
        data.files.unshift(convertedFile);
      }).then(() => {
        res.json({
          convertedFileId: newFileId,
          convertedFileName: newFileName,
          downloadUrl: convertedFile.downloadUrl,
        });
      });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

app.post("/unzip", authenticate, async (req, res) => {
  const { fileId } = req.body;
  const data = db.read();
  const file = data.files.find(
    (f) => f.fileId === fileId && f.userId === req.user.sub,
  );

  if (!file) return res.status(404).json({ message: "File not found" });

  const inputPath = path.join(UPLOADS_DIR, file.s3Key);
  try {
    const zip = new AdmZip(inputPath);
    const zipEntries = zip.getEntries();
    const extractedFiles = [];

    zipEntries.forEach((zipEntry) => {
      if (zipEntry.isDirectory) return;
      const newFileId = randomUUID();
      const fileName = zipEntry.entryName.split("/").pop();
      const newS3Key = `${req.user.sub}/${newFileId}-${fileName.replace(/\s+/g, "_")}`;
      const outputPath = path.join(UPLOADS_DIR, newS3Key);

      fs.writeFileSync(outputPath, zipEntry.getData());
      const newFileSize = fs.statSync(outputPath).size;
      const ext = fileName.split(".").pop()?.toLowerCase() || "";

      let fileType = "application/octet-stream";
      if (["jpg", "jpeg", "png", "gif", "webp"].includes(ext))
        fileType = `image/${ext}`;
      else if (["mp4", "mov", "avi"].includes(ext)) fileType = `video/${ext}`;
      else if (ext === "pdf") fileType = "application/pdf";

      const newFile = {
        fileId: newFileId,
        fileName,
        fileSize: newFileSize,
        fileType,
        s3Key: newS3Key,
        userId: req.user.sub,
        uploadedAt: new Date().toISOString(),
        downloadUrl: `http://localhost:3001/download/${newS3Key}`,
      };
      extractedFiles.push(newFile);
    });

    await db.transaction((data) => {
      extractedFiles.forEach(f => data.files.unshift(f));
    });
    res.json({ success: true, extractedFiles });
  } catch (err) {
    res.status(500).json({ message: "Unzip failed: " + err.message });
  }
});

app.post("/compress", authenticate, async (req, res) => {
  const { fileId, percentage } = req.body;
  const data = db.read();
  const file = data.files.find(
    (f) => f.fileId === fileId && f.userId === req.user.sub,
  );

  if (!file) return res.status(404).json({ message: "File not found" });
  if (!percentage || percentage < 1 || percentage > 100) return res.status(400).json({ message: "Percentage must be between 1 and 100" });

  const inputPath = path.join(UPLOADS_DIR, file.s3Key);
  if (!fs.existsSync(inputPath)) return res.status(404).json({ message: "Source file missing from disk" });
  const newFileId = randomUUID();
  const ext = path.extname(file.fileName);
  const baseName = path.basename(file.fileName, ext);
  const newFileName = `${baseName}_compressed${ext}`;
  const newS3Key = `${req.user.sub}/${newFileId}-${newFileName.replace(/\s+/g, "_")}`;
  const outputPath = path.join(UPLOADS_DIR, newS3Key);

  try {
    const isVid = [".mp4", ".mov", ".avi", ".mkv", ".webm"].includes(
      ext.toLowerCase(),
    );
    const isImage = [".jpg", ".jpeg", ".png", ".webp"].includes(
      ext.toLowerCase(),
    );
    const isPdf = ext.toLowerCase() === ".pdf";

    function finishCompression() {
      if (!fs.existsSync(outputPath))
        return res.status(500).json({ message: "Compression output missing" });
      const newFileSize = fs.statSync(outputPath).size;
      const compressedFile = {
        fileId: newFileId,
        fileName: newFileName,
        fileSize: newFileSize,
        fileType: file.fileType,
        s3Key: newS3Key,
        userId: req.user.sub,
        uploadedAt: new Date().toISOString(),
        downloadUrl: `http://localhost:3001/download/${newS3Key}`,
      };
      db.transaction((data) => {
        data.files.unshift(compressedFile);
      }).then(() => {
        res.json({ success: true, compressedFile });
      });
    }

    if (isVid) {
      ffmpeg.ffprobe(inputPath, (err, metadata) => {
        if (err || !metadata || !metadata.format || !metadata.format.bit_rate) {
          ffmpeg(inputPath)
            .videoCodec("libx264")
            .outputOptions([
              `-crf ${Math.floor(23 + ((100 - percentage) / 100) * 28)}`,
            ])
            .on("end", finishCompression)
            .on("error", (err) =>
              res
                .status(500)
                .json({ message: "Video compression failed: " + err.message }),
            )
            .save(outputPath);
        } else {
          const originalBitrate = metadata.format.bit_rate;
          const targetBitrate = Math.max(
            100000,
            Math.floor(originalBitrate * (percentage / 100)),
          );
          ffmpeg(inputPath)
            .videoCodec("libx264")
            .outputOptions([
              `-b:v ${targetBitrate}`,
              `-bufsize ${targetBitrate}`,
            ])
            .on("end", finishCompression)
            .on("error", (err) =>
              res
                .status(500)
                .json({ message: "Video compression failed: " + err.message }),
            )
            .save(outputPath);
        }
      });
      return;
    } else if (isImage) {
      if (ext.toLowerCase() === ".png") {
        await sharp(inputPath)
          .png({ quality: Math.max(1, percentage) })
          .toFile(outputPath);
      } else if (ext.toLowerCase() === ".webp") {
        await sharp(inputPath)
          .webp({ quality: Math.max(1, percentage) })
          .toFile(outputPath);
      } else {
        await sharp(inputPath)
          .jpeg({ quality: Math.max(1, percentage) })
          .toFile(outputPath);
      }
      finishCompression();
    } else if (isPdf) {
      const pdfBytes = fs.readFileSync(inputPath);
      const pdfDoc = await PDFDocument.load(pdfBytes);
      const compressedBytes = await pdfDoc.save({ useObjectStreams: false });
      fs.writeFileSync(outputPath, compressedBytes);
      finishCompression();
    } else {
      return res
        .status(400)
        .json({ message: "Format not supported for compression" });
    }
  } catch (err) {
    res.status(500).json({ message: "Compression failed: " + err.message });
  }
});

app.get("/files/:fileId/download", authenticate, (req, res) => {
  const data = db.read();
  const file = data.files.find(
    (f) => f.fileId === req.params.fileId && f.userId === req.user.sub,
  );
  if (file) {
    res.json({ downloadUrl: file.downloadUrl });
  } else {
    res.status(404).json({ message: "File not found" });
  }
});

module.exports = app;
