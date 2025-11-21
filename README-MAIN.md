# 🎨 ArtBoard - Real-time Collaborative Pixel Art

A web-based collaborative pixel art editor inspired by .io games. Multiple users can work together on the same canvas in real-time with synchronized updates.

## ✨ Features

**Rich Pixel Art Tools**
- 🖌️ Brush & Eraser
- 🎨 Color Picker (Eyedropper)
- 🪣 Fill Bucket (Flood Fill)
- 📏 Drawing tools (Line, Rectangle)
- ↶ Undo/Redo
- ⬇️ Download as PNG

**Real-time Collaboration**
- WebSocket-based synchronization
- See other users' cursors and active tools
- Batch pixel updates for performance
- Multiple rooms for different projects

**Game-inspired UI**
- Clean, dark .io game aesthetic
- User presence panel showing active collaborators
- Responsive canvas with pixel-perfect rendering

## 🚀 Tech Stack

**Frontend:**
- React 18 + TypeScript
- Canvas API for pixel drawing
- Zustand for state management
- Vite for development & bundling

**Backend:**
- Node.js + Express
- Socket.io for WebSocket communication

## 🎮 Getting Started

### Prerequisites
- Node.js 16+ 
- npm or yarn

### Installation

```bash
# Clone repository
git clone <your-repo>
cd ArtBoard

# Install all dependencies
npm install

# Run both servers
npm run dev
```

Or run separately:
```bash
cd backend && npm run dev
cd frontend && npm run dev
```

Visit `http://localhost:3000` and start drawing!

## 📖 Usage

1. **Enter your username** and create/join a room ID
2. **Share the room ID** with friends to collaborate
3. **Select tools** and colors from the toolbar
4. **Draw on the canvas** - changes sync in real-time
5. **See active users** in the right panel
6. **Download** your artwork as PNG

## 🌐 Free Deployment

### Frontend (GitHub Pages or Vercel)
```bash
cd frontend
npm run build
# Push to GitHub and enable Pages, or connect to Vercel
```

### Backend (Railway or Render - Free Tier)
1. Push code to GitHub
2. Connect repo to [Railway.app](https://railway.app) or [Render.com](https://render.com)
3. Set environment variables:
   - `PORT=3001`
   - `CLIENT_URL=https://your-frontend-domain.com`

Both Railway and Render offer free tiers perfect for hobby projects!

## 📁 Project Structure

```
ArtBoard/
├── frontend/                    # React pixel editor
│   ├── src/
│   │   ├── components/         # Canvas, Toolbar, UserPanel
│   │   ├── App.tsx             # Main app & WebSocket logic
│   │   ├── store.ts            # Zustand state
│   │   └── index.css           # Styles
│   ├── package.json
│   └── vite.config.ts
├── backend/                     # Node.js server
│   ├── server.js               # Express + Socket.io
│   └── package.json
└── README.md
```

## 🎯 How Collaboration Works

1. **User joins room** → Server broadcasts to all users
2. **User draws pixel** → Sent to server via WebSocket
3. **Server forwards** to all users in that room
4. **Pixel updates batched** (50ms) for performance
5. **New users get** the current canvas state

## 🔮 Roadmap

- [ ] Layers system
- [ ] Animation timeline
- [ ] Persistent storage (database)
- [ ] User authentication
- [ ] Private rooms with permissions
- [ ] Mobile responsive UI
- [ ] More drawing tools
- [ ] Undo/Redo collaborative conflict resolution

## 💡 Inspired By

- **Agar.io, Slither.io** - .io game UI
- **Photoshop** - Rich tool palette
- **Figma** - Real-time collaboration
- **Discord Whiteboard** - Simple, intuitive UX

## 📝 License

MIT - Feel free to use, modify, and deploy!

## 🤝 Contributing

Contributions welcome! Issues, PRs, and suggestions appreciated.

---

Made with ❤️ for pixel artists everywhere
