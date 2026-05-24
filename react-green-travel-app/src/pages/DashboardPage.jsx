import React, { useState, useEffect } from 'react';
import {
  Container,
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  LinearProgress,
  Chip,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  CircularProgress,
  Alert,
} from '@mui/material';
import EcoIcon from '@mui/icons-material/Eco';
import StarIcon from '@mui/icons-material/Star';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import AssignmentIcon from '@mui/icons-material/Assignment';
import { getUserProfile } from '../services/api';
import { useUser } from '../contexts/UserContext';

const DashboardPage = () => {
  const { user } = useUser();
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Hardcoded eco-challenges
  const ecoChallenges = [
    {
      id: 1,
      name: 'Carbon Neutral Week',
      description: 'Take eco-friendly trips for 7 consecutive days',
      points: 250,
      completed: false,
      progress: 3,
      total: 7,
    },
    {
      id: 2,
      name: 'Train Traveler',
      description: 'Book 5 trips using public transportation or trains',
      points: 150,
      completed: false,
      progress: 2,
      total: 5,
    },
    {
      id: 3,
      name: 'Local Explorer',
      description: 'Visit 3 local destinations within 100 km',
      points: 100,
      completed: true,
      progress: 3,
      total: 3,
    },
    {
      id: 4,
      name: 'Sustainable Accommodation',
      description: 'Stay at 5 eco-certified hotels',
      points: 200,
      completed: false,
      progress: 1,
      total: 5,
    },
  ];

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        setLoading(true);
        const data = await getUserProfile(user.userId);
        setProfile(data);
      } catch (err) {
        setError('Failed to load profile. Please try again later.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [user.userId]);

  if (loading) {
    return (
      <Container maxWidth="lg" sx={{ py: 8, display: 'flex', justifyContent: 'center' }}>
        <CircularProgress size={60} sx={{ color: '#2e7d32' }} />
      </Container>
    );
  }

  if (error) {
    return (
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Alert severity="error">{error}</Alert>
      </Container>
    );
  }

  const badgeEmoji = {
    beginner: '🌱',
    intermediate: '🌿',
    advanced: '🌳',
    master: '🏆',
  };

  const nextBadgeInfo = {
    beginner: 'Intermediate',
    intermediate: 'Advanced',
    advanced: 'Master',
    master: 'Legend',
  };

  const currentBadge = profile?.currentBadge || 'beginner';
  const progressPercent = profile?.progressPercent || 45;

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h3" sx={{ mb: 6, color: '#1b5e20', fontWeight: 700 }}>
        🎯 Your Eco-Travel Dashboard
      </Typography>

      {/* Profile Summary Cards */}
      <Grid container spacing={3} sx={{ mb: 6 }}>
        {/* Total Points */}
        <Grid item xs={12} md={6} lg={3}>
          <Card sx={{ background: 'linear-gradient(135deg, #4caf50 0%, #81c784 100%)' }}>
            <CardContent sx={{ color: '#fff' }}>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <TrendingUpIcon sx={{ fontSize: 32, mr: 1 }} />
                <Typography variant="body2" sx={{ opacity: 0.9 }}>
                  Total Points
                </Typography>
              </Box>
              <Typography variant="h3" sx={{ fontWeight: 700 }}>
                {profile?.totalPoints || 0}
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        {/* Current Badge */}
        <Grid item xs={12} md={6} lg={3}>
          <Card sx={{ background: 'linear-gradient(135deg, #ffa726 0%, #ffb74d 100%)' }}>
            <CardContent sx={{ color: '#fff' }}>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <StarIcon sx={{ fontSize: 32, mr: 1 }} />
                <Typography variant="body2" sx={{ opacity: 0.9 }}>
                  Current Badge
                </Typography>
              </Box>
              <Typography variant="h2" sx={{ fontWeight: 700 }}>
                {badgeEmoji[currentBadge]} {currentBadge}
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        {/* Trips Booked */}
        <Grid item xs={12} md={6} lg={3}>
          <Card sx={{ background: 'linear-gradient(135deg, #66bb6a 0%, #81c784 100%)' }}>
            <CardContent sx={{ color: '#fff' }}>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <EcoIcon sx={{ fontSize: 32, mr: 1 }} />
                <Typography variant="body2" sx={{ opacity: 0.9 }}>
                  Trips Booked
                </Typography>
              </Box>
              <Typography variant="h3" sx={{ fontWeight: 700 }}>
                12
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        {/* CO2 Saved */}
        <Grid item xs={12} md={6} lg={3}>
          <Card sx={{ background: 'linear-gradient(135deg, #2e7d32 0%, #4caf50 100%)' }}>
            <CardContent sx={{ color: '#fff' }}>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <EcoIcon sx={{ fontSize: 32, mr: 1 }} />
                <Typography variant="body2" sx={{ opacity: 0.9 }}>
                  CO₂ Saved (kg)
                </Typography>
              </Box>
              <Typography variant="h3" sx={{ fontWeight: 700 }}>
                580
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Badge Progress */}
      <Card sx={{ mb: 6 }}>
        <CardContent>
          <Typography variant="h5" sx={{ mb: 3, color: '#1b5e20', fontWeight: 600 }}>
            🚀 Progress to Next Badge
          </Typography>
          <Box sx={{ mb: 2 }}>
            <Typography variant="body2" sx={{ mb: 1, fontWeight: 600 }}>
              {currentBadge} → {nextBadgeInfo[currentBadge] || 'Legend'}
            </Typography>
            <LinearProgress
              variant="determinate"
              value={progressPercent}
              sx={{
                height: 12,
                borderRadius: 6,
                backgroundColor: '#e0e0e0',
                '& .MuiLinearProgress-bar': {
                  background: 'linear-gradient(90deg, #4caf50 0%, #2e7d32 100%)',
                },
              }}
            />
            <Typography variant="caption" sx={{ mt: 1, display: 'block', color: '#666' }}>
              {progressPercent}% Complete
            </Typography>
          </Box>
        </CardContent>
      </Card>

      {/* Eco Challenges */}
      <Card>
        <CardContent>
          <Typography variant="h5" sx={{ mb: 3, color: '#1b5e20', fontWeight: 600 }}>
            🌱 Active Eco-Challenges
          </Typography>

          <List sx={{ width: '100%' }}>
            {ecoChallenges.map((challenge, index) => (
              <ListItem
                key={challenge.id}
                sx={{
                  mb: 2,
                  p: 2,
                  backgroundColor: challenge.completed ? '#f1f8e9' : '#fafafa',
                  borderRadius: 1,
                  border: '1px solid #e0e0e0',
                  display: 'block',
                }}
              >
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                  <ListItemIcon sx={{ minWidth: 40 }}>
                    {challenge.completed ? (
                      <Chip
                        label="✓ Completed"
                        sx={{
                          backgroundColor: '#66bb6a',
                          color: '#fff',
                          fontWeight: 600,
                        }}
                      />
                    ) : (
                      <Chip
                        label={`${challenge.points} pts`}
                        sx={{
                          backgroundColor: '#ffa726',
                          color: '#fff',
                          fontWeight: 600,
                        }}
                      />
                    )}
                  </ListItemIcon>

                  <Box sx={{ flex: 1 }}>
                    <Typography variant="h6" sx={{ fontWeight: 600, color: '#1b5e20' }}>
                      {challenge.name}
                    </Typography>
                    <Typography variant="body2" color="textSecondary">
                      {challenge.description}
                    </Typography>
                  </Box>
                </Box>

                {!challenge.completed && (
                  <Box sx={{ ml: 0, mt: 1 }}>
                    <Box
                      sx={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        mb: 0.5,
                        alignItems: 'center',
                      }}
                    >
                      <Typography variant="caption" sx={{ fontWeight: 600 }}>
                        Progress
                      </Typography>
                      <Typography variant="caption" sx={{ color: '#666' }}>
                        {challenge.progress}/{challenge.total}
                      </Typography>
                    </Box>
                    <LinearProgress
                      variant="determinate"
                      value={(challenge.progress / challenge.total) * 100}
                      sx={{
                        height: 8,
                        borderRadius: 4,
                        backgroundColor: '#e0e0e0',
                        '& .MuiLinearProgress-bar': {
                          background: 'linear-gradient(90deg, #4caf50 0%, #2e7d32 100%)',
                        },
                      }}
                    />
                  </Box>
                )}
              </ListItem>
            ))}
          </List>
        </CardContent>
      </Card>
    </Container>
  );
};

export default DashboardPage;
