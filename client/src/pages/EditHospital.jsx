import React, { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Container, Typography, Box, Alert, CircularProgress } from '@mui/material';
import axios from 'axios';
import HospitalForm from '../components/hospital/HospitalForm';
import { AuthContext } from '../context/AuthContext';
import { API_BASE_URL } from '../config';

const EditHospital = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  
  const [hospital, setHospital] = useState(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);
  
  // Check if user is logged in
  useEffect(() => {
    if (!user) {
      navigate('/');
    }
  }, [user, navigate]);
  
  // Fetch hospital data
  useEffect(() => {
    const fetchHospital = async () => {
      try {
        const res = await axios.get(`${API_BASE_URL}/hospitals`, {
          params: { id }
        });
        if (res.data.success) {
          setHospital(res.data.data);
        } else {
          setError('Hospital not found');
        }
      } catch (err) {
        setError('Failed to fetch hospital details');
      } finally {
        setLoading(false);
      }
    };
    
    fetchHospital();
  }, [id]);
  
  const handleSubmit = async (formData) => {
    setSubmitting(true);
    setError(null);
    
    try {
      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      };
      
      // Update basic hospital info
      const updateRes = await axios.put(
        `${API_BASE_URL}/hospitals/update`,
        {
          ...formData,
          id
        },
        config
      );
      
      if (updateRes.data.success) {
        // Update hospital details
        const detailsRes = await axios.post(
          `${API_BASE_URL}/hospitals/details`,
          {
            id,
            description: formData.description,
            images: formData.images,
            numberOfDoctors: formData.numberOfDoctors,
            numberOfDepartments: formData.numberOfDepartments,
          },
          config
        );
        
        if (detailsRes.data.success) {
          navigate(`/hospitals/${id}`);
        }
      }
    } catch (err) {
      setError(
        err.response?.data?.error || 'Failed to update hospital. Please try again.'
      );
    } finally {
      setSubmitting(false);
    }
  };
  
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
  
  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', my: 4 }}>
        <CircularProgress />
      </Box>
    );
  }
  
  if (error || !hospital) {
    return (
      <Container maxWidth="lg">
        <Box sx={{ my: 4 }}>
          <Alert severity="error">{error || 'Hospital not found'}</Alert>
        </Box>
      </Container>
    );
  }
  
  return (
    <Container maxWidth="lg">
      <Box sx={{ my: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom align="center">
          Edit Hospital
        </Typography>
        
        <HospitalForm
          initialData={hospital}
          onSubmit={handleSubmit}
          loading={submitting}
          error={error}
        />
      </Box>
    </Container>
  );
};

export default EditHospital; 