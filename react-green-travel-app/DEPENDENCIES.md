# GreenWander React App - Complete Setup Checklist

## 📦 Dependencies to Install

Run this command in your project directory:

```bash
npm install
```

### Production Dependencies
- `react@18.2.0` - React library
- `react-dom@18.2.0` - React rendering
- `react-router-dom@6.20.0` - Client-side routing with lazy loading support
- `axios@1.6.2` - HTTP client for API calls
- `@mui/material@5.14.0` - Material Design UI components
- `@mui/icons-material@5.14.0` - Material Design icons
- `@emotion/react@11.11.0` - CSS-in-JS styling engine
- `@emotion/styled@11.11.0` - Styled components for Emotion

### Dev Dependencies (automatic with Vite)
- `vite@5.0.0` - Modern build tool
- `@vitejs/plugin-react@4.2.0` - React support for Vite

**Total Install Size**: ~250MB (with node_modules)

## 📝 All Files Created

### Configuration Files
- ✅ `package.json` - Project metadata and dependencies
- ✅ `vite.config.js` - Vite config with proxy to backend
- ✅ `.env` - Environment variables
- ✅ `.env.example` - Environment template
- ✅ `.gitignore` - Git ignore patterns
- ✅ `index.html` - HTML entry point

### Core Application
- ✅ `src/main.jsx` - React entry point
- ✅ `src/App.jsx` - Main app component with routing
- ✅ `src/index.css` - Global styles

### Components (`src/components/`)
- ✅ `AppBar.jsx` - Responsive navigation bar
- ✅ `Footer.jsx` - Footer with copyright
- ✅ `ChatFloatingButton.jsx` - FAB for mini chat drawer

### Pages (`src/pages/`)
- ✅ `HomePage.jsx` - Landing page with hero and features
- ✅ `PlanTripPage.jsx` - Trip search and booking
- ✅ `DashboardPage.jsx` - User profile and challenges
- ✅ `LeaderboardPage.jsx` - Rankings and leaderboard
- ✅ `ChatPage.jsx` - Full-page chat interface

### Services (`src/services/`)
- ✅ `api.js` - Axios API service layer with all endpoints

### Context (`src/contexts/`)
- ✅ `UserContext.jsx` - Global user state with Context API

### Config (`src/config/`)
- ✅ `theme.js` - MUI theme with green eco palette

### Documentation
- ✅ `README.md` - Complete project documentation
- ✅ `SETUP.md` - Setup and installation guide
- ✅ `DEPENDENCIES.md` - This file

---

## 🚀 Quick Start Commands

```bash
# 1. Navigate to project
cd d:\codeplayground\react-green-travel-app

# 2. Install all dependencies
npm install

# 3. Make sure backend is running on http://localhost:8080

# 4. Start development server
npm run dev

# 5. Open http://localhost:5173 in browser
```

## 🔌 Vite Proxy Configuration

The `vite.config.js` automatically proxies API requests:

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

**How it works:**
- Request: `POST http://localhost:5173/api/chat`
- Proxied to: `POST http://localhost:8080/api/chat`
- Eliminates CORS issues during development

## 🎯 Required Backend Endpoints

Your Spring Boot backend must provide these endpoints:

```
1. POST /api/chat
   Body: { userId: number, message: string }
   Response: { reply: string }

2. GET /api/recommendations
   Query: destination, budget, days, ecoFriendly
   Response: [ { id, name, price, co2Kg, description, transportType }, ... ]

3. GET /api/gamification/profile/{userId}
   Response: { totalPoints, currentBadge, progressPercent }

4. POST /api/bookings
   Body: { userId, tripOptionId }
   Response: { bookingId, pdfUrl }

5. GET /api/leaderboard
   Response: [ { rank, userId, name, points, badge }, ... ]
```

## 🎨 Customizable Elements

### Colors (Edit `src/config/theme.js`)
```javascript
palette: {
  primary: {
    main: '#2e7d32',    // Forest Green
    light: '#4caf50',   // Light Green
    dark: '#1b5e20',    // Dark Green
  },
  secondary: {
    main: '#ffa726',    // Orange
  }
}
```

### Mock Data (Hardcoded in pages)
- **Challenges**: Edit `src/pages/DashboardPage.jsx` (line ~29)
- **Co2 Indicator Logic**: `src/pages/PlanTripPage.jsx` (line ~128)

### User Context (Edit `src/contexts/UserContext.jsx`)
- Default demo user: `userId: 1, name: 'Traveler'`
- Implement real login by modifying `UserProvider`

## 📊 File Statistics

| Category | Count |
|----------|-------|
| Config Files | 6 |
| Components | 3 |
| Pages | 5 |
| Services | 1 |
| Context | 1 |
| Config | 1 |
| Styles | 1 |
| Documentation | 3 |
| **Total** | **21 files** |

## ✨ Key Features Breakdown

### 1. HomePage
- Hero section with CTA button
- 3 feature cards (Chatbot, Eco-Planning, Rewards)
- Responsive design
- Smooth animations

### 2. PlanTripPage
- Form with destination input
- Budget slider (1000-20000)
- Days input (1-30)
- Eco-friendly filter checkbox
- Results grid with trip cards
- CO₂ impact indicators (🟢 🟡 🔴)
- Book Now with loading state
- Success notifications

### 3. DashboardPage
- 4 summary cards (Points, Badge, Trips, CO₂ Saved)
- Badge progress bar
- 4 eco-challenges with progress
- Loading skeleton on first load
- Error handling

### 4. LeaderboardPage
- Top 3 users with medals (🥇 🥈 🥉)
- Full ranking table
- Avatar display
- Badge chips
- Points with star icon
- Responsive table layout

### 5. ChatPage
- Full-page chat interface
- User/AI message differentiation
- Typing indicator animation
- Clear chat button
- Auto-scroll to latest message
- Error handling
- Loading states

### 6. ChatFloatingButton
- FAB on bottom-right
- Mini chat drawer
- Same chat functionality
- Auto-scrolls to latest message
- Accessible close button

## 🔧 Vite Features Used

- ✅ Hot Module Replacement (HMR)
- ✅ Fast cold start
- ✅ Pre-bundling for dependencies
- ✅ CSS preprocessing
- ✅ Development proxy
- ✅ Optimized build output

## 🌐 Browser Support

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## 📚 Code Patterns Used

- **Hooks**: useState, useEffect, useRef, useContext
- **Components**: Functional components with hooks
- **Routing**: React Router v6 with route nesting
- **State**: React Context API (no Redux needed)
- **Styling**: MUI's sx prop + Emotion CSS-in-JS
- **API**: Axios with async/await
- **Error Handling**: Try-catch blocks with Snackbar notifications
- **Loading States**: Conditional rendering and spinners

## 🎓 Learning Resources

If you need to extend or modify the app:

1. **Vite**: https://vitejs.dev/guide/
2. **React 18**: https://react.dev/
3. **React Router v6**: https://reactrouter.com/
4. **Material-UI v5**: https://mui.com/material-ui/getting-started/
5. **Axios**: https://axios-http.com/docs/intro

## ✅ Pre-Launch Checklist

- [ ] Run `npm install`
- [ ] Spring Boot backend running on `http://localhost:8080`
- [ ] All 5 API endpoints implemented
- [ ] Run `npm run dev`
- [ ] App loads at `http://localhost:5173`
- [ ] Navigation links work
- [ ] Chat sends messages successfully
- [ ] Trip recommendations load
- [ ] Dashboard shows profile
- [ ] Leaderboard displays correctly

## 🎉 You're Ready!

All files are complete and ready to use. Just run:

```bash
npm install && npm run dev
```

Then open your browser and enjoy the app! 🌍✨

---

**Questions? Check the backend API endpoints are returning the correct data format.**
