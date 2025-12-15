# Portfolio Website - Puspender Kumar

A modern, responsive portfolio website showcasing my skills, education, and projects as a BCA AI student at CodeQuotient School of Technology. Features a fully functional contact form with MongoDB backend.

## Features

- 🎨 Modern and professional design with gradient effects
- 📱 Fully responsive layout (mobile, tablet, desktop)
- ⚡ Smooth scrolling and animations
- 🎯 Interactive navigation with active section highlighting
- 📊 Animated skill progress bars
- 💼 Project showcase section
- 📧 **Fully functional contact form** with MongoDB database
- 🌐 Social media integration

## Technologies Used

**Frontend:**
- HTML5, CSS3, JavaScript (Vanilla)
- Font Awesome Icons
- Google Fonts

**Backend:**
- Node.js + Express
- MongoDB (Atlas)
- Mongoose ODM
- CORS enabled
- Environment variables (.env)

## Project Structure

```
portfolio/
├── Frontend (hosted on GitHub Pages)
│   ├── index.html
│   ├── about.html
│   ├── education.html
│   ├── skills.html
│   ├── projects.html
│   ├── contact.html
│   ├── styles.css
│   ├── script.js
│   └── contact-form.js
├── Backend (hosted on Render)
│   ├── server.js
│   ├── package.json
│   ├── .env (not in repo)
│   └── .env.example
└── README.md
```

## Quick Start

### Prerequisites

- Node.js (v14+)
- npm or yarn
- MongoDB Atlas account (free tier works)
- Git account (for GitHub Pages deployment)

### Local Setup

1. **Clone or download** this repository
   ```bash
   git clone https://github.com/your-username/portfolio.git
   cd portfolio
   ```

2. **Install backend dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env
   ```
   Then edit `.env` and add your MongoDB connection string from MongoDB Atlas:
   ```
   MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/portfolio_contacts?retryWrites=true&w=majority
   PORT=5000
   ```

4. **Start the backend server**
   ```bash
   npm start
   ```
   Server runs on http://localhost:5000

5. **Open frontend in browser**
   - Open `index.html` in your browser or use a local server:
   ```bash
   # Using Python 3
   python -m http.server 5500
   # Then open http://localhost:5500
   ```

### MongoDB Setup

1. Create a free account at [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a new cluster (shared tier is free)
3. Create a database user with password
4. Get your connection string: **Connect → Drivers → Node.js**
5. Add your IP to the IP Whitelist (or allow 0.0.0.0/0 for testing)
6. Paste the connection string into your `.env` file

## Deployment

### Frontend Deployment (GitHub Pages)

1. **Create a GitHub repository**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin https://github.com/your-username/portfolio.git
   git push -u origin main
   ```

2. **Enable GitHub Pages**
   - Go to repository Settings → Pages
   - Set source to "main" branch
   - Your site will be live at `https://your-username.github.io/portfolio`

3. **Update contact form for production**
   - Edit `contact-form.js` and set your backend URL:
   ```javascript
   const BACKEND_URL = 'https://your-render-app.onrender.com';
   ```
   - Update the `.env` file with your GitHub Pages URL for CORS:
   ```
   FRONTEND_URL=https://your-username.github.io/portfolio
   ```

### Backend Deployment (Render)

1. **Push to GitHub** (repository must be public)
   ```bash
   git push origin main
   ```

2. **Create Render account** at [render.com](https://render.com)

3. **Create New Web Service**
   - Connect your GitHub repository
   - Environment: Node
   - Build command: `npm install`
   - Start command: `node server.js`
   - Auto-deploy: enabled

4. **Add Environment Variables on Render**
   - Go to Environment → Add Variable
   - Add: `MONGODB_URI` (your MongoDB Atlas connection string)
   - Add: `PORT` (will be set by Render, but good to have)
   - Add: `FRONTEND_URL=https://your-username.github.io/portfolio`
   - Add: `NODE_ENV=production`

5. **Deploy**
   - Service will deploy automatically from your main branch
   - Access your backend at `https://your-app-name.onrender.com`

### Verify Deployment

1. Test the contact form on your GitHub Pages site
2. Check backend is responding:
   ```bash
   curl https://your-app-name.onrender.com/
   ```
3. View submitted contacts (admin endpoint):
   ```bash
   curl https://your-app-name.onrender.com/api/contacts
   ```

## API Endpoints

| Method | Endpoint | Purpose |
|--------|----------|---------|
| POST | `/api/contact` | Submit contact form |
| GET | `/api/contacts` | Get all contacts (admin) |
| GET | `/api/contacts/:id` | Get specific contact |

### POST /api/contact

**Request Body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "phone": "+91-XXXXX-XXXXX",
  "subject": "Project Inquiry",
  "message": "Hi, I'm interested in..."
}
```

**Success Response (201):**
```json
{
  "message": "Contact form submitted successfully!",
  "data": {
    "id": "507f1f77bcf86cd799439011",
    "name": "John Doe",
    "email": "john@example.com"
  }
}
```

## Customization

### Update Personal Information

1. **Contact Details** - Edit `contact.html` section
2. **Social Links** - Update GitHub/LinkedIn/Twitter URLs throughout
3. **About Section** - Edit `about.html`
4. **Skills** - Edit `skills.html` and update progress bars
5. **Projects** - Edit `projects.html` with your projects

### Color Scheme

Edit CSS variables in `styles.css`:
```css
:root {
    --primary-color: #6366f1;
    --secondary-color: #8b5cf6;
    --accent-color: #ec4899;
    /* ... more variables ... */
}
```

### Disable Contact Form (Optional)

If you don't want the contact form, simply:
1. Remove the contact form section from `contact.html`
2. Don't include `contact-form.js` script tag
3. Don't deploy the backend

## Security Notes

- **Never** commit `.env` file to GitHub (use `.gitignore`)
- Always use strong MongoDB passwords
- In production, add proper authentication for admin endpoints
- Validate all form inputs on backend (already done)
- Use HTTPS for all API calls (automatic on Render)

## Troubleshooting

### Contact form not sending?
- Check browser console for errors (F12 → Console)
- Verify backend URL in `contact-form.js`
- Ensure backend is running and accessible
- Check CORS settings in `server.js`

### MongoDB connection failing?
- Verify connection string in `.env`
- Check IP whitelist in MongoDB Atlas
- Ensure database credentials are correct
- Check network connectivity

### Backend won't start?
- Run `npm install` to install dependencies
- Check `.env` file exists and has `MONGODB_URI`
- Look at console output for specific errors
- On Windows, use PowerShell or Git Bash (not regular CMD)

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## License

Open source - feel free to use for your own portfolio.

## Contact

**Puspender Kumar**
- BCA AI Student at CodeQuotient School of Technology
---

Made with ❤️ by Puspender Kumar

