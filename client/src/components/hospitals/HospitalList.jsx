import React, { useState, useEffect } from 'react';
import {
  Box,
  Container,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Typography,
  TextField,
  Rating,
  IconButton,
  Chip,
  Stack,
} from '@mui/material';
import { Edit as EditIcon, Delete as DeleteIcon } from '@mui/icons-material';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const HospitalList = () => {
  const [hospitals, setHospitals] = useState([]);
  const [city, setCity] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const fetchHospitals = async () => {
    try {
      const response = await axios.get(`/api/v1/hospitals?city=${city}`);
      if (response.data.success) {
        setHospitals(response.data.data);
        setError('');
      }
    } catch (err) {
      setError(err.response?.data?.error || 'Error fetching hospitals');
      setHospitals([]);
    }
  };

  useEffect(() => {
    if (city) {
      fetchHospitals();
    }
  }, [city]);

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this hospital?')) {
      try {
        const response = await axios.delete(`/api/v1/hospitals/delete?id=${id}`);
        if (response.data.success) {
          fetchHospitals();
        }
      } catch (err) {
        setError(err.response?.data?.error || 'Error deleting hospital');
      }
    }
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 4 }}>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" gutterBottom color="primary">
          Find Hospitals
        </Typography>
        <TextField
          fullWidth
          label="Enter City"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          placeholder="Search hospitals by city..."
          sx={{ mb: 2 }}
        />
        {error && (
          <Typography color="error" sx={{ mt: 2 }}>
            {error}
          </Typography>
        )}
      </Box>

      <Grid container spacing={3}>
        {hospitals.map((hospital) => (
          <Grid item xs={12} sm={6} md={4} key={hospital._id}>
            <Card
              sx={{
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                position: 'relative',
              }}
            >
              <CardMedia
                component="img"
                height="200"
                image={hospital.image}
                alt={hospital.name}
                sx={{ objectFit: 'cover' }}
              />
              <CardContent sx={{ flexGrow: 1 }}>
                <Typography variant="h6" gutterBottom>
                  {hospital.name}
                </Typography>
                <Typography variant="body2" color="text.secondary" gutterBottom>
                  {hospital.city}
                </Typography>
                <Rating value={hospital.rating} readOnly precision={0.5} />
                <Box sx={{ mt: 1 }}>
                  <Stack direction="row" spacing={1} flexWrap="wrap">
                    {hospital.speciality.map((spec, index) => (
                      <Chip
                        key={index}
                        label={spec}
                        size="small"
                        color="primary"
                        variant="outlined"
                        sx={{ mt: 0.5 }}
                      />
                    ))}
                  </Stack>
                </Box>
                <Box sx={{ mt: 2 }}>
                  <Typography variant="body2">
                    Doctors: {hospital.numberOfDoctors}
                  </Typography>
                  <Typography variant="body2">
                    Departments: {hospital.numberOfDepartments}
                  </Typography>
                </Box>
              </CardContent>
              <Box sx={{ p: 2, display: 'flex', justifyContent: 'flex-end' }}>
                <IconButton
                  onClick={() => navigate(`/hospitals/edit/${hospital._id}`)}
                  color="primary"
                >
                  <EditIcon />
                </IconButton>
                <IconButton
                  onClick={() => handleDelete(hospital._id)}
                  color="error"
                >
                  <DeleteIcon />
                </IconButton>
              </Box>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default HospitalList; 