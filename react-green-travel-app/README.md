# GreenWander - React Eco-Travel Management Application

A modern, responsive React application for planning eco-friendly travel experiences with gamification features, a chatbot, and a leaderboard.

## 🌍 Features

- **Smart Trip Recommendations**: AI-powered suggestions based on destination, budget, and duration
- **Carbon Footprint Tracking**: See CO₂ impact of each trip with visual indicators
- **Eco-Travel Assistant**: Full-page and floating chatbot for eco-travel advice
- **Gamification System**: Earn points, collect badges, and compete on the leaderboard
- **User Dashboard**: Track your eco-travel progress and complete challenges
- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile devices
- **Green Theme**: Eco-friendly color palette with smooth animations

## 📋 Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── AppBar.jsx      # Top navigation bar with responsive menu
│   ├── Footer.jsx      # Footer with copyright info
│   └── ChatFloatingButton.jsx  # Floating chat FAB
├── pages/              # Full page components
│   ├── HomePage.jsx    # Landing page with hero section
│   ├── PlanTripPage.jsx   # Trip search and booking
│   ├── DashboardPage.jsx  # User progress and challenges
│   ├── LeaderboardPage.jsx    # Top travelers ranking
│   └── ChatPage.jsx    # Full-page chat interface
├── contexts/           # React Context for state management
│   └── UserContext.jsx # Global user state
├── services/           # API integration
│   └── api.js         # Axios API calls
├── config/            # Configuration files
│   └── theme.js       # MUI theme with green palette
├── App.jsx            # Main app with routing
├── main.jsx           # React entry point
└── index.css          # Global styles
```

## 🚀 Quick Start

### Prerequisites
- Node.js 16+ and npm/yarn
- Backend running at `http://localhost:8080` with the required Spring Boot endpoints

### 1. Install Dependencies

```bash
cd react-green-travel-app
npm install
```

### 2. Configure Environment

Copy `.env.example` to `.env` and update if needed:
```bash
VITE_API_BASE_URL=http://localhost:8080
```

### 3. Start Development Server

```bash
npm run dev
```

The app will be available at `http://localhost:5173`

Vite automatically proxies `/api` requests to `http://localhost:8080`

### 4. Build for Production

```bash
npm run build
npm run preview  # Test production build locally
```

## 📦 Dependencies

Core dependencies installed:
- **react** (18.2.0): UI library
- **react-dom** (18.2.0): React rendering
- **react-router-dom** (6.20.0): Client-side routing
- **axios** (1.6.2): HTTP client
- **@mui/material** (5.14.0): UI component library
- **@mui/icons-material** (5.14.0): Icon set
- **@emotion/react** & **@emotion/styled** (11.11.0): CSS-in-JS

Dev dependencies:
- **vite** (5.0.0): Build tool
- **@vitejs/plugin-react** (4.2.0): React support for Vite

## 🔌 API Integration

All API calls are in `src/services/api.js`. The app expects these endpoints:

```
POST /api/chat
  Request: { userId, message }
  Response: { reply }

GET /api/recommendations
  Query: ?destination=...&budget=...&days=...&ecoFriendly=...
  Response: [{ id, name, price, co2Kg, description, transportType }, ...]

GET /api/gamification/profile/{userId}
  Response: { totalPoints, currentBadge, progressPercent }

POST /api/bookings
  Request: { userId, tripOptionId }
  Response: { bookingId, pdfUrl }

GET /api/leaderboard
  Response: [{ rank, userId, name, points, badge }, ...]
```

## 🎨 Customization

### Theme Colors

Edit `src/config/theme.js` to customize the green eco-friendly palette:
- Primary: `#2e7d32` (Forest Green)
- Secondary: `#ffa726` (Warm Orange)
- Success: `#66bb6a` (Light Green)

### Mock Data

- Dashboard challenges are hardcoded in `DashboardPage.jsx`
- Update them in the `ecoChallenges` array
- Leaderboard fetches from the backend, but can be extended with local mock data

### User Context

The app uses a demo user (userId=1) by default. To implement real authentication:
1. Update `src/contexts/UserContext.jsx`
2. Add login flow to set user data after authentication

## 🌐 Vite Configuration

The `vite.config.js` includes:
- React plugin for JSX/Babel support
- Proxy configuration for API requests:
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

During development, `/api/chat` requests are automatically proxied to `http://localhost:8080/api/chat`

## 📱 Responsive Design

- **Mobile First**: Layout adapts to screens as small as 320px
- **Tablet**: Enhanced UI for mid-size screens (md breakpoint: 900px)
- **Desktop**: Full features on large screens (lg breakpoint: 1200px)

Navigation drawer on mobile, inline menu on desktop

## ♿ Accessibility

- Semantic HTML structure
- ARIA labels on interactive elements
- Keyboard navigation support
- Focus-visible styles for accessibility

## 🔒 Notes

- The app currently uses a demo userId (1). For production, implement proper authentication.
- The floating chat button appears on all pages except the full chat page.
- All form submissions include loading states and error handling.
- Toast notifications (Snackbar) inform users of success/error states.

## 📝 Browser Support

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## 💡 Tips

1. **Hot Module Replacement**: Vite provides instant updates during development
2. **Network Tab**: Check browser DevTools to see proxied API requests
3. **Redux DevTools**: Can be integrated for complex state management
4. **Component Library**: All components use MUI's `sx` prop for styling

## 🤝 Contributing

Feel free to extend this app with:
- User authentication (OAuth, JWT)
- Real-time notifications
- Advanced filtering on trip search
- User reviews and ratings
- Photo galleries for destinations
- Integration with payment gateways

## 📧 Support

For issues or questions about the app, check the backend API documentation and ensure it's running on `http://localhost:8080`

---

**Made with 🌱 for Eco-Conscious Travelers**
