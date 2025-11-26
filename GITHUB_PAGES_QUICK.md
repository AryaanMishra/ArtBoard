# 🚀 GitHub Pages: 3-Step Quick Start

## SUPER QUICK: Do This Now

### Step 1: Settings (2 min)
```
GitHub Repo → Settings → Pages → Source: GitHub Actions
Settings → Actions → General → Permissions: Read and write
```

### Step 2: Push (1 min)
```bash
git add .
git commit -m "Deploy to GitHub Pages"
git push origin main
```

### Step 3: Wait & Visit (2-3 min)
```
🟡 Watch: https://github.com/AryaanMishra/ArtBoard/actions
🟢 When green: https://AryaanMishra.github.io/ArtBoard
```

**Done! Your site is live.** 🎉

---

## If Something Doesn't Work

| Problem | Fix |
|---------|-----|
| Workflow not running | Push a new commit |
| Build error | Check Actions → build job logs |
| Site blank/404 | Refresh hard (Ctrl+Shift+R) or wait 2 min |
| Can't draw | Need to deploy backend (see DEPLOYMENT.md) |

---

## Files Already Set Up For You

✅ `.github/workflows/deploy-frontend.yml` - Auto builds & deploys
✅ `frontend/vite.config.ts` - Base path: `/ArtBoard/`
✅ `frontend/package.json` - Build script ready

**Everything is pre-configured. Just push!**

---

## After First Deploy

Every time you `git push`:
1. Workflow automatically runs (~2-3 min)
2. Frontend builds with Vite
3. Uploads to GitHub Pages
4. Site updates automatically

No manual deploys needed!

---

## Full Guide

See `GITHUB_PAGES_SETUP.md` for detailed instructions including backend setup.

See `GITHUB_PAGES_CHECKLIST.md` for step-by-step checklist.
