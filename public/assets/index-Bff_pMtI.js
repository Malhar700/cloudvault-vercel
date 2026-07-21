import{r as c,a as Me,u as B,L as q,b as Ue,R as ve,H as Ie,c as Re,d as E,N as Ee}from"./react-BOs7yoss.js";(function(){const o=document.createElement("link").relList;if(o&&o.supports&&o.supports("modulepreload"))return;for(const l of document.querySelectorAll('link[rel="modulepreload"]'))a(l);new MutationObserver(l=>{for(const d of l)if(d.type==="childList")for(const m of d.addedNodes)m.tagName==="LINK"&&m.rel==="modulepreload"&&a(m)}).observe(document,{childList:!0,subtree:!0});function i(l){const d={};return l.integrity&&(d.integrity=l.integrity),l.referrerPolicy&&(d.referrerPolicy=l.referrerPolicy),l.crossOrigin==="use-credentials"?d.credentials="include":l.crossOrigin==="anonymous"?d.credentials="omit":d.credentials="same-origin",d}function a(l){if(l.ep)return;l.ep=!0;const d=i(l);fetch(l.href,d)}})();var ye={exports:{}},X={};/**
 * @license React
 * react-jsx-runtime.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var Te=c,Le=Symbol.for("react.element"),Pe=Symbol.for("react.fragment"),Be=Object.prototype.hasOwnProperty,Oe=Te.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner,Ae={key:!0,ref:!0,__self:!0,__source:!0};function je(r,o,i){var a,l={},d=null,m=null;i!==void 0&&(d=""+i),o.key!==void 0&&(d=""+o.key),o.ref!==void 0&&(m=o.ref);for(a in o)Be.call(o,a)&&!Ae.hasOwnProperty(a)&&(l[a]=o[a]);if(r&&r.defaultProps)for(a in o=r.defaultProps,o)l[a]===void 0&&(l[a]=o[a]);return{$$typeof:Le,type:r,key:d,ref:m,props:l,_owner:Oe.current}}X.Fragment=Pe;X.jsx=je;X.jsxs=je;ye.exports=X;var e=ye.exports,re={},ue=Me;re.createRoot=ue.createRoot,re.hydrateRoot=ue.hydrateRoot;const we=c.createContext(null),ee="/api";function $e({children:r}){const[o,i]=c.useState(null),[a,l]=c.useState(null),[d,m]=c.useState(!0);c.useEffect(()=>{const f=localStorage.getItem("cloudvault_session");if(f)try{const y=JSON.parse(f);y.expiry>Date.now()?(i(y.user),l(y.tokens)):localStorage.removeItem("cloudvault_session")}catch{}m(!1)},[]);const v=async(f,y)=>{const n=await fetch(`${ee}/auth/login`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({USERNAME:f,PASSWORD:y})});if(!n.ok){const M=await n.json().catch(()=>({message:"Login failed"}));throw new Error(M.message||"Login failed")}const p=(await n.json()).AuthenticationResult.AccessToken,k=await(await fetch(`${ee}/auth/me`,{headers:{Authorization:`Bearer ${p}`}})).json(),z=Object.fromEntries(k.UserAttributes.map(M=>[M.Name,M.Value])),D={email:z.email,name:z.name||z.email.split("@")[0],sub:z.sub};return i(D),l({accessToken:p,idToken:p}),localStorage.setItem("cloudvault_session",JSON.stringify({user:D,tokens:{accessToken:p,idToken:p},expiry:Date.now()+864e5})),{success:!0}},b=async(f,y,n)=>{const s=await fetch(`${ee}/auth/signup`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({Username:y,Password:n,UserAttributes:[{Name:"email",Value:y},{Name:"name",Value:f}]})});if(!s.ok){const p=await s.json().catch(()=>({message:"Signup failed"}));throw new Error(p.message||"Signup failed")}return await v(y,n),{success:!0}},h=async()=>({success:!0}),g=async()=>{i(null),l(null),localStorage.removeItem("cloudvault_session")};return e.jsx(we.Provider,{value:{user:o,tokens:a,loading:d,login:v,signup:b,confirmSignup:h,logout:g},children:r})}const R=()=>c.useContext(we);function We(){const r=B(),{user:o}=R();c.useEffect(()=>{o&&r("/dashboard")},[o]);const i=[{icon:"🔐",title:"AWS Cognito Auth",desc:"Secure login with JWT tokens, user pools and identity management."},{icon:"⚡",title:"S3 Direct Upload",desc:"Presigned URLs for blazing-fast direct-to-S3 uploads with progress tracking."},{icon:"🔄",title:"Lambda Conversion",desc:"Serverless file conversion via AWS Lambda — no server costs when idle."},{icon:"🌐",title:"CloudFront CDN",desc:"Files served globally via CloudFront edge network for instant access."},{icon:"🛡️",title:"DynamoDB Metadata",desc:"File metadata stored in DynamoDB — scalable, fast NoSQL persistence."},{icon:"📱",title:"Fully Responsive",desc:"Pixel-perfect on every device. Mobile, tablet, and desktop ready."}];return e.jsxs("div",{style:{background:"#050810",minHeight:"100vh",color:"#e8ecf4",fontFamily:"'DM Sans', 'Segoe UI', sans-serif",overflowX:"hidden"},children:[e.jsx("style",{children:`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;0,9..40,700;1,9..40,400&family=Bebas+Neue&family=DM+Mono:wght@400;500&display=swap');

        * { margin: 0; padding: 0; box-sizing: border-box; }

        .grid-bg {
          position: fixed; inset: 0; z-index: 0;
          background-image:
            linear-gradient(rgba(255,153,0,0.04) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,153,0,0.04) 1px, transparent 1px);
          background-size: 60px 60px;
        }
        .glow-blob {
          position: fixed; border-radius: 50%; filter: blur(120px); pointer-events: none;
        }
        .blob1 { width: 600px; height: 600px; background: rgba(255,153,0,0.07); top: -200px; right: -100px; }
        .blob2 { width: 500px; height: 500px; background: rgba(0,120,255,0.06); bottom: -100px; left: -100px; }

        nav {
          position: relative; z-index: 10;
          display: flex; align-items: center; justify-content: space-between;
          padding: 1.25rem 4rem; border-bottom: 1px solid rgba(255,255,255,0.06);
          backdrop-filter: blur(10px);
        }
        .nav-brand { display: flex; align-items: center; gap: 12px; }
        .nav-logo {
          width: 38px; height: 38px; border-radius: 10px;
          background: linear-gradient(135deg, #FF9900, #FF6600);
          display: flex; align-items: center; justify-content: center;
          font-size: 18px; box-shadow: 0 0 20px rgba(255,153,0,0.4);
        }
        .nav-brand-name {
          font-family: 'Bebas Neue', sans-serif; font-size: 1.6rem;
          letter-spacing: 0.05em; color: #fff;
        }
        .nav-brand-name span { color: #FF9900; }
        .nav-actions { display: flex; gap: 0.75rem; }
        .btn-nav-login {
          padding: 8px 20px; background: transparent;
          border: 1px solid rgba(255,255,255,0.2); border-radius: 8px;
          color: #ccd6f6; cursor: pointer; font-family: inherit; font-size: 0.9rem;
          transition: all 0.2s;
        }
        .btn-nav-login:hover { background: rgba(255,255,255,0.06); border-color: rgba(255,255,255,0.3); }
        .btn-nav-cta {
          padding: 8px 20px;
          background: linear-gradient(135deg, #FF9900, #FF6600);
          border: none; border-radius: 8px; color: #050810;
          font-family: inherit; font-size: 0.9rem; font-weight: 700; cursor: pointer;
          box-shadow: 0 4px 16px rgba(255,153,0,0.35); transition: all 0.2s;
        }
        .btn-nav-cta:hover { transform: translateY(-1px); box-shadow: 0 6px 24px rgba(255,153,0,0.5); }

        .hero { position: relative; z-index: 1; text-align: center; padding: 5rem 2rem 4rem; }
        .hero-badge {
          display: inline-flex; align-items: center; gap: 8px;
          background: rgba(255,153,0,0.1); border: 1px solid rgba(255,153,0,0.3);
          border-radius: 100px; padding: 6px 16px; font-size: 0.8rem;
          color: #FF9900; margin-bottom: 2rem; font-family: 'DM Mono', monospace;
        }
        .hero-tag { animation: blink 1.2s step-end infinite; }
        @keyframes blink { 50% { opacity: 0; } }

        .hero h1 {
          font-family: 'Bebas Neue', sans-serif;
          font-size: clamp(4rem, 10vw, 8rem);
          line-height: 0.95; letter-spacing: 0.02em;
          color: #fff; margin-bottom: 1rem;
        }
        .hero h1 .accent { color: #FF9900; }
        .hero h1 .outline {
          -webkit-text-stroke: 2px rgba(255,255,255,0.3);
          color: transparent;
        }

        .hero p {
          max-width: 560px; margin: 0 auto 2.5rem;
          font-size: 1.1rem; line-height: 1.7; color: #8899b4; font-weight: 300;
        }

        .hero-cta { display: flex; gap: 1rem; justify-content: center; flex-wrap: wrap; }
        .btn-hero {
          padding: 1rem 2.5rem; border-radius: 10px;
          font-family: inherit; font-size: 1rem; font-weight: 700; cursor: pointer; transition: all 0.25s;
        }
        .btn-hero-primary {
          background: linear-gradient(135deg, #FF9900, #FF6600);
          border: none; color: #050810;
          box-shadow: 0 4px 30px rgba(255,153,0,0.4);
        }
        .btn-hero-primary:hover { transform: translateY(-3px); box-shadow: 0 8px 40px rgba(255,153,0,0.55); }
        .btn-hero-secondary {
          background: transparent; border: 1px solid rgba(255,255,255,0.2); color: #ccd6f6;
        }
        .btn-hero-secondary:hover { background: rgba(255,255,255,0.05); border-color: rgba(255,255,255,0.3); }

        .aws-stack {
          display: flex; align-items: center; justify-content: center; gap: 2rem;
          padding: 3rem 2rem; flex-wrap: wrap;
        }
        .aws-pill {
          display: flex; align-items: center; gap: 8px;
          background: rgba(255,255,255,0.04); border: 1px solid rgba(255,255,255,0.08);
          border-radius: 100px; padding: 8px 16px;
          font-size: 0.82rem; color: #8899b4; font-family: 'DM Mono', monospace;
        }
        .aws-dot {
          width: 8px; height: 8px; border-radius: 50%;
          background: #FF9900; box-shadow: 0 0 6px #FF9900;
        }

        .features-section {
          position: relative; z-index: 1;
          max-width: 1100px; margin: 0 auto; padding: 4rem 2rem;
        }
        .section-label {
          text-align: center; font-family: 'DM Mono', monospace;
          font-size: 0.75rem; color: #FF9900; text-transform: uppercase;
          letter-spacing: 0.15em; margin-bottom: 0.75rem;
        }
        .section-title {
          text-align: center; font-family: 'Bebas Neue', sans-serif;
          font-size: clamp(2.5rem, 5vw, 4rem); color: #fff;
          letter-spacing: 0.03em; margin-bottom: 3rem;
        }
        .features-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 1.25rem; }
        .feature-card {
          background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.07);
          border-radius: 16px; padding: 1.75rem;
          transition: all 0.25s;
        }
        .feature-card:hover {
          background: rgba(255,153,0,0.05); border-color: rgba(255,153,0,0.2);
          transform: translateY(-4px);
        }
        .f-icon { font-size: 1.75rem; margin-bottom: 1rem; display: block; }
        .f-title { font-size: 1rem; font-weight: 700; color: #e8ecf4; margin-bottom: 0.5rem; }
        .f-desc { font-size: 0.85rem; color: #6677a0; line-height: 1.6; }

        .arch-section {
          position: relative; z-index: 1;
          max-width: 900px; margin: 0 auto; padding: 2rem 2rem 6rem;
        }
        .arch-flow {
          display: flex; align-items: center; justify-content: center;
          gap: 0.75rem; flex-wrap: wrap; margin-top: 2.5rem;
        }
        .arch-node {
          background: rgba(255,255,255,0.04); border: 1px solid rgba(255,255,255,0.1);
          border-radius: 12px; padding: 1rem 1.25rem; text-align: center;
          min-width: 110px;
        }
        .arch-node .node-icon { font-size: 1.4rem; margin-bottom: 0.4rem; display: block; }
        .arch-node .node-name { font-size: 0.72rem; color: #FF9900; font-family: 'DM Mono', monospace; font-weight: 500; }
        .arch-node .node-service { font-size: 0.65rem; color: #5566888; margin-top: 2px; }
        .arch-arrow { font-size: 1.2rem; color: rgba(255,153,0,0.5); flex-shrink: 0; }

        footer {
          text-align: center; padding: 2rem;
          border-top: 1px solid rgba(255,255,255,0.06);
          font-size: 0.82rem; color: #445066; position: relative; z-index: 1;
        }

        @media (max-width: 768px) {
          nav { padding: 1rem 1.5rem; }
          .features-grid { grid-template-columns: 1fr; }
          .arch-flow { flex-direction: column; }
          .arch-arrow { transform: rotate(90deg); }
        }
        @media (max-width: 600px) {
          .features-grid { grid-template-columns: 1fr 1fr; }
        }
      `}),e.jsx("div",{className:"grid-bg"}),e.jsx("div",{className:"glow-blob blob1"}),e.jsx("div",{className:"glow-blob blob2"}),e.jsxs("nav",{children:[e.jsxs("div",{className:"nav-brand",children:[e.jsx("div",{className:"nav-logo",children:"☁"}),e.jsxs("div",{className:"nav-brand-name",children:["CLOUD",e.jsx("span",{children:"VAULT"})]})]}),e.jsxs("div",{className:"nav-actions",children:[e.jsx("button",{className:"btn-nav-login",onClick:()=>r("/login"),children:"Sign In"}),e.jsx("button",{className:"btn-nav-cta",onClick:()=>r("/signup"),children:"Get Started Free"})]})]}),e.jsxs("section",{className:"hero",children:[e.jsxs("div",{className:"hero-badge",children:[e.jsx("span",{className:"hero-tag",children:"▶"}),"Powered by AWS Serverless Architecture"]}),e.jsxs("h1",{children:["YOUR FILES",e.jsx("br",{}),e.jsx("span",{className:"accent",children:"IN THE"})," ",e.jsx("span",{className:"outline",children:"CLOUD"})]}),e.jsx("p",{children:"Upload, store, convert and share any file type — secured by AWS Cognito, stored in S3, processed by Lambda. Zero servers. Pay only for what you use."}),e.jsxs("div",{className:"hero-cta",children:[e.jsx("button",{className:"btn-hero btn-hero-primary",onClick:()=>r("/signup"),children:"Start Free →"}),e.jsx("button",{className:"btn-hero btn-hero-secondary",onClick:()=>r("/login"),children:"Sign In"})]})]}),e.jsx("div",{className:"aws-stack",children:["AWS S3","Lambda","Cognito","DynamoDB","API Gateway","CloudFront"].map(a=>e.jsxs("div",{className:"aws-pill",children:[e.jsx("span",{className:"aws-dot"}),a]},a))}),e.jsxs("section",{className:"features-section",children:[e.jsx("div",{className:"section-label",children:"// what you get"}),e.jsx("div",{className:"section-title",children:"BUILT ON AWS"}),e.jsx("div",{className:"features-grid",children:i.map(a=>e.jsxs("div",{className:"feature-card",children:[e.jsx("span",{className:"f-icon",children:a.icon}),e.jsx("div",{className:"f-title",children:a.title}),e.jsx("div",{className:"f-desc",children:a.desc})]},a.title))})]}),e.jsxs("section",{className:"arch-section",children:[e.jsx("div",{className:"section-label",children:"// system architecture"}),e.jsx("div",{className:"section-title",children:"HOW IT WORKS"}),e.jsx("div",{className:"arch-flow",children:[{icon:"🌐",name:"React App",service:"S3 + CloudFront"},{icon:"↔",name:"",service:""},{icon:"🚪",name:"API Gateway",service:"REST API"},{icon:"↔",name:"",service:""},{icon:"⚡",name:"Lambda",service:"Node.js Functions"},{icon:"↔",name:"",service:""},{icon:"🗃️",name:"DynamoDB",service:"Metadata Store"}].map((a,l)=>a.icon==="↔"?e.jsx("span",{className:"arch-arrow",children:"→"},l):e.jsxs("div",{className:"arch-node",children:[e.jsx("span",{className:"node-icon",children:a.icon}),e.jsx("div",{className:"node-name",children:a.name}),e.jsx("div",{className:"node-service",children:a.service})]},a.name))}),e.jsx("div",{className:"arch-flow",style:{marginTop:"1rem"},children:[{icon:"⚡",name:"Lambda",service:"Conversion Engine"},{icon:"↔",name:"",service:""},{icon:"🪣",name:"S3 Bucket",service:"File Storage"},{icon:"↔",name:"",service:""},{icon:"🔐",name:"Cognito",service:"User Auth"}].map((a,l)=>a.icon==="↔"?e.jsx("span",{className:"arch-arrow",children:"→"},l):e.jsxs("div",{className:"arch-node",children:[e.jsx("span",{className:"node-icon",children:a.icon}),e.jsx("div",{className:"node-name",children:a.name}),e.jsx("div",{className:"node-service",children:a.service})]},a.name))})]}),e.jsx("footer",{children:"CloudVault — AWS Serverless File Manager · College Cloud Computing Project"})]})}function _e(){const r=B(),{login:o}=R(),[i,a]=c.useState(""),[l,d]=c.useState(""),[m,v]=c.useState(!1),[b,h]=c.useState(""),g=async f=>{if(f.preventDefault(),!i||!l){h("Please fill in all fields.");return}h(""),v(!0);try{const y=await o(i,l);r("/dashboard")}catch(y){h(y.message||"Invalid credentials. Please try again.")}finally{v(!1)}};return e.jsxs("div",{style:{minHeight:"100vh",background:"#050810",display:"flex",alignItems:"center",justifyContent:"center",padding:"2rem",fontFamily:"'DM Sans', sans-serif"},children:[e.jsx("style",{children:`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:opsz,wght@9..40,300;9..40,400;9..40,500;9..40,700&family=Bebas+Neue&family=DM+Mono:wght@400&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        .auth-grid {
          position: fixed; inset: 0;
          background-image: linear-gradient(rgba(255,153,0,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,153,0,0.03) 1px, transparent 1px);
          background-size: 50px 50px; pointer-events: none;
        }
        .auth-card {
          position: relative; z-index: 1; width: 100%; max-width: 420px;
          background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.08);
          border-radius: 20px; padding: 2.5rem;
          box-shadow: 0 0 60px rgba(0,0,0,0.5), 0 0 30px rgba(255,153,0,0.05);
        }
        .auth-logo { display: flex; align-items: center; gap: 12px; margin-bottom: 2rem; }
        .auth-logo-icon {
          width: 42px; height: 42px; border-radius: 10px;
          background: linear-gradient(135deg, #FF9900, #FF6600);
          display: flex; align-items: center; justify-content: center; font-size: 20px;
          box-shadow: 0 0 20px rgba(255,153,0,0.4);
        }
        .auth-logo-text {
          font-family: 'Bebas Neue', sans-serif; font-size: 1.5rem; color: #fff; letter-spacing: 0.05em;
        }
        .auth-logo-text span { color: #FF9900; }
        h2 { font-size: 1.6rem; font-weight: 700; color: #e8ecf4; margin-bottom: 0.3rem; }
        .auth-sub { font-size: 0.875rem; color: #5a6a80; margin-bottom: 2rem; }
        .form-group { margin-bottom: 1.1rem; }
        label { display: block; font-size: 0.8rem; color: #7a8a9a; margin-bottom: 0.4rem; font-weight: 500; letter-spacing: 0.02em; }
        input {
          width: 100%; padding: 0.7rem 1rem;
          background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.1);
          border-radius: 8px; color: #e8ecf4; font-family: inherit; font-size: 0.9rem;
          transition: border-color 0.2s, box-shadow 0.2s;
        }
        input:focus { outline: none; border-color: #FF9900; box-shadow: 0 0 0 3px rgba(255,153,0,0.12); }
        input::placeholder { color: rgba(255,255,255,0.2); }
        .error-msg {
          background: rgba(239,68,68,0.1); border: 1px solid rgba(239,68,68,0.25);
          border-radius: 8px; padding: 0.75rem 1rem; font-size: 0.85rem; color: #fca5a5;
          margin-bottom: 1rem;
        }
        .btn-submit {
          width: 100%; padding: 0.8rem;
          background: linear-gradient(135deg, #FF9900, #FF6600);
          border: none; border-radius: 8px; color: #050810;
          font-family: inherit; font-size: 0.95rem; font-weight: 700; cursor: pointer;
          box-shadow: 0 4px 20px rgba(255,153,0,0.35); transition: all 0.2s;
          display: flex; align-items: center; justify-content: center; gap: 8px;
        }
        .btn-submit:hover:not(:disabled) { transform: translateY(-1px); box-shadow: 0 6px 28px rgba(255,153,0,0.5); }
        .btn-submit:disabled { opacity: 0.7; cursor: not-allowed; }
        .spinner { width: 16px; height: 16px; border: 2px solid rgba(5,8,16,0.3); border-top-color: #050810; border-radius: 50%; animation: spin 0.7s linear infinite; }
        @keyframes spin { to { transform: rotate(360deg); } }
        .divider { display: flex; align-items: center; gap: 1rem; margin: 1.5rem 0; }
        .divider::before, .divider::after { content: ''; flex: 1; height: 1px; background: rgba(255,255,255,0.07); }
        .divider span { font-size: 0.75rem; color: #44556a; }
        .auth-switch { text-align: center; font-size: 0.875rem; color: #5a6a80; }
        .auth-switch a { color: #FF9900; text-decoration: none; font-weight: 600; cursor: pointer; }
        .auth-switch a:hover { color: #ffb340; }

      `}),e.jsx("div",{className:"auth-grid"}),e.jsxs("div",{className:"auth-card",children:[e.jsxs("div",{className:"auth-logo",children:[e.jsx("div",{className:"auth-logo-icon",children:"☁"}),e.jsxs("div",{className:"auth-logo-text",children:["CLOUD",e.jsx("span",{children:"VAULT"})]})]}),e.jsx("h2",{children:"Welcome back"}),e.jsx("div",{className:"auth-sub",children:"Sign in to access your cloud files"}),b&&e.jsxs("div",{className:"error-msg",children:["⚠ ",b]}),e.jsxs("form",{onSubmit:g,children:[e.jsxs("div",{className:"form-group",children:[e.jsx("label",{children:"Email address"}),e.jsx("input",{type:"email",placeholder:"you@example.com",value:i,onChange:f=>a(f.target.value),autoComplete:"email"})]}),e.jsxs("div",{className:"form-group",children:[e.jsx("label",{children:"Password"}),e.jsx("input",{type:"password",placeholder:"••••••••",value:l,onChange:f=>d(f.target.value),autoComplete:"current-password"})]}),e.jsx("button",{type:"submit",className:"btn-submit",disabled:m,children:m?e.jsxs(e.Fragment,{children:[e.jsx("span",{className:"spinner"})," Signing in..."]}):"Sign In →"})]}),e.jsx("div",{className:"divider",children:e.jsx("span",{children:"or"})}),e.jsxs("div",{className:"auth-switch",children:["Don't have an account? ",e.jsx(q,{to:"/signup",children:"Create one free"})]}),e.jsx("div",{className:"auth-switch",style:{marginTop:"0.5rem"},children:e.jsx(q,{to:"/",children:"← Back to home"})})]})]})}function Ye(){const r=B(),{signup:o}=R(),[i,a]=c.useState(""),[l,d]=c.useState(""),[m,v]=c.useState(""),[b,h]=c.useState(!1),[g,f]=c.useState(""),y=async n=>{if(n.preventDefault(),!i||!l||!m){f("Please fill in all fields.");return}if(m.length<8){f("Password must be at least 8 characters.");return}f(""),h(!0);try{(await o(i,l,m)).success&&r("/dashboard")}catch(s){f(s.message||"Signup failed. Please try again.")}finally{h(!1)}};return e.jsxs("div",{style:{minHeight:"100vh",background:"#050810",display:"flex",alignItems:"center",justifyContent:"center",padding:"2rem",fontFamily:"'DM Sans', sans-serif"},children:[e.jsx("style",{children:`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:opsz,wght@9..40,300;9..40,400;9..40,500;9..40,700&family=Bebas+Neue&family=DM+Mono:wght@400&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        .auth-grid { position: fixed; inset: 0; background-image: linear-gradient(rgba(255,153,0,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,153,0,0.03) 1px, transparent 1px); background-size: 50px 50px; pointer-events: none; }
        .auth-card { position: relative; z-index: 1; width: 100%; max-width: 420px; background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.08); border-radius: 20px; padding: 2.5rem; box-shadow: 0 0 60px rgba(0,0,0,0.5), 0 0 30px rgba(255,153,0,0.05); }
        .auth-logo { display: flex; align-items: center; gap: 12px; margin-bottom: 2rem; }
        .auth-logo-icon { width: 42px; height: 42px; border-radius: 10px; background: linear-gradient(135deg, #FF9900, #FF6600); display: flex; align-items: center; justify-content: center; font-size: 20px; box-shadow: 0 0 20px rgba(255,153,0,0.4); }
        .auth-logo-text { font-family: 'Bebas Neue', sans-serif; font-size: 1.5rem; color: #fff; letter-spacing: 0.05em; }
        .auth-logo-text span { color: #FF9900; }
        h2 { font-size: 1.6rem; font-weight: 700; color: #e8ecf4; margin-bottom: 0.3rem; }
        .auth-sub { font-size: 0.875rem; color: #5a6a80; margin-bottom: 2rem; }
        .form-group { margin-bottom: 1.1rem; }
        label { display: block; font-size: 0.8rem; color: #7a8a9a; margin-bottom: 0.4rem; font-weight: 500; }
        input { width: 100%; padding: 0.7rem 1rem; background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.1); border-radius: 8px; color: #e8ecf4; font-family: inherit; font-size: 0.9rem; transition: border-color 0.2s, box-shadow 0.2s; }
        input:focus { outline: none; border-color: #FF9900; box-shadow: 0 0 0 3px rgba(255,153,0,0.12); }
        input::placeholder { color: rgba(255,255,255,0.2); }
        .error-msg { background: rgba(239,68,68,0.1); border: 1px solid rgba(239,68,68,0.25); border-radius: 8px; padding: 0.75rem 1rem; font-size: 0.85rem; color: #fca5a5; margin-bottom: 1rem; }
        .btn-submit { width: 100%; padding: 0.8rem; background: linear-gradient(135deg, #FF9900, #FF6600); border: none; border-radius: 8px; color: #050810; font-family: inherit; font-size: 0.95rem; font-weight: 700; cursor: pointer; box-shadow: 0 4px 20px rgba(255,153,0,0.35); transition: all 0.2s; display: flex; align-items: center; justify-content: center; gap: 8px; }
        .btn-submit:hover:not(:disabled) { transform: translateY(-1px); box-shadow: 0 6px 28px rgba(255,153,0,0.5); }
        .btn-submit:disabled { opacity: 0.7; cursor: not-allowed; }
        .spinner { width: 16px; height: 16px; border: 2px solid rgba(5,8,16,0.3); border-top-color: #050810; border-radius: 50%; animation: spin 0.7s linear infinite; }
        @keyframes spin { to { transform: rotate(360deg); } }
        .divider { display: flex; align-items: center; gap: 1rem; margin: 1.5rem 0; }
        .divider::before, .divider::after { content: ''; flex: 1; height: 1px; background: rgba(255,255,255,0.07); }
        .divider span { font-size: 0.75rem; color: #44556a; }
        .auth-switch { text-align: center; font-size: 0.875rem; color: #5a6a80; }
        .auth-switch a { color: #FF9900; text-decoration: none; font-weight: 600; }
        .auth-switch a:hover { color: #ffb340; }
        .password-hint { font-size: 0.72rem; color: #44556a; margin-top: 0.3rem; }
      `}),e.jsx("div",{className:"auth-grid"}),e.jsxs("div",{className:"auth-card",children:[e.jsxs("div",{className:"auth-logo",children:[e.jsx("div",{className:"auth-logo-icon",children:"☁"}),e.jsxs("div",{className:"auth-logo-text",children:["CLOUD",e.jsx("span",{children:"VAULT"})]})]}),e.jsx("h2",{children:"Create account"}),e.jsx("div",{className:"auth-sub",children:"Start managing your files in the cloud — free"}),g&&e.jsxs("div",{className:"error-msg",children:["⚠ ",g]}),e.jsxs("form",{onSubmit:y,children:[e.jsxs("div",{className:"form-group",children:[e.jsx("label",{children:"Full name"}),e.jsx("input",{type:"text",placeholder:"Alex Johnson",value:i,onChange:n=>a(n.target.value),autoComplete:"name"})]}),e.jsxs("div",{className:"form-group",children:[e.jsx("label",{children:"Email address"}),e.jsx("input",{type:"email",placeholder:"you@example.com",value:l,onChange:n=>d(n.target.value),autoComplete:"email"})]}),e.jsxs("div",{className:"form-group",children:[e.jsx("label",{children:"Password"}),e.jsx("input",{type:"password",placeholder:"Min. 8 characters",value:m,onChange:n=>v(n.target.value),autoComplete:"new-password"}),e.jsx("div",{className:"password-hint",children:"Must be at least 8 characters with a number and symbol."})]}),e.jsx("button",{type:"submit",className:"btn-submit",disabled:b,children:b?e.jsxs(e.Fragment,{children:[e.jsx("span",{className:"spinner"})," Creating account..."]}):"Create Account →"})]}),e.jsx("div",{className:"divider",children:e.jsx("span",{children:"or"})}),e.jsxs("div",{className:"auth-switch",children:["Already have an account? ",e.jsx(q,{to:"/login",children:"Sign in"})]}),e.jsx("div",{className:"auth-switch",style:{marginTop:"0.5rem"},children:e.jsx(q,{to:"/",children:"← Back to home"})})]})]})}function A({children:r}){const o=B(),i=Ue(),{user:a,logout:l}=R(),[d,m]=c.useState(!1),v=[{path:"/dashboard",icon:"⊞",label:"Dashboard"},{path:"/upload",icon:"↑",label:"Upload"},{path:"/files",icon:"▦",label:"My Files"},{path:"/convert",icon:"⇄",label:"Convert"},{path:"/compress",icon:"🗜️",label:"Compress"},{path:"/unzip",icon:"📦",label:"Unzip"}],b=((a==null?void 0:a.name)||(a==null?void 0:a.email)||"U").split(" ").map(g=>g[0]).join("").toUpperCase().slice(0,2),h=async()=>{await l(),o("/")};return e.jsxs("div",{style:{display:"flex",minHeight:"100vh",background:"#050810",color:"#e8ecf4",fontFamily:"'DM Sans', 'Segoe UI', sans-serif"},children:[e.jsx("style",{children:`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:opsz,wght@9..40,300;9..40,400;9..40,500;9..40,700&family=Bebas+Neue&family=DM+Mono:wght@400;500&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        ::-webkit-scrollbar { width: 4px; }
        ::-webkit-scrollbar-track { background: transparent; }
        ::-webkit-scrollbar-thumb { background: rgba(255,153,0,0.3); border-radius: 4px; }

        .sidebar {
          width: 230px; background: rgba(255,255,255,0.02);
          border-right: 1px solid rgba(255,255,255,0.06);
          display: flex; flex-direction: column;
          padding: 1.5rem 1rem; position: fixed;
          top: 0; left: 0; bottom: 0; z-index: 20;
          transition: transform 0.3s;
        }
        .sidebar-brand {
          display: flex; align-items: center; gap: 10px;
          padding: 0 0.5rem; margin-bottom: 2.5rem;
        }
        .sidebar-logo {
          width: 34px; height: 34px; border-radius: 8px;
          background: linear-gradient(135deg, #FF9900, #FF6600);
          display: flex; align-items: center; justify-content: center; font-size: 16px;
          box-shadow: 0 0 14px rgba(255,153,0,0.35);
        }
        .sidebar-brand-name {
          font-family: 'Bebas Neue', sans-serif; font-size: 1.3rem; letter-spacing: 0.05em; color: #fff;
        }
        .sidebar-brand-name span { color: #FF9900; }

        .nav-section-label {
          font-size: 0.65rem; text-transform: uppercase; letter-spacing: 0.1em;
          color: #445566; padding: 0 0.75rem; margin-bottom: 0.4rem; font-family: 'DM Mono', monospace;
        }
        .nav-item {
          display: flex; align-items: center; gap: 10px;
          padding: 0.6rem 0.75rem; border-radius: 8px;
          cursor: pointer; font-size: 0.875rem; color: #6677a0;
          transition: all 0.15s; border: none; background: none;
          width: 100%; text-align: left; font-family: inherit; margin-bottom: 2px;
        }
        .nav-item:hover { background: rgba(255,255,255,0.05); color: #c8d6f0; }
        .nav-item.active {
          background: rgba(255,153,0,0.1); color: #FF9900;
          border: 1px solid rgba(255,153,0,0.2);
        }
        .nav-icon { font-size: 14px; width: 18px; text-align: center; }

        .sidebar-footer { margin-top: auto; }
        .user-card {
          background: rgba(255,255,255,0.04); border: 1px solid rgba(255,255,255,0.07);
          border-radius: 10px; padding: 0.75rem; margin-bottom: 0.5rem;
          display: flex; align-items: center; gap: 10px;
        }
        .user-avatar {
          width: 32px; height: 32px; border-radius: 50%; flex-shrink: 0;
          background: linear-gradient(135deg, #FF9900, #FF6600);
          display: flex; align-items: center; justify-content: center;
          font-size: 0.75rem; font-weight: 700; color: #050810;
        }
        .user-name { font-size: 0.82rem; font-weight: 600; color: #e8ecf4; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
        .user-email { font-size: 0.68rem; color: #556677; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }

        .main { margin-left: 230px; padding: 2rem 2.5rem; min-height: 100vh; flex: 1; }

        .topbar {
          display: none; position: fixed; top: 0; left: 0; right: 0; z-index: 30;
          background: #050810; border-bottom: 1px solid rgba(255,255,255,0.06);
          padding: 1rem 1.5rem; align-items: center; justify-content: space-between;
        }

        @media (max-width: 768px) {
          .sidebar { transform: translateX(-100%); }
          .sidebar.open { transform: translateX(0); }
          .main { margin-left: 0; padding: 5rem 1rem 2rem; }
          .topbar { display: flex; }
        }

        .hamburger {
          background: none; border: none; color: #e8ecf4; font-size: 1.4rem; cursor: pointer;
        }
        .overlay {
          display: none; position: fixed; inset: 0; background: rgba(0,0,0,0.6);
          z-index: 15; backdrop-filter: blur(4px);
        }
        .overlay.show { display: block; }
      `}),e.jsxs("div",{className:"topbar",children:[e.jsx("button",{className:"hamburger",onClick:()=>m(g=>!g),children:"☰"}),e.jsxs("div",{style:{fontFamily:"'Bebas Neue', sans-serif",fontSize:"1.2rem",color:"#fff"},children:["CLOUD",e.jsx("span",{style:{color:"#FF9900"},children:"VAULT"})]}),e.jsx("div",{className:"user-avatar",style:{width:32,height:32,borderRadius:"50%",background:"linear-gradient(135deg,#FF9900,#FF6600)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:"0.75rem",fontWeight:700,color:"#050810"},children:b})]}),e.jsx("div",{className:`overlay${d?" show":""}`,onClick:()=>m(!1)}),e.jsxs("aside",{className:`sidebar${d?" open":""}`,children:[e.jsxs("div",{className:"sidebar-brand",children:[e.jsx("div",{className:"sidebar-logo",children:"☁"}),e.jsxs("div",{className:"sidebar-brand-name",children:["CLOUD",e.jsx("span",{children:"VAULT"})]})]}),e.jsxs("div",{style:{marginBottom:"1.5rem"},children:[e.jsx("div",{className:"nav-section-label",children:"// navigation"}),v.map(g=>e.jsxs("button",{className:`nav-item${i.pathname===g.path?" active":""}`,onClick:()=>{o(g.path),m(!1)},children:[e.jsx("span",{className:"nav-icon",children:g.icon}),g.label]},g.path))]}),e.jsxs("div",{className:"sidebar-footer",children:[e.jsx("div",{className:"nav-section-label",children:"// account"}),e.jsxs("div",{className:"user-card",children:[e.jsx("div",{className:"user-avatar",children:b}),e.jsxs("div",{style:{minWidth:0},children:[e.jsx("div",{className:"user-name",children:(a==null?void 0:a.name)||"User"}),e.jsx("div",{className:"user-email",children:a==null?void 0:a.email})]})]}),e.jsxs("button",{className:"nav-item",onClick:h,style:{color:"#ef4444"},children:[e.jsx("span",{className:"nav-icon",children:"⎋"})," Sign Out"]})]})]}),e.jsx("main",{className:"main",children:r})]})}const ae="/api";async function $(r,o={},i){const a=await fetch(`${ae}${r}`,{...o,headers:{"Content-Type":"application/json",...i?{Authorization:`Bearer ${i}`}:{},...o.headers}});if(!a.ok){const l=await a.json().catch(()=>({message:"Request failed"}));throw new Error(l.message||`HTTP ${a.status}`)}return a.json()}async function W(r){return $("/files",{method:"GET"},r)}async function qe(r,o,i){return $("/upload/presign",{method:"POST",body:JSON.stringify({fileName:r,fileType:o})},i)}async function He(r,o,i,a){return new Promise((l,d)=>{const m=new XMLHttpRequest;m.upload.onprogress=v=>{v.lengthComputable&&i(Math.round(v.loaded/v.total*100))},m.onload=()=>m.status<300?l():d(new Error(`Upload failed: ${m.status}`)),m.onerror=()=>d(new Error("Network error")),m.open("PUT",r),m.setRequestHeader("Content-Type",o.type),a&&!r.includes(".s3.")&&m.setRequestHeader("Authorization",`Bearer ${a}`),m.send(o)})}async function Ve(r,o,i,a,l,d){return $("/upload/confirm",{method:"POST",body:JSON.stringify({fileId:r,fileName:o,fileSize:i,fileType:a,s3Key:l})},d)}async function be(r,o){return $(`/files/${r}`,{method:"DELETE"},o)}async function Xe(r,o){const i=await fetch(`${ae}/files/${r}/download`,{headers:{Authorization:`Bearer ${o}`}});if(!i.ok)throw new Error("Failed to get download URL");return i.json()}async function Je(r,o){const i=await fetch(`${ae}/files/bulk-download`,{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${o}`},body:JSON.stringify({fileIds:r})});if(!i.ok)throw new Error("Bulk download failed");return i.blob()}async function Ge(r,o,i){return $("/convert",{method:"POST",body:JSON.stringify({fileId:r,targetFormat:o})},i)}async function Ke(r,o){return $("/unzip",{method:"POST",body:JSON.stringify({fileId:r})},o)}const he={pdf:{icon:"📕",color:"#ef4444",bg:"rgba(239,68,68,0.12)"},doc:{icon:"📘",color:"#3b82f6",bg:"rgba(59,130,246,0.12)"},docx:{icon:"📘",color:"#3b82f6",bg:"rgba(59,130,246,0.12)"},xls:{icon:"📗",color:"#22c55e",bg:"rgba(34,197,94,0.12)"},xlsx:{icon:"📗",color:"#22c55e",bg:"rgba(34,197,94,0.12)"},ppt:{icon:"📙",color:"#f97316",bg:"rgba(249,115,22,0.12)"},pptx:{icon:"📙",color:"#f97316",bg:"rgba(249,115,22,0.12)"},jpg:{icon:"🖼️",color:"#a78bfa",bg:"rgba(167,139,250,0.12)"},jpeg:{icon:"🖼️",color:"#a78bfa",bg:"rgba(167,139,250,0.12)"},png:{icon:"🖼️",color:"#a78bfa",bg:"rgba(167,139,250,0.12)"},gif:{icon:"🎞️",color:"#ec4899",bg:"rgba(236,72,153,0.12)"},webp:{icon:"🖼️",color:"#a78bfa",bg:"rgba(167,139,250,0.12)"},svg:{icon:"✦",color:"#14b8a6",bg:"rgba(20,184,166,0.12)"},mp4:{icon:"🎬",color:"#ec4899",bg:"rgba(236,72,153,0.12)"},mov:{icon:"🎬",color:"#ec4899",bg:"rgba(236,72,153,0.12)"},mp3:{icon:"🎵",color:"#14b8a6",bg:"rgba(20,184,166,0.12)"},wav:{icon:"🎵",color:"#14b8a6",bg:"rgba(20,184,166,0.12)"},zip:{icon:"📦",color:"#8b5cf6",bg:"rgba(139,92,246,0.12)"},rar:{icon:"📦",color:"#8b5cf6",bg:"rgba(139,92,246,0.12)"},txt:{icon:"📝",color:"#94a3b8",bg:"rgba(148,163,184,0.12)"},csv:{icon:"📊",color:"#22c55e",bg:"rgba(34,197,94,0.12)"},json:{icon:"{ }",color:"#f59e0b",bg:"rgba(245,158,11,0.12)"},html:{icon:"</>",color:"#f97316",bg:"rgba(249,115,22,0.12)"},default:{icon:"📄",color:"#6366f1",bg:"rgba(99,102,241,0.12)"}},xe={jpg:["png","webp","pdf","gif"],jpeg:["png","webp","pdf","gif"],png:["jpg","webp","pdf","gif"],webp:["jpg","png","pdf"],gif:["jpg","png","webp"],pdf:["jpg","png","docx","txt","pptx"],docx:["pdf","txt","html"],doc:["pdf","txt","docx"],xlsx:["csv","pdf"],xls:["csv","pdf","xlsx"],pptx:["pdf","jpg"],ppt:["pdf","pptx"],csv:["xlsx","pdf"],txt:["pdf","docx"],html:["pdf"],mp4:["mov","avi","gif"],mov:["mp4","avi","gif"],avi:["mp4","mov","gif"]};function L(r){return he[r==null?void 0:r.toLowerCase()]||he.default}function S(r){return(r==null?void 0:r.split(".").pop().toLowerCase())||""}function I(r){if(!r||r===0)return"0 B";const o=["B","KB","MB","GB"],i=Math.floor(Math.log(r)/Math.log(1024));return(r/Math.pow(1024,i)).toFixed(i===0?0:1)+" "+o[i]}function H(r){if(!r)return"";const o=new Date(r),a=(new Date-o)/1e3;return a<60?"Just now":a<3600?Math.floor(a/60)+"m ago":a<86400?Math.floor(a/3600)+"h ago":a<604800?Math.floor(a/86400)+"d ago":o.toLocaleDateString()}function T(r){const o=["jpg","jpeg","png","gif","webp","svg","bmp"],i=["pdf","doc","docx","xls","xlsx","ppt","pptx","txt","csv","html","json"],a=["mp4","mov","avi","mp3","wav","flac"];return o.includes(r)?"image":i.includes(r)?"document":a.includes(r)?"media":"other"}function V(r){if(!r||!r.includes("x"))return r;const[o,i]=r.split("x").map(Number);if(!o||!i)return r;const a=Math.min(o,i),l=Math.max(o,i);return a>=2160||l>=3840?"4K":a>=1440||l>=2560?"1440p":a>=1080||l>=1920?"1080p":a>=720||l>=1280?"720p":a>=480?"480p":"SD"}function Ze(){var y;const{user:r,tokens:o}=R(),i=B(),[a,l]=c.useState([]),[d,m]=c.useState(!0);c.useEffect(()=>{v()},[]);const v=async()=>{m(!0);try{const n=await W(o==null?void 0:o.accessToken);l(n.files||[])}catch(n){console.error(n)}finally{m(!1)}},b=a.filter(n=>T(S(n.fileName))==="image").length,h=a.filter(n=>T(S(n.fileName))==="document").length,g=a.reduce((n,s)=>n+(s.fileSize||0),0),f=(r==null?void 0:r.name)||((y=r==null?void 0:r.email)==null?void 0:y.split("@")[0])||"there";return e.jsxs(A,{children:[e.jsx("style",{children:`
        .page-greeting { margin-bottom: 2rem; }
        .greeting-time { font-size: 0.75rem; color: #445566; font-family: 'DM Mono', monospace; text-transform: uppercase; letter-spacing: 0.08em; margin-bottom: 0.4rem; }
        .greeting-name { font-family: 'Bebas Neue', sans-serif; font-size: 2.2rem; color: #fff; letter-spacing: 0.03em; }
        .greeting-name span { color: #FF9900; }
        .greeting-sub { font-size: 0.875rem; color: #5a6a80; margin-top: 0.2rem; }

        .stats-row { display: grid; grid-template-columns: repeat(4, 1fr); gap: 1rem; margin-bottom: 2rem; }
        .stat-card {
          background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.07);
          border-radius: 14px; padding: 1.25rem; transition: all 0.2s; cursor: default;
        }
        .stat-card:hover { background: rgba(255,153,0,0.04); border-color: rgba(255,153,0,0.15); transform: translateY(-2px); }
        .stat-icon { font-size: 1.5rem; margin-bottom: 0.75rem; display: block; }
        .stat-val { font-family: 'Bebas Neue', sans-serif; font-size: 2rem; color: #e8ecf4; letter-spacing: 0.02em; }
        .stat-label { font-size: 0.75rem; color: #445566; margin-top: 0.2rem; font-family: 'DM Mono', monospace; }

        .aws-badge {
          background: rgba(255,153,0,0.08); border: 1px solid rgba(255,153,0,0.2);
          border-radius: 8px; padding: 0.75rem 1rem; margin-bottom: 2rem;
          display: flex; align-items: center; gap: 0.75rem;
          font-size: 0.8rem; color: #cc8800; font-family: 'DM Mono', monospace;
        }
        .aws-dot-live { width: 8px; height: 8px; border-radius: 50%; background: #FF9900; box-shadow: 0 0 6px #FF9900; flex-shrink: 0; animation: pulse 2s ease-in-out infinite; }
        @keyframes pulse { 0%,100% { opacity: 1; } 50% { opacity: 0.4; } }

        .section-hdr { display: flex; align-items: center; justify-content: space-between; margin-bottom: 1rem; }
        .section-title { font-size: 0.7rem; text-transform: uppercase; letter-spacing: 0.1em; color: #445566; font-family: 'DM Mono', monospace; }
        .see-all { font-size: 0.8rem; color: #FF9900; cursor: pointer; background: none; border: none; font-family: inherit; }
        .see-all:hover { color: #ffb340; }

        .recent-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(170px, 1fr)); gap: 0.85rem; }
        .file-card {
          background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.07);
          border-radius: 12px; padding: 1.1rem; cursor: pointer; transition: all 0.2s;
        }
        .file-card:hover { background: rgba(255,255,255,0.06); border-color: rgba(255,153,0,0.2); transform: translateY(-2px); }
        .file-icon-wrap { width: 48px; height: 48px; border-radius: 10px; display: flex; align-items: center; justify-content: center; font-size: 1.4rem; margin-bottom: 0.75rem; }
        .file-name { font-size: 0.82rem; font-weight: 600; color: #c8d6f0; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; margin-bottom: 0.2rem; }
        .file-meta { font-size: 0.7rem; color: #445566; }

        .quick-actions { display: grid; grid-template-columns: repeat(auto-fill, minmax(200px, 1fr)); gap: 1rem; margin-bottom: 2rem; }
        .qa-card {
          background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.07);
          border-radius: 14px; padding: 1.25rem; cursor: pointer; transition: all 0.2s; text-align: center;
        }
        .qa-card:hover { background: rgba(255,153,0,0.06); border-color: rgba(255,153,0,0.2); transform: translateY(-3px); }
        .qa-icon { font-size: 1.8rem; margin-bottom: 0.6rem; display: block; }
        .qa-label { font-size: 0.85rem; font-weight: 600; color: #c8d6f0; margin-bottom: 0.2rem; }
        .qa-sub { font-size: 0.72rem; color: #445566; }

        .empty { text-align: center; padding: 3rem; color: #445566; }
        .empty-icon { font-size: 2.5rem; margin-bottom: 0.75rem; opacity: 0.4; display: block; }
        .skeleton { background: linear-gradient(90deg, rgba(255,255,255,0.04) 25%, rgba(255,255,255,0.07) 50%, rgba(255,255,255,0.04) 75%); background-size: 200%; animation: shimmer 1.4s infinite; border-radius: 10px; }
        @keyframes shimmer { 0% { background-position: 200% 0; } 100% { background-position: -200% 0; } }

        @media (max-width: 768px) {
          .stats-row { grid-template-columns: 1fr 1fr; }
          .quick-actions { grid-template-columns: 1fr 1fr; }
          .recent-grid { grid-template-columns: 1fr 1fr; }
        }
      `}),e.jsxs("div",{className:"page-greeting",children:[e.jsxs("div",{className:"greeting-time",children:["//"," ",new Date().toLocaleDateString("en-US",{weekday:"long",month:"long",day:"numeric"})]}),e.jsxs("div",{className:"greeting-name",children:["HELLO, ",e.jsx("span",{children:f.toUpperCase()})]}),e.jsx("div",{className:"greeting-sub",children:"Here's what's in your cloud vault today."})]}),e.jsx("div",{className:"stats-row",children:[{icon:"📁",val:a.length,label:"// total files"},{icon:"🖼️",val:b,label:"// images"},{icon:"📄",val:h,label:"// documents"},{icon:"💾",val:I(g),label:"// used storage"}].map(n=>e.jsxs("div",{className:"stat-card",children:[e.jsx("span",{className:"stat-icon",children:n.icon}),e.jsx("div",{className:"stat-val",children:d?"—":n.val}),e.jsx("div",{className:"stat-label",children:n.label})]},n.label))}),e.jsx("div",{className:"section-hdr",style:{marginBottom:"1rem"},children:e.jsx("div",{className:"section-title",children:"// quick actions"})}),e.jsx("div",{className:"quick-actions",children:[{icon:"⬆️",label:"Upload Files",sub:"S3 presigned upload",path:"/upload"},{icon:"⇄",label:"Convert File",sub:"Lambda conversion",path:"/convert"},{icon:"🗜️",label:"Compress File",sub:"Shrink file size",path:"/compress"},{icon:"📦",label:"Unzip Archive",sub:"Extract zip files",path:"/unzip"},{icon:"▦",label:"Browse Files",sub:"DynamoDB + S3",path:"/files"}].map(n=>e.jsxs("div",{className:"qa-card",onClick:()=>i(n.path),children:[e.jsx("span",{className:"qa-icon",children:n.icon}),e.jsx("div",{className:"qa-label",children:n.label}),e.jsx("div",{className:"qa-sub",children:n.sub})]},n.label))}),e.jsxs("div",{className:"section-hdr",children:[e.jsx("div",{className:"section-title",children:"// recent files"}),e.jsx("button",{className:"see-all",onClick:()=>i("/files"),children:"See all →"})]}),d?e.jsx("div",{className:"recent-grid",children:[...Array(6)].map((n,s)=>e.jsx("div",{className:"skeleton",style:{height:"120px"}},s))}):a.length===0?e.jsxs("div",{className:"empty",children:[e.jsx("span",{className:"empty-icon",children:"📭"}),e.jsx("div",{style:{fontSize:"0.9rem",marginBottom:"0.5rem",color:"#c8d6f0"},children:"No files yet"}),e.jsx("div",{style:{fontSize:"0.8rem"},children:"Upload your first file to get started"})]}):e.jsx("div",{className:"recent-grid",children:a.slice(0,8).map(n=>{const s=S(n.fileName),p=L(s);return e.jsxs("div",{className:"file-card",onClick:()=>i("/files"),children:[e.jsx("div",{className:"file-icon-wrap",style:{background:p.bg},children:p.icon}),e.jsx("div",{className:"file-name",children:n.fileName}),e.jsxs("div",{className:"file-meta",children:[I(n.fileSize),n.resolution?` · ${V(n.resolution)}`:""," · ",H(n.uploadedAt)]})]},n.fileId)})})]})}function Qe({item:r}){const o=L(S(r.name)),i={uploading:"#FF9900",done:"#22c55e",error:"#ef4444",pending:"#5a6a80"},a={uploading:`${r.progress}%`,done:"Saved ✓",error:r.error||"Failed",pending:"Waiting..."};return e.jsxs("div",{style:{background:"rgba(255,255,255,0.03)",border:`1px solid rgba(255,255,255,${r.status==="done"?"0.1":"0.06"})`,borderRadius:10,padding:"0.85rem 1rem",display:"flex",alignItems:"center",gap:"0.75rem"},children:[e.jsx("div",{style:{width:40,height:40,borderRadius:8,background:o.bg,display:"flex",alignItems:"center",justifyContent:"center",fontSize:"1.2rem",flexShrink:0},children:o.icon}),e.jsxs("div",{style:{flex:1,minWidth:0},children:[e.jsx("div",{style:{fontSize:"0.85rem",fontWeight:600,color:"#c8d6f0",overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap",marginBottom:"0.3rem"},children:r.name}),e.jsx("div",{style:{height:3,background:"rgba(255,255,255,0.08)",borderRadius:100,overflow:"hidden"},children:e.jsx("div",{style:{height:"100%",width:`${r.progress}%`,background:r.status==="done"?"#22c55e":r.status==="error"?"#ef4444":"linear-gradient(90deg, #FF9900, #FF6600)",borderRadius:100,transition:"width 0.3s ease"}})}),e.jsxs("div",{style:{display:"flex",justifyContent:"space-between",marginTop:"0.3rem"},children:[e.jsx("span",{style:{fontSize:"0.7rem",color:"#445566"},children:I(r.size)}),e.jsx("span",{style:{fontSize:"0.7rem",color:i[r.status]||"#5a6a80",fontFamily:"DM Mono, monospace"},children:a[r.status]})]})]})]})}function er(){const{tokens:r}=R(),[o,i]=c.useState([]),[a,l]=c.useState(!1),d=c.useRef(),m=(s,p)=>{i(w=>w.map(k=>k.id===s?{...k,...p}:k))},v=c.useCallback(async s=>{const p="u"+Date.now()+Math.random(),w={id:p,name:s.name,size:s.size,status:"pending",progress:0};i(k=>[w,...k]);try{m(p,{status:"uploading",progress:5});const{uploadUrl:k,fileId:z,s3Key:D}=await qe(s.name,s.type,r==null?void 0:r.accessToken);m(p,{progress:15}),await He(k,s,M=>{m(p,{progress:15+Math.round(M*.75)})},r==null?void 0:r.accessToken),m(p,{progress:90}),await Ve(z,s.name,s.size,s.type,D,r==null?void 0:r.accessToken),m(p,{status:"done",progress:100})}catch(k){m(p,{status:"error",error:k.message})}},[r]),b=c.useCallback(s=>{Array.from(s).forEach(v)},[v]),h=c.useCallback(s=>{s.preventDefault(),l(!1),b(s.dataTransfer.files)},[b]),g=s=>{s.preventDefault(),l(!0)},f=()=>l(!1),y=o.filter(s=>s.status==="done").length,n=o.filter(s=>s.status==="uploading"||s.status==="pending").length;return e.jsxs(A,{children:[e.jsx("style",{children:`
        .upload-title { font-family: 'Bebas Neue', sans-serif; font-size: 2rem; color: #fff; letter-spacing: 0.03em; margin-bottom: 0.3rem; }
        .upload-sub { font-size: 0.875rem; color: #5a6a80; margin-bottom: 2rem; }

        .drop-zone {
          border: 2px dashed rgba(255,153,0,0.25); border-radius: 18px;
          padding: 4rem 2rem; text-align: center; cursor: pointer;
          background: rgba(255,153,0,0.02); transition: all 0.25s; margin-bottom: 2rem;
          position: relative;
        }
        .drop-zone:hover, .drop-zone.dragging {
          border-color: rgba(255,153,0,0.6); background: rgba(255,153,0,0.05);
          box-shadow: 0 0 40px rgba(255,153,0,0.1);
        }
        .drop-zone.dragging { transform: scale(1.01); }
        .drop-icon { font-size: 3.5rem; display: block; margin-bottom: 1rem; }
        .drop-title { font-family: 'Bebas Neue', sans-serif; font-size: 1.5rem; color: #e8ecf4; letter-spacing: 0.03em; margin-bottom: 0.5rem; }
        .drop-sub { font-size: 0.875rem; color: #5a6a80; margin-bottom: 1.5rem; }
        .file-types { display: flex; gap: 0.4rem; justify-content: center; flex-wrap: wrap; }
        .ft-badge { background: rgba(255,255,255,0.06); border: 1px solid rgba(255,255,255,0.1); border-radius: 5px; padding: 3px 8px; font-size: 0.7rem; color: #6677a0; font-family: 'DM Mono', monospace; }
        .btn-browse { padding: 0.75rem 2rem; background: linear-gradient(135deg, #FF9900, #FF6600); border: none; border-radius: 8px; color: #050810; font-weight: 700; font-size: 0.9rem; cursor: pointer; font-family: inherit; box-shadow: 0 4px 16px rgba(255,153,0,0.3); transition: all 0.2s; }
        .btn-browse:hover { transform: translateY(-1px); box-shadow: 0 6px 24px rgba(255,153,0,0.45); }

        .upload-status-bar {
          display: flex; gap: 1rem; margin-bottom: 1.25rem; flex-wrap: wrap;
        }
        .status-pill { display: flex; align-items: center; gap: 6px; font-size: 0.78rem; font-family: 'DM Mono', monospace; color: #5a6a80; }
        .status-dot { width: 6px; height: 6px; border-radius: 50%; }

        .uploads-list { display: flex; flex-direction: column; gap: 0.6rem; }

        .how-it-works { background: rgba(255,255,255,0.02); border: 1px solid rgba(255,255,255,0.07); border-radius: 14px; padding: 1.5rem; margin-top: 2rem; }
        .how-title { font-size: 0.7rem; text-transform: uppercase; letter-spacing: 0.1em; color: #445566; font-family: 'DM Mono', monospace; margin-bottom: 1rem; }
        .how-steps { display: grid; grid-template-columns: repeat(3, 1fr); gap: 1rem; }
        .how-step { text-align: center; }
        .how-num { width: 32px; height: 32px; border-radius: 50%; background: rgba(255,153,0,0.1); border: 1px solid rgba(255,153,0,0.25); display: flex; align-items: center; justify-content: center; font-size: 0.8rem; font-weight: 700; color: #FF9900; margin: 0 auto 0.5rem; font-family: 'DM Mono', monospace; }
        .how-label { font-size: 0.8rem; font-weight: 600; color: #c8d6f0; margin-bottom: 0.2rem; }
        .how-desc { font-size: 0.72rem; color: #445566; line-height: 1.5; }

        @media (max-width: 600px) { .how-steps { grid-template-columns: 1fr; } }
      `}),e.jsx("div",{className:"upload-title",children:"UPLOAD FILES"}),e.jsx("div",{className:"upload-sub",children:"Upload files directly to your local vault — fast and secure"}),e.jsxs("div",{className:`drop-zone${a?" dragging":""}`,onDrop:h,onDragOver:g,onDragLeave:f,onClick:()=>{var s;return(s=d.current)==null?void 0:s.click()},children:[e.jsx("span",{className:"drop-icon",children:"☁️"}),e.jsx("div",{className:"drop-title",children:"DROP FILES HERE"}),e.jsx("div",{className:"drop-sub",children:"or click to browse — any file type supported"}),e.jsx("div",{className:"file-types",children:["PNG","JPG","PDF","DOCX","XLSX","PPTX","MP4","ZIP","CSV","TXT","SVG","JSON"].map(s=>e.jsxs("span",{className:"ft-badge",children:[".",s.toLowerCase()]},s))}),e.jsx("br",{}),e.jsx("button",{className:"btn-browse",onClick:s=>{var p;s.stopPropagation(),(p=d.current)==null||p.click()},children:"Browse Files"})]}),e.jsx("input",{ref:d,type:"file",multiple:!0,style:{display:"none"},onChange:s=>b(s.target.files)}),o.length>0&&e.jsxs(e.Fragment,{children:[e.jsxs("div",{className:"upload-status-bar",children:[e.jsxs("div",{className:"status-pill",children:[e.jsx("span",{className:"status-dot",style:{background:"#22c55e"}}),y," uploaded"]}),n>0&&e.jsxs("div",{className:"status-pill",children:[e.jsx("span",{className:"status-dot",style:{background:"#FF9900",animation:"pulse 1s infinite"}}),n," in progress"]}),e.jsxs("div",{className:"status-pill",children:[o.length," total"]})]}),e.jsx("div",{className:"uploads-list",children:o.map(s=>e.jsx(Qe,{item:s},s.id))})]}),e.jsxs("div",{className:"how-it-works",children:[e.jsx("div",{className:"how-title",children:"// how upload works"}),e.jsx("div",{className:"how-steps",children:[{num:"01",label:"Request Slot",desc:"Backend reserves a unique file ID and upload path for your file."},{num:"02",label:"Direct Upload",desc:"Your browser streams the file directly to the local server — fast and efficient."},{num:"03",label:"Save Record",desc:"Backend confirms the upload and saves file metadata for retrieval."}].map(s=>e.jsxs("div",{className:"how-step",children:[e.jsx("div",{className:"how-num",children:s.num}),e.jsx("div",{className:"how-label",children:s.label}),e.jsx("div",{className:"how-desc",children:s.desc})]},s.num))})]})]})}function rr(){const{tokens:r}=R(),[o,i]=c.useState([]),[a,l]=c.useState(""),[d,m]=c.useState(""),[v,b]=c.useState(!1),[h,g]=c.useState(null),[f,y]=c.useState(0),[n,s]=c.useState(null);c.useEffect(()=>{W(r==null?void 0:r.accessToken).then(x=>i(x.files||[])).catch(()=>{})},[]);const p=(x,j="success")=>{s({msg:x,type:j}),setTimeout(()=>s(null),4e3)},w=o.find(x=>x.fileId===a),k=w?S(w.fileName):"",z=k?xe[k]||[]:[],D=async()=>{if(!a||!d){p("Please select a file and output format.","error");return}b(!0),g(null),y(0);const x=[10,25,40,60,75,90,100];for(let j=0;j<x.length-1;j++)await new Promise(C=>setTimeout(C,350)),y(x[j]);try{const j=await Ge(a,d,r==null?void 0:r.accessToken);y(100);const C=w.fileName.replace(/\.[^.]+$/,"")+"."+d;g({...j,convertedFileName:j.convertedFileName||C,targetFormat:d}),p(`✓ Converted to ${d.toUpperCase()} successfully!`)}catch(j){p("Conversion failed: "+j.message,"error")}finally{b(!1)}},M=()=>{if(!h)return;const x={fileId:h.convertedFileId||"conv-"+Date.now(),fileName:h.convertedFileName,fileSize:12e3,fileType:"application/octet-stream",uploadedAt:new Date().toISOString(),downloadUrl:h.downloadUrl||"#"};i(j=>[x,...j]),p("Saved to your cloud storage!"),g(null),l(""),m("")},U=()=>{if(!h||!h.downloadUrl||h.downloadUrl==="#"){p("Download link not available.","error");return}const x=document.createElement("a");x.href=h.downloadUrl,x.download=h.convertedFileName,document.body.appendChild(x),x.click(),document.body.removeChild(x)};return e.jsxs(A,{children:[e.jsx("style",{children:`
        .convert-title { font-family: 'Bebas Neue', sans-serif; font-size: 2rem; color: #fff; letter-spacing: 0.03em; margin-bottom: 0.3rem; }
        .convert-sub { font-size: 0.875rem; color: #5a6a80; margin-bottom: 2rem; }

        .convert-card { background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.08); border-radius: 18px; padding: 2rem; margin-bottom: 1.5rem; }
        .convert-card-title { font-size: 0.68rem; text-transform: uppercase; letter-spacing: 0.1em; color: #445566; font-family: 'DM Mono', monospace; margin-bottom: 1.25rem; }

        .file-select-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(150px, 1fr)); gap: 0.6rem; max-height: 260px; overflow-y: auto; padding-right: 4px; }
        .file-opt {
          border: 1px solid rgba(255,255,255,0.07); border-radius: 10px; padding: 0.85rem;
          cursor: pointer; transition: all 0.15s; background: rgba(255,255,255,0.02);
          text-align: center;
        }
        .file-opt:hover { background: rgba(255,255,255,0.05); border-color: rgba(255,255,255,0.15); }
        .file-opt.selected { background: rgba(255,153,0,0.1); border-color: rgba(255,153,0,0.35); }
        .fo-icon { font-size: 1.4rem; margin-bottom: 0.4rem; display: block; }
        .fo-name { font-size: 0.72rem; font-weight: 600; color: #c8d6f0; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
        .fo-size { font-size: 0.65rem; color: #445566; margin-top: 2px; }

        .format-grid { display: flex; gap: 0.5rem; flex-wrap: wrap; }
        .fmt-btn { padding: 8px 18px; border-radius: 8px; border: 1px solid rgba(255,255,255,0.1); background: rgba(255,255,255,0.03); color: #6677a0; cursor: pointer; font-family: 'DM Mono', monospace; font-size: 0.8rem; transition: all 0.15s; text-transform: uppercase; letter-spacing: 0.05em; }
        .fmt-btn:hover { background: rgba(255,255,255,0.07); color: #c8d6f0; }
        .fmt-btn.selected { background: rgba(255,153,0,0.12); color: #FF9900; border-color: rgba(255,153,0,0.35); }
        .no-formats { font-size: 0.82rem; color: #445566; font-style: italic; }

        .convert-flow { display: flex; align-items: center; gap: 1.5rem; padding: 1.25rem; background: rgba(255,255,255,0.02); border-radius: 12px; margin-bottom: 1.5rem; flex-wrap: wrap; }
        .cf-chip { background: rgba(255,255,255,0.06); border: 1px solid rgba(255,255,255,0.1); border-radius: 8px; padding: 0.5rem 1rem; font-size: 0.82rem; color: #c8d6f0; }
        .cf-arrow { font-size: 1.2rem; color: #FF9900; }
        .cf-target { background: rgba(255,153,0,0.1); border: 1px solid rgba(255,153,0,0.3); border-radius: 8px; padding: 0.5rem 1rem; font-size: 0.82rem; color: #FF9900; font-family: 'DM Mono', monospace; }

        .btn-convert { padding: 0.85rem 2.5rem; background: linear-gradient(135deg, #FF9900, #FF6600); border: none; border-radius: 10px; color: #050810; font-family: inherit; font-size: 1rem; font-weight: 700; cursor: pointer; box-shadow: 0 4px 20px rgba(255,153,0,0.35); transition: all 0.2s; display: flex; align-items: center; gap: 10px; }
        .btn-convert:hover:not(:disabled) { transform: translateY(-2px); box-shadow: 0 6px 30px rgba(255,153,0,0.5); }
        .btn-convert:disabled { opacity: 0.6; cursor: not-allowed; }
        .spinner { width: 16px; height: 16px; border: 2px solid rgba(5,8,16,0.3); border-top-color: #050810; border-radius: 50%; animation: spin 0.7s linear infinite; }
        @keyframes spin { to { transform: rotate(360deg); } }

        .progress-section { margin-bottom: 1.5rem; }
        .prog-info { display: flex; justify-content: space-between; font-size: 0.78rem; font-family: 'DM Mono', monospace; margin-bottom: 0.4rem; }
        .prog-label { color: #5a6a80; }
        .prog-val { color: #FF9900; }
        .prog-bg { background: rgba(255,255,255,0.06); border-radius: 100px; height: 6px; overflow: hidden; }
        .prog-fill { height: 100%; background: linear-gradient(90deg, #FF9900, #FF6600); border-radius: 100px; transition: width 0.4s ease; }

        .result-card { background: rgba(34,197,94,0.05); border: 1px solid rgba(34,197,94,0.2); border-radius: 14px; padding: 1.5rem; margin-bottom: 1.5rem; }
        .result-header { display: flex; align-items: center; gap: 10px; margin-bottom: 1.25rem; }
        .result-icon { font-size: 1.5rem; }
        .result-label { font-size: 0.75rem; text-transform: uppercase; letter-spacing: 0.1em; color: #22c55e; font-family: 'DM Mono', monospace; font-weight: 600; }
        .result-file { font-size: 0.95rem; font-weight: 700; color: #e8ecf4; }
        .result-actions { display: flex; gap: 0.75rem; flex-wrap: wrap; }
        .btn-save { padding: 0.65rem 1.25rem; background: rgba(34,197,94,0.12); border: 1px solid rgba(34,197,94,0.3); border-radius: 8px; color: #86efac; font-family: inherit; font-size: 0.85rem; font-weight: 600; cursor: pointer; transition: all 0.15s; }
        .btn-save:hover { background: rgba(34,197,94,0.2); }
        .btn-dl { padding: 0.65rem 1.25rem; background: rgba(255,153,0,0.1); border: 1px solid rgba(255,153,0,0.25); border-radius: 8px; color: #FF9900; font-family: inherit; font-size: 0.85rem; font-weight: 600; cursor: pointer; transition: all 0.15s; }
        .btn-dl:hover { background: rgba(255,153,0,0.2); }
        .btn-reset { padding: 0.65rem 1.25rem; background: rgba(255,255,255,0.04); border: 1px solid rgba(255,255,255,0.08); border-radius: 8px; color: #5a6a80; font-family: inherit; font-size: 0.85rem; cursor: pointer; }

        .support-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(200px, 1fr)); gap: 0.75rem; margin-top: 1rem; }
        .sup-row { display: flex; align-items: center; gap: 8px; background: rgba(255,255,255,0.02); border: 1px solid rgba(255,255,255,0.06); border-radius: 8px; padding: 0.6rem 0.85rem; font-size: 0.75rem; font-family: 'DM Mono', monospace; }
        .sup-from { color: #FF9900; }
        .sup-arr { color: #445566; }
        .sup-to { color: #86efac; }

        .toast { position: fixed; bottom: 2rem; right: 2rem; z-index: 200; background: #0d1117; border: 1px solid rgba(255,255,255,0.1); border-radius: 10px; padding: 0.75rem 1.25rem; font-size: 0.85rem; color: #e8ecf4; box-shadow: 0 8px 30px rgba(0,0,0,0.5); display: flex; align-items: center; gap: 8px; animation: slideUp 0.3s ease; }
        @keyframes slideUp { from { transform: translateY(20px); opacity: 0; } to { transform: translateY(0); opacity: 1; } }
      `}),e.jsx("div",{className:"convert-title",children:"CONVERT FILES"}),e.jsx("div",{className:"convert-sub",children:"Transform files between formats via AWS Lambda"}),e.jsxs("div",{className:"convert-card",children:[e.jsx("div",{className:"convert-card-title",children:"// step 01 — select file"}),o.length===0?e.jsxs("div",{style:{color:"#445566",fontSize:"0.85rem"},children:["No files uploaded yet."," ",e.jsx("a",{href:"/upload",style:{color:"#FF9900"},children:"Upload some files first →"})]}):e.jsx("div",{className:"file-select-grid",children:o.map(x=>{const j=S(x.fileName),C=L(j);return e.jsxs("div",{className:`file-opt${a===x.fileId?" selected":""}`,onClick:()=>{l(x.fileId),m(""),g(null)},children:[e.jsx("span",{className:"fo-icon",children:C.icon}),e.jsx("div",{className:"fo-name",title:x.fileName,children:x.fileName}),e.jsx("div",{className:"fo-size",children:I(x.fileSize)})]},x.fileId)})})]}),e.jsxs("div",{className:"convert-card",children:[e.jsx("div",{className:"convert-card-title",children:"// step 02 — select output format"}),a?z.length===0?e.jsxs("div",{className:"no-formats",children:["No conversions available for .",k," files."]}):e.jsx("div",{className:"format-grid",children:z.map(x=>e.jsxs("button",{className:`fmt-btn${d===x?" selected":""}`,onClick:()=>m(x),children:[".",x]},x))}):e.jsx("div",{className:"no-formats",children:"Select a file above first."})]}),w&&d&&e.jsxs("div",{className:"convert-flow",children:[e.jsxs("div",{className:"cf-chip",children:[L(k).icon," ",w.fileName]}),e.jsx("div",{className:"cf-arrow",children:"→"}),e.jsxs("div",{className:"cf-target",children:[".",d.toUpperCase()]}),e.jsx("div",{style:{marginLeft:"auto",fontSize:"0.75rem",color:"#445566",fontFamily:"DM Mono, monospace"},children:"via AWS Lambda ⚡"})]}),v&&e.jsxs("div",{className:"progress-section",children:[e.jsxs("div",{className:"prog-info",children:[e.jsx("span",{className:"prog-label",children:"Converting via Lambda..."}),e.jsxs("span",{className:"prog-val",children:[f,"%"]})]}),e.jsx("div",{className:"prog-bg",children:e.jsx("div",{className:"prog-fill",style:{width:`${f}%`}})})]}),h&&!v&&e.jsxs("div",{className:"result-card",children:[e.jsxs("div",{className:"result-header",children:[e.jsx("span",{className:"result-icon",children:"✅"}),e.jsxs("div",{children:[e.jsx("div",{className:"result-label",children:"Conversion Complete"}),e.jsx("div",{className:"result-file",children:h.convertedFileName})]})]}),e.jsxs("div",{className:"result-actions",children:[e.jsx("button",{className:"btn-save",onClick:M,children:"☁ Save to Cloud"}),e.jsx("button",{className:"btn-dl",onClick:U,children:"↓ Download"}),e.jsx("button",{className:"btn-reset",onClick:()=>{g(null),l(""),m("")},children:"Convert another"})]})]}),e.jsx("button",{className:"btn-convert",onClick:D,disabled:v||!a||!d,children:v?e.jsxs(e.Fragment,{children:[e.jsx("span",{className:"spinner"})," Converting..."]}):"⇄ Convert Now"}),e.jsxs("div",{className:"convert-card",style:{marginTop:"2rem"},children:[e.jsx("div",{className:"convert-card-title",children:"// supported conversions"}),e.jsx("div",{className:"support-grid",children:Object.entries(xe).flatMap(([x,j])=>j.map(C=>e.jsxs("div",{className:"sup-row",children:[e.jsxs("span",{className:"sup-from",children:[".",x]}),e.jsx("span",{className:"sup-arr",children:"→"}),e.jsxs("span",{className:"sup-to",children:[".",C]})]},`${x}-${C}`)))})]}),n&&e.jsxs("div",{className:"toast",children:[n.type==="error"?"❌":"✅"," ",n.msg]})]})}function ar(){const{tokens:r}=R();B();const[o,i]=c.useState([]),[a,l]=c.useState(""),[d,m]=c.useState(50),[v,b]=c.useState(!1),[h,g]=c.useState(""),[f,y]=c.useState("");c.useEffect(()=>{W(r==null?void 0:r.accessToken).then(w=>{const k=w.files.filter(z=>{const D=T(S(z.fileName));return D==="image"||D==="media"||D==="document"});i(k||[])}).catch(console.error)},[r]);const n=o.find(w=>w.fileId===a),s=async w=>{if(w.preventDefault(),!a)return g("Please select a file to compress.");b(!0),g(""),y("");try{const k=await fetch("/api/compress",{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${r==null?void 0:r.accessToken}`},body:JSON.stringify({fileId:a,percentage:parseInt(d,10)})}),z=await k.json();if(!k.ok)throw new Error(z.message||"Compression failed");y("File compressed successfully! It has been added to your vault.")}catch(k){g(k.message)}finally{b(!1)}},p=n?n.fileSize*(d/100):0;return e.jsxs(A,{children:[e.jsx("style",{children:`
        .compress-container { max-width: 600px; margin: 0 auto; padding: 2rem 0; }
        .page-title { font-family: 'Bebas Neue', sans-serif; font-size: 2.5rem; color: #fff; margin-bottom: 0.5rem; letter-spacing: 0.03em; }
        .page-sub { color: #5a6a80; font-size: 0.9rem; margin-bottom: 2.5rem; }
        
        .compress-card {
          background: rgba(255,255,255,0.02);
          border: 1px solid rgba(255,255,255,0.05);
          border-radius: 16px;
          padding: 2.5rem;
        }

        .form-group { margin-bottom: 1.5rem; }
        .form-label { display: block; font-size: 0.75rem; color: #445566; text-transform: uppercase; letter-spacing: 0.1em; margin-bottom: 0.5rem; font-family: 'DM Mono', monospace; }
        
        .select-input {
          width: 100%; background: rgba(0,0,0,0.2); border: 1px solid rgba(255,255,255,0.1);
          color: #fff; padding: 1rem; border-radius: 8px; font-size: 0.95rem; outline: none;
          transition: all 0.2s; appearance: none;
        }
        .select-input:focus { border-color: rgba(255,153,0,0.5); box-shadow: 0 0 0 2px rgba(255,153,0,0.1); }
        
        .slider-container { margin-top: 2rem; }
        .slider-info { display: flex; justify-content: space-between; margin-bottom: 1rem; color: #c8d6f0; font-size: 0.9rem; }
        .slider-val { font-weight: bold; color: #FF9900; }
        
        .range-slider {
          -webkit-appearance: none; width: 100%; height: 6px; border-radius: 3px;
          background: rgba(255,255,255,0.1); outline: none;
        }
        .range-slider::-webkit-slider-thumb {
          -webkit-appearance: none; appearance: none; width: 20px; height: 20px;
          border-radius: 50%; background: #FF9900; cursor: pointer; transition: 0.2s;
        }
        .range-slider::-webkit-slider-thumb:hover { transform: scale(1.1); box-shadow: 0 0 10px rgba(255,153,0,0.4); }

        .estimate-box {
          margin-top: 2rem; background: rgba(255,153,0,0.05); border: 1px solid rgba(255,153,0,0.1);
          border-radius: 8px; padding: 1.5rem; text-align: center;
        }
        .estimate-val { font-family: 'Bebas Neue', sans-serif; font-size: 2.5rem; color: #FF9900; margin: 0.5rem 0; }
        .estimate-note { font-size: 0.75rem; color: #5a6a80; }

        .btn-primary {
          width: 100%; background: #FF9900; color: #000; border: none; padding: 1.2rem;
          border-radius: 8px; font-weight: 600; font-size: 1rem; cursor: pointer; margin-top: 2rem; transition: 0.2s;
        }
        .btn-primary:hover:not(:disabled) { background: #ffb340; transform: translateY(-1px); }
        .btn-primary:disabled { opacity: 0.5; cursor: not-allowed; }

        .error-msg { background: rgba(255,50,50,0.1); color: #ff5555; padding: 1rem; border-radius: 8px; font-size: 0.9rem; margin-bottom: 1.5rem; border: 1px solid rgba(255,50,50,0.2); }
        .success-msg { background: rgba(50,255,100,0.1); color: #44ee77; padding: 1rem; border-radius: 8px; font-size: 0.9rem; margin-bottom: 1.5rem; border: 1px solid rgba(50,255,100,0.2); }
      `}),e.jsxs("div",{className:"compress-container",children:[e.jsx("h1",{className:"page-title",children:"File Compressor"}),e.jsx("p",{className:"page-sub",children:"Shrink the size of your images, videos, and PDFs."}),e.jsxs("div",{className:"compress-card",children:[h&&e.jsx("div",{className:"error-msg",children:h}),f&&e.jsx("div",{className:"success-msg",children:f}),e.jsxs("form",{onSubmit:s,children:[e.jsxs("div",{className:"form-group",children:[e.jsx("label",{className:"form-label",children:"Select File to Compress"}),e.jsxs("select",{className:"select-input",value:a,onChange:w=>l(w.target.value),required:!0,children:[e.jsx("option",{value:"",children:"-- Choose a file --"}),o.map(w=>e.jsxs("option",{value:w.fileId,children:[w.fileName," (",I(w.fileSize),")"]},w.fileId))]})]}),n&&e.jsxs(e.Fragment,{children:[e.jsxs("div",{className:"slider-container",children:[e.jsxs("div",{className:"slider-info",children:[e.jsx("span",{children:"Target Size Percentage"}),e.jsxs("span",{className:"slider-val",children:[d,"%"]})]}),e.jsx("input",{type:"range",min:"1",max:"100",value:d,onChange:w=>m(w.target.value),className:"range-slider"})]}),e.jsxs("div",{className:"estimate-box",children:[e.jsx("div",{style:{fontSize:"0.85rem",color:"#c8d6f0"},children:"Estimated Output Size"}),e.jsx("div",{className:"estimate-val",children:I(p)}),e.jsx("div",{className:"estimate-note",children:T(S(n.fileName))==="document"?"Note: PDFs compress structurally. Final size may vary significantly from estimate.":"Final file size is approximate based on quality scaling."})]}),e.jsx("button",{type:"submit",className:"btn-primary",disabled:v,children:v?"Compressing...":"Compress File"})]})]})]})]})]})}function or({file:r,onClose:o,onDelete:i,onDownload:a}){var U,x;const[l,d]=c.useState(!1),[m,v]=c.useState("original"),[b,h]=c.useState(!1),g=c.useRef(null),f=c.useRef(null);if(c.useEffect(()=>{const j=()=>h(!!document.fullscreenElement);return document.addEventListener("fullscreenchange",j),()=>document.removeEventListener("fullscreenchange",j)},[]),!r)return null;const y=S(r.fileName),n=L(y),s=(U=r.fileType)==null?void 0:U.startsWith("image/"),p=((x=r.fileType)==null?void 0:x.startsWith("video/"))||["mp4","mov","avi"].includes(y),w=y==="pdf",k=r.downloadUrl?r.downloadUrl.replace("/download/","/stream/"):"#",z=j=>{a(r,j),d(!1)},D=j=>{const C=j.target.value;if(v(C),g.current){const J=g.current.currentTime;g.current.src=`${k}?res=${C}&t=${J}`,g.current.play()}},M=()=>{var j,C;document.fullscreenElement?document.exitFullscreen?document.exitFullscreen():document.webkitExitFullscreen&&document.webkitExitFullscreen():(j=f.current)!=null&&j.requestFullscreen?f.current.requestFullscreen():(C=f.current)!=null&&C.webkitRequestFullscreen&&f.current.webkitRequestFullscreen()};return e.jsx("div",{style:{position:"fixed",inset:0,background:"rgba(0,0,0,0.75)",backdropFilter:"blur(8px)",zIndex:100,display:"flex",alignItems:"center",justifyContent:"center",padding:"1rem"},onClick:o,children:e.jsxs("div",{style:{background:"#0d1117",border:"1px solid rgba(255,255,255,0.1)",borderRadius:20,padding:"1.75rem",width:"100%",maxWidth:560,maxHeight:"90vh",overflow:"auto",animation:"modalIn 0.2s ease"},onClick:j=>j.stopPropagation(),children:[e.jsx("style",{children:"@keyframes modalIn { from { transform: scale(0.94); opacity: 0; } to { transform: scale(1); opacity: 1; } }"}),e.jsxs("div",{style:{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:"1.5rem"},children:[e.jsx("div",{style:{fontFamily:"Bebas Neue, sans-serif",fontSize:"1.3rem",color:"#fff",letterSpacing:"0.03em"},children:"FILE PREVIEW"}),e.jsx("button",{onClick:o,style:{background:"none",border:"none",color:"#5a6a80",fontSize:"1.5rem",cursor:"pointer",lineHeight:1},children:"×"})]}),e.jsxs("div",{style:{textAlign:"center",marginBottom:"1.5rem",background:"rgba(255,255,255,0.03)",borderRadius:12,padding:"1.5rem"},children:[p&&r.downloadUrl&&r.downloadUrl!=="#"?e.jsxs("div",{ref:f,style:{position:"relative",display:"flex",alignItems:"center",justifyContent:"center",width:"100%",height:b?"100%":"auto",background:b?"#000":"transparent"},children:[e.jsx("video",{ref:g,src:`${k}?res=${m}`,controls:!0,controlsList:"nofullscreen",autoPlay:!0,style:{width:"100%",height:b?"100%":"auto",maxHeight:b?"100%":260,borderRadius:b?0:8,objectFit:"contain"}}),e.jsxs("div",{style:{position:"absolute",top:10,right:10,display:"flex",gap:"0.5rem",zIndex:10},children:[e.jsxs("select",{value:m,onChange:D,style:{background:"rgba(0,0,0,0.7)",color:"white",border:"1px solid rgba(255,255,255,0.2)",padding:"0.4rem 0.6rem",borderRadius:6,cursor:"pointer",outline:"none",fontWeight:600,fontSize:"0.8rem"},children:[e.jsx("option",{value:"original",children:"Original Quality"}),e.jsx("option",{value:"4k",children:"4K (Stream)"}),e.jsx("option",{value:"1080p",children:"1080p (Stream)"}),e.jsx("option",{value:"720p",children:"720p (Stream)"})]}),e.jsx("button",{onClick:M,style:{background:"rgba(0,0,0,0.7)",color:"white",border:"1px solid rgba(255,255,255,0.2)",padding:"0.4rem 0.6rem",borderRadius:6,cursor:"pointer",outline:"none",fontWeight:600,fontSize:"0.8rem"},children:b?"Exit Fullscreen":"⛶ Fullscreen"})]})]}):s&&r.downloadUrl&&r.downloadUrl!=="#"?e.jsx("img",{src:r.downloadUrl,alt:r.fileName,style:{maxWidth:"100%",maxHeight:260,objectFit:"contain",borderRadius:8}}):w&&r.downloadUrl&&r.downloadUrl!=="#"?e.jsx("embed",{src:r.downloadUrl,type:"application/pdf",style:{width:"100%",height:260,borderRadius:8}}):e.jsx("div",{style:{fontSize:"4rem",marginBottom:"0.75rem"},children:n.icon}),e.jsx("div",{style:{fontWeight:600,fontSize:"0.9rem",color:"#e8ecf4",marginTop:s||w?"0.75rem":0},children:r.fileName}),e.jsxs("div",{style:{fontSize:"0.78rem",color:"#5a6a80",marginTop:"0.3rem"},children:[I(r.fileSize)," · ",y.toUpperCase(),r.resolution?` · ${V(r.resolution)}`:""," · ",H(r.uploadedAt)]})]}),e.jsxs("div",{style:{display:"flex",gap:"0.75rem",flexWrap:"wrap",justifyContent:"flex-end",position:"relative"},children:[e.jsx("button",{onClick:o,style:{padding:"0.7rem 1rem",background:"rgba(255,255,255,0.05)",border:"1px solid rgba(255,255,255,0.1)",borderRadius:8,color:"#6677a0",fontSize:"0.85rem",cursor:"pointer",fontFamily:"inherit"},children:"Close"}),e.jsx("button",{onClick:()=>{i(r),o()},style:{padding:"0.7rem",background:"rgba(239,68,68,0.1)",border:"1px solid rgba(239,68,68,0.25)",borderRadius:8,color:"#fca5a5",fontSize:"0.85rem",cursor:"pointer",fontFamily:"inherit"},children:"🗑 Delete"}),s||p?e.jsxs("div",{style:{position:"relative"},children:[e.jsxs("button",{style:{padding:"0.7rem",background:"linear-gradient(135deg, #FF9900, #FF6600)",border:"none",borderRadius:8,color:"#050810",fontWeight:700,fontSize:"0.85rem",cursor:"pointer",fontFamily:"inherit"},onClick:()=>d(!l),children:["↓ Download ",l?"▲":"▼"]}),l&&e.jsxs("div",{style:{position:"absolute",bottom:"110%",right:0,background:"#1f2937",border:"1px solid rgba(255,255,255,0.1)",borderRadius:"8px",padding:"0.5rem",display:"flex",flexDirection:"column",gap:"0.5rem",zIndex:10,minWidth:"140px"},children:[e.jsx("button",{className:"fc-btn",style:{width:"100%",textAlign:"left",border:"none",background:"transparent",color:"#e8ecf4"},onClick:()=>z("original"),children:"Original Size"}),e.jsx("button",{className:"fc-btn",style:{width:"100%",textAlign:"left",border:"none",background:"transparent",color:"#e8ecf4"},onClick:()=>z("2k"),children:"2K Resolution"}),e.jsx("button",{className:"fc-btn",style:{width:"100%",textAlign:"left",border:"none",background:"transparent",color:"#e8ecf4"},onClick:()=>z("4k"),children:"4K Resolution"})]})]}):e.jsx("button",{onClick:()=>a(r),style:{padding:"0.7rem",background:"linear-gradient(135deg, #FF9900, #FF6600)",border:"none",borderRadius:8,color:"#050810",fontWeight:700,fontSize:"0.85rem",cursor:"pointer",fontFamily:"inherit"},children:"↓ Download"})]})]})})}class tr extends ve.Component{constructor(o){super(o),this.state={hasError:!1,error:null}}static getDerivedStateFromError(o){return{hasError:!0,error:o}}render(){var o,i;return this.state.hasError?e.jsxs("div",{style:{padding:"2rem",color:"#ff5555",background:"#220000",minHeight:"100vh",fontFamily:"monospace"},children:[e.jsx("h2",{children:"UI Crashed"}),e.jsx("pre",{children:(o=this.state.error)==null?void 0:o.toString()}),e.jsx("pre",{style:{marginTop:"1rem",whiteSpace:"pre-wrap"},children:(i=this.state.error)==null?void 0:i.stack})]}):this.props.children}}function sr(){const{tokens:r}=R(),o=B(),[i,a]=c.useState([]),[l,d]=c.useState(!0),[m,v]=c.useState("grid"),[b,h]=c.useState("all"),[g,f]=c.useState(""),[y,n]=c.useState(null),[s,p]=c.useState(new Set),[w,k]=c.useState(null),[z,D]=c.useState(null),M=c.useRef(null),U=c.useRef(!1);c.useEffect(()=>{x()},[]);const x=async()=>{d(!0);try{const t=await W(r==null?void 0:r.accessToken);a(t.files||[])}catch(t){console.error(t)}finally{d(!1)}},j=(t,u="success")=>{k({msg:t,type:u}),setTimeout(()=>k(null),3500)},C=async t=>{if(confirm(`Delete "${t.fileName}"?`))try{if(await be(t.fileId,r==null?void 0:r.accessToken),a(u=>u.filter(F=>F.fileId!==t.fileId)),n(null),s.has(t.fileId)){const u=new Set(s);u.delete(t.fileId),p(u)}j("File deleted successfully")}catch(u){j("Delete failed: "+u.message,"error")}},J=async()=>{if(confirm(`Are you sure you want to delete ${s.size} selected files?`))try{await Promise.all(Array.from(s).map(t=>be(t,r==null?void 0:r.accessToken))),a(t=>t.filter(u=>!s.has(u.fileId))),p(new Set),n(null),j(`Successfully deleted ${s.size} files`)}catch(t){j("Bulk delete failed: "+t.message,"error")}},Ne=async()=>{const t=Array.from(s);j(`Zipping and downloading ${t.length} files...`,"info");try{const u=await Je(t,r==null?void 0:r.accessToken),F=window.URL.createObjectURL(u),N=document.createElement("a");N.href=F,N.download=`CloudVault_Bulk_${Date.now()}.zip`,document.body.appendChild(N),N.click(),document.body.removeChild(N),window.URL.revokeObjectURL(F),p(new Set)}catch(u){j("Bulk download failed: "+u.message,"error")}},oe=(t,u)=>{t.stopPropagation(),p(F=>{const N=new Set(F);return N.has(u)?N.delete(u):N.add(u),N})},ke=t=>{if(t.target.closest(".bulk-bar")||t.target.closest(".filters")||t.target.closest(".toolbar")||t.target.closest(".cb-wrap")||t.target.closest(".fc-actions")||t.target.closest(".fr-actions")||!M.current)return;U.current=!1;const u=M.current.getBoundingClientRect(),F=t.clientX-u.left,N=t.clientY-u.top;new Set(s);const P=_=>{const ne=_.clientX-u.left,ie=_.clientY-u.top,ze=_.clientX-t.clientX,Se=_.clientY-t.clientY;if(!U.current&&(Math.abs(ze)>4||Math.abs(Se)>4)&&(U.current=!0),!U.current)return;const Z=Math.min(F,ne),Q=Math.min(N,ie),le=Math.abs(ne-F),ce=Math.abs(ie-N);D({left:Z,top:Q,width:le,height:ce});const de=new Set;M.current.querySelectorAll(".file-card, .file-row").forEach(me=>{const Y=me.getBoundingClientRect(),pe=Y.left-u.left,ge=Y.top-u.top,Ce=pe+Y.width,De=ge+Y.height;if(!(Ce<Z||pe>Z+le||De<Q||ge>Q+ce)){const fe=me.getAttribute("data-file-id");fe&&de.add(fe)}}),p(de)},se=()=>{document.removeEventListener("mousemove",P),document.removeEventListener("mouseup",se),D(null),setTimeout(()=>{U.current=!1},0)};document.addEventListener("mousemove",P),document.addEventListener("mouseup",se)},te=(t,u)=>{if(U.current){t.stopPropagation();return}n(u)},G=async(t,u="original")=>{let F;if(t.downloadUrl&&t.downloadUrl!=="#")F=t.downloadUrl;else try{F=(await Xe(t.fileId,r==null?void 0:r.accessToken)).downloadUrl}catch(P){j("Download failed: "+P.message,"error");return}u!=="original"?(F=F.replace("/download/","/download-enhanced/"),F+=(F.includes("?")?"&":"?")+`res=${u}`):F+=(F.includes("?")?"&":"?")+"dl=1";const N=document.createElement("iframe");N.style.display="none",N.src=F,document.body.appendChild(N),setTimeout(()=>document.body.removeChild(N),1e4)},K=i.filter(t=>{const u=S(t.fileName),F=T(u),N=b==="all"||F===b,P=!g||t.fileName.toLowerCase().includes(g.toLowerCase());return N&&P}),Fe=[{key:"all",label:"All",count:i.length},{key:"image",label:"Images",count:i.filter(t=>T(S(t.fileName))==="image").length},{key:"document",label:"Documents",count:i.filter(t=>T(S(t.fileName))==="document").length},{key:"media",label:"Media",count:i.filter(t=>T(S(t.fileName))==="media").length},{key:"other",label:"Other",count:i.filter(t=>T(S(t.fileName))==="other").length}];return e.jsxs(A,{children:[e.jsx("style",{children:`
        .files-header { display: flex; align-items: center; justify-content: space-between; margin-bottom: 1.5rem; flex-wrap: wrap; gap: 1rem; }
        .files-title { font-family: 'Bebas Neue', sans-serif; font-size: 2rem; color: #fff; letter-spacing: 0.03em; }
        .btn-upload { padding: 0.6rem 1.25rem; background: linear-gradient(135deg, #FF9900, #FF6600); border: none; border-radius: 8px; color: #050810; font-weight: 700; font-size: 0.85rem; cursor: pointer; font-family: inherit; }
        .btn-upload:hover { opacity: 0.9; }

        .filters { display: flex; gap: 0.4rem; margin-bottom: 1.25rem; flex-wrap: wrap; }
        .filter-btn { padding: 5px 14px; border-radius: 100px; font-size: 0.78rem; cursor: pointer; border: 1px solid rgba(255,255,255,0.1); background: transparent; color: #5a6a80; font-family: 'DM Mono', monospace; transition: all 0.15s; }
        .filter-btn:hover { background: rgba(255,255,255,0.05); color: #c8d6f0; }
        .filter-btn.active { background: rgba(255,153,0,0.12); color: #FF9900; border-color: rgba(255,153,0,0.3); }

        .toolbar { display: flex; align-items: center; gap: 0.75rem; margin-bottom: 1.25rem; }
        .search-box { flex: 1; display: flex; align-items: center; gap: 8px; background: rgba(255,255,255,0.04); border: 1px solid rgba(255,255,255,0.08); border-radius: 8px; padding: 0.55rem 0.85rem; }
        .search-box input { background: none; border: none; color: #e8ecf4; font-family: inherit; font-size: 0.875rem; flex: 1; outline: none; }
        .search-box input::placeholder { color: rgba(255,255,255,0.2); }
        .view-btns { display: flex; gap: 3px; }
        .vbtn { padding: 6px 10px; border-radius: 6px; background: none; border: 1px solid rgba(255,255,255,0.08); color: #5a6a80; font-size: 13px; cursor: pointer; transition: all 0.15s; }
        .vbtn.active { background: rgba(255,153,0,0.12); color: #FF9900; border-color: rgba(255,153,0,0.25); }

        .files-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(165px, 1fr)); gap: 0.85rem; }
        .file-card { background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.07); border-radius: 12px; padding: 1.1rem; cursor: pointer; transition: all 0.2s; }
        .file-card:hover { background: rgba(255,153,0,0.05); border-color: rgba(255,153,0,0.2); transform: translateY(-2px); }
        .fc-icon { width: 48px; height: 48px; border-radius: 10px; display: flex; align-items: center; justify-content: center; font-size: 1.4rem; margin-bottom: 0.75rem; }
        .fc-name { font-size: 0.8rem; font-weight: 600; color: #c8d6f0; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; margin-bottom: 0.2rem; }
        .fc-meta { font-size: 0.68rem; color: #445566; }
        .fc-actions { display: flex; gap: 4px; margin-top: 0.6rem; }
        .fc-btn { padding: 4px 8px; border-radius: 5px; font-size: 0.72rem; cursor: pointer; font-family: inherit; border: 1px solid rgba(255,255,255,0.1); background: transparent; color: #5a6a80; transition: all 0.15s; }
        .fc-btn:hover { background: rgba(255,255,255,0.06); color: #c8d6f0; }
        .fc-btn.del:hover { background: rgba(239,68,68,0.1); color: #fca5a5; border-color: rgba(239,68,68,0.2); }

        .files-list { display: flex; flex-direction: column; gap: 0.5rem; }
        .file-row { background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.07); border-radius: 10px; padding: 0.75rem 1rem; display: flex; align-items: center; gap: 0.85rem; cursor: pointer; transition: all 0.15s; }
        .file-row:hover { background: rgba(255,153,0,0.04); border-color: rgba(255,153,0,0.15); }
        .fr-icon { width: 38px; height: 38px; border-radius: 8px; display: flex; align-items: center; justify-content: center; font-size: 1.1rem; flex-shrink: 0; }
        .fr-info { flex: 1; min-width: 0; }
        .fr-name { font-size: 0.85rem; font-weight: 600; color: #c8d6f0; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
        .fr-meta { font-size: 0.7rem; color: #445566; margin-top: 2px; }
        .fr-actions { display: flex; gap: 4px; flex-shrink: 0; }

        .empty { text-align: center; padding: 4rem 2rem; color: #445566; }
        .skeleton-g { display: grid; grid-template-columns: repeat(auto-fill, minmax(165px, 1fr)); gap: 0.85rem; }
        .skeleton { background: linear-gradient(90deg, rgba(255,255,255,0.03) 25%, rgba(255,255,255,0.06) 50%, rgba(255,255,255,0.03) 75%); background-size: 200%; animation: shimmer 1.4s infinite; border-radius: 10px; }
        @keyframes shimmer { 0% { background-position: 200% 0; } 100% { background-position: -200% 0; } }

        .toast { position: fixed; bottom: 2rem; right: 2rem; z-index: 200; background: #0d1117; border: 1px solid rgba(255,255,255,0.1); border-radius: 10px; padding: 0.75rem 1.25rem; font-size: 0.85rem; color: #e8ecf4; box-shadow: 0 8px 30px rgba(0,0,0,0.5); display: flex; align-items: center; gap: 8px; animation: slideUp 0.3s ease; }
        @keyframes slideUp { from { transform: translateY(20px); opacity: 0; } to { transform: translateY(0); opacity: 1; } }
        
        .checkbox { width: 16px; height: 16px; cursor: pointer; accent-color: #FF9900; }
        .cb-wrap { position: absolute; top: 12px; left: 12px; z-index: 10; padding: 4px; border-radius: 4px; background: rgba(0,0,0,0.4); display: flex; align-items: center; justify-content: center; opacity: 0; transition: opacity 0.2s; }
        .file-card:hover .cb-wrap, .cb-wrap.checked { opacity: 1; }
        
        .bulk-bar { position: fixed; bottom: 2rem; left: 50%; transform: translateX(-50%); background: #050810; border: 1px solid rgba(255,153,0,0.3); border-radius: 12px; padding: 0.85rem 1.5rem; display: flex; align-items: center; gap: 1.5rem; z-index: 150; box-shadow: 0 10px 40px rgba(0,0,0,0.8), 0 0 20px rgba(255,153,0,0.15); animation: slideUpBulk 0.3s ease; }
        @keyframes slideUpBulk { from { transform: translate(-50%, 30px); opacity: 0; } to { transform: translate(-50%, 0); opacity: 1; } }
        .bulk-count { color: #fff; font-family: 'Bebas Neue', sans-serif; font-size: 1.2rem; letter-spacing: 0.05em; }
        .bulk-actions { display: flex; gap: 0.5rem; }
        
        .selection-container { min-height: 200px; position: relative; user-select: none; }
        .drag-box { position: absolute; background: rgba(255,153,0,0.15); border: 1px solid rgba(255,153,0,0.6); pointer-events: none; z-index: 50; }

        @media (max-width: 600px) { .files-grid { grid-template-columns: 1fr 1fr; } }
      `}),e.jsxs("div",{className:"files-header",children:[e.jsxs("div",{children:[e.jsx("div",{className:"files-title",children:"MY FILES"}),e.jsxs("div",{style:{fontSize:"0.875rem",color:"#5a6a80"},children:[i.length," files stored in S3"]})]}),e.jsx("button",{className:"btn-upload",onClick:()=>o("/upload"),children:"+ Upload"})]}),e.jsx("div",{className:"filters",children:Fe.map(t=>e.jsxs("button",{className:`filter-btn${b===t.key?" active":""}`,onClick:()=>h(t.key),children:[t.label," (",t.count,")"]},t.key))}),e.jsxs("div",{className:"toolbar",children:[e.jsxs("div",{className:"search-box",children:[e.jsx("span",{style:{color:"#445566",fontSize:"0.9rem"},children:"🔍"}),e.jsx("input",{placeholder:"Search files...",value:g,onChange:t=>f(t.target.value)})]}),e.jsxs("div",{className:"view-btns",children:[e.jsx("button",{className:`vbtn${m==="grid"?" active":""}`,onClick:()=>v("grid"),children:"⊞"}),e.jsx("button",{className:`vbtn${m==="list"?" active":""}`,onClick:()=>v("list"),children:"☰"})]})]}),l?e.jsx("div",{className:"skeleton-g",children:[...Array(8)].map((t,u)=>e.jsx("div",{className:"skeleton",style:{height:130}},u))}):K.length===0?e.jsxs("div",{className:"empty",children:[e.jsx("div",{style:{fontSize:"2.5rem",marginBottom:"0.75rem",opacity:.4},children:"📭"}),e.jsx("div",{style:{fontSize:"0.9rem",color:"#c8d6f0",marginBottom:"0.5rem"},children:"No files found"}),e.jsx("div",{style:{fontSize:"0.8rem"},children:g?"Try a different search term":"Upload your first file!"})]}):e.jsxs("div",{ref:M,className:"selection-container",onMouseDown:ke,children:[z&&e.jsx("div",{className:"drag-box",style:{left:z.left,top:z.top,width:z.width,height:z.height}}),m==="grid"?e.jsx("div",{className:"files-grid",children:K.map(t=>{const u=S(t.fileName),F=L(u);return e.jsxs("div",{"data-file-id":t.fileId,className:"file-card",onClick:N=>te(N,t),style:{position:"relative"},children:[e.jsx("div",{className:`cb-wrap ${s.has(t.fileId)?"checked":""}`,onClick:N=>oe(N,t.fileId),children:e.jsx("input",{type:"checkbox",className:"checkbox",checked:s.has(t.fileId),readOnly:!0})}),e.jsx("div",{className:"fc-icon",style:{background:F.bg},children:F.icon}),e.jsx("div",{className:"fc-name",title:t.fileName,children:t.fileName}),e.jsxs("div",{className:"fc-meta",children:[I(t.fileSize),t.resolution?` · ${V(t.resolution)}`:""," ","· ",H(t.uploadedAt)]}),e.jsxs("div",{className:"fc-actions",onClick:N=>N.stopPropagation(),children:[e.jsx("button",{className:"fc-btn",onClick:()=>G(t),children:"↓"}),e.jsx("button",{className:"fc-btn del",onClick:()=>C(t),children:"🗑"})]})]},t.fileId)})}):e.jsx("div",{className:"files-list",children:K.map(t=>{const u=S(t.fileName),F=L(u);return e.jsxs("div",{"data-file-id":t.fileId,className:"file-row",onClick:N=>te(N,t),children:[e.jsx("div",{className:"cb-wrap",style:{position:"relative",top:0,left:0,opacity:1,background:"none",padding:0,marginRight:"0.5rem"},onClick:N=>oe(N,t.fileId),children:e.jsx("input",{type:"checkbox",className:"checkbox",checked:s.has(t.fileId),readOnly:!0})}),e.jsx("div",{className:"fr-icon",style:{background:F.bg},children:F.icon}),e.jsxs("div",{className:"fr-info",children:[e.jsx("div",{className:"fr-name",children:t.fileName}),e.jsxs("div",{className:"fr-meta",children:[I(t.fileSize)," · ",u.toUpperCase(),t.resolution?` · ${V(t.resolution)}`:""," ","· ",H(t.uploadedAt)]})]}),e.jsxs("div",{className:"fr-actions",onClick:N=>N.stopPropagation(),children:[e.jsx("button",{className:"fc-btn",onClick:()=>G(t),children:"↓ Download"}),e.jsx("button",{className:"fc-btn del",onClick:()=>C(t),children:"🗑"})]})]},t.fileId)})})]}),e.jsx(or,{file:y,onClose:()=>n(null),onDelete:()=>C(y),onDownload:G}),s.size>0&&e.jsxs("div",{className:"bulk-bar",children:[e.jsxs("div",{className:"bulk-count",children:[s.size," FILE",s.size>1?"S":""," SELECTED"]}),e.jsxs("div",{className:"bulk-actions",children:[e.jsx("button",{className:"fc-btn",style:{borderColor:"rgba(255,255,255,0.2)",color:"#e8ecf4"},onClick:()=>p(new Set),children:"Cancel"}),e.jsx("button",{className:"fc-btn",style:{background:"rgba(59,130,246,0.15)",borderColor:"rgba(59,130,246,0.3)",color:"#93c5fd"},onClick:Ne,children:"↓ Download"}),e.jsx("button",{className:"fc-btn del",style:{background:"rgba(239,68,68,0.15)",borderColor:"rgba(239,68,68,0.3)",color:"#fca5a5"},onClick:J,children:"🗑 Delete"})]})]}),w&&e.jsxs("div",{className:"toast",children:[e.jsx("span",{children:w.type==="error"?"❌":w.type==="info"?"ℹ️":"✅"}),w.msg]})]})}function nr(){return e.jsx(tr,{children:e.jsx(sr,{})})}function ir(){const{tokens:r}=R(),[o,i]=c.useState([]),[a,l]=c.useState(""),[d,m]=c.useState(!1),[v,b]=c.useState(null),[h,g]=c.useState(null);c.useEffect(()=>{W(r==null?void 0:r.accessToken).then(n=>{var s;return i(((s=n.files)==null?void 0:s.filter(p=>S(p.fileName)==="zip"))||[])}).catch(()=>{})},[r]);const f=(n,s="success")=>{g({msg:n,type:s}),setTimeout(()=>g(null),4e3)},y=async()=>{var n;if(!a){f("Please select a zip file.","error");return}m(!0),b(null);try{const s=await Ke(a,r==null?void 0:r.accessToken);b(s.extractedFiles||[]),f(`✓ Extracted ${((n=s.extractedFiles)==null?void 0:n.length)||0} files successfully!`)}catch(s){f("Unzip failed: "+s.message,"error")}finally{m(!1)}};return e.jsxs(A,{children:[e.jsx("style",{children:`
        .convert-title { font-family: 'Bebas Neue', sans-serif; font-size: 2rem; color: #fff; letter-spacing: 0.03em; margin-bottom: 0.3rem; }
        .convert-sub { font-size: 0.875rem; color: #5a6a80; margin-bottom: 2rem; }

        .convert-card { background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.08); border-radius: 18px; padding: 2rem; margin-bottom: 1.5rem; }
        .convert-card-title { font-size: 0.68rem; text-transform: uppercase; letter-spacing: 0.1em; color: #445566; font-family: 'DM Mono', monospace; margin-bottom: 1.25rem; }

        .file-select-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(150px, 1fr)); gap: 0.6rem; max-height: 260px; overflow-y: auto; padding-right: 4px; }
        .file-opt {
          border: 1px solid rgba(255,255,255,0.07); border-radius: 10px; padding: 0.85rem;
          cursor: pointer; transition: all 0.15s; background: rgba(255,255,255,0.02);
          text-align: center;
        }
        .file-opt:hover { background: rgba(255,255,255,0.05); border-color: rgba(255,255,255,0.15); }
        .file-opt.selected { background: rgba(139,92,246,0.1); border-color: rgba(139,92,246,0.35); }
        .fo-icon { font-size: 1.4rem; margin-bottom: 0.4rem; display: block; }
        .fo-name { font-size: 0.72rem; font-weight: 600; color: #c8d6f0; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
        .fo-size { font-size: 0.65rem; color: #445566; margin-top: 2px; }

        .btn-convert { padding: 0.85rem 2.5rem; background: linear-gradient(135deg, #8b5cf6, #6366f1); border: none; border-radius: 10px; color: #fff; font-family: inherit; font-size: 1rem; font-weight: 700; cursor: pointer; box-shadow: 0 4px 20px rgba(139,92,246,0.35); transition: all 0.2s; display: flex; align-items: center; gap: 10px; }
        .btn-convert:hover:not(:disabled) { transform: translateY(-2px); box-shadow: 0 6px 30px rgba(139,92,246,0.5); }
        .btn-convert:disabled { opacity: 0.6; cursor: not-allowed; }
        .spinner { width: 16px; height: 16px; border: 2px solid rgba(255,255,255,0.3); border-top-color: #fff; border-radius: 50%; animation: spin 0.7s linear infinite; }
        @keyframes spin { to { transform: rotate(360deg); } }

        .result-card { background: rgba(34,197,94,0.05); border: 1px solid rgba(34,197,94,0.2); border-radius: 14px; padding: 1.5rem; margin-bottom: 1.5rem; }
        .result-header { display: flex; align-items: center; gap: 10px; margin-bottom: 1.25rem; }
        .result-icon { font-size: 1.5rem; }
        .result-label { font-size: 0.75rem; text-transform: uppercase; letter-spacing: 0.1em; color: #22c55e; font-family: 'DM Mono', monospace; font-weight: 600; }
        
        .extracted-list { display: flex; flex-direction: column; gap: 8px; }
        .extracted-item { display: flex; align-items: center; gap: 10px; background: rgba(255,255,255,0.03); padding: 8px 12px; border-radius: 8px; font-size: 0.85rem; color: #e8ecf4; }
        
        .toast { position: fixed; bottom: 2rem; right: 2rem; z-index: 200; background: #0d1117; border: 1px solid rgba(255,255,255,0.1); border-radius: 10px; padding: 0.75rem 1.25rem; font-size: 0.85rem; color: #e8ecf4; box-shadow: 0 8px 30px rgba(0,0,0,0.5); display: flex; align-items: center; gap: 8px; animation: slideUp 0.3s ease; }
        @keyframes slideUp { from { transform: translateY(20px); opacity: 0; } to { transform: translateY(0); opacity: 1; } }
      `}),e.jsx("div",{className:"convert-title",children:"EXTRACT ARCHIVES"}),e.jsx("div",{className:"convert-sub",children:"Unzip your compressed files directly in the cloud"}),e.jsxs("div",{className:"convert-card",children:[e.jsx("div",{className:"convert-card-title",children:"// step 01 — select zip file"}),o.length===0?e.jsxs("div",{style:{color:"#445566",fontSize:"0.85rem"},children:["No zip files uploaded yet."," ",e.jsx("a",{href:"/upload",style:{color:"#8b5cf6"},children:"Upload a .zip file first →"})]}):e.jsx("div",{className:"file-select-grid",children:o.map(n=>{const s=S(n.fileName),p=L(s);return e.jsxs("div",{className:`file-opt${a===n.fileId?" selected":""}`,onClick:()=>{l(n.fileId),b(null)},children:[e.jsx("span",{className:"fo-icon",children:p.icon}),e.jsx("div",{className:"fo-name",title:n.fileName,children:n.fileName}),e.jsx("div",{className:"fo-size",children:I(n.fileSize)})]},n.fileId)})})]}),v&&!d&&e.jsxs("div",{className:"result-card",children:[e.jsxs("div",{className:"result-header",children:[e.jsx("span",{className:"result-icon",children:"✅"}),e.jsxs("div",{children:[e.jsx("div",{className:"result-label",children:"Extraction Complete"}),e.jsxs("div",{style:{fontSize:"0.85rem",color:"#86efac"},children:[v.length," files extracted successfully and saved to your files!"]})]})]}),e.jsx("div",{className:"extracted-list",children:v.map(n=>e.jsxs("div",{className:"extracted-item",children:[e.jsx("span",{style:{fontSize:"1.2rem"},children:L(S(n.fileName)).icon}),e.jsx("span",{style:{flex:1,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"},children:n.fileName}),e.jsx("span",{style:{color:"#5a6a80",fontSize:"0.75rem"},children:I(n.fileSize)})]},n.fileId))}),e.jsx("button",{style:{marginTop:"1rem",padding:"0.65rem 1.25rem",background:"rgba(255,255,255,0.04)",border:"1px solid rgba(255,255,255,0.08)",borderRadius:"8px",color:"#c8d6f0",fontSize:"0.85rem",cursor:"pointer"},onClick:()=>{b(null),l("")},children:"Extract another"})]}),e.jsx("button",{className:"btn-convert",onClick:y,disabled:d||!a||v,children:d?e.jsxs(e.Fragment,{children:[e.jsx("span",{className:"spinner"})," Extracting..."]}):"📦 Extract Files"}),h&&e.jsxs("div",{className:"toast",children:[h.type==="error"?"❌":"✅"," ",h.msg]})]})}function O({children:r}){const{user:o,loading:i}=R();return i?e.jsx("div",{className:"app-loading",children:e.jsx("div",{className:"spinner-ring"})}):o?r:e.jsx(Ee,{to:"/login"})}function lr(){return e.jsx($e,{children:e.jsx(Ie,{children:e.jsxs(Re,{children:[e.jsx(E,{path:"/",element:e.jsx(We,{})}),e.jsx(E,{path:"/login",element:e.jsx(_e,{})}),e.jsx(E,{path:"/signup",element:e.jsx(Ye,{})}),e.jsx(E,{path:"/dashboard",element:e.jsx(O,{children:e.jsx(Ze,{})})}),e.jsx(E,{path:"/upload",element:e.jsx(O,{children:e.jsx(er,{})})}),e.jsx(E,{path:"/convert",element:e.jsx(O,{children:e.jsx(rr,{})})}),e.jsx(E,{path:"/compress",element:e.jsx(O,{children:e.jsx(ar,{})})}),e.jsx(E,{path:"/unzip",element:e.jsx(O,{children:e.jsx(ir,{})})}),e.jsx(E,{path:"/files",element:e.jsx(O,{children:e.jsx(nr,{})})})]})})})}re.createRoot(document.getElementById("root")).render(e.jsx(ve.StrictMode,{children:e.jsx(lr,{})}));
