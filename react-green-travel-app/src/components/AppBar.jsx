import React from 'react';
import { AppBar as MuiAppBar, Toolbar, Typography, Button, Box, useMediaQuery, useTheme, Drawer, List, ListItem, ListItemText, IconButton } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import { Link, useLocation } from 'react-router-dom';
import { useState } from 'react';

const AppBar = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [drawerOpen, setDrawerOpen] = useState(false);
  const location = useLocation();

  const navLinks = [
    { label: 'Home', path: '/' },
    { label: 'Plan Trip', path: '/plan' },
    { label: 'My Dashboard', path: '/dashboard' },
    { label: 'Leaderboard', path: '/leaderboard' },
    { label: 'Chat', path: '/chat' },
  ];

  const isActive = (path) => location.pathname === path;

  const NavLinks = () => (
    <>
      {navLinks.map((link) => (
        <Button
          key={link.path}
          color="inherit"
          component={Link}
          to={link.path}
          sx={{
            mx: 1,
            borderBottom: isActive(link.path) ? '3px solid #ffa726' : 'none',
            fontWeight: isActive(link.path) ? 600 : 400,
            transition: 'all 0.3s ease',
            '&:hover': {
              borderBottom: '3px solid #ffa726',
            },
          }}
        >
          {link.label}
        </Button>
      ))}
    </>
  );

  return (
    <>
      <MuiAppBar position="sticky" elevation={2}>
        <Toolbar>
          <Typography
            variant="h6"
            sx={{
              flexGrow: 1,
              fontWeight: 700,
              fontSize: '1.5rem',
              letterSpacing: '1px',
            }}
            component={Link}
            to="/"
            style={{ textDecoration: 'none', color: 'inherit' }}
          >
            🌍 GreenWander
          </Typography>

          {isMobile ? (
            <>
              <IconButton
                color="inherit"
                onClick={() => setDrawerOpen(true)}
                sx={{ ml: 2 }}
              >
                <MenuIcon />
              </IconButton>

              <Drawer
                anchor="right"
                open={drawerOpen}
                onClose={() => setDrawerOpen(false)}
              >
                <Box
                  sx={{
                    width: 250,
                    p: 2,
                  }}
                  role="presentation"
                >
                  <Box
                    sx={{
                      display: 'flex',
                      justifyContent: 'flex-end',
                      mb: 2,
                    }}
                  >
                    <IconButton onClick={() => setDrawerOpen(false)}>
                      <CloseIcon />
                    </IconButton>
                  </Box>

                  <List>
                    {navLinks.map((link) => (
                      <ListItem
                        button
                        key={link.path}
                        component={Link}
                        to={link.path}
                        onClick={() => setDrawerOpen(false)}
                        sx={{
                          mb: 1,
                          borderRadius: 1,
                          backgroundColor: isActive(link.path)
                            ? 'rgba(46, 125, 50, 0.1)'
                            : 'transparent',
                        }}
                      >
                        <ListItemText
                          primary={link.label}
                          primaryTypographyProps={{
                            fontWeight: isActive(link.path) ? 600 : 400,
                            color: '#2e7d32',
                          }}
                        />
                      </ListItem>
                    ))}
                  </List>
                </Box>
              </Drawer>
            </>
          ) : (
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <NavLinks />
            </Box>
          )}
        </Toolbar>
      </MuiAppBar>
    </>
  );
};

export default AppBar;
