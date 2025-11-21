# ⚡ Quick Reference & FAQ

## Quick Start (3 Steps)

### Windows
```batch
# Terminal 1
cd backend
npm run dev

# Terminal 2  
cd frontend
npm run dev
```

Or use the one-liner:
```batch
start.bat
```

### macOS/Linux
```bash
./start.sh
```

Then open: **http://localhost:3000**

---

## Testing Checklist

- [ ] Frontend loads at http://localhost:3000
- [ ] Can enter username and room ID
- [ ] Canvas appears with white background
- [ ] Toolbar shows color picker and tools
- [ ] Drawing pixels works (click canvas)
- [ ] Color picker changes brush color
- [ ] Can see "Users (1)" in right panel
- [ ] Open in another browser tab
- [ ] Second user joins same room
- [ ] Drawing in one tab shows in other (real-time!)
- [ ] Can see both users in UserPanel
- [ ] Can download as PNG

---

## Common Issues & Solutions

### ❌ WebSocket Connection Refused
```
Error: connect ECONNREFUSED 127.0.0.1:3001
```

**Solution:**
1. Check backend is running (`npm run dev` in `backend/`)
2. Check port 3001 is free: `netstat -an | grep 3001`
3. Restart backend server

### ❌ Canvas Not Syncing Between Tabs
```
Draw in tab 1, nothing appears in tab 2
```

**Solution:**
1. Check browser console for errors (F12)
2. Both tabs must be in same room (case-sensitive)
3. Check WebSocket connection status in Network tab
4. Verify `VITE_SOCKET_URL` is correct

### ❌ Cannot Find Module 'react'
```
Cannot find module 'react' or its corresponding type declarations.
```

**Solution:**
1. Run `npm install` in `frontend/` folder
2. Restart VS Code
3. Clear node_modules and reinstall:
   ```bash
   rm -rf node_modules package-lock.json
   npm install
   ```

### ❌ Port Already in Use
```
Error: listen EADDRINUSE: address already in use :::3000
```

**Solution:**
```bash
# Find process using port 3000
lsof -i :3000

# Kill it
kill -9 <PID>

# Or use different port
PORT=3002 npm run dev
```

### ❌ Deployed Frontend Can't Connect to Backend
```
WebSocket connection to 'ws://...' failed
```

**Solution:**
1. Check `CLIENT_URL` env var on backend matches frontend domain
2. Ensure backend is actually running
3. Check CORS configuration in backend `server.js`
4. Use `wss://` (secure WebSocket) for HTTPS deployments

---

## Keyboard Shortcuts (Future)

```
Ctrl+Z     Undo
Ctrl+Y     Redo
Ctrl+S     Save (to server)
B          Brush tool
E          Eraser tool
P          Color Picker
F          Fill Bucket
L          Line tool
R          Rectangle tool
C          Clear canvas
```

Currently not implemented - see `ARCHITECTURE.md` for roadmap.

---

## Room ID Best Practices

✅ Good Room IDs:
- `PIXELART123`
- `game-dev-team`
- `pixel-art-2024`
- `friends-draw`

❌ Bad Room IDs:
- Single letters (too easy to collide)
- Spaces (not supported)
- Special characters (issues with URLs)

**Tip:** Use alphanumeric + hyphens, 6-20 characters

---

## Performance Tips

### For Smooth Drawing
1. Use smaller brush strokes (pixels = 1)
2. Keep canvas size reasonable (≤64x64)
3. Avoid too many users (testing limit: ~50)

### For Better Collaboration
1. Assign different areas to different users
2. Use clear, different colors per person
3. Communicate via another tool (Discord, etc.)

### Debugging Performance
Open browser DevTools (F12):
1. **Network** tab: Check WebSocket messages frequency
2. **Performance** tab: Record and check frame rate
3. **Console** tab: Look for errors/warnings

---

## File Organization

### What to Commit to Git
```
✅ All .tsx, .ts, .css, .json, .md files
✅ .github/ workflows
✅ backend/, frontend/ directories
❌ node_modules/ (use .gitignore)
❌ dist/ (regenerated on build)
❌ .env (use .env.example)
```

### Environment Variables

**Frontend** (`.env.local`):
```
VITE_SOCKET_URL=http://localhost:3001
```

**Backend** (`.env`):
```
PORT=3001
CLIENT_URL=http://localhost:3000
NODE_ENV=development
```

---

## Useful Commands

```bash
# Install all dependencies
npm install

# Start both servers (from root)
npm run dev

# Start just backend
cd backend && npm run dev

# Start just frontend
cd frontend && npm run dev

# Build for production
cd frontend && npm run build

# Preview production build
cd frontend && npm run preview

# Check for TypeScript errors
cd frontend && npx tsc --noEmit

# Check for unused imports
cd frontend && npx eslint src/
```

---

## Support & Resources

### Debugging Tools
- **VS Code** - Set breakpoints in client code
- **DevTools** - F12 in browser
- **Network Monitor** - See WebSocket messages
- **Console.log** - Add to `App.tsx`

### Learning Resources
- Socket.io Docs: https://socket.io/docs/
- React Hooks: https://react.dev/
- Canvas API: https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API
- Zustand: https://github.com/pmndrs/zustand

### Getting Help
1. Check browser console (F12 > Console tab)
2. Check backend logs in terminal
3. Look at `.github/workflows/` for CI/CD examples
4. Read `ARCHITECTURE.md` for system design

---

## FAQ

**Q: Can I save my artwork?**  
A: Yes! Download button exports as PNG. Persistent storage coming soon.

**Q: How many people can collaborate?**  
A: Tested with ~50 users per room. Performance degrades with more.

**Q: Do I need a database?**  
A: Not currently - state is in-memory. Data lost on server restart. Add one for production.

**Q: Can I change canvas size?**  
A: Yes, modify `width/height` when joining room in `App.tsx`.

**Q: How do I deploy for free?**  
A: See `DEPLOYMENT.md` - Vercel (frontend) + Railway (backend).

**Q: Can I add more tools?**  
A: Yes! Add to `activeTool` type in `store.ts` and implement in `App.tsx`.

**Q: Is it mobile-friendly?**  
A: Not yet. UI needs touch optimization. Coming in future release.

---

**Need help?** Create an issue on GitHub or check the docs!

🎨 Happy collaborating!
