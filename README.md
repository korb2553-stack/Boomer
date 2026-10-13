# 🔥 Galaxy Dragon — Extreme VC Lagger
**by [bluezy.exe](https://discord.gg/bluezygpt)**

UDP flood bot ที่ยิงตรงไปที่ Discord Voice Server IP ทำให้ทุกคนในห้องเสียงปิงพุ่ง / กระตุก / ลาก

---

## การทำงาน

```
!vc-extreme  →  embed + ปุ่ม 3 ปุ่ม
กด "เริ่มการยิง"  →  กรอก Voice Server IP + Port
spawn vcboom.py  →  30,000 threads UDP flood
ทุกคนในห้องเสียงปิงพุ่ง / กระตุก / disconnect
```

## Commands

| command | ทำอะไร |
|---|---|
| `!vc-extreme` | เปิด menu ยิง |
| `!stop` | หยุดยิง |
| ปุ่ม เริ่มการยิง | กรอก IP+Port แล้วยิง |
| ปุ่ม สอนหาไอพี | วิธีหา Voice Server IP จาก Resource Monitor |
| ปุ่ม หยุดยิง | หยุดยิง |

## วิธีหา Voice Server IP + Port

1. เข้าห้องเสียงเป้าหมาย
2. กด `Ctrl+Shift+Esc` → Performance → Open Resource Monitor
3. แถบ Network → Network Connections
4. หา `Discord.exe` → ดู Remote Address + Remote Port (50000-65000)
5. นำ IP + Port มาใส่ในบอท

---

## Setup

### 1. สร้าง Bot Token
- [discord.com/developers/applications](https://discord.com/developers/applications)
- New Application → Bot → Reset Token
- เปิด **Message Content Intent**

### 2. ติดตั้ง

```bash
npm install
```

### 3. ตั้ง TOKEN

สร้างไฟล์ `.env`:
```
TOKEN=bot_token_ของแก
```

หรือ export ตรงๆ:
```bash
TOKEN=xxx node index.js
```

### 4. รัน

```bash
node index.js
```

---

## bot-hosting.net

| Startup field | ค่า |
|---|---|
| Language | Node.js |
| Bot JS file | `index.js` |

**Variables tab:**
```
TOKEN = bot_token_ของแก
```

> bot-hosting มี Python3 built-in — vcboom.py รันได้เลย
