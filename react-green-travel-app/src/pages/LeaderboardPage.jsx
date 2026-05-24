import React, { useState, useEffect } from 'react';
import {
  Container,
  Box,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  CircularProgress,
  Alert,
  Chip,
  Avatar,
  Grid,
} from '@mui/material';
import StarIcon from '@mui/icons-material/Star';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import { getLeaderboard } from '../services/api';

const LeaderboardPage = () => {
  const [leaderboard, setLeaderboard] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchLeaderboard = async () => {
      try {
        setLoading(true);
        const data = await getLeaderboard();
        setLeaderboard(data || []);
      } catch (err) {
        setError('Failed to load leaderboard. Please try again later.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchLeaderboard();
  }, []);

  const getMedalColor = (rank) => {
    switch (rank) {
      case 1:
        return { background: '#FFD700', color: '#333', label: '🥇' };
      case 2:
        return { background: '#C0C0C0', color: '#333', label: '🥈' };
      case 3:
        return { background: '#CD7F32', color: '#fff', label: '🥉' };
      default:
        return { background: '#f5f5f5', color: '#333', label: '#' };
    }
  };

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

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Box sx={{ mb: 6 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 3 }}>
          <EmojiEventsIcon sx={{ fontSize: 40, color: '#ffa726' }} />
          <Typography variant="h3" sx={{ color: '#1b5e20', fontWeight: 700 }}>
            🏆 Eco-Travel Leaderboard
          </Typography>
        </Box>
        <Typography variant="body1" color="textSecondary" sx={{ fontSize: '1.1rem' }}>
          Compete with other travelers and earn rewards for making sustainable choices!
        </Typography>
      </Box>

      {/* Top 3 Highlights */}
      {leaderboard.length > 0 && (
        <Grid container spacing={3} sx={{ mb: 6 }}>
          {leaderboard.slice(0, 3).map((user, index) => {
            const medal = getMedalColor(index + 1);
            return (
              <Grid item xs={12} md={4} key={user.userId}>
                <Paper
                  elevation={index === 0 ? 8 : 4}
                  sx={{
                    p: 3,
                    textAlign: 'center',
                    background:
                      index === 0
                        ? 'linear-gradient(135deg, #FFD700 0%, #FFC700 100%)'
                        : index === 1
                        ? 'linear-gradient(135deg, #C0C0C0 0%, #B0B0B0 100%)'
                        : 'linear-gradient(135deg, #CD7F32 0%, #BD6F1F 100%)',
                    color: index === 0 ? '#333' : '#fff',
                  }}
                >
                  <Box sx={{ mb: 2, fontSize: '3rem' }}>{medal.label}</Box>
                  <Typography variant="h4" sx={{ fontWeight: 700, mb: 1 }}>
                    {user.name}
                  </Typography>
                  <Typography variant="h5" sx={{ fontWeight: 600, mb: 2, opacity: 0.9 }}>
                    {user.points} Points
                  </Typography>
                  <Chip
                    icon={<StarIcon />}
                    label={`Rank #${user.rank}`}
                    sx={{
                      background: 'rgba(255,255,255,0.3)',
                      color: 'inherit',
                      fontWeight: 600,
                    }}
                  />
                </Paper>
              </Grid>
            );
          })}
        </Grid>
      )}

      {/* Full Leaderboard Table */}
      <TableContainer
        component={Paper}
        sx={{
          borderRadius: 2,
          overflow: 'hidden',
          boxShadow: '0 4px 12px rgba(46, 125, 50, 0.1)',
        }}
      >
        <Table>
          <TableHead>
            <TableRow
              sx={{
                background: 'linear-gradient(135deg, #1b5e20 0%, #2e7d32 100%)',
              }}
            >
              <TableCell
                sx={{
                  color: '#fff',
                  fontWeight: 700,
                  fontSize: '1rem',
                  width: '10%',
                }}
                align="center"
              >
                Rank
              </TableCell>
              <TableCell
                sx={{
                  color: '#fff',
                  fontWeight: 700,
                  fontSize: '1rem',
                }}
              >
                Traveler Name
              </TableCell>
              <TableCell
                sx={{
                  color: '#fff',
                  fontWeight: 700,
                  fontSize: '1rem',
                }}
                align="right"
              >
                Points
              </TableCell>
              <TableCell
                sx={{
                  color: '#fff',
                  fontWeight: 700,
                  fontSize: '1rem',
                }}
                align="center"
              >
                Badge Level
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {leaderboard.map((user, index) => {
              const medal = getMedalColor(user.rank);
              return (
                <TableRow
                  key={user.userId}
                  sx={{
                    backgroundColor: user.rank <= 3 ? 'rgba(46, 125, 50, 0.08)' : '#fff',
                    '&:hover': {
                      backgroundColor: 'rgba(46, 125, 50, 0.12)',
                    },
                    transition: 'background-color 0.2s ease',
                  }}
                >
                  <TableCell
                    align="center"
                    sx={{
                      fontWeight: 700,
                      fontSize: '1.1rem',
                      color: '#1b5e20',
                    }}
                  >
                    <Box
                      sx={{
                        display: 'inline-block',
                        width: 40,
                        height: 40,
                        borderRadius: '50%',
                        backgroundColor: medal.background,
                        color: medal.color,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontWeight: 700,
                        fontSize: '1.2rem',
                      }}
                    >
                      {medal.label === '#' ? user.rank : medal.label}
                    </Box>
                  </TableCell>

                  <TableCell
                    sx={{
                      fontWeight: 600,
                      color: '#1b5e20',
                      fontSize: '1rem',
                    }}
                  >
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                      <Avatar
                        sx={{
                          width: 40,
                          height: 40,
                          backgroundColor: '#4caf50',
                          color: '#fff',
                          fontWeight: 700,
                        }}
                      >
                        {user.name.charAt(0).toUpperCase()}
                      </Avatar>
                      {user.name}
                    </Box>
                  </TableCell>

                  <TableCell
                    align="right"
                    sx={{
                      fontWeight: 700,
                      color: '#2e7d32',
                      fontSize: '1.1rem',
                    }}
                  >
                    <Chip
                      icon={<StarIcon />}
                      label={user.points}
                      sx={{
                        backgroundColor: '#e8f5e9',
                        color: '#2e7d32',
                        fontWeight: 700,
                      }}
                    />
                  </TableCell>

                  <TableCell align="center">
                    <Chip
                      label={user.badge || 'Beginner'}
                      sx={{
                        backgroundColor: '#ffa726',
                        color: '#fff',
                        fontWeight: 600,
                      }}
                    />
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>

      {leaderboard.length === 0 && (
        <Box sx={{ textAlign: 'center', py: 6 }}>
          <Typography variant="h5" color="textSecondary">
            No leaderboard data available yet.
          </Typography>
        </Box>
      )}
    </Container>
  );
};

export default LeaderboardPage;
