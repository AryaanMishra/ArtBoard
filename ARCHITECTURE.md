# 🎯 Architecture & Features

## System Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                        Browser (React)                       │
│  ┌───────────────────────────────────────────────────────┐  │
│  │  Canvas Renderer     Toolbar    UserPanel             │  │
│  │  (Pixel Drawing)     (Tools)    (Active Users)        │  │
│  └─────────────┬────────────────────────────────────────┘  │
│                │ (WebSocket - Socket.io)                    │
│                │ Real-time pixel updates                    │
│                │ User presence sync                         │
└────────────────┼─────────────────────────────────────────────┘
                 │
        ┌────────▼────────┐
        │  Express Server  │
        │  Socket.io Hub   │
        │  (Node.js)       │
        │                  │
        │  Room Manager    │
        │  State Store     │
        │  Pixel Registry  │
        └──────────────────┘
                 │
                 ▼
        ┌────────────────┐
        │  In-Memory DB  │
        │  (Room Data)   │
        │  • Pixels      │
        │  • Users       │
        │  • History     │
        └────────────────┘
```

## Real-time Synchronization Flow

1. **User Draws Pixel**
   - Local canvas updates immediately (low latency)
   - Emit `draw-pixel` to server

2. **Server Receives**
   - Store pixel in room's state
   - Broadcast to all users in room (except sender)

3. **Other Users Receive**
   - Update their local pixel map
   - Redraw canvas with new pixel

4. **Batch Updates** (Performance Optimization)
   - Multiple pixels queued in 50ms batches
   - Reduces network traffic for brush strokes
   - Event: `draw-pixels` (array of pixels)

## Features

### ✨ Implemented Features

- **Pixel Art Tools**
  - 🖌️ Brush (with batching)
  - 🗑️ Eraser
  - 🎨 Color Picker (Eyedropper)
  - 🪣 Fill Bucket (Flood Fill with BFS)
  - ↶ Undo/Redo (per-user)
  - ⬇️ PNG Export

- **Real-time Collaboration**
  - WebSocket rooms (unique Room IDs)
  - Active user list with cursors
  - See what tool each user has selected
  - See what color each user is using
  - Multiple color indicators per user

- **User Interface**
  - Dark .io game aesthetic
  - Responsive canvas with grid
  - Pixel-perfect rendering
  - Color picker
  - Tool selection buttons
  - Download button

- **State Management**
  - Zustand for React state
  - Centralized pixel storage
  - User presence tracking
  - Tool & color sync

### 🔄 WebSocket Events

**Client → Server:**
```javascript
'join-room'          // { roomId, username, width, height }
'draw-pixel'         // { x, y, color, timestamp }
'draw-pixels'        // { pixels: [...], timestamp }
'cursor-move'        // { x, y }
'update-user-state'  // { activeColor, activeLayer, activeTool }
'clear-canvas'       // (no payload)
'undo'               // (no payload)
```

**Server → Client:**
```javascript
'room-state'         // Initial sync
'pixel-drawn'        // Single pixel update
'pixels-drawn'       // Batch pixels
'user-joined'        // New user notification
'user-left'          // User disconnection
'cursor-moved'       // Remote cursor position
'user-state-updated' // Remote user tool/color change
'canvas-cleared'     // Canvas clear notification
'canvas-updated'     // Full canvas refresh (for undo)
```

### 🔮 Future Features (In Development Order)

1. **Layers System**
   - Multiple drawing layers per canvas
   - Show/hide layers
   - Lock layers
   - Merge layers

2. **Advanced Drawing Tools**
   - Line tool (Bresenham's algorithm)
   - Rectangle tool
   - Ellipse tool
   - Polygon tool

3. **Undo/Redo Collaboration**
   - Operational Transformation (OT) for conflict resolution
   - Shared undo history
   - User attribution for each action

4. **Animation Timeline**
   - Frame-based animation editor
   - Onion skin preview
   - Frame playback

5. **Persistence**
   - Save to database (MongoDB/PostgreSQL)
   - Auto-save every 30 seconds
   - Load previous versions
   - Export timeline as GIF

6. **User Accounts**
   - GitHub/Google OAuth
   - Save personal projects
   - Share projects with links
   - Collaborative permissions

7. **Performance Enhancements**
   - Compress pixel data (only store deltas)
   - Lazy loading for large canvases
   - WebGL rendering for 64K+ pixels
   - Indexed spatial partitioning

8. **Mobile Support**
   - Touch-friendly UI
   - Responsive toolbar
   - Touch gestures (pinch, swipe)

## Performance Characteristics

| Metric | Value | Notes |
|--------|-------|-------|
| Canvas Size | 32x32 pixels | Configurable, tested up to 256x256 |
| Max Users | ~50 per room | Limited by WebSocket server |
| Pixel Update Latency | <50ms | Local, <200ms network |
| Memory per Room | ~10KB | For 32x32 canvas with 1000 pixels |
| Batch Window | 50ms | Configurable in App.tsx |

## Code Structure

```
frontend/
├── src/
│   ├── components/
│   │   ├── Canvas.tsx          # Canvas drawing & rendering
│   │   ├── Canvas.module.css   # Canvas styles
│   │   ├── Toolbar.tsx         # Tool selection & color picker
│   │   ├── Toolbar.module.css  # Toolbar styles
│   │   ├── UserPanel.tsx       # Active users display
│   │   └── UserPanel.module.css
│   ├── App.tsx                 # Main app, WebSocket logic
│   ├── App.css                 # App layout styles
│   ├── store.ts                # Zustand state management
│   ├── index.css               # Global styles
│   └── main.tsx                # React entry point
├── index.html
├── vite.config.ts
├── tsconfig.json
└── package.json

