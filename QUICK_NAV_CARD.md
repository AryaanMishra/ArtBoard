# 🎨 ArtBoard - Quick Navigation Card

## 📍 Where You Are Now

✅ **Backend Running**: http://localhost:3001 (WebSocket Server)
✅ **Frontend Running**: http://localhost:3000 (React App)
✅ **Both Connected** via WebSocket

---

## 🌐 Open the App

**Open your browser and go to:**
```
http://localhost:3000
```

---

## 📝 Join Screen (First Thing You See)

```
┌──────────────────────────┐
│   🎨 ArtBoard            │
│                          │
│  Username: [________]    │
│  Room ID:  [________]    │
│                          │
│  [ JOIN ARTBOARD ]       │
└──────────────────────────┘
```

**What to do:**
1. Type your name (e.g., `Alice`)
2. Type a room name (e.g., `FRIENDS`)
3. Click **JOIN ARTBOARD**

---

## 🎮 Editor Screen (What You See After Joining)

```
LAYOUT: 60% Canvas | 40% Users Panel

TOOLBAR AT TOP:
[Color] [🖌️ 🗑️ 🎨 🪣] [↶↷] [🗑️Clear] [⬇️Download]
```

---

## 🖱️ How to Draw

| Action | What Happens |
|--------|--------------|
| **Click on canvas** | Draw 1 pixel |
| **Drag across canvas** | Draw smooth line |
| **Click color picker** | Change color |
| **Click tool icon** | Switch tool |
| **Click & drag with eraser** | Erase pixels |
| **Click inside area with fill** | Fill that area |

---

## 🎨 Tools Explained

| Icon | Name | What It Does |
|------|------|--------------|
| 🖌️ | Brush | Draws pixels with color |
| 🗑️ | Eraser | Makes pixels white |
| 🎨 | Color Picker | Click to pick color |
| 🪣 | Fill Bucket | Click to fill area |
| 📏 | Line | Not ready yet |
| ⬜ | Rectangle | Not ready yet |

---

## 🚀 Test Real-Time Collaboration

### Open TWO Browser Tabs

**Tab 1:**
1. Go to http://localhost:3000
2. Join as "Alice" in room "TEST"
3. Draw something

**Tab 2:**
1. Go to http://localhost:3000
2. Join as "Bob" in room "TEST"
3. See Alice's drawing!
4. Draw something
5. Switch to Tab 1
6. See Bob's drawing!

✅ **Real-time sync working!**

---

## 💾 Export Your Art

1. Draw on canvas
2. Click **⬇️ Download** button
3. PNG file downloads to your computer
4. Open it to see your pixel art!

---

## 👥 Users Panel (Right Side)

Shows everyone drawing in your room:

```
👥 Users (2)
├─ 🟦 Alice (you)
│  Tool: brush
│  Color: #000000
│
└─ 🟥 Bob
   Tool: eraser
   Color: #FFFFFF
```

---

## 🔄 What Happens in Real-Time

| What You Do | What Others See |
|-------------|-----------------|
| Draw 1 pixel | Appears in <200ms |
| Change color | Shows in users panel |
| Switch tool | Shows in users panel |
| Draw line | Appears smoothly |
| Use eraser | Pixels disappear |
| Use fill bucket | Area fills |

---

## 🎯 Step-by-Step First Draw

1. Open http://localhost:3000
2. Type: `You` for username
3. Type: `FIRSTDRAW` for room
4. Click: **JOIN ARTBOARD**
5. See canvas → white 32x32 grid
6. Click color picker (left side)
7. Pick bright red
8. Make sure 🖌️ Brush is selected (blue highlight)
9. Click & drag on canvas to draw
10. See red pixels appear!
11. Click **⬇️ Download**
12. Your PNG downloads! 🎉

---

## 🧪 Verify It's Working

Check these to confirm everything works:

- [ ] Canvas appears with white background
- [ ] Grid lines are visible
- [ ] Toolbar shows all tools
- [ ] Clicking draws pixels
- [ ] Colors change when selected
- [ ] Eraser makes pixels white
- [ ] Download button works
- [ ] Open second tab with same room → see first drawing
- [ ] Browser console has no red errors (F12)

---

## ⚡ Keyboard Shortcuts (Future)

Not yet implemented, but coming soon:
- `Ctrl+Z` = Undo
- `Ctrl+Y` = Redo
- `B` = Brush tool
- `E` = Eraser tool

(Use mouse clicks for now)

---

## 🆘 Something Not Working?

| Problem | Fix |
|---------|-----|
| Can't see app | Refresh browser (F5) |
| Backend errors | Check terminal with backend |
| Can't draw | Select brush tool first |
| Color doesn't change | Click color square |
| Can't see other user | Make sure room IDs match |
| Drawing stutters | This is normal on slow machines |

---

## 📚 More Detailed Info

- **UI_NAVIGATION_GUIDE.md** ← Full navigation guide
- **VISUAL_TESTING_GUIDE.md** ← Detailed testing steps
- **ARCHITECTURE.md** ← How it works technically
- **QUICKREF.md** ← FAQ and troubleshooting

---

## 🎨 You're Ready!

```
1. Open: http://localhost:3000
2. Join with your name
3. Draw something beautiful!
4. Invite a friend (new tab, same room)
5. Collaborate in real-time!
```

**Happy drawing! 🚀✨**
