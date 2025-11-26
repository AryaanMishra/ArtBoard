# 🚀 Deployment Guide - ArtBoard

This guide covers free hosting options for both frontend and backend.

## Overview

**Frontend:** Static React SPA → Vercel / GitHub Pages
**Backend:** Node.js Server → Railway / Render (Free Tier)

## Option 1: GitHub Pages + Railway (Recommended)

### Frontend: Deploy to GitHub Pages

**See complete guide: `GITHUB_PAGES_SETUP.md`**

Quick steps:
1. Go to repo **Settings** → **Pages**
2. Set Source: `GitHub Actions`
3. Set Actions permissions: `Read and write`
4. Push to main branch
5. Workflow automatically builds and deploys
6. Site available at: `https://YourUsername.github.io/ArtBoard`

The workflow is already configured in `.github/workflows/deploy-frontend.yml`

### Backend: Deploy to Railway

1. **Create Railway Account:**
   - Sign up at [railway.app](https://railway.app)
   - Link GitHub account

2. **Create New Service:**
   - Select "Deploy from GitHub repo"
   - Choose your artboard repository
   - Set root directory: `backend`

3. **Set Environment Variables:**
   - In Railway Dashboard → Variables:
   ```
   PORT=3001
   NODE_ENV=production
   CLIENT_URL=https://yourusername.github.io/artboard
   ```

4. **Deploy:**
   - Railway will auto-deploy on push to main

5. **Get Backend URL:**
   - Railway provides: `https://xxx-production.railway.app`
   - Update frontend `App.tsx`:
   ```typescript
   const serverUrl = import.meta.env.VITE_SOCKET_URL || 
     'https://xxx-production.railway.app';
   ```

---

## Option 2: Vercel + Render

### Frontend: Deploy to Vercel

1. **Connect to Vercel:**
   - Go to [vercel.com](https://vercel.com)
   - Import GitHub repo
   - Framework: Vite
   - Root Directory: `frontend`

2. **Environment Variables:**
   ```
   VITE_SOCKET_URL=https://artboard-backend.onrender.com
   ```

3. **Deploy:** Automatic on push

### Backend: Deploy to Render

1. **Create Account:** [render.com](https://render.com)

2. **Create New Web Service:**
   - Connect GitHub repo
   - Root Directory: `backend`
   - Build Command: `npm install`
   - Start Command: `npm start`

3. **Environment Variables:**
   ```
   PORT=3001
   CLIENT_URL=https://artboard-xxxx.vercel.app
   ```

4. **Deploy:** Auto-deployed

---

## Option 3: Full-Stack on Heroku (Requires Free Tier Credit)

```bash
# Create Heroku app
heroku create artboard-backend

# Set environment variables
heroku config:set PORT=3001
heroku config:set CLIENT_URL=https://yourusername.github.io/artboard

# Deploy
git subtree push --prefix backend heroku main
```

---

## Troubleshooting

### WebSocket Connection Errors
- **Issue:** CORS error connecting to backend
- **Solution:** Ensure `CLIENT_URL` matches exactly with frontend domain
  ```javascript
  // backend/.env
  CLIENT_URL=https://yourusername.github.io/artboard  // must match!
  ```

### Cannot Deploy Backend
- **Check:** Log into Railway/Render and view build logs
- **Common issue:** Missing environment variables

### Canvas Not Syncing
- **Check:** Browser console for WebSocket errors
- **Check:** Backend server is running (`npm start`)
- **Check:** Frontend is pointing to correct backend URL

---

## Monitoring & Maintenance

### Railway/Render Logs
```bash
# Railway
railway logs

# Render (via dashboard)
# Settings → Logs
```

### Free Tier Limits
- **Vercel:** 100GB bandwidth/month
- **Railway:** $5 credit/month (usually sufficient)
- **Render:** Auto-pauses after 15 minutes of inactivity

---

## Upgrading to Paid Hosting

When traffic grows:

1. **Frontend:**
   - Netlify, Cloudflare Pages (both free with paid options)
   - AWS Amplify

2. **Backend:**
   - Railway: $5/month minimum
   - Render: Start at $7/month
   - DigitalOcean: $5/month (App Platform)
   - AWS Lambda: Pay-per-use

---

## Next Steps

1. Push code to GitHub
2. Set up GitHub Pages or Vercel
3. Deploy backend to Railway or Render
4. Test WebSocket connection
5. Share your Room ID with friends!

Happy deploying! 🚀
