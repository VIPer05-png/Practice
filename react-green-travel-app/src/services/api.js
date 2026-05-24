import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Chat endpoint
export const sendMessage = async (userId, message) => {
  try {
    const response = await api.post('/api/chat', {
      userId,
      message,
    });
    return response.data;
  } catch (error) {
    console.error('Chat error:', error);
    throw error;
  }
};

// Get trip recommendations
export const getRecommendations = async (destination, budget, days, ecoFriendlyOnly = false) => {
  try {
    const response = await api.get('/api/recommendations', {
      params: {
        destination,
        budget,
        days,
        ecoFriendly: ecoFriendlyOnly,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Recommendations error:', error);
    throw error;
  }
};

// Get user gamification profile
export const getUserProfile = async (userId) => {
  try {
    const response = await api.get(`/api/gamification/profile/${userId}`);
    return response.data;
  } catch (error) {
    console.error('User profile error:', error);
    throw error;
  }
};

// Create a booking
export const createBooking = async (userId, tripOptionId) => {
  try {
    const response = await api.post('/api/bookings', {
      userId,
      tripOptionId,
    });
    return response.data;
  } catch (error) {
    console.error('Booking error:', error);
    throw error;
  }
};

// Get leaderboard
export const getLeaderboard = async () => {
  try {
    const response = await api.get('/api/leaderboard');
    return response.data;
  } catch (error) {
    console.error('Leaderboard error:', error);
    throw error;
  }
};

export default api;
