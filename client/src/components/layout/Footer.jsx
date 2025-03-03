import React, { useContext } from 'react';
import { Box, Container, Grid, Typography, Link, IconButton, Divider } from '@mui/material';
import {
  Facebook as FacebookIcon,
  Twitter as TwitterIcon,
  Instagram as InstagramIcon,
  LinkedIn as LinkedInIcon,
  LocalHospital as HospitalIcon,
} from '@mui/icons-material';
import { ThemeContext } from '../../context/ThemeContext';

const Footer = () => {
  const { darkMode } = useContext(ThemeContext);
  const currentYear = new Date().getFullYear();

  return (
    <Box
      component="footer"
      className={`footer ${darkMode ? 'dark-mode' : ''}`}
      sx={{
        py: 6,
        px: 2,
        mt: 'auto',
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
        boxSizing: 'border-box',
        backgroundColor: (theme) =>
          darkMode ? theme.palette.background.paper : '#f5f5f5',
        boxShadow: '0 -4px 10px rgba(0, 0, 0, 0.05)',
      }}
    >
      <Container maxWidth="lg" sx={{ width: '100%' }}>
        <Grid container spacing={4}>
          <Grid item xs={12} sm={4}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <HospitalIcon color="primary" sx={{ mr: 1, fontSize: '2rem' }} />
              <Typography variant="h6" color="primary" fontWeight="bold">
                MEDCARE
              </Typography>
            </Box>
            <Typography variant="body2" color="text.secondary" paragraph>
              Providing quality healthcare services and hospital management solutions since 2023.
              Our mission is to connect patients with the best healthcare facilities.
            </Typography>
            <Box sx={{ mt: 2 }}>
              <IconButton color="primary" aria-label="facebook">
                <FacebookIcon />
              </IconButton>
              <IconButton color="primary" aria-label="twitter">
                <TwitterIcon />
              </IconButton>
              <IconButton color="primary" aria-label="instagram">
                <InstagramIcon />
              </IconButton>
              <IconButton color="primary" aria-label="linkedin">
                <LinkedInIcon />
              </IconButton>
            </Box>
          </Grid>
          
          <Grid item xs={12} sm={4}>
            <Typography variant="h6" color="primary" gutterBottom>
              Quick Links
            </Typography>
            <Box component="ul" sx={{ p: 0, listStyle: 'none' }}>
              <Box component="li" sx={{ mb: 1 }}>
                <Link href="/" color="inherit" underline="hover">
                  Home
                </Link>
              </Box>
              <Box component="li" sx={{ mb: 1 }}>
                <Link href="/hospitals" color="inherit" underline="hover">
                  Find Hospitals
                </Link>
              </Box>
              <Box component="li" sx={{ mb: 1 }}>
                <Link href="/services" color="inherit" underline="hover">
                  Services
                </Link>
              </Box>
              <Box component="li" sx={{ mb: 1 }}>
                <Link href="/health-tips" color="inherit" underline="hover">
                  Health Tips
                </Link>
              </Box>
              <Box component="li" sx={{ mb: 1 }}>
                <Link href="/about" color="inherit" underline="hover">
                  About Us
                </Link>
              </Box>
            </Box>
          </Grid>
          
          <Grid item xs={12} sm={4}>
            <Typography variant="h6" color="primary" gutterBottom>
              Contact Us
            </Typography>
            <Typography variant="body2" color="text.secondary" paragraph>
              123 Healthcare Avenue
              <br />
              Medical District, MD 12345
              <br />
              United States
            </Typography>
            <Typography variant="body2" color="text.secondary" paragraph>
              Email: info@medcare.com
              <br />
              Phone: +1 (123) 456-7890
            </Typography>
          </Grid>
        </Grid>
        
        <Divider sx={{ my: 3 }} />
        
        <Box sx={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap' }}>
          <Typography variant="body2" color="text.secondary">
            © {currentYear} MEDCARE. All rights reserved.
          </Typography>
          <Box>
            <Link href="/privacy" color="inherit" underline="hover" sx={{ mr: 2 }}>
              Privacy Policy
            </Link>
            <Link href="/terms" color="inherit" underline="hover">
              Terms of Service
            </Link>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer; 