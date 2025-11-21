import { useEffect, useRef } from 'react';
import { useEditorStore } from '../store';
import styles from './Canvas.module.css';

interface CanvasProps {
  onPixelClick?: (x: number, y: number) => void;
  onPixelDrag?: (x: number, y: number) => void;
}

export const Canvas: React.FC<CanvasProps> = ({ onPixelClick, onPixelDrag }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const state = useEditorStore();
  const isDrawing = useRef(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size
    canvas.width = state.canvasWidth * state.pixelSize;
    canvas.height = state.canvasHeight * state.pixelSize;

    // Clear canvas
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Draw grid
    ctx.strokeStyle = '#e0e0e0';
    ctx.lineWidth = 0.5;
    for (let x = 0; x <= state.canvasWidth; x++) {
      ctx.beginPath();
      ctx.moveTo(x * state.pixelSize, 0);
      ctx.lineTo(x * state.pixelSize, canvas.height);
      ctx.stroke();
    }
    for (let y = 0; y <= state.canvasHeight; y++) {
      ctx.beginPath();
      ctx.moveTo(0, y * state.pixelSize);
      ctx.lineTo(canvas.width, y * state.pixelSize);
      ctx.stroke();
    }

    // Draw pixels
    state.pixels.forEach((color, key) => {
      const [x, y] = key.split(',').map(Number);
      ctx.fillStyle = color;
      ctx.fillRect(
        x * state.pixelSize,
        y * state.pixelSize,
        state.pixelSize,
        state.pixelSize
      );
    });

    // Draw remote cursors
    const colors = ['#ff6b6b', '#4ecdc4', '#45b7d1', '#f7b731', '#5f27cd'];
    Array.from(state.users.values()).forEach((user, index) => {
      const { x, y } = user.cursor;
      ctx.fillStyle = colors[index % colors.length];
      ctx.fillRect(
        x * state.pixelSize,
        y * state.pixelSize,
        state.pixelSize,
        state.pixelSize
      );
      ctx.strokeStyle = '#000';
      ctx.lineWidth = 1;
      ctx.strokeRect(
        x * state.pixelSize,
        y * state.pixelSize,
        state.pixelSize,
        state.pixelSize
      );
      // Draw username
      ctx.fillStyle = '#000';
      ctx.font = '10px Arial';
      ctx.fillText(
        user.username,
        x * state.pixelSize,
        (y - 0.5) * state.pixelSize
      );
    });
  }, [state.canvasWidth, state.canvasHeight, state.pixelSize, state.pixels, state.users]);

  const getPixelCoords = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return { x: 0, y: 0 };

    const rect = canvas.getBoundingClientRect();
    const x = Math.floor((e.clientX - rect.left) / state.pixelSize);
    const y = Math.floor((e.clientY - rect.top) / state.pixelSize);

    return {
      x: Math.max(0, Math.min(x, state.canvasWidth - 1)),
      y: Math.max(0, Math.min(y, state.canvasHeight - 1)),
    };
  };

  const handleMouseDown = (e: React.MouseEvent<HTMLCanvasElement>) => {
    isDrawing.current = true;
    const coords = getPixelCoords(e);
    onPixelClick?.(coords.x, coords.y);
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (isDrawing.current) {
      const coords = getPixelCoords(e);
      onPixelDrag?.(coords.x, coords.y);
    }
  };

  const handleMouseUp = () => {
    isDrawing.current = false;
  };

  return (
    <canvas
      ref={canvasRef}
      className={styles.canvas}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
    />
  );
};
