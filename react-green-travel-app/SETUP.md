# GreenWander React App - Setup Guide

## ✅ Project Ready!

Your complete React Vite application has been created with all the required features.

## 📂 Project Location
```
d:\codeplayground\react-green-travel-app
```

## 🎯 What's Included

✅ **Vite Configuration** with API proxy to `http://localhost:8080`
✅ **React Router** with 5 pages and navigation
✅ **Material-UI** with custom green eco-friendly theme
✅ **Axios API Service** for backend integration
✅ **React Context** for user state management
✅ **All Components**: AppBar, Footer, ChatFloatingButton
✅ **All Pages**: Home, PlanTrip, Dashboard, Leaderboard, Chat
✅ **Responsive Design** for mobile, tablet, and desktop
✅ **Error Handling & Loading States** with Snackbar notifications

## 🚀 Installation & Setup

### Step 1: Navigate to Project
```bash
cd d:\codeplayground\react-green-travel-app
```

### Step 2: Install Dependencies
```bash
npm install
```

This installs:
- react & react-dom
- react-router-dom
- axios
- @mui/material
- @mui/icons-material
- @emotion/react & @emotion/styled
- vite & @vitejs/plugin-react

### Step 3: Verify Backend is Running
Make sure your Spring Boot backend is running on:
```
http://localhost:8080
```

### Step 4: Start Development Server
```bash
npm run dev
```

You'll see output like:
```
VITE v5.0.0  ready in 123 ms

➜  Local:   http://localhost:5173/
```

### Step 5: Open in Browser
Navigate to `http://localhost:5173/`

## 📝 Development Commands

```bash
npm run dev       # Start development server with hot reload
npm run build     # Create optimized production build
npm run preview   # Preview production build locally
```

## 🔧 Vite Configuration

The `vite.config.js` includes proxy configuration:
```javascript
server: {
  proxy: {
    '/api': {
      target: 'http://localhost:8080',
      changeOrigin: true,
      secure: false
    }
  }
}
```

All API requests to `/api/*` are automatically proxied to your backend.

## 📱 Pages Available

| Route | Component | Features |
|-------|-----------|----------|
| `/` | HomePage | Hero section, features, CTA |
| `/plan` | PlanTripPage | Trip search form, results with CO₂ tracking, booking |
| `/dashboard` | DashboardPage | User profile, points, badges, eco-challenges |
| `/leaderboard` | LeaderboardPage | Top 3 highlight, full ranking table |
| `/chat` | ChatPage | Full-page chat with typing indicator |

Plus: **ChatFloatingButton** available on all pages (bottom-right FAB)

## 🎨 Theme Colors

- **Primary Green**: #2e7d32 (Forest Green)
- **Light Green**: #4caf50 (Eco Green)
- **Dark Green**: #1b5e20 (Deep Green)
- **Secondary Orange**: #ffa726 (Warm Accent)
- **Success**: #66bb6a (Light Green)

## 🔌 API Integration

The app connects to your Spring Boot backend. Required endpoints:

```
POST /api/chat
GET  /api/recommendations?destination=...&budget=...&days=...
GET  /api/gamification/profile/{userId}
POST /api/bookings
GET  /api/leaderboard
```

See `src/services/api.js` for implementation details.

## 📂 Project Structure

```
react-green-travel-app/
├── index.html              # Entry HTML
├── package.json            # Dependencies
├── vite.config.js          # Vite configuration with proxy
├── .env                    # Environment variables
├── .gitignore             # Git ignore rules
├── README.md              # Full documentation
└── src/
    ├── main.jsx           # React entry point
    ├── App.jsx            # Main app with routing
    ├── index.css          # Global styles
    ├── components/
    │   ├── AppBar.jsx
    │   ├── Footer.jsx
    │   └── ChatFloatingButton.jsx
    ├── pages/
    │   ├── HomePage.jsx
    │   ├── PlanTripPage.jsx
    │   ├── DashboardPage.jsx
    │   ├── LeaderboardPage.jsx
    │   └── ChatPage.jsx
    ├── services/
    │   └── api.js         # Axios API calls
    ├── contexts/
    │   └── UserContext.jsx    # Global user state
    └── config/
        └── theme.js       # MUI theme configuration
```

## 🌐 Environment Variables

Create `.env` file (already created with defaults):
```
VITE_API_BASE_URL=http://localhost:8080
```

## ✨ Features Highlight

### 1️⃣ **Trip Planning**
- Form with destination, budget (slider), days, eco-friendly filter
- Results display with CO₂ impact (🟢 low, 🟡 moderate, 🔴 high)
- Transport type icons (car, train, flight)
- Book Now functionality with PDF download

### 2️⃣ **User Dashboard**
- Profile summary cards (points, badge, trips, CO₂ saved)
- Progress bar to next badge level
- Eco-challenges list with progress tracking

### 3️⃣ **Leaderboard**
- Top 3 users highlighted with medals (🥇 🥈 🥉)
- Full ranking table with badges and points
- Avatar display for each user

### 4️⃣ **Chatbot**
- Full-page chat interface
- Mini chat drawer (FAB) on other pages
- Typing indicator animation
- Message history
- Clear chat function

### 5️⃣ **Responsive Navigation**
- Desktop: Inline navigation menu
- Mobile: Hamburger menu with drawer
- Active page highlighting
- Sticky AppBar

## 🐛 Troubleshooting

### Issue: API calls fail with 404
**Solution**: Make sure your Spring Boot backend is running on `http://localhost:8080` with the required endpoints.

### Issue: Hot reload not working
**Solution**: Try clearing browser cache or using Ctrl+Shift+R hard refresh.

### Issue: Port 5173 already in use
**Solution**: Vite will automatically use the next available port. Check terminal output for the actual URL.

### Issue: CORS errors
**Solution**: The proxy in `vite.config.js` handles CORS during development. For production, configure CORS on your backend.

## 🚀 Production Build

When ready for production:

```bash
npm run build
```

This creates an optimized `dist/` folder ready for deployment.

For deployment to services like Vercel, Netlify, or GitHub Pages:
1. Update `VITE_API_BASE_URL` to point to your production backend
2. Deploy the `dist/` folder

## 📖 Additional Resources

- [Vite Docs](https://vitejs.dev/)
- [React Docs](https://react.dev/)
- [React Router](https://reactrouter.com/)
- [Material-UI Documentation](https://mui.com/)
- [Axios Documentation](https://axios-http.com/)

## ✅ Next Steps

1. ✅ Run `npm install` to install dependencies
2. ✅ Start your Spring Boot backend on port 8080
3. ✅ Run `npm run dev` to start the React app
4. ✅ Open `http://localhost:5173` in your browser
5. ✅ Test the endpoints and features

---

**Happy Eco-Traveling! 🌍✨**
