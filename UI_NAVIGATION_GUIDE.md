# 🎨 ArtBoard - UI Navigation & Testing Guide

## 🌟 Welcome Screen

When you first open http://localhost:3000, you see the **Join Dialog**:

```
┌─────────────────────────────────┐
│         🎨 ArtBoard             │
│ Real-time collaborative pixel   │
│         art creation            │
│                                 │
│  Username: [________________]   │
│  Room ID:  [________________]   │
│                                 │
│    [ JOIN ARTBOARD ]            │
│                                 │
│  💡 Share Room ID with friends  │
└─────────────────────────────────┘
```

### Step 1: Enter Your Username
- Type a name (e.g., "Alice", "Artist123")
- Max 20 characters
- Example: `Alex`

### Step 2: Enter or Create a Room ID
- Type any room name (e.g., "PIXELART123", "friends-draw")
- Case-insensitive but best practice: use capitals
- Multiple people can join the same room to collaborate
- Example: `PIXELART123`

### Step 3: Click "Join ArtBoard"
- If room exists → join existing project
- If room is new → create new blank canvas
- You'll be connected to the backend via WebSocket

---

## 🎮 Main Editor Interface

Once you join, you see the full editor:

```
┌─────────────────────────────────────────────────────────────────────┐
│  Header: 🎨 ArtBoard - PIXELART123         👤 Alex                 │
├─────────────────────────────────────────────────────────────────────┤
│ Toolbar: [Color] [🖌️ 🗑️ 🎨 🪣 📏 ⬜] [↶ ↷] [🗑️ Clear] [⬇️ Download] │
├────────────────────────────────────┬────────────────────────────────┤
│                                    │                                │
│                                    │  👥 Users (1)                  │
│                                    │  ┌──────────────────┐          │
│        Canvas Area                 │  │ 🟦 Alex (you)    │          │
│    (White pixel grid)              │  │ Tool: brush      │          │
│                                    │  │ Color: #000000   │          │
│        32 x 32 pixels              │  └──────────────────┘          │
│     (Grid lines visible)           │                                │
│                                    │  When another joins:          │
│                                    │  ┌──────────────────┐          │
│                                    │  │ 🟥 Bob           │          │
│                                    │  │ Tool: eraser     │          │
│                                    │  │ Color: #FFFFFF   │          │
│                                    │  └──────────────────┘          │
└────────────────────────────────────┴────────────────────────────────┘
```

---

## 🖌️ Toolbar Guide

Located at the top of the editor:

