# 🎨 ArtBoard - Visual Testing Guide

## Quick Start to See It Working

### What's Running Right Now
- ✅ Backend Server: http://localhost:3001 (WebSocket)
- ✅ Frontend Server: http://localhost:3000 (React App)
- ✅ Both connected via WebSocket

---

## 📺 UI Flow Walkthrough

### Screen 1: Join Dialog

```
When you open http://localhost:3000, you see:

┌─────────────────────────────────────────┐
│                                         │
│               🎨 ArtBoard               │
│   Real-time collaborative pixel art     │
│                                         │
│   Username:                             │
│   [________________________________________]
│   (Enter your name, e.g., "Alex")      │
│                                         │
│   Room ID:                              │
│   [________________________________________]
│   (Enter room name, e.g., "PIXELART1")  │
│                                         │
│         [ JOIN ARTBOARD ]               │
│                                         │
│   💡 Tip: Share the Room ID with       │
│      friends to collaborate             │
│                                         │
└─────────────────────────────────────────┘

Colors: Dark blue background (#0e7490), white text
Buttons: Light blue, becomes lighter on hover
```

**What to do:**
1. Type: `Alice` in Username field
2. Type: `TEST123` in Room ID field
3. Click: **JOIN ARTBOARD**

---

### Screen 2: Main Editor (After Joining)

```
Top Header:
┌────────────────────────────────────────────┐
│  🎨 ArtBoard - TEST123          👤 Alice   │
└────────────────────────────────────────────┘

Toolbar:
┌────────────────────────────────────────────────────────────┐
│ Color: [■]  Tools: [🖌️] [🗑️] [🎨] [🪣] [📏] [⬜]  [↶] [↷]
│                              [🗑️ Clear]  [⬇️ Download]    │
└────────────────────────────────────────────────────────────┘

Main Area:
┌─────────────────────────────────────────────┬──────────────┐
│                                             │              │
│                                             │ 👥 Users (1) │
│          CANVAS AREA                        │ ┌──────────┐ │
│       (32x32 pixel grid)                    │ │ 🟦 Alice │ │
│       (White background)                    │ │ (you)    │ │
│       (Grid lines visible)                  │ │ Brush    │ │
│                                             │ │ #000000  │ │
│                                             │ └──────────┘ │
│                                             │              │
│                                             │              │
└─────────────────────────────────────────────┴──────────────┘
```

---

## 🖌️ Interactive Testing Steps

### Step 1: Draw with Brush
```
1. Look at toolbar → see [🖌️] (should be highlighted blue)
2. Canvas is white with faint grid
3. Click on a pixel in the canvas
   ✓ A black pixel appears
4. Click & drag across canvas
   ✓ A line of black pixels appears
5. Release mouse
   ✓ Line stays on canvas
```

### Step 2: Change Color
```
1. Find color picker in toolbar (left side)
2. See a small colored square [■]
3. Click on it
   ✓ Color picker dialog opens
4. Select a bright color (e.g., red, blue, green)
5. The small square shows your new color
6. Draw on canvas
   ✓ New pixels are your selected color
```

### Step 3: Try Eraser
```
1. Look at toolbar
2. Click the Eraser tool [🗑️] (second icon)
   ✓ It highlights blue (selected)
3. Draw on existing pixels
   ✓ They turn white (erased)
```

### Step 4: Try Color Picker Tool
```
1. Click Color Picker tool [🎨] (third icon)
   ✓ Tool highlights blue
2. Click on a colored pixel you drew
   ✓ Your color changes to that pixel's color
3. Tool automatically switches back to Brush
   ✓ Ready to draw with picked color
```

### Step 5: Try Fill Bucket
```
1. Click Fill Bucket tool [🪣] (fourth icon)
2. Draw a square outline (4 pixels forming a box)
3. With fill bucket selected, click INSIDE the box
   ✓ Interior fills with your selected color
```

### Step 6: Download Your Art
```
1. Draw something on canvas (a simple shape)
2. Click [⬇️ Download] button
   ✓ Your browser downloads a PNG file
   ✓ Named like: artboard-1732210156789.png
3. Check Downloads folder
   ✓ PNG file is there
4. Open it
   ✓ See your pixel art at 10px per pixel
```

### Step 7: Real-Time Collaboration

**Open Second Tab:**
```
1. Right-click browser tab → "Open Link in New Tab"
2. Go to http://localhost:3000
3. See Join dialog again
4. Enter:
   Username: Bob
   Room ID: TEST123  (SAME as first tab!)
5. Click JOIN ARTBOARD
   ✓ New canvas loads with Alice's drawing visible!
   ✓ Right panel shows "Users (2)"
   ✓ Both "Alice" and "Bob" listed
```

**Draw in Tab 2:**
```
1. In Tab 2, with Bob, select Brush tool
2. Pick a different color (e.g., red)
3. Draw on canvas in Tab 2
   ✓ Instantly appears in Tab 1!
   ✓ Less than 200ms delay
```

**Watch Tab 1:**
```
1. Switch back to Tab 1
   ✓ See Bob's red drawing from Tab 2
   ✓ Appeared without refresh!
2. Users panel shows both Alice & Bob
   ✓ Each with different color indicator
```

---

## 🎮 Visual Indicators Guide

### Toolbar Colors

| State | Appearance | Meaning |
|-------|-----------|---------|
| Selected Tool | Light Blue | This tool is active |
| Unselected Tool | Dark Gray | Not active |
| Hover Tool | Lighter Gray | Can click to activate |
| Active Color | Color square | Your current drawing color |

### Canvas

