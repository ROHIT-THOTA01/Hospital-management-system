import React from 'react';
import { Link } from 'react-router-dom';
import { Container, Typography, Box, Button, Paper } from '@mui/material';
import { SentimentVeryDissatisfied as SadIcon } from '@mui/icons-material';

const NotFound = () => {
  return (
    <Container maxWidth="md">
      <Paper elevation={3} sx={{ p: 4, my: 8, textAlign: 'center' }}>
        <SadIcon sx={{ fontSize: 80, color: 'text.secondary', mb: 2 }} />
        
        <Typography variant="h4" component="h1" gutterBottom>
          404 - Page Not Found
        </Typography>
        
        <Typography variant="body1" paragraph>
          The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
        </Typography>
        
        <Box sx={{ mt: 4 }}>
          <Button
            component={Link}
            to="/"
            variant="contained"
            size="large"
          >
            Go to Home Page
          </Button>
        </Box>
      </Paper>
    </Container>
  );
};

export default NotFound; 