# ArtBoard - Collaborative Pixel Art

This workspace contains both frontend and backend for the ArtBoard collaborative pixel art editor.

## Quick Start

### Install all dependencies
```bash
npm install
```

### Run both dev servers
```bash
npm run dev:all
```

Or run separately:

**Backend:**
```bash
cd backend && npm run dev
```

**Frontend:**
```bash
cd frontend && npm run dev
```

## Deployment

### Frontend
- Hosted on Vercel or GitHub Pages
- Automatic deployment on `frontend/` changes

### Backend
- Deploy to Railway, Render, or Heroku
- Environment: `PORT=3001`, `CLIENT_URL=<frontend-url>`

## Project Structure
- `/frontend` - React pixel art editor (Vite)
- `/backend` - Node.js WebSocket server (Express)
- `/.github/workflows` - CI/CD configurations

See individual README files for more details.
