import React from 'react';
import {
  Container,
  Box,
  Typography,
  Button,
  Grid,
  Card,
  CardContent,
  CardActions,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import EcoIcon from '@mui/icons-material/Eco';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import SmartToyIcon from '@mui/icons-material/SmartToy';

const HomePage = () => {
  const navigate = useNavigate();

  const features = [
    {
      icon: <SmartToyIcon sx={{ fontSize: 48, color: '#2e7d32' }} />,
      title: 'AI Chatbot Assistant',
      description:
        'Get personalized travel recommendations and eco-friendly tips powered by intelligent AI.',
    },
    {
      icon: <EcoIcon sx={{ fontSize: 48, color: '#4caf50' }} />,
      title: 'Eco-Friendly Planning',
      description:
        'Plan trips with carbon footprint tracking and sustainable travel options.',
    },
    {
      icon: <TrendingUpIcon sx={{ fontSize: 48, color: '#ffa726' }} />,
      title: 'Rewards & Gamification',
      description:
        'Earn points and badges for making eco-conscious travel choices. Compete on our leaderboard!',
    },
  ];

  return (
    <Box sx={{ minHeight: '100vh', pb: 4 }}>
      {/* Hero Section */}
      <Box
        sx={{
          background: 'linear-gradient(135deg, #1b5e20 0%, #2e7d32 50%, #4caf50 100%)',
          color: '#fff',
          py: 10,
          textAlign: 'center',
          position: 'relative',
          overflow: 'hidden',
          '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundImage:
              'radial-gradient(circle at 20% 50%, rgba(255, 255, 255, 0.05) 0%, transparent 50%)',
            pointerEvents: 'none',
          },
        }}
      >
        <Container maxWidth="md" sx={{ position: 'relative', zIndex: 1 }}>
          <Typography
            variant="h1"
            sx={{
              mb: 2,
              fontSize: { xs: '2rem', md: '3.5rem' },
              fontWeight: 700,
              letterSpacing: '1px',
            }}
          >
            🌍 Travel Green. Live Better.
          </Typography>
          <Typography
            variant="h5"
            sx={{
              mb: 4,
              fontSize: { xs: '1rem', md: '1.5rem' },
              fontWeight: 300,
              opacity: 0.95,
            }}
          >
            Discover sustainable travel experiences while earning rewards for your eco-conscious choices.
          </Typography>
          <Button
            variant="contained"
            size="large"
            onClick={() => navigate('/plan')}
            sx={{
              px: 4,
              py: 1.5,
              fontSize: '1.1rem',
              background: '#ffa726',
              color: '#fff',
              fontWeight: 600,
              '&:hover': {
                background: '#f57c00',
              },
            }}
          >
            Start Planning Your Journey
          </Button>
        </Container>
      </Box>

      {/* Features Section */}
      <Container maxWidth="lg" sx={{ py: 8 }}>
        <Typography
          variant="h2"
          sx={{
            textAlign: 'center',
            mb: 6,
            color: '#1b5e20',
          }}
        >
          Why Choose GreenWander?
        </Typography>

        <Grid container spacing={4}>
          {features.map((feature, index) => (
            <Grid item xs={12} md={4} key={index}>
              <Card
                sx={{
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  textAlign: 'center',
                  p: 3,
                }}
              >
                <Box sx={{ mb: 2 }}>{feature.icon}</Box>
                <CardContent sx={{ flex: 1 }}>
                  <Typography variant="h5" sx={{ mb: 2, color: '#1b5e20', fontWeight: 600 }}>
                    {feature.title}
                  </Typography>
                  <Typography variant="body2" color="textSecondary" sx={{ lineHeight: 1.6 }}>
                    {feature.description}
                  </Typography>
                </CardContent>
                <CardActions sx={{ justifyContent: 'center', pt: 0 }}>
                  <Button
                    size="small"
                    sx={{ color: '#2e7d32', fontWeight: 600 }}
                    onClick={() => navigate('/plan')}
                  >
                    Explore →
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* CTA Section */}
      <Box
        sx={{
          background: 'rgba(46, 125, 50, 0.08)',
          py: 8,
          borderTop: '2px solid #e0e0e0',
          borderBottom: '2px solid #e0e0e0',
        }}
      >
        <Container maxWidth="md" sx={{ textAlign: 'center' }}>
          <Typography variant="h3" sx={{ mb: 3, color: '#1b5e20' }}>
            Ready to Make a Difference?
          </Typography>
          <Typography variant="body1" sx={{ mb: 4, color: '#555', fontSize: '1.1rem' }}>
            Join thousands of eco-conscious travelers making sustainable choices every day.
          </Typography>
          <Button
            variant="contained"
            size="large"
            onClick={() => navigate('/plan')}
            sx={{
              px: 4,
              py: 1.5,
              fontSize: '1.1rem',
              background: 'linear-gradient(135deg, #2e7d32 0%, #4caf50 100%)',
              fontWeight: 600,
            }}
          >
            Plan Your Eco-Trip Now
          </Button>
        </Container>
      </Box>
    </Box>
  );
};

export default HomePage;
