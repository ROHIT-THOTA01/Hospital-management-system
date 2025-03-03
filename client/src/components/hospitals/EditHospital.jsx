import React, { useState, useEffect } from 'react';
import {
  Box,
  TextField,
  Button,
  Typography,
  Paper,
  Container,
  Chip,
  Stack,
  CircularProgress,
} from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

const EditHospital = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    name: '',
    city: '',
    image: '',
    speciality: [],
    rating: 1,
    description: '',
    images: [],
    numberOfDoctors: 0,
    numberOfDepartments: 0,
  });

  const [specialityInput, setSpecialityInput] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchHospital = async () => {
      try {
        const response = await axios.get(`/api/v1/hospitals/details?id=${id}`);
        if (response.data.success) {
          setFormData(response.data.data);
        }
      } catch (err) {
        setError(err.response?.data?.error || 'Error fetching hospital details');
      } finally {
        setLoading(false);
      }
    };

    fetchHospital();
  }, [id]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSpecialityAdd = () => {
    if (specialityInput.trim()) {
      setFormData({
        ...formData,
        speciality: [...formData.speciality, specialityInput.trim()],
      });
      setSpecialityInput('');
    }
  };

  const handleSpecialityDelete = (indexToDelete) => {
    setFormData({
      ...formData,
      speciality: formData.speciality.filter((_, index) => index !== indexToDelete),
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(`/api/v1/hospitals/update?id=${id}`, formData);
      if (response.data.success) {
        navigate('/hospitals');
      }
    } catch (err) {
      setError(err.response?.data?.error || 'An error occurred while updating the hospital');
    }
  };

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="80vh">
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Container maxWidth="md">
      <Paper elevation={3} sx={{ p: 4, mt: 4 }}>
        <Typography variant="h4" gutterBottom align="center" color="primary">
          Edit Hospital
        </Typography>

        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
          <TextField
            fullWidth
            label="Hospital Name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            margin="normal"
          />

          <TextField
            fullWidth
            label="City"
            name="city"
            value={formData.city}
            onChange={handleChange}
            required
            margin="normal"
          />

          <TextField
            fullWidth
            label="Image URL"
            name="image"
            value={formData.image}
            onChange={handleChange}
            required
            margin="normal"
          />

          <Box sx={{ mt: 2, mb: 2 }}>
            <Stack direction="row" spacing={2} alignItems="center">
              <TextField
                label="Add Speciality"
                value={specialityInput}
                onChange={(e) => setSpecialityInput(e.target.value)}
                sx={{ flexGrow: 1 }}
              />
              <Button
                variant="contained"
                onClick={handleSpecialityAdd}
                disabled={!specialityInput.trim()}
              >
                Add
              </Button>
            </Stack>
            <Box sx={{ mt: 2, display: 'flex', flexWrap: 'wrap', gap: 1 }}>
              {formData.speciality.map((spec, index) => (
                <Chip
                  key={index}
                  label={spec}
                  onDelete={() => handleSpecialityDelete(index)}
                  color="primary"
                  variant="outlined"
                />
              ))}
            </Box>
          </Box>

          <TextField
            fullWidth
            label="Rating"
            name="rating"
            type="number"
            value={formData.rating}
            onChange={handleChange}
            inputProps={{ min: 1, max: 5 }}
            margin="normal"
          />

          <TextField
            fullWidth
            label="Description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            multiline
            rows={4}
            margin="normal"
          />

          <TextField
            fullWidth
            label="Number of Doctors"
            name="numberOfDoctors"
            type="number"
            value={formData.numberOfDoctors}
            onChange={handleChange}
            inputProps={{ min: 0 }}
            margin="normal"
          />

          <TextField
            fullWidth
            label="Number of Departments"
            name="numberOfDepartments"
            type="number"
            value={formData.numberOfDepartments}
            onChange={handleChange}
            inputProps={{ min: 0 }}
            margin="normal"
          />

          {error && (
            <Typography color="error" sx={{ mt: 2 }}>
              {error}
            </Typography>
          )}

          <Stack direction="row" spacing={2} sx={{ mt: 3 }}>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
            >
              Update Hospital
            </Button>
            <Button
              fullWidth
              variant="outlined"
              onClick={() => navigate('/hospitals')}
            >
              Cancel
            </Button>
          </Stack>
        </Box>
      </Paper>
    </Container>
  );
};

export default EditHospital; 