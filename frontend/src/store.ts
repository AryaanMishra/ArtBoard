import { create } from 'zustand';

export interface User {
  id: string;
  username: string;
  cursor: { x: number; y: number };
  activeColor: string;
  activeLayer: number;
  activeTool: string;
}

export interface EditorState {
  canvasWidth: number;
  canvasHeight: number;
  pixelSize: number;
  pixels: Map<string, string>; // "x,y" -> color
  users: Map<string, User>;
  activeColor: string;
  activeTool: 'brush' | 'eraser' | 'eyedropper' | 'fill' | 'line' | 'rectangle';
  activeLayer: number;
  history: Array<{ type: string; data: any }>;
  historyIndex: number;
  
  setCanvasDimensions: (width: number, height: number) => void;
  setPixelSize: (size: number) => void;
  setPixel: (x: number, y: number, color: string) => void;
  setPixels: (pixels: Array<{ x: number; y: number; color: string }>) => void;
  clearCanvas: () => void;
  setActiveColor: (color: string) => void;
  setActiveTool: (tool: EditorState['activeTool']) => void;
  setUsers: (users: Map<string, User>) => void;
  addUser: (id: string, user: User) => void;
  removeUser: (id: string) => void;
  updateUser: (id: string, updates: Partial<User>) => void;
  undo: () => void;
  redo: () => void;
  addToHistory: (action: { type: string; data: any }) => void;
}

export const useEditorStore = create<EditorState>((set) => ({
  canvasWidth: 32,
  canvasHeight: 32,
  pixelSize: 20,
  pixels: new Map(),
  users: new Map(),
  activeColor: '#000000',
  activeTool: 'brush',
  activeLayer: 0,
  history: [],
  historyIndex: -1,

  setCanvasDimensions: (width, height) =>
    set({ canvasWidth: width, canvasHeight: height }),

  setPixelSize: (size) => set({ pixelSize: size }),

  setPixel: (x, y, color) =>
    set((state) => {
      const newPixels = new Map(state.pixels);
      newPixels.set(`${x},${y}`, color);
      return { pixels: newPixels };
    }),

  setPixels: (pixels) => {
    set((state) => {
      const newPixels = new Map(state.pixels);
      pixels.forEach(({ x, y, color }) => {
        newPixels.set(`${x},${y}`, color);
      });
      return { pixels: newPixels };
    });
  },

  clearCanvas: () => set({ pixels: new Map() }),

  setActiveColor: (color) => set({ activeColor: color }),

  setActiveTool: (tool) => set({ activeTool: tool }),

  setUsers: (users) => set({ users }),

  addUser: (id, user) =>
    set((state) => {
      const newUsers = new Map(state.users);
      newUsers.set(id, user);
      return { users: newUsers };
    }),

  removeUser: (id) =>
    set((state) => {
      const newUsers = new Map(state.users);
      newUsers.delete(id);
      return { users: newUsers };
    }),

  updateUser: (id, updates) =>
    set((state) => {
      const newUsers = new Map(state.users);
      const user = newUsers.get(id);
      if (user) {
        newUsers.set(id, { ...user, ...updates });
      }
      return { users: newUsers };
    }),

  addToHistory: (action) =>
    set((state) => {
      const newHistory = state.history.slice(0, state.historyIndex + 1);
      newHistory.push(action);
      return {
        history: newHistory,
        historyIndex: newHistory.length - 1,
      };
    }),

  undo: () =>
    set((state) => {
      if (state.historyIndex > 0) {
        return { historyIndex: state.historyIndex - 1 };
      }
      return state;
    }),

  redo: () =>
    set((state) => {
      if (state.historyIndex < state.history.length - 1) {
        return { historyIndex: state.historyIndex + 1 };
      }
      return state;
    }),
}));