### 1. Color Picker
```
┌─────────────┐
│ Color: [■]  │  ← Click to pick a color
└─────────────┘
```
- Opens color picker dialog
- Select any color (HEX format)
- Default: Black (#000000)

### 2. Tools Section
```
┌──────────────────────────────────┐
│ Tools: [🖌️] [🗑️] [🎨] [🪣] [📏] [⬜]  │
└──────────────────────────────────┘
```

**Tool Details:**

| Icon | Tool | Function |
|------|------|----------|
| 🖌️ | Brush | Draw pixels with selected color |
| 🗑️ | Eraser | Erase pixels (makes them white) |
| 🎨 | Color Picker | Click a pixel to pick its color |
| 🪣 | Fill Bucket | Fill area with selected color |
| 📏 | Line | Draw line (future feature) |
| ⬜ | Rectangle | Draw rectangle (future feature) |

- **Active tool** is highlighted in blue
- Click any tool to select it
- Hover shows tooltip

### 3. Edit Controls
```
┌──────────────┐
│ [↶ Undo] [↷ Redo] │
└──────────────┘
```
- **Undo** (↶): Revert last action
- **Redo** (↷): Restore undone action

### 4. Canvas Controls
```
┌──────────────────────────┐
│ [🗑️ Clear] [⬇️ Download] │
└──────────────────────────┘
```
- **Clear**: Erase entire canvas (confirmation popup)
- **Download**: Export artwork as PNG file

---

## 🎨 Drawing on Canvas

### How to Draw

1. **Select a Tool** (e.g., Brush 🖌️)
2. **Pick a Color** (default is black)
3. **Click on Canvas** to draw single pixel
4. **Click & Drag** to draw multiple pixels smoothly
5. **See Real-time Sync** - other users see your strokes instantly

### Drawing Tips

**Smooth Strokes:**
- Click and hold while dragging mouse
- Moves in all directions
- Batches pixels for performance (50ms batches)

**Using Color Picker:**
1. Select Color Picker tool (🎨)
2. Click any pixel on canvas
3. Tool switches back to previous tool
4. New color is now selected

**Using Fill Bucket:**
1. Select Fill Bucket tool (🪣)
2. Click inside an area bounded by pixels
3. Area fills with selected color
4. Uses flood fill algorithm (smart fill)

**Erasing:**
1. Select Eraser tool (🗑️)
2. Draw like normal brush
3. Erases pixels (makes them white #FFFFFF)

---

## 👥 User Panel (Right Side)

Shows all active users in your room:

```
┌──────────────────┐
│ 👥 Users (2)     │
│ ┌────────────────┤
│ │ 🟦 Alex (you)  │
│ │ Tool: brush    │
│ │ Color: #000000 │
│ │                │
│ │ 🟥 Bob         │
│ │ Tool: eraser   │
│ │ Color: #FFFFFF │
│ └────────────────┤
└──────────────────┘
```

**What You See:**
- Color indicator (matches their cursor color)
- Username
- Current active tool
- Current color they're using
- Your name shows "(you)"

**Real-time Updates:**
- Updates as users join/leave
- Shows current tool selection
- Shows current color

---

## 🔄 Real-time Collaboration Flow

### Scenario: Drawing with a Friend

**Step 1: You Join**
```
1. Open http://localhost:3000
2. Enter: Username = "Alice"
3. Enter: Room ID = "FRIENDS-ART"
4. Click Join
5. See blank 32x32 canvas
6. Right panel shows "Users (1)" with "Alice (you)"
```

**Step 2: Friend Joins Same Room**
```
1. Friend opens http://localhost:3000 (different tab/device)
2. Enters: Username = "Bob"
3. Enters: Room ID = "FRIENDS-ART"  (SAME room!)
4. Clicks Join
5. Friend sees Alice's username in Users panel
6. Both see "Users (2)"
```

**Step 3: Real-time Drawing**
```
1. Alice draws a blue pixel at position (10, 10)
   - Alice's canvas updates instantly
   - Bob's canvas updates in <200ms
   - Alice sees blue dot appear on Bob's side too

2. Bob uses color picker to get Alice's blue
   - Bob selects color picker tool
   - Clicks Alice's blue pixel
   - Bob's color is now blue

3. Bob draws with blue
   - Bob draws strokes
   - Alice sees them in real-time

4. They collaborate to create artwork!
```

---

## 🧪 Testing Checklist

### Local Testing (2 Browser Tabs)

- [ ] **Tab 1 Test:**
  - [ ] Enter username (e.g., "User1")
  - [ ] Enter room (e.g., "TEST123")
  - [ ] Click Join
  - [ ] See blank canvas
  - [ ] See toolbar with tools
  - [ ] See empty users panel

- [ ] **Canvas Drawing:**
  - [ ] Select Brush tool (🖌️)
  - [ ] Click color to change
  - [ ] Draw pixels on canvas
  - [ ] Drag to draw smooth strokes
  - [ ] See grid lines
  - [ ] All pixels appear

- [ ] **Tools Testing:**
  - [ ] Try each tool icon
  - [ ] Active tool highlights blue
  - [ ] Brush draws pixels
  - [ ] Eraser makes pixels white
  - [ ] Color picker clicks work
  - [ ] Fill bucket fills areas

- [ ] **Tab 2 Test:**
  - [ ] Enter same room ID ("TEST123")
  - [ ] Enter different username (e.g., "User2")
  - [ ] Click Join
  - [ ] See both users in right panel
  - [ ] See User1's drawing from Tab 1
  - [ ] Both show "Users (2)"

- [ ] **Real-time Sync:**
  - [ ] Draw in Tab 1
  - [ ] Watch Tab 2 update instantly
  - [ ] Draw in Tab 2
  - [ ] Watch Tab 1 update instantly
  - [ ] Drawing appears within <200ms

- [ ] **Download Feature:**
  - [ ] Create simple drawing
  - [ ] Click ⬇️ Download button
  - [ ] PNG file downloads
  - [ ] Open PNG in image viewer
  - [ ] Pixels are visible

- [ ] **UI Appearance:**
  - [ ] Dark theme visible
  - [ ] Colors are correct
  - [ ] Layout is responsive
  - [ ] No errors in browser console (F12)

---

## 📱 UI Elements Summary

| Element | Location | Function |
|---------|----------|----------|
| Header | Top | Shows room name & username |
| Toolbar | Below header | Tools, colors, controls |
| Canvas | Center-left (60%) | Drawing area |
| Users Panel | Right (40%) | Active users list |
| Color Picker | Toolbar left | Select drawing color |
| Tool Buttons | Toolbar center | Select drawing tool |
| Undo/Redo | Toolbar right | Edit history |
| Clear/Download | Toolbar far right | Canvas actions |

---

## 🎮 Keyboard Shortcuts (Future)

Currently not implemented, but planned:
```
Ctrl+Z     Undo
Ctrl+Y     Redo
Ctrl+S     Save to server
B          Brush
E          Eraser
P          Color picker
F          Fill bucket
C          Clear canvas
```

---

## 🌈 Color Scheme

**Dark Theme (.io game style):**
- Background: #1e1e1e (dark gray)
- Canvas: #ffffff (white)
- Grid: #e0e0e0 (light gray)
- Toolbar: #2d2d2d (dark gray)
- Active: #0e7490 (cyan/teal)
- Text: #ffffff (white)

**User Cursor Colors:**
- User 1: #ff6b6b (red)
- User 2: #4ecdc4 (teal)
- User 3: #45b7d1 (blue)
- User 4: #f7b731 (gold)
- User 5: #5f27cd (purple)

---

## 🚀 Quick Start Commands

**Terminal 1: Backend**
```bash
cd c:\ArtBoard\backend
npm run dev
```
Expected: `Server running on port 3001`

**Terminal 2: Frontend**
```bash
cd c:\ArtBoard\frontend
npm run dev
```
Expected: `Local: http://localhost:3000/`

**Browser:**
- Tab 1: http://localhost:3000
- Tab 2: http://localhost:3000
- Both tabs: Enter same Room ID

---

## ✅ Expected Behavior

### On First Visit
✓ Join dialog loads
✓ Can enter username & room ID
✓ Join button responsive

### After Joining
✓ Canvas appears with white background
✓ Grid lines visible
✓ Toolbar shows all tools
✓ Users panel shows "Users (1)"
✓ Your name shows with "(you)"

### Drawing
✓ Clicking canvas draws pixel
✓ Dragging draws smooth strokes
✓ Color changes when picked
✓ Tool changes when clicked
✓ Eraser makes pixels white
✓ Fill bucket fills areas

### Collaboration
✓ Friend joins same room
✓ Both see "Users (2)"
✓ Drawing syncs in real-time
✓ Cursors visible
✓ Tool & color info updated

### Download
✓ Canvas exports as PNG
✓ File downloads to computer
✓ PNG shows correct pixels

---

## 🐛 Troubleshooting

| Issue | Solution |
|-------|----------|
| Can't see canvas | Refresh browser (F5) |
| No real-time sync | Check backend logs |
| Tools not working | Try refreshing |
| Wrong user count | Wait 2-3 seconds |
| Canvas blank after join | Room exists but empty |
| Download button fails | Try smaller canvas |

---

**Now go test it! Open http://localhost:3000 in two tabs and start drawing together! 🎨✨**
