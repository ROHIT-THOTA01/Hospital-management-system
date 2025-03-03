import React, { useState } from 'react';
import {
  Box,
  TextField,
  Button,
  Typography,
  Paper,
  Container,
  Chip,
  Stack,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const CreateHospital = () => {
  const navigate = useNavigate();
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
      const response = await axios.post('/api/v1/hospitals/create', formData);
      if (response.data.success) {
        navigate('/hospitals');
      }
    } catch (err) {
      setError(err.response?.data?.error || 'An error occurred while creating the hospital');
    }
  };

  return (
    <Container maxWidth="md">
      <Paper elevation={3} sx={{ p: 4, mt: 4 }}>
        <Typography variant="h4" gutterBottom align="center" color="primary">
          Create New Hospital
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

          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Create Hospital
          </Button>
        </Box>
      </Paper>
    </Container>
  );
};

export default CreateHospital; 