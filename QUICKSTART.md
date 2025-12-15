# Quick Start Guide

## 🚀 Local Development (5 minutes)

### Step 1: Install and Configure
```bash
# Install dependencies
npm install

# Copy environment template
cp .env.example .env

# Edit .env and add your MongoDB Atlas connection string
# Example format:
# MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/portfolio_contacts?retryWrites=true&w=majority
```

### Step 2: Start Backend
```bash
npm start
```
Backend runs on: http://localhost:5000

### Step 3: Start Frontend
```bash
# In another terminal, use Python to serve HTML files
python -m http.server 5500
# Or on Mac/Linux: python3 -m http.server 5500
```
Frontend runs on: http://localhost:5500

### Step 4: Test Contact Form
1. Open http://localhost:5500/contact.html
2. Fill out the form
3. Submit - you should see success message
4. Check backend console for logs

---

## 🌍 Deployment (GitHub Pages + Render)

### Frontend on GitHub Pages

1. Create GitHub repository
2. Push code to GitHub
3. Go to Settings → Pages
4. Enable Pages from main branch
5. Live at: `https://username.github.io/portfolio`

### Backend on Render

1. Sign up at [render.com](https://render.com)
2. Create New → Web Service
3. Connect your GitHub repo
4. Add environment variables:
   ```
   MONGODB_URI=<your-mongo-atlas-connection>
   FRONTEND_URL=https://username.github.io/portfolio
   NODE_ENV=production
   ```
5. Deploy with one click

### Update Frontend for Production

Edit `contact-form.js` line 2-5:
```javascript
const BACKEND_URL = window.location.hostname === 'localhost' 
    ? 'http://localhost:5000'
    : 'https://your-render-app.onrender.com';  // ← Change this!
```

---

## 🔧 Environment Variables

```bash
# Required
MONGODB_URI=mongodb+srv://...

# Optional but recommended
PORT=5000
FRONTEND_URL=https://your-github-pages-url
NODE_ENV=development  # or production
```

---

## 📝 Common Issues & Solutions

**"Cannot POST /api/contact"**
- Check backend is running on port 5000
- Check BACKEND_URL in contact-form.js

**"MongoDB connection error"**
- Verify MONGODB_URI in .env is correct
- Check IP whitelist in MongoDB Atlas Settings
- Ensure credentials have @ and special chars escaped

**"CORS error"**
- Backend running locally? Add to CORS origins
- Using GitHub Pages? Add URL to FRONTEND_URL in .env

**Form submits but no data saved**
- Check browser console (F12) for errors
- Check backend console for validation errors
- Verify all required fields are filled

---

## 📚 File Reference

| File | Purpose | Edit for |
|------|---------|----------|
| server.js | Backend API | Adding features |
| contact-form.js | Form handler | Changing backend URL |
| .env | Secrets (not in git) | Local development |
| .gitignore | Git exclusions | Usually no change |
| README.md | Full documentation | Reference |

---

## ✅ Checklist Before Deployment

- [ ] .env has MONGODB_URI from MongoDB Atlas
- [ ] Backend runs locally with `npm start`
- [ ] Contact form submits successfully locally
- [ ] GitHub repository created and pushed
- [ ] GitHub Pages enabled in Settings
- [ ] BACKEND_URL updated in contact-form.js
- [ ] Render account created
- [ ] Render web service connected to GitHub
- [ ] Render environment variables set
- [ ] Backend deployed and running
- [ ] Contact form works on GitHub Pages

---

## 🆘 Need Help?

1. Check the main **README.md** for detailed docs
2. See **PRODUCTION_CHANGES.md** for what was updated
3. Check browser console (F12 → Console) for errors
4. Check backend console for server logs

---

Made with ❤️ - Ready to deploy!
