import express from 'express';
import http from 'http';
import { Server as SocketIOServer } from 'socket.io';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const server = http.createServer(app);
const io = new SocketIOServer(server, {
  cors: {
    origin: process.env.CLIENT_URL || 'http://localhost:3000',
    methods: ['GET', 'POST']
  }
});

const PORT = process.env.PORT || 3001;

// Store active rooms and their state
const rooms = new Map();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok' });
});

app.get('/api/rooms/:roomId', (req, res) => {
  const { roomId } = req.params;
  const room = rooms.get(roomId);
  if (!room) {
    return res.status(404).json({ error: 'Room not found' });
  }
  res.json({
    roomId,
    users: room.users.size,
    width: room.width,
    height: room.height
  });
});

// WebSocket events
io.on('connection', (socket) => {
  console.log(`User connected: ${socket.id}`);

  socket.on('join-room', ({ roomId, username, width = 32, height = 32 }) => {
    socket.join(roomId);
    socket.username = username;
    socket.roomId = roomId;

    // Initialize room if it doesn't exist
    if (!rooms.has(roomId)) {
      rooms.set(roomId, {
        users: new Map(),
        width,
        height,
        pixels: new Map(), // pixel data: "x,y" -> { r, g, b, a }
        history: [] // for undo/redo
      });
    }

    const room = rooms.get(roomId);
    room.users.set(socket.id, {
      username,
      cursor: { x: 0, y: 0 },
      activeColor: '#000000',
      activeLayer: 0,
      activeTool: 'brush'
    });

    // Send existing state to new user
    socket.emit('room-state', {
      width: room.width,
      height: room.height,
      pixels: Array.from(room.pixels.entries()).map(([pos, color]) => ({
        pos,
        color
      })),
      users: Array.from(room.users.entries()).map(([id, user]) => ({
        id,
        ...user
      }))
    });

    // Notify others
    io.to(roomId).emit('user-joined', {
      userId: socket.id,
      username,
      users: room.users.size
    });

    console.log(`${username} joined room: ${roomId}`);
  });

  socket.on('draw-pixel', ({ x, y, color, timestamp }) => {
    const room = rooms.get(socket.roomId);
    if (!room) return;

    const key = `${x},${y}`;
    room.pixels.set(key, color);

    // Broadcast to all users in room
    io.to(socket.roomId).emit('pixel-drawn', {
      userId: socket.id,
      x,
      y,
      color,
      timestamp
    });
  });

  socket.on('draw-pixels', ({ pixels, timestamp }) => {
    const room = rooms.get(socket.roomId);
    if (!room) return;

    // Batch pixel update
    pixels.forEach(({ x, y, color }) => {
      const key = `${x},${y}`;
      room.pixels.set(key, color);
    });

    io.to(socket.roomId).emit('pixels-drawn', {
      userId: socket.id,
      pixels,
      timestamp
    });
  });

  socket.on('cursor-move', ({ x, y }) => {
    const room = rooms.get(socket.roomId);
    if (!room || !room.users.has(socket.id)) return;

    room.users.get(socket.id).cursor = { x, y };

    socket.to(socket.roomId).emit('cursor-moved', {
      userId: socket.id,
      x,
      y
    });
  });

  socket.on('update-user-state', ({ activeColor, activeLayer, activeTool }) => {
    const room = rooms.get(socket.roomId);
    if (!room || !room.users.has(socket.id)) return;

    const user = room.users.get(socket.id);
    if (activeColor) user.activeColor = activeColor;
    if (activeLayer !== undefined) user.activeLayer = activeLayer;
    if (activeTool) user.activeTool = activeTool;

    socket.to(socket.roomId).emit('user-state-updated', {
      userId: socket.id,
      activeColor: user.activeColor,
      activeLayer: user.activeLayer,
      activeTool: user.activeTool
    });
  });

  socket.on('clear-canvas', () => {
    const room = rooms.get(socket.roomId);
    if (!room) return;

    room.pixels.clear();
    io.to(socket.roomId).emit('canvas-cleared');
  });

  socket.on('undo', () => {
    const room = rooms.get(socket.roomId);
    if (!room || room.history.length === 0) return;

    const lastAction = room.history.pop();
    // Recompute canvas state
    room.pixels.clear();
    room.history.forEach(action => {
      if (action.type === 'pixel') {
        room.pixels.set(`${action.x},${action.y}`, action.color);
      } else if (action.type === 'clear') {
        room.pixels.clear();
      }
    });

    io.to(socket.roomId).emit('canvas-updated', {
      pixels: Array.from(room.pixels.entries()).map(([pos, color]) => ({
        pos,
        color
      }))
    });
  });

  socket.on('disconnect', () => {
    const room = rooms.get(socket.roomId);
    if (!room) return;

    room.users.delete(socket.id);
    io.to(socket.roomId).emit('user-left', {
      userId: socket.id,
      users: room.users.size
    });

    // Clean up empty rooms after 30 minutes
    if (room.users.size === 0) {
      setTimeout(() => {
        if (room.users.size === 0) {
          rooms.delete(socket.roomId);
          console.log(`Deleted empty room: ${socket.roomId}`);
        }
      }, 30 * 60 * 1000);
    }

    console.log(`User disconnected: ${socket.id}`);
  });
});

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
