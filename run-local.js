const express = require('express');
const path = require('path');
const app = require('./api/index.js');

// Serve all the static frontend files we extracted to the root directory
app.use(express.static(__dirname));

// Fallback all other routes to index.html for the React router
app.use((req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(3000, () => {
  console.log('Local server running on http://localhost:3000');
});
