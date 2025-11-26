# ✅ GitHub Pages Setup Checklist

Quick checklist to deploy ArtBoard frontend to GitHub Pages.

## Pre-Flight Checks

- [ ] Repository pushed to GitHub
- [ ] You have Admin/Write access to the repo
- [ ] Node.js 18+ installed locally

## Step 1: Repository Settings (5 minutes)

- [ ] Go to: `https://github.com/AryaanMishra/ArtBoard`
- [ ] Click **Settings** (top right)
- [ ] Click **Pages** (left sidebar under "Code and automation")
- [ ] Under "Build and deployment":
  - [ ] Source: Select **GitHub Actions**
- [ ] Scroll to "Actions":
  - [ ] Click **General**
  - [ ] Set "Workflow permissions": **Read and write permissions**
  - [ ] Check: "Allow GitHub Actions to create and approve pull requests"
  - [ ] Click **Save**

**✅ GitHub Pages Enabled!**

## Step 2: Backend Configuration (depends on backend choice)

### If using Railway backend:
- [ ] Deploy backend to Railway (see DEPLOYMENT.md)
- [ ] Get Railway backend URL (e.g., `https://artboard-backend.railway.app`)
- [ ] In GitHub repo Settings:
  - [ ] Go to **Secrets and variables** → **Actions**
  - [ ] Click **New repository secret**
  - [ ] Name: `VITE_SOCKET_URL`
  - [ ] Value: `https://your-railway-url` (no trailing slash)
  - [ ] Click **Add secret**

### If using Render backend:
- [ ] Deploy backend to Render (see DEPLOYMENT.md)
- [ ] Get Render backend URL
- [ ] Follow same secret setup as Railway above

### If just testing locally:
- [ ] Skip secrets for now
- [ ] Frontend will default to `https://artboard-backend.railway.app`

## Step 3: Push Code (2 minutes)

```bash
# Make sure you're in the ArtBoard directory
cd c:\ArtBoard

# Stage all changes
git add .

# Commit
git commit -m "Configure GitHub Pages deployment"

# Push to GitHub
git push origin main
```

**✅ Code pushed!**

## Step 4: Monitor Deployment (2-3 minutes)

1. Go to: `https://github.com/AryaanMishra/ArtBoard`
2. Click **Actions** tab (top)
3. See workflow: "Deploy Frontend to GitHub Pages"
4. Watch status:
   - 🟡 Yellow = Building
   - 🟢 Green = Success!
   - 🔴 Red = Error (click to see logs)

**Workflow takes ~2-3 minutes**

## Step 5: Access Your Site (1 minute)

Once green ✅:

1. Click the completed workflow
2. Scroll to bottom → "View deployment" button
3. Or manually visit:
   ```
   https://AryaanMishra.github.io/ArtBoard
   ```

**🎉 Your site is live!**

## Step 6: Test Connection

1. Open your site
2. Enter username and Room ID
3. If blank or errors → check browser console (F12)
4. If "Cannot connect to server":
   - Backend not deployed yet, OR
   - `VITE_SOCKET_URL` secret not set

## Troubleshooting Quick Links

| Issue | Solution |
|-------|----------|
| Workflow not running | Check Actions tab, push new commit |
| Build failing | Click workflow → build → view logs |
| Site shows blank | Check browser console (F12) for errors |
| Can't draw/sync | Backend URL not configured |
| 404 errors | Check path is `/ArtBoard/` |

## Automatic Deploys

After first successful deploy:
- **Automatic redeploy on every push to main**
- Takes ~2-3 minutes
- Watch Actions tab for status

## Files Already Configured

These files are already set up for GitHub Pages:

- ✅ `.github/workflows/deploy-frontend.yml` - Workflow file
- ✅ `frontend/vite.config.ts` - Base path configured
- ✅ `frontend/package.json` - Build scripts

**Nothing else to configure!**

## Quick Commands

```bash
# Check git status
git status

# Commit and push
git add .
git commit -m "Your message"
git push origin main

# View Actions
# https://github.com/AryaanMishra/ArtBoard/actions

# View Pages settings
# https://github.com/AryaanMishra/ArtBoard/settings/pages
```

## Done? ✨

Your frontend is now:
- ✅ Automatically deployed on every push
- ✅ Available at GitHub Pages
- ✅ Using continuous deployment

Next: Deploy backend to Railway/Render (see DEPLOYMENT.md)

---

**Questions?** See `GITHUB_PAGES_SETUP.md` for detailed guide.
