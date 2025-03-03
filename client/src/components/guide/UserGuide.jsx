import React from 'react';
import {
  Paper,
  Typography,
  Box,
  Grid,
  Card,
  CardContent,
  Button,
  Divider,
} from '@mui/material';
import { Link } from 'react-router-dom';
import {
  Search as SearchIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  Add as AddIcon,
  Star as StarIcon,
  LocationOn as LocationIcon,
  GitHub as GitHubIcon,
  Description as DescriptionIcon,
} from '@mui/icons-material';

const UserGuide = () => {
  const features = [
    {
      icon: <AddIcon color="success" />,
      title: 'Add New Hospitals',
      description: 'Contribute to our database by adding new hospitals with detailed information',
    },
    {
      icon: <EditIcon color="info" />,
      title: 'Update Information',
      description: 'Keep hospital information accurate by updating details when needed',
    },
    {
      icon: <DeleteIcon color="error" />,
      title: 'Manage Listings',
      description: 'Remove outdated or incorrect hospital listings to maintain data quality',
    },
    {
      icon: <StarIcon style={{ color: '#FFD700' }} />,
      title: 'Rate & Review',
      description: 'Share your experiences to help others make informed decisions',
    },
    {
      icon: <SearchIcon color="primary" />,
      title: 'Advanced Search',
      description: 'Access detailed search filters and save your favorite hospitals',
    },
    {
      icon: <LocationIcon style={{ color: '#4CAF50' }} />,
      title: 'Location Features',
      description: 'Get personalized hospital recommendations based on your location',
    },
  ];

  return (
    <Paper
      elevation={3}
      sx={{
        p: 4,
        my: 4,
        background: 'linear-gradient(135deg, #f5f7fa 0%, #e4e8eb 100%)',
        borderRadius: 2,
      }}
    >
      {/* Project Information Section */}
      <Box 
        sx={{ 
          textAlign: 'center', 
          mb: 6,
          p: 3,
          borderRadius: 4,
          background: 'linear-gradient(135deg, rgba(26, 35, 126, 0.05) 0%, rgba(13, 71, 161, 0.08) 100%)',
          border: '1px solid rgba(25, 118, 210, 0.1)',
        }}
      >
        <Typography 
          variant="h3" 
          component="h1" 
          gutterBottom
          sx={{
            fontWeight: 700,
            background: 'linear-gradient(45deg, #1a237e 30%, #0d47a1 90%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            textShadow: '2px 2px 4px rgba(0,0,0,0.1)',
            letterSpacing: '0.05em',
            mb: 3
          }}
        >
          MERN Stack Hospital Management
        </Typography>

        <Typography 
          variant="h6" 
          sx={{ 
            color: '#546e7a',
            maxWidth: '800px',
            mx: 'auto',
            mb: 4,
            lineHeight: 1.8,
            fontSize: '1.2rem'
          }}
        >
          Welcome to our comprehensive Hospital Management System! This project was developed as part of the Winter PEP program, 
          showcasing the power of the MERN (MongoDB, Express.js, React, Node.js) stack. Our system offers intuitive hospital management, 
          seamless data handling, and a modern user experience.
        </Typography>

        <Box sx={{ 
          display: 'flex',
          gap: 3,
          justifyContent: 'center',
          flexWrap: 'wrap',
          mb: 4
        }}>
          <Button
            variant="contained"
            startIcon={<GitHubIcon />}
            href="https://github.com/ROHIT-THOTA01/Hospital-management-system.git"
            target="_blank"
            rel="noopener noreferrer"
            sx={{
              py: 1.5,
              px: 4,
              borderRadius: 2,
              background: 'linear-gradient(45deg, #24292e 30%, #2b3137 90%)',
              boxShadow: '0 3px 5px 2px rgba(0, 0, 0, .3)',
              transition: 'all 0.3s ease',
              '&:hover': {
                transform: 'translateY(-2px)',
                boxShadow: '0 6px 10px 4px rgba(0, 0, 0, .2)',
              }
            }}
          >
            View on GitHub
          </Button>
          <Button
            variant="contained"
            startIcon={<DescriptionIcon />}
            href="https://docs.google.com/document/d/1rcX3qWoyslOELXYwcX6Fs0kHRsAdCdcTXDiulRYK9jg/edit?tab=t.0"
            target="_blank"
            rel="noopener noreferrer"
            sx={{
              py: 1.5,
              px: 4,
              borderRadius: 2,
              background: 'linear-gradient(45deg, #1a237e 30%, #0d47a1 90%)',
              boxShadow: '0 3px 5px 2px rgba(26, 35, 126, .3)',
              transition: 'all 0.3s ease',
              '&:hover': {
                transform: 'translateY(-2px)',
                boxShadow: '0 6px 10px 4px rgba(26, 35, 126, .2)',
              }
            }}
          >
            Project Documentation
          </Button>
        </Box>

        <Box sx={{ 
          display: 'flex', 
          gap: 4, 
          justifyContent: 'center',
          flexWrap: 'wrap',
          maxWidth: '1000px',
          mx: 'auto',
          mb: 3
        }}>
          <Typography 
            variant="body1" 
            sx={{ 
              color: '#546e7a',
              flex: '1 1 200px',
              maxWidth: '300px',
              p: 2,
              borderRadius: 2,
              background: 'rgba(255, 255, 255, 0.5)',
              border: '1px solid rgba(25, 118, 210, 0.1)',
            }}
          >
            <strong>Modern Stack:</strong> Built with MongoDB, Express.js, React, and Node.js, 
            offering a robust and scalable solution for hospital management.
          </Typography>
          <Typography 
            variant="body1" 
            sx={{ 
              color: '#546e7a',
              flex: '1 1 200px',
              maxWidth: '300px',
              p: 2,
              borderRadius: 2,
              background: 'rgba(255, 255, 255, 0.5)',
              border: '1px solid rgba(25, 118, 210, 0.1)',
            }}
          >
            <strong>User-Centric:</strong> Intuitive interface designed for healthcare professionals,
            making hospital management efficient and accessible.
          </Typography>
          <Typography 
            variant="body1" 
            sx={{ 
              color: '#546e7a',
              flex: '1 1 200px',
              maxWidth: '300px',
              p: 2,
              borderRadius: 2,
              background: 'rgba(255, 255, 255, 0.5)',
              border: '1px solid rgba(25, 118, 210, 0.1)',
            }}
          >
            <strong>Open Source:</strong> Contribute to the project's development and help improve
            healthcare management systems worldwide.
          </Typography>
        </Box>
      </Box>

      <Divider sx={{ mb: 6 }} />

      <Box sx={{ textAlign: 'center', mb: 4 }}>
        <Typography
          variant="h4"
          component="h2"
          gutterBottom
          sx={{
            fontWeight: 600,
            color: '#1a237e',
            textTransform: 'uppercase',
            letterSpacing: 1,
          }}
        >
          Unlock These Features
        </Typography>
        <Typography
          variant="subtitle1"
          sx={{ 
            maxWidth: '800px', 
            mx: 'auto', 
            mb: 3,
            color: '#455a64',
            fontSize: '1.1rem',
          }}
        >
          Create an account to access these powerful hospital management features
        </Typography>
        <Divider sx={{ mb: 4 }} />
      </Box>

      <Grid container spacing={3} sx={{ mb: 4 }}>
        {features.map((feature, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <Card
              sx={{
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                transition: 'all 0.3s ease',
                '&:hover': {
                  transform: 'translateY(-5px)',
                  boxShadow: 6,
                },
                bgcolor: 'rgba(255, 255, 255, 0.9)',
              }}
            >
              <CardContent>
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    mb: 2,
                  }}
                >
                  <Box
                    sx={{
                      p: 1.5,
                      borderRadius: '50%',
                      backgroundColor: 'rgba(0, 0, 0, 0.04)',
                      mr: 2,
                    }}
                  >
                    {feature.icon}
                  </Box>
                  <Typography 
                    variant="h6" 
                    component="h3" 
                    sx={{ 
                      color: '#1a237e',
                      fontWeight: 500,
                    }}
                  >
                    {feature.title}
                  </Typography>
                </Box>
                <Typography 
                  variant="body1" 
                  sx={{ 
                    color: '#546e7a',
                    lineHeight: 1.6,
                  }}
                >
                  {feature.description}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Box 
        sx={{ 
          display: 'flex', 
          justifyContent: 'center', 
          gap: 2,
          mt: 2,
        }}
      >
        <Button
          component={Link}
          to="/register"
          variant="contained"
          size="large"
          sx={{
            px: 4,
            py: 1.5,
            bgcolor: '#1a237e',
            '&:hover': { bgcolor: '#0d47a1' },
            fontSize: '1.1rem',
          }}
        >
          Sign Up Now
        </Button>
        <Button
          component={Link}
          to="/login"
          variant="outlined"
          size="large"
          sx={{
            px: 4,
            py: 1.5,
            borderColor: '#1a237e',
            color: '#1a237e',
            '&:hover': { 
              borderColor: '#0d47a1',
              bgcolor: 'rgba(13, 71, 161, 0.04)',
            },
            fontSize: '1.1rem',
          }}
        >
          Login
        </Button>
      </Box>
    </Paper>
  );
};

export default UserGuide; 