import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import { CssBaseline, Box } from '@mui/material';
import theme from './config/theme';
import { UserProvider } from './contexts/UserContext';
import AppBar from './components/AppBar';
import Footer from './components/Footer';
import ChatFloatingButton from './components/ChatFloatingButton';

// Pages
import HomePage from './pages/HomePage';
import PlanTripPage from './pages/PlanTripPage';
import DashboardPage from './pages/DashboardPage';
import LeaderboardPage from './pages/LeaderboardPage';
import ChatPage from './pages/ChatPage';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <UserProvider>
        <Router>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              minHeight: '100vh',
            }}
          >
            <AppBar />

            <Box
              component="main"
              sx={{
                flex: 1,
                width: '100%',
              }}
            >
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/plan" element={<PlanTripPage />} />
                <Route path="/dashboard" element={<DashboardPage />} />
                <Route path="/leaderboard" element={<LeaderboardPage />} />
                <Route path="/chat" element={<ChatPage />} />
              </Routes>
            </Box>

            <Footer />

            {/* Floating Chat Button - Available on all pages except chat page */}
            <ChatFloatingButton />
          </Box>
        </Router>
      </UserProvider>
    </ThemeProvider>
  );
}

export default App;
