import { useState, useEffect, useRef } from 'react';
import { Canvas } from './components/Canvas';
import { Toolbar } from './components/Toolbar';
import { UserPanel } from './components/UserPanel';
import { useEditorStore, User } from './store';
import { io, Socket } from 'socket.io-client';
import './App.css';

interface DrawAction {
  type: 'pixel' | 'pixels' | 'clear';
  data: any;
}

export default function App() {
  const store = useEditorStore();
  const socketRef = useRef<Socket | null>(null);
  const [username, setUsername] = useState('');
  const [roomId, setRoomId] = useState('');
  const [isJoined, setIsJoined] = useState(false);
  const [showJoinDialog, setShowJoinDialog] = useState(true);
  const pendingPixelsRef = useRef<Array<{ x: number; y: number; color: string }>>([]);
  const batchTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Initialize socket connection
  useEffect(() => {
    const serverUrl = import.meta.env.VITE_SOCKET_URL || 'http://localhost:3001';
    socketRef.current = io(serverUrl, {
      transports: ['websocket', 'polling'],
    });

    socketRef.current.on('room-state', (data) => {
      store.setCanvasDimensions(data.width, data.height);

      // Set pixels from room state
      const pixels = data.pixels.map((p: any) => ({
        x: parseInt(p.pos.split(',')[0]),
        y: parseInt(p.pos.split(',')[1]),
        color: p.color,
      }));
      store.setPixels(pixels);

      // Set users
      const users = new Map(
        data.users.map((u: any) => [u.id, u as User])
      );
      store.setUsers(users);
    });

    socketRef.current.on('pixel-drawn', (data) => {
      if (data.userId !== socketRef.current?.id) {
        store.setPixel(data.x, data.y, data.color);
      }
    });

    socketRef.current.on('pixels-drawn', (data) => {
      if (data.userId !== socketRef.current?.id) {
        store.setPixels(data.pixels);
      }
    });

    socketRef.current.on('user-joined', (data) => {
      console.log(`${data.username} joined (${data.users} users online)`);
    });

    socketRef.current.on('user-left', (data) => {
      store.removeUser(data.userId);
      console.log(`User left (${data.users} users online)`);
    });

    socketRef.current.on('cursor-moved', (data) => {
      store.updateUser(data.userId, { cursor: { x: data.x, y: data.y } });
    });

    socketRef.current.on('user-state-updated', (data) => {
      store.updateUser(data.userId, {
        activeColor: data.activeColor,
        activeLayer: data.activeLayer,
        activeTool: data.activeTool,
      });
    });

    socketRef.current.on('canvas-cleared', () => {
      store.clearCanvas();
    });

    return () => {
      if (socketRef.current) {
        socketRef.current.disconnect();
      }
    };
  }, []);

  const joinRoom = (name: string, room: string) => {
    if (!name.trim() || !room.trim()) {
      alert('Please enter both username and room ID');
      return;
    }

    socketRef.current?.emit('join-room', {
      roomId: room,
      username: name,
      width: 32,
      height: 32,
    });

    setUsername(name);
    setRoomId(room);
    setIsJoined(true);
    setShowJoinDialog(false);

    // Store in localStorage for quick re-join
    localStorage.setItem('lastUsername', name);
    localStorage.setItem('lastRoomId', room);
  };

  const handlePixelClick = (x: number, y: number) => {
    if (!isJoined) return;

    switch (store.activeTool) {
      case 'brush':
        store.setPixel(x, y, store.activeColor);
        socketRef.current?.emit('draw-pixel', {
          x,
          y,
          color: store.activeColor,
          timestamp: Date.now(),
        });
        break;

      case 'eraser':
        store.setPixel(x, y, '#ffffff');
        socketRef.current?.emit('draw-pixel', {
          x,
          y,
          color: '#ffffff',
          timestamp: Date.now(),
        });
        break;

      case 'eyedropper': {
        const color = store.pixels.get(`${x},${y}`) || '#ffffff';
        store.setActiveColor(color);
        break;
      }

      case 'fill':
        fillBucket(x, y, store.activeColor);
        break;

      case 'line':
        // Start line - store start point for next click
        break;

      case 'rectangle':
        // Start rectangle
        break;
    }
  };

  const handlePixelDrag = (x: number, y: number) => {
    if (!isJoined || store.activeTool === 'eyedropper') return;

    if (store.activeTool === 'brush') {
      store.setPixel(x, y, store.activeColor);

      // Batch pixel updates
      pendingPixelsRef.current.push({ x, y, color: store.activeColor });

      if (batchTimeoutRef.current) {
        clearTimeout(batchTimeoutRef.current);
      }

      batchTimeoutRef.current = setTimeout(() => {
        if (pendingPixelsRef.current.length > 0) {
          socketRef.current?.emit('draw-pixels', {
            pixels: pendingPixelsRef.current,
            timestamp: Date.now(),
          });
          pendingPixelsRef.current = [];
        }
      }, 50);
    } else if (store.activeTool === 'eraser') {
      store.setPixel(x, y, '#ffffff');

      pendingPixelsRef.current.push({ x, y, color: '#ffffff' });

      if (batchTimeoutRef.current) {
        clearTimeout(batchTimeoutRef.current);
      }

      batchTimeoutRef.current = setTimeout(() => {
        if (pendingPixelsRef.current.length > 0) {
          socketRef.current?.emit('draw-pixels', {
            pixels: pendingPixelsRef.current,
            timestamp: Date.now(),
          });
          pendingPixelsRef.current = [];
        }
      }, 50);
    }
  };

  const fillBucket = (startX: number, startY: number, fillColor: string) => {
    const targetColor = store.pixels.get(`${startX},${startY}`) || '#ffffff';
    if (targetColor === fillColor) return;

    const stack: Array<[number, number]> = [[startX, startY]];
    const filled = new Set<string>();
    const newPixels: Array<{ x: number; y: number; color: string }> = [];

    while (stack.length > 0) {
      const [x, y] = stack.pop()!;
      const key = `${x},${y}`;

      if (filled.has(key)) continue;
      if (x < 0 || x >= store.canvasWidth || y < 0 || y >= store.canvasHeight) continue;

      const pixelColor = store.pixels.get(key) || '#ffffff';
      if (pixelColor !== targetColor) continue;

      filled.add(key);
      store.setPixel(x, y, fillColor);
      newPixels.push({ x, y, color: fillColor });

      stack.push([x + 1, y], [x - 1, y], [x, y + 1], [x, y - 1]);
    }

    if (newPixels.length > 0) {
      socketRef.current?.emit('draw-pixels', {
        pixels: newPixels,
        timestamp: Date.now(),
      });
    }
  };

  const handleUndo = () => {
    store.undo();
  };

  const handleRedo = () => {
    store.redo();
  };

  const handleClear = () => {
    if (confirm('Clear entire canvas?')) {
      store.clearCanvas();
      socketRef.current?.emit('clear-canvas');
    }
  };

  const handleDownload = () => {
    const canvas = document.createElement('canvas');
    const pixelSize = 10;
    canvas.width = store.canvasWidth * pixelSize;
    canvas.height = store.canvasHeight * pixelSize;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    store.pixels.forEach((color, key) => {
      const [x, y] = key.split(',').map(Number);
      ctx.fillStyle = color;
      ctx.fillRect(x * pixelSize, y * pixelSize, pixelSize, pixelSize);
    });

    const link = document.createElement('a');
    link.href = canvas.toDataURL();
    link.download = `artboard-${Date.now()}.png`;
    link.click();
  };

  if (showJoinDialog) {
    return (
      <div className="joinDialog">
        <div className="joinCard">
          <h1>🎨 ArtBoard</h1>
          <p>Real-time collaborative pixel art</p>

          <JoinForm onJoin={joinRoom} />
        </div>
      </div>
    );
  }

  return (
    <div className="app">
      <div className="header">
        <h1>🎨 ArtBoard - {roomId}</h1>
        <p className="userDisplay">👤 {username}</p>
      </div>

      <Toolbar
        onUndo={handleUndo}
        onRedo={handleRedo}
        onClear={handleClear}
        onDownload={handleDownload}
      />

      <div className="editor">
        <div className="canvasContainer">
          <Canvas onPixelClick={handlePixelClick} onPixelDrag={handlePixelDrag} />
        </div>
        <UserPanel users={store.users} currentUserId={socketRef.current?.id || ''} />
      </div>
    </div>
  );
}

function JoinForm({ onJoin }: { onJoin: (username: string, roomId: string) => void }) {
  const [username, setUsername] = useState(localStorage.getItem('lastUsername') || '');
  const [roomId, setRoomId] = useState(localStorage.getItem('lastRoomId') || '');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onJoin(username, roomId);
  };

  return (
    <form onSubmit={handleSubmit} className="joinForm">
      <div className="formGroup">
        <label htmlFor="username">Username:</label>
        <input
          id="username"
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Enter your name"
          maxLength={20}
          autoFocus
        />
      </div>

      <div className="formGroup">
        <label htmlFor="roomId">Room ID:</label>
        <input
          id="roomId"
          type="text"
          value={roomId}
          onChange={(e) => setRoomId(e.target.value.toUpperCase())}
          placeholder="e.g., PIXELART123"
          maxLength={20}
        />
      </div>

      <button type="submit" className="submitButton">
        Join ArtBoard
      </button>

      <p className="info">💡 Tip: Share the Room ID with friends to collaborate</p>
    </form>
  );
}
