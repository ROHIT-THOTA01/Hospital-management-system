import React from 'react';
import { 
  Grid, 
  Box, 
  Typography, 
  Pagination, 
  CircularProgress, 
  Paper,
  Container,
  Fade,
  Alert,
  AlertTitle,
  Divider,
  useTheme,
} from '@mui/material';
import { 
  LocalHospital as HospitalIcon,
  SearchOff as SearchOffIcon,
  Error as ErrorIcon,
} from '@mui/icons-material';
import HospitalCard from './HospitalCard';

const HospitalGrid = ({ hospitals, loading, error, page, totalPages, onPageChange }) => {
  const theme = useTheme();

  if (loading) {
    return (
      <Box 
        sx={{ 
          display: 'flex', 
          flexDirection: 'column',
          alignItems: 'center', 
          justifyContent: 'center', 
          my: 8,
          minHeight: 400,
        }}
      >
        <CircularProgress size={60} thickness={4} />
        <Typography variant="h6" sx={{ mt: 3, fontWeight: 500, color: 'text.secondary' }}>
          Loading hospitals...
        </Typography>
      </Box>
    );
  }

  if (error) {
    return (
      <Container maxWidth="md" sx={{ my: 4 }}>
        <Alert 
          severity="error" 
          variant="filled"
          sx={{ 
            borderRadius: 2,
            boxShadow: '0 4px 12px rgba(211, 47, 47, 0.2)',
          }}
        >
          <AlertTitle>Error</AlertTitle>
          <Typography>{error}</Typography>
        </Alert>
      </Container>
    );
  }

  if (hospitals.length === 0) {
    return (
      <Box 
        sx={{ 
          my: 8, 
          display: 'flex', 
          flexDirection: 'column', 
          alignItems: 'center',
          minHeight: 400,
        }}
      >
        <SearchOffIcon sx={{ fontSize: 80, color: 'text.secondary', mb: 2 }} />
        <Typography variant="h5" align="center" sx={{ fontWeight: 500 }}>
          No hospitals found
        </Typography>
        <Typography variant="body1" align="center" color="text.secondary" sx={{ mt: 1, maxWidth: 500 }}>
          We couldn't find any hospitals matching your search criteria. Try adjusting your search or explore other cities.
        </Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ flexGrow: 1, my: 4 }}>
      <Box sx={{ mb: 4, display: 'flex', alignItems: 'center' }}>
        <HospitalIcon color="primary" sx={{ fontSize: 28, mr: 1.5 }} />
        <Typography variant="h4" component="h2" sx={{ fontWeight: 600 }}>
          Hospitals
        </Typography>
        <Box sx={{ flexGrow: 1 }} />
        <Paper 
          elevation={0} 
          sx={{ 
            px: 2, 
            py: 1, 
            borderRadius: 4, 
            backgroundColor: theme.palette.mode === 'dark' 
              ? alpha(theme.palette.primary.main, 0.1) 
              : alpha(theme.palette.primary.main, 0.05),
            color: 'primary.main',
          }}
        >
          <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
            {hospitals.length} Results
          </Typography>
        </Paper>
      </Box>

      <Divider sx={{ mb: 4 }} />

      <Grid container spacing={3}>
        {hospitals.map((hospital, index) => (
          <Fade 
            in={true} 
            key={hospital._id}
            style={{ 
              transitionDelay: `${index * 50}ms`,
              transitionDuration: '0.5s',
            }}
          >
            <Grid item xs={12} sm={6} md={4} lg={3}>
              <HospitalCard hospital={hospital} />
            </Grid>
          </Fade>
        ))}
      </Grid>

      {totalPages > 1 && (
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 6, mb: 2 }}>
          <Pagination
            count={totalPages}
            page={page}
            onChange={onPageChange}
            color="primary"
            size="large"
            showFirstButton
            showLastButton
            sx={{
              '& .MuiPaginationItem-root': {
                borderRadius: 2,
              },
              '& .Mui-selected': {
                fontWeight: 'bold',
              },
            }}
          />
        </Box>
      )}
    </Box>
  );
};

// Helper function for alpha color
function alpha(color, opacity) {
  return color + opacity.toString(16).padStart(2, '0');
}

export default HospitalGrid; 