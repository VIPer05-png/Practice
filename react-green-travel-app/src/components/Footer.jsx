import React from 'react';
import { Box, Typography, Container } from '@mui/material';

const Footer = () => {
  return (
    <Box
      component="footer"
      sx={{
        backgroundColor: '#1b5e20',
        color: '#fff',
        py: 4,
        mt: 8,
        textAlign: 'center',
      }}
    >
      <Container maxWidth="lg">
        <Typography variant="body2" sx={{ mb: 1 }}>
          🌍 GreenWander - Eco-Friendly Travel Management System
        </Typography>
        <Typography variant="body2">
          © {new Date().getFullYear()} GreenWander. All rights reserved. Travel responsibly, leave no trace behind.
        </Typography>
      </Container>
    </Box>
  );
};

export default Footer;
