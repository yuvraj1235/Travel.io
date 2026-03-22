# 🚀 RUN ME - SUPER QUICK START

## ⚠️ FIRST TIME SETUP

### Install Node.js (REQUIRED for Frontend)

1. Go to https://nodejs.org
2. Download **LTS version** (recommended)
3. Run the installer, click Next until done
4. **Restart your PowerShell completely** (close it and open a new one!)
5. Verify it worked:
```powershell
node --version
npm --version
```

---

## Step 1️⃣: Install Python Packages (Backend)

Open **PowerShell** and copy-paste:

```powershell
cd "c:\Users\ROSHINI\Desktop\Travel-Planner\Travel.io\backend"
pip install -r requirements.txt
```

Wait for it to finish (should take 1-2 minutes).

---

## Step 2️⃣: Start Backend Server

In the **same PowerShell**, run:

```powershell
python -m uvicorn src.main:app --reload --port 8000
```

✅ **DONE!** You should see:
```
Uvicorn running on http://127.0.0.1:8000
Application startup complete.
```

**Keep this window open!**

---

## Step 3️⃣: Start Frontend - **NEW POWERSHELL WINDOW**

Open a **new PowerShell** window and run:

```powershell
cd "c:\Users\ROSHINI\Desktop\Travel-Planner\Travel.io\frontend"
npm install
npm run dev
```

✅ **DONE!** You should see:
```
▲ Next.js 16.1.6
- Local: http://localhost:3000
```

**Keep this window open!**

---

## 🎉 NOW YOU'RE READY!

🌐 **Open in your browser:**
- http://localhost:3000 ← **Your App (START HERE!)**
- http://localhost:8000/docs ← API Docs (see all endpoints)

---

## 🧪 Test It Works

### Try Login (No Real Password Needed!)
1. Click **Login** on the homepage
2. Enter ANY email and password:
   - Email: `test@example.com`
   - Password: `anything123`
3. Click Sign In

It will log you in! ✅

### Try Creating a Trip
1. After login, click **Create Trip**
2. Fill in any destination (e.g., "Paris")
3. Set dates and budget
4. Click Create

It will create a trip with a real city photo! ✅

---

## ❓ Troubleshooting

### ❌ "npm not found" AFTER installing Node.js
- **Close PowerShell completely**
- **Open a NEW PowerShell window**
- Try again

### ❌ "Port 8000 already in use"
- Close backend PowerShell window
- Wait 5 seconds
- Run backend command again

### ❌ "Backend says error"
- Make sure Python packages are installed
- Run: `pip install -r requirements.txt` again

### ❌ "Frontend won't load"
- Make sure backend is running (check PowerShell #1)
- Check http://localhost:8000 in browser
- If it shows API message, backend is OK!

---

## 📁 Your Servers

```
Terminal 1 (Backend):  http://localhost:8000 ← Keep running
Terminal 2 (Frontend): http://localhost:3000 ← Keep running
Browser:               http://localhost:3000 ← Open this ONE!
```

---

## 🎯 What Works Right Now

✅ Login page (any email/password works!)
✅ Create trips
✅ Add activities
✅ View all your trips  
✅ Everything is LOCAL - no API keys needed!

**No database setup needed. No credentials needed. Just run and code!** 🚀

---

## 💡 Pro Tips

- **Restart breaks things?** Kill both PowerShells and start fresh (Steps 2 & 3)
- **Want to make changes?** Edit code, servers auto-reload!
- **Clear stuck login?** Close browser tab and open again

---

## 🔜 Next Steps (Later)

When ready for REAL APIs:
1. Get Google OAuth (still optional)
2. Get Unsplash API (for real city photos)
3. Set up real database

For now, **all test features work!** ✨

