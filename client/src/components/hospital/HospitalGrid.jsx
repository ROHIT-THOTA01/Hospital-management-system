import React, { useState, useEffect } from 'react';
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
} from '@mui/icons-material';
import { alpha } from '@mui/material/styles';
import HospitalCard from './HospitalCard';
import { hospitalsAPI } from '../../services/api';

const HospitalGrid = ({ searchQuery }) => {
  const theme = useTheme();
  const [hospitals, setHospitals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const fetchHospitals = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const params = {
          page,
          limit: 12,
          ...(searchQuery && { city: searchQuery }),
        };
        
        const response = await hospitalsAPI.getAll(params);
        const { data, pagination } = response.data;
        
        setHospitals(data);
        setTotalPages(pagination.totalPages);
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to fetch hospitals');
      } finally {
        setLoading(false);
      }
    };

    fetchHospitals();
  }, [page, searchQuery]);

  const handlePageChange = (event, value) => {
    setPage(value);
  };

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
          {searchQuery 
            ? `We couldn't find any hospitals in "${searchQuery}". Try searching for a different city.`
            : 'We couldn't find any hospitals. Please try again later.'}
        </Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ flexGrow: 1, my: 4 }}>
      <Box sx={{ mb: 4, display: 'flex', alignItems: 'center' }}>
        <HospitalIcon color="primary" sx={{ fontSize: 28, mr: 1.5 }} />
        <Typography variant="h4" component="h2" sx={{ fontWeight: 600 }}>
          {searchQuery ? `Hospitals in ${searchQuery}` : 'All Hospitals'}
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
            onChange={handlePageChange}
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

export default HospitalGrid; 