import React, { useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Typography, Box, Alert, CircularProgress } from '@mui/material';
import axios from 'axios';
import HospitalForm from '../components/hospital/HospitalForm';
import { AuthContext } from '../context/AuthContext';
import { API_BASE_URL } from '../config';

const CreateHospital = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { user, loading: authLoading } = useContext(AuthContext);
  const navigate = useNavigate();
  
  useEffect(() => {
    if (!authLoading && !user) {
      navigate('/');
    }
  }, [user, authLoading, navigate]);
  
  const handleSubmit = async (formData) => {
    setLoading(true);
    setError(null);
    
    try {
      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      };
      
      const res = await axios.post(
        `${API_BASE_URL}/hospitals/create`,
        formData,
        config
      );
      
      if (res.data.success) {
        navigate(`/hospitals/${res.data.data._id}`);
      }
    } catch (err) {
      setError(
        err.response && err.response.data.error
          ? err.response.data.error
          : 'Failed to create hospital. Please try again.'
      );
    } finally {
      setLoading(false);
    }
  };
  
  if (authLoading) {
    return (
      <Container maxWidth="lg">
        <Box sx={{ my: 4, display: 'flex', justifyContent: 'center' }}>
          <CircularProgress />
        </Box>
      </Container>
    );
  }
  
  if (!user) {
    return (
      <Container maxWidth="lg">
        <Box sx={{ my: 4 }}>
          <Alert severity="error">
            You must be logged in to access this page.
          </Alert>
        </Box>
      </Container>
    );
  }
  
  return (
    <Container maxWidth="lg">
      <Box sx={{ my: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom align="center">
          Add New Hospital
        </Typography>
        
        <HospitalForm
          onSubmit={handleSubmit}
          loading={loading}
          error={error}
        />
      </Box>
    </Container>
  );
};

export default CreateHospital; 