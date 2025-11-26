# 🚀 GitHub Pages Deployment Guide

Complete guide to deploy ArtBoard frontend to GitHub Pages with automatic builds.

## Step 1: Configure GitHub Pages

### 1.1 Enable GitHub Pages in Repository Settings

1. Go to your GitHub repository: `https://github.com/AryaanMishra/ArtBoard`
2. Click **Settings** (top right)
3. Click **Pages** (left sidebar)
4. Under "Build and deployment":
   - **Source**: Select `GitHub Actions`
5. This tells GitHub to use our workflow file

### 1.2 Verify Workflow Permissions

1. In Settings, go to **Actions** → **General**
2. Under "Workflow permissions":
   - Select: `Read and write permissions`
   - Check: `Allow GitHub Actions to create and approve pull requests`
3. Click **Save**

## Step 2: Backend Configuration (Important!)

### 2.1 Set Backend URL Secret (for production)

The frontend needs to know where the backend server is. You have options:

**Option A: Use Railway Backend (Recommended)**
1. Deploy backend to Railway (see DEPLOYMENT.md)
2. Get your Railway backend URL (e.g., `https://artboard-backend.railway.app`)
3. In GitHub: Settings → **Secrets and variables** → **Actions**
4. Click **New repository secret**
5. Name: `VITE_SOCKET_URL`
6. Value: `https://your-railway-backend-url` (without trailing slash)
7. Click **Add secret**

**Option B: Use GitHub Codespaces or Local Backend**
- For development: Backend runs on `http://localhost:3001`
- Automatically used in dev mode
- Production will use `https://artboard-backend.railway.app` (default)

## Step 3: Push to GitHub

```bash
git add .
git commit -m "Configure GitHub Pages deployment"
git push origin main
```

## Step 4: Monitor Deployment

### 4.1 Watch the Workflow Run

1. Go to your GitHub repo
2. Click **Actions** tab (top)
3. See the workflow running:
   - "Deploy Frontend to GitHub Pages"
   - Yellow = Running
   - Green = Success ✅
   - Red = Failed ❌

### 4.2 View Build Logs (if needed)

1. Click the workflow run
2. Click **build** job
3. Expand steps to see details
4. If failed, check error messages

## Step 5: Access Your Site

Once deployment is successful:

**URL Format:**
```
https://AryaanMishra.github.io/ArtBoard
```

Or directly:
```
https://aryaanmishra.github.io/ArtBoard
```

### 5.1 First Time Setup (if not showing)

GitHub Pages can take 1-2 minutes to deploy. If not showing:
1. Wait 2 minutes
2. Hard refresh: `Ctrl+Shift+R` (or `Cmd+Shift+R` on Mac)
3. Check browser console (F12) for errors

## Step 6: Backend Setup

Your frontend needs a backend to sync pixels. Choose one:

### Option A: Railway Backend (Recommended, Free Tier)

```bash
# 1. Go to https://railway.app
# 2. Sign up with GitHub
# 3. Create new project
# 4. Deploy from GitHub repo
# 5. Set root directory: backend
# 6. Add environment variables:
PORT=3001
NODE_ENV=production
CLIENT_URL=https://AryaanMishra.github.io/ArtBoard
# 7. Deploy
```

**Then set the secret in GitHub** (Step 2.1 above)

### Option B: Render Backend (Free Tier)

```bash
# 1. Go to https://render.com
# 2. Sign up with GitHub
# 3. New → Web Service
# 4. Connect repo
# 5. Settings:
#    - Root Directory: backend
#    - Build Command: npm install
#    - Start Command: npm start
# 6. Environment:
PORT=3001
CLIENT_URL=https://AryaanMishra.github.io/ArtBoard
# 7. Deploy
```

**Then set the secret in GitHub** (Step 2.1 above)

## Workflow Triggers

The workflow runs automatically when:
- ✅ Push to `main` branch
- ✅ Changes in `frontend/` folder
- ✅ Changes to `.github/workflows/deploy-frontend.yml`

Manual trigger:
1. GitHub Actions tab
2. Select "Deploy Frontend to GitHub Pages"
3. Click **Run workflow**

## Troubleshooting

### Build Fails with "Cannot find module"

**Problem:** Dependencies not installed
```
Error: Cannot find module 'react'
```

**Solution:** Clear cache and rebuild
```bash
cd frontend
rm -rf node_modules package-lock.json
npm install
git add .
git push
```

### Site Shows Blank Page

**Problem:** Frontend can't connect to backend
- Check browser console (F12 → Console tab)
- Look for WebSocket errors

**Solution:**
1. Verify backend is deployed and running
2. Check `VITE_SOCKET_URL` secret is set correctly
3. Ensure backend `CLIENT_URL` matches your site URL

### 404 Error on Assets

**Problem:** CSS/JS files not loading
- Check if base path is correct

**Solution:**
- Verify `base: '/ArtBoard/'` in vite.config.ts
- Check URL: should be `https://AryaanMishra.github.io/ArtBoard`

### Workflow Stuck

**Problem:** Workflow running but never completes

**Solution:**
1. Cancel workflow (Actions tab → workflow → Cancel)
2. Wait 5 minutes
3. Push new commit to trigger fresh build:
```bash
git commit --allow-empty -m "Trigger rebuild"
git push
```

## File Structure for GitHub Pages

```
frontend/
├── dist/                  ← Built files (auto-generated)
│   ├── index.html
│   ├── assets/
│   │   ├── *.js
│   │   └── *.css
│   └── ...
├── src/
├── package.json
├── vite.config.ts        ← Set base: '/ArtBoard/'
└── index.html

.github/workflows/
└── deploy-frontend.yml   ← This workflow handles deployment
```

## Automatic Redeploys

Every time you push to `main`:
1. GitHub Actions automatically runs the workflow
2. Builds the frontend with Vite
3. Uploads to GitHub Pages
4. Your site updates within 1-2 minutes

## Local Development vs Production

### Local Development
```bash
npm run dev
# http://localhost:3000
# Backend: http://localhost:3001
```

### Production (GitHub Pages)
```bash
npm run build
# https://AryaanMishra.github.io/ArtBoard
# Backend: https://your-railway-backend.railway.app
```

## Environment Variables Summary

| Variable | Local | Production | How to Set |
|----------|-------|-----------|-----------|
| `VITE_SOCKET_URL` | `http://localhost:3001` | From secret | GitHub secret or hardcode in workflow |
| `VITE_BASE_PATH` | `/` | `/ArtBoard/` | In vite.config.ts |

## Next Steps

1. ✅ Enable GitHub Pages (Settings → Pages → GitHub Actions)
2. ✅ Push code to main branch
3. ✅ Watch Actions tab for build
4. ✅ Deploy backend to Railway/Render
5. ✅ Set `VITE_SOCKET_URL` secret
6. ✅ Visit your site!

## Support

- **Workflow not running?** Check GitHub Actions tab
- **Build failing?** Click workflow → build job → view logs
- **Site blank?** Check browser console for errors (F12)
- **Can't connect to backend?** Verify backend is deployed

---

**You're all set!** 🎉 Your frontend automatically deploys on every push to GitHub Pages!
