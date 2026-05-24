import React, { useState } from 'react';
import {
  Container,
  Box,
  TextField,
  Button,
  Grid,
  Card,
  CardContent,
  CardActions,
  Typography,
  Slider,
  FormControlLabel,
  Checkbox,
  CircularProgress,
  Snackbar,
  Alert,
  Chip,
} from '@mui/material';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
import FlightTakeoffIcon from '@mui/icons-material/FlightTakeoff';
import TrainIcon from '@mui/icons-material/Train';
import { getRecommendations, createBooking } from '../services/api';
import { useUser } from '../contexts/UserContext';

const PlanTripPage = () => {
  const { user } = useUser();
  const [formData, setFormData] = useState({
    destination: '',
    budget: [5000, 15000],
    days: 5,
    ecoFriendlyOnly: false,
  });

  const [recommendations, setRecommendations] = useState([]);
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [searched, setSearched] = useState(false);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'success',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleBudgetChange = (event, newValue) => {
    setFormData((prev) => ({ ...prev, budget: newValue }));
  };

  const handleDaysChange = (e) => {
    setFormData((prev) => ({ ...prev, days: e.target.value }));
  };

  const handleCheckboxChange = (e) => {
    const { checked } = e.target;
    setFormData((prev) => ({ ...prev, ecoFriendlyOnly: checked }));
  };

  const handleSearch = async (e) => {
    e.preventDefault();

    if (!formData.destination.trim()) {
      setSnackbar({
        open: true,
        message: 'Please enter a destination',
        severity: 'warning',
      });
      return;
    }

    setLoading(true);
    try {
      const data = await getRecommendations(
        formData.destination,
        formData.budget[1],
        formData.days,
        formData.ecoFriendlyOnly
      );
      setRecommendations(data || []);
      setSearched(true);

      if (!data || data.length === 0) {
        setSnackbar({
          open: true,
          message: 'No trips found. Try adjusting your criteria.',
          severity: 'info',
        });
      }
    } catch (error) {
      setSnackbar({
        open: true,
        message: 'Failed to fetch recommendations. Please try again.',
        severity: 'error',
      });
    } finally {
      setLoading(false);
    }
  };

  const handleBooking = async (tripOptionId) => {
    setSubmitting(true);
    try {
      const booking = await createBooking(user.userId, tripOptionId);
      setSnackbar({
        open: true,
        message: `Booking successful! Booking ID: ${booking.bookingId}`,
        severity: 'success',
      });

      // Optional: Trigger PDF download
      if (booking.pdfUrl) {
        const link = document.createElement('a');
        link.href = booking.pdfUrl;
        link.download = `booking-${booking.bookingId}.pdf`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      }
    } catch (error) {
      setSnackbar({
        open: true,
        message: 'Booking failed. Please try again.',
        severity: 'error',
      });
    } finally {
      setSubmitting(false);
    }
  };

  const getCO2Indicator = (co2Kg) => {
    if (co2Kg < 50) {
      return { color: '#66bb6a', label: 'Low Emissions', icon: '🟢' };
    } else if (co2Kg < 150) {
      return { color: '#ffa726', label: 'Moderate Emissions', icon: '🟡' };
    }
    return { color: '#ef5350', label: 'High Emissions', icon: '🔴' };
  };

  const getTransportIcon = (transportType) => {
    const icons = {
      car: <DirectionsCarIcon />,
      flight: <FlightTakeoffIcon />,
      train: <TrainIcon />,
    };
    return icons[transportType?.toLowerCase()] || <DirectionsCarIcon />;
  };

  const closeSnackbar = () => {
    setSnackbar((prev) => ({ ...prev, open: false }));
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      {/* Search Form */}
      <Box
        component="form"
        onSubmit={handleSearch}
        sx={{
          background: 'linear-gradient(135deg, #f5f5f5 0%, #fff 100%)',
          p: 4,
          borderRadius: 3,
          mb: 6,
          boxShadow: '0 4px 12px rgba(46, 125, 50, 0.1)',
        }}
      >
        <Typography variant="h3" sx={{ mb: 4, color: '#1b5e20' }}>
          🗺️ Plan Your Eco-Friendly Trip
        </Typography>

        <Grid container spacing={3}>
          {/* Destination */}
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="Destination"
              name="destination"
              value={formData.destination}
              onChange={handleInputChange}
              placeholder="e.g., Costa Rica, Bali, Nepal"
              variant="outlined"
              sx={{
                '& .MuiOutlinedInput-root': {
                  '&:hover fieldset': {
                    borderColor: '#2e7d32',
                  },
                },
              }}
            />
          </Grid>

          {/* Days */}
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="Trip Duration (Days)"
              name="days"
              type="number"
              value={formData.days}
              onChange={handleDaysChange}
              inputProps={{ min: 1, max: 30 }}
              variant="outlined"
            />
          </Grid>

          {/* Budget Slider */}
          <Grid item xs={12}>
            <Typography variant="subtitle1" sx={{ mb: 2, fontWeight: 600, color: '#2e7d32' }}>
              Budget Range: ${formData.budget[0]} - ${formData.budget[1]}
            </Typography>
            <Slider
              value={formData.budget}
              onChange={handleBudgetChange}
              min={1000}
              max={20000}
              step={500}
              range
              marks={[
                { value: 1000, label: '$1K' },
                { value: 10000, label: '$10K' },
                { value: 20000, label: '$20K' },
              ]}
              sx={{
                '& .MuiSlider-thumb': {
                  backgroundColor: '#2e7d32',
                },
                '& .MuiSlider-track': {
                  backgroundColor: '#4caf50',
                },
              }}
            />
          </Grid>

          {/* Eco-Friendly Checkbox */}
          <Grid item xs={12}>
            <FormControlLabel
              control={
                <Checkbox
                  checked={formData.ecoFriendlyOnly}
                  onChange={handleCheckboxChange}
                  sx={{
                    color: '#2e7d32',
                    '&.Mui-checked': {
                      color: '#2e7d32',
                    },
                  }}
                />
              }
              label="Show only eco-friendly options"
              sx={{ fontSize: '1.1rem' }}
            />
          </Grid>

          {/* Submit Button */}
          <Grid item xs={12}>
            <Button
              type="submit"
              variant="contained"
              size="large"
              disabled={loading}
              sx={{
                background: 'linear-gradient(135deg, #2e7d32 0%, #4caf50 100%)',
                py: 1.5,
                fontSize: '1rem',
                fontWeight: 600,
              }}
            >
              {loading ? (
                <>
                  <CircularProgress size={24} sx={{ mr: 1, color: '#fff' }} />
                  Searching...
                </>
              ) : (
                'Search Trips'
              )}
            </Button>
          </Grid>
        </Grid>
      </Box>

      {/* Results */}
      {searched && (
        <>
          {recommendations.length > 0 ? (
            <>
              <Typography variant="h4" sx={{ mb: 4, color: '#1b5e20', fontWeight: 600 }}>
                🎯 Found {recommendations.length} Recommendations
              </Typography>
              <Grid container spacing={3}>
                {recommendations.map((trip, index) => {
                  const co2Info = getCO2Indicator(trip.co2Kg || 0);
                  return (
                    <Grid item xs={12} md={6} lg={4} key={index}>
                      <Card
                        sx={{
                          height: '100%',
                          display: 'flex',
                          flexDirection: 'column',
                        }}
                      >
                        <CardContent sx={{ flex: 1 }}>
                          <Typography variant="h5" sx={{ mb: 2, color: '#1b5e20', fontWeight: 600 }}>
                            {trip.name}
                          </Typography>

                          <Box sx={{ mb: 2 }}>
                            <Typography variant="body2" color="textSecondary">
                              {trip.description}
                            </Typography>
                          </Box>

                          {/* Price */}
                          <Typography
                            variant="h6"
                            sx={{ mb: 2, color: '#2e7d32', fontWeight: 700 }}
                          >
                            ${trip.price}
                          </Typography>

                          {/* CO2 Indicator */}
                          <Box sx={{ mb: 2, display: 'flex', alignItems: 'center', gap: 1 }}>
                            <Typography variant="body2" sx={{ fontWeight: 600 }}>
                              {co2Info.icon} CO₂ Impact:
                            </Typography>
                            <Chip
                              label={`${trip.co2Kg} kg - ${co2Info.label}`}
                              sx={{
                                backgroundColor: co2Info.color,
                                color: '#fff',
                                fontWeight: 600,
                              }}
                            />
                          </Box>

                          {/* Transport Type */}
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
                            <Typography variant="body2" sx={{ fontWeight: 600 }}>
                              Transport:
                            </Typography>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                              {getTransportIcon(trip.transportType)}
                              <Typography variant="body2">{trip.transportType}</Typography>
                            </Box>
                          </Box>
                        </CardContent>

                        <CardActions>
                          <Button
                            fullWidth
                            variant="contained"
                            size="small"
                            onClick={() => handleBooking(trip.id || index)}
                            disabled={submitting}
                            sx={{
                              background: 'linear-gradient(135deg, #2e7d32 0%, #4caf50 100%)',
                              fontWeight: 600,
                            }}
                            startIcon={<BookmarkIcon />}
                          >
                            {submitting ? 'Booking...' : 'Book Now'}
                          </Button>
                        </CardActions>
                      </Card>
                    </Grid>
                  );
                })}
              </Grid>
            </>
          ) : (
            <Box sx={{ textAlign: 'center', py: 6 }}>
              <Typography variant="h5" color="textSecondary" sx={{ mb: 2 }}>
                😔 No trips found matching your criteria
              </Typography>
              <Typography variant="body1" color="textSecondary">
                Try adjusting your destination, budget, or duration.
              </Typography>
            </Box>
          )}
        </>
      )}

      {/* Snackbar */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={closeSnackbar}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
      >
        <Alert onClose={closeSnackbar} severity={snackbar.severity} sx={{ width: '100%' }}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default PlanTripPage;