backend/
├── server.js                   # Express + Socket.io server
├── package.json
├── .env.example
└── .gitignore
```

## Key Technologies

### Frontend Stack
- **React 18** - UI framework
- **TypeScript** - Type safety
- **Canvas API** - Pixel rendering
- **Zustand** - State management (lightweight alternative to Redux)
- **Socket.io Client** - Real-time WebSocket
- **Vite** - Build tool (super fast)
- **CSS Modules** - Scoped styling

### Backend Stack
- **Node.js** - JavaScript runtime
- **Express** - HTTP server
- **Socket.io** - WebSocket library with fallbacks
- **CORS** - Cross-origin resource sharing
- **Dotenv** - Environment variables

### Why These Choices?

1. **React** - Standard, great community, perfect for SPAs
2. **Canvas API** - Direct pixel manipulation, best performance
3. **Zustand** - Simple state management without complexity of Redux
4. **Socket.io** - Better than raw WebSockets, handles reconnection
5. **Vite** - 10x faster builds than Create React App
6. **Express** - Minimal, perfect for small APIs

## Scaling Considerations

### Current Limitations
- In-memory storage (rooms lost on server restart)
- No persistence layer
- Single server instance

### Future Scaling
1. **Horizontal Scaling**
   - Use Redis for room state sharing
   - Load balancer (nginx/HAProxy)
   - Socket.io adapter for Redis

2. **Database**
   - MongoDB for room history
   - PostgreSQL for user accounts
   - Time-series DB for animation frames

3. **Optimization**
   - Room state compression
   - Delta sync (send only changes)
   - Quadtree spatial partitioning

## Security Considerations

### Current Implementation
- Basic CORS support
- No authentication (any user can join)
- No input validation

### Recommendations for Production
1. Validate all incoming socket events
2. Add rate limiting
3. Implement user authentication
4. Validate room IDs and usernames
5. Add IP whitelisting for API endpoints
6. Use HTTPS/WSS only

---

Made with ❤️ for collaborative pixel artists