| Feature | Appearance | Meaning |
|---------|-----------|---------|
| Grid | Light gray lines | Pixel boundaries |
| Pixel | Solid color | Drawn by user |
| Empty | White | No pixel drawn |
| Cursor | Colored square outline | Remote user's cursor |

### Users Panel

| Feature | Appearance | Meaning |
|---------|-----------|---------|
| Color dot | Solid colored circle | User's cursor color |
| "(you)" | Text label | It's you |
| Tool name | Text below username | What they're using |
| Color code | #XXXXXX | Their current color |

---

## 🔄 Real-Time Visual Feedback

### Drawing in One Tab Syncs to Other

**Tab 1 (Alice drawing):**
```
Click pixel at (15, 15) with black brush
│
├─ Local: Pixel appears immediately
├─ Network: Sent to server via WebSocket
└─ Server: Broadcasts to Bob's tab
```

**Tab 2 (Bob watching):**
```
Receives WebSocket message with pixel
│
└─ Bob's canvas: Updates immediately
   (Pixel 15,15 turns black on Bob's screen)
```

**Visible Evidence:**
- Tab 1 draws → Tab 2 shows it instantly
- No page refresh needed
- Both tabs stay synchronized
- Users can draw simultaneously

---

## ⌨️ Keyboard Controls (Currently Not Implemented)

**Future features:**
- `Ctrl+Z` → Undo
- `Ctrl+Y` → Redo
- `Ctrl+S` → Save to server
- `C` → Clear canvas
- `B` → Brush tool
- `E` → Eraser tool

(Currently use mouse to click toolbar buttons)

---

## 🎨 Color System

### How Colors Work

```
1. Click color picker square [■]
   ↓
2. Browser opens color dialog
   ↓
3. Select color (hex code like #FF0000)
   ↓
4. Color square shows selected color
   ↓
5. Draw pixels with this color
```

### Color Picker Shows

```
Color picker dialog:
┌────────────────────────┐
│  Select a color:       │
│  [Color gradient area]  │
│                        │
│  Hex: [#000000]        │
│  RGB: [0, 0, 0]        │
│                        │
│  [OK]  [Cancel]        │
└────────────────────────┘
```

---

## 🧪 What to Look For (Working Correctly)

✅ **Canvas loads** → White 32x32 grid visible
✅ **Clicking draws** → Black pixels appear
✅ **Color changes** → New pixels are new color
✅ **Eraser works** → Pixels turn white
✅ **Fill bucket works** → Area fills with color
✅ **Download works** → PNG file appears
✅ **Users appear** → Right panel updates
✅ **Real-time sync** → Changes appear instantly
✅ **No console errors** → Open F12, check console
✅ **Smooth drawing** → Dragging feels responsive

---

## ❌ Common Visual Issues (If You See These)

| Issue | Cause | Fix |
|-------|-------|-----|
| Blank white canvas | Browser cache | F5 to refresh |
| Tool doesn't highlight | State not updating | Click again |
| Drawing doesn't appear | WebSocket not connected | Check backend |
| Users don't sync | Room IDs different | Use exact same room |
| Pixels look blurry | Zoom level wrong | Zoom to 100% |
| Download button missing | Toolbar scrolled | Scroll right |

---

## 📊 Performance Expectations

| Action | Expected Time |
|--------|----------------|
| Canvas loads | <1 second |
| Drawing pixel appears | <50ms (local) |
| Other user sees it | <200ms (network) |
| Tool switches | Instant |
| Color changes | Instant |
| Download starts | <500ms |

---

## 🎯 Testing Scenarios

### Scenario 1: Single User Drawing
```
1. Open http://localhost:3000
2. Join with any room ID
3. Draw simple shape (square, line, circle)
4. Verify all pixels appear correctly
✓ PASS if drawing matches what you drew
```

### Scenario 2: Two Users Collaborating
```
1. Tab A: Join room "ART1" as "Alice"
2. Tab B: Join room "ART1" as "Bob"
3. Alice draws red square
4. Check Tab B: Square appears
5. Bob draws blue circle
6. Check Tab A: Circle appears
✓ PASS if both see each other's work
```

### Scenario 3: Export Artwork
```
1. Draw small pattern (5x5 pixels)
2. Click Download
3. Find PNG in Downloads
4. Open PNG in image viewer
5. Count pixels and colors
✓ PASS if PNG matches canvas exactly
```

---

## 🎬 Recording/Screenshots

To capture what you're seeing:

1. **Windows Screenshot**: `Print Screen` or `Snip & Sketch`
2. **Full Screen**: Press `F11` in browser
3. **Zoom Out**: `Ctrl + -` (see more canvas)
4. **Zoom In**: `Ctrl + +` (see pixels better)

---

## 📝 Test Checklist

- [ ] Can see Join dialog
- [ ] Can enter username and room
- [ ] Canvas loads after join
- [ ] Clicking draws pixels
- [ ] Color picker changes color
- [ ] Eraser tool works
- [ ] Fill bucket tool works
- [ ] All colors are visible
- [ ] Download works
- [ ] Two tabs sync in real-time
- [ ] No red errors in console (F12)
- [ ] Both users see each other
- [ ] Drawing is smooth

---

## 🚀 You're Ready to Test!

Everything is live and running. Open http://localhost:3000 now!

**Try this:**
1. Open Tab 1: http://localhost:3000
2. Join as "You" in room "TEST"
3. Draw a smiley face :)
4. Open Tab 2: http://localhost:3000
5. Join as "Friend" in room "TEST"
6. See the smiley appear!
7. Have "Friend" draw eyes/nose
8. See it update in Tab 1!

🎨 **Happy testing!**
