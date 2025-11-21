import styles from './Toolbar.module.css';
import { useEditorStore } from '../store';

interface ToolbarProps {
  onUndo: () => void;
  onRedo: () => void;
  onClear: () => void;
  onDownload: () => void;
}

export const Toolbar: React.FC<ToolbarProps> = ({ onUndo, onRedo, onClear, onDownload }) => {
  const { activeColor, activeTool, setActiveColor, setActiveTool } = useEditorStore();

  const tools: Array<{
    id: 'brush' | 'eraser' | 'eyedropper' | 'fill' | 'line' | 'rectangle';
    label: string;
    icon: string;
  }> = [
    { id: 'brush', label: 'Brush', icon: '🖌️' },
    { id: 'eraser', label: 'Eraser', icon: '🗑️' },
    { id: 'eyedropper', label: 'Color Picker', icon: '🎨' },
    { id: 'fill', label: 'Fill', icon: '🪣' },
    { id: 'line', label: 'Line', icon: '📏' },
    { id: 'rectangle', label: 'Rectangle', icon: '⬜' },
  ];

  return (
    <div className={styles.toolbar}>
      <div className={styles.section}>
        <label htmlFor="colorPicker" className={styles.label}>Color:</label>
        <input
          id="colorPicker"
          type="color"
          value={activeColor}
          onChange={(e) => setActiveColor(e.target.value)}
          title="Pick a color"
        />
      </div>

      <div className={styles.divider}></div>

      <div className={styles.section}>
        <label className={styles.label}>Tools:</label>
        <div className={styles.toolGroup}>
          {tools.map((tool) => (
            <button
              key={tool.id}
              className={`${styles.toolButton} ${activeTool === tool.id ? styles.active : ''}`}
              onClick={() => setActiveTool(tool.id)}
              title={tool.label}
            >
              {tool.icon}
            </button>
          ))}
        </div>
      </div>

      <div className={styles.divider}></div>

      <div className={styles.section}>
        <button onClick={onUndo} title="Undo (Ctrl+Z)">↶ Undo</button>
        <button onClick={onRedo} title="Redo (Ctrl+Y)">↷ Redo</button>
      </div>

      <div className={styles.divider}></div>

      <div className={styles.section}>
        <button onClick={onClear} title="Clear canvas">🗑️ Clear</button>
        <button onClick={onDownload} title="Download as PNG">⬇️ Download</button>
      </div>
    </div>
  );
};
