import React, { useState, useEffect, useContext } from 'react';
import { Container, Typography, Box, CircularProgress } from '@mui/material';
import axios from 'axios';
import HospitalGrid from '../components/hospital/HospitalGrid';
import UserGuide from '../components/guide/UserGuide';
import { AuthContext } from '../context/AuthContext';
import { API_BASE_URL } from '../config';
import { useLocation } from 'react-router-dom';

const Home = () => {
  const [hospitals, setHospitals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { user } = useContext(AuthContext);
  const location = useLocation();
  
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        // If we have search results in location state, use them
        if (location.state?.searchResults) {
          setHospitals(location.state.searchResults);
        } else {
          // Otherwise fetch all hospitals
          const res = await axios.get(`${API_BASE_URL}/hospitals`);
          setHospitals(res.data.data);
        }
        setError(null);
      } catch (err) {
        setError('Failed to fetch hospitals. Please try again later.');
        setHospitals([]);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [location.state]);
  
  return (
    <Container maxWidth="xl">
      <Box sx={{ my: 4 }}>
        <Typography
          variant="h3"
          component="h1"
          gutterBottom
          sx={{
            fontWeight: 700,
            textAlign: 'center',
            color: '#1a237e',
            mb: 4
          }}
        >
          Hospital Management System
        </Typography>

        {/* User Guide Section - Only shown to non-logged-in users */}
        {!user && <UserGuide />}

        {/* Search Results or Available Hospitals */}
        <Box sx={{ mb: 4 }}>
          <Typography
            variant="h4"
            component="h2"
            gutterBottom
            sx={{ color: '#1a237e' }}
          >
            {location.state?.searchQuery 
              ? `Search Results for "${location.state.searchQuery}"`
              : 'Available Hospitals'}
          </Typography>
          
          <Typography
            variant="subtitle1"
            gutterBottom
            sx={{ color: 'text.secondary' }}
          >
            {loading ? (
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <CircularProgress size={20} />
                <span>Searching hospitals...</span>
              </Box>
            ) : hospitals.length ? (
              `Found ${hospitals.length} hospital${hospitals.length === 1 ? '' : 's'}`
            ) : (
              'No hospitals found. Try a different city.'
            )}
          </Typography>
        </Box>
        
        <HospitalGrid
          hospitals={hospitals}
          loading={loading}
          error={error}
        />
      </Box>
    </Container>
  );
};

export default Home; 