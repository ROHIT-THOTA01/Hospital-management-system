import React, { useState } from 'react';
import {
  Box,
  TextField,
  Button,
  Typography,
  Paper,
  Chip,
  Rating,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  OutlinedInput,
  CircularProgress,
} from '@mui/material';
import { useTheme } from '@mui/material/styles';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const specialities = [
  'Heart',
  'Ear',
  'Eye',
  'Skin',
  'Brain',
  'Dental',
  'Orthopedic',
  'Pediatric',
  'Gynecology',
  'Neurology',
  'Oncology',
  'Urology',
];

const HospitalForm = ({ initialData, onSubmit, loading, error }) => {
  const theme = useTheme();
  const [formData, setFormData] = useState({
    name: initialData?.name || '',
    city: initialData?.city || '',
    image: initialData?.image || '',
    speciality: initialData?.speciality || [],
    rating: initialData?.rating || 1,
    description: initialData?.description || '',
    images: initialData?.images?.join(', ') || '',
    numberOfDoctors: initialData?.numberOfDoctors || '',
    numberOfDepartments: initialData?.numberOfDepartments || '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleRatingChange = (event, newValue) => {
    setFormData({
      ...formData,
      rating: newValue,
    });
  };

  const handleSpecialityChange = (event) => {
    const {
      target: { value },
    } = event;
    setFormData({
      ...formData,
      speciality: typeof value === 'string' ? value.split(',') : value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Process the data before submitting
    const submitData = {
      ...formData,
      images: formData.images ? formData.images.split(',').map(img => img.trim()) : [],
      numberOfDoctors: Number(formData.numberOfDoctors) || 0,
      numberOfDepartments: Number(formData.numberOfDepartments) || 0,
    };
    
    onSubmit(submitData);
  };

  return (
    <Paper elevation={3} sx={{ p: 3, maxWidth: 800, mx: 'auto', mt: 3 }}>
      <Typography variant="h5" component="h2" gutterBottom>
        {initialData ? 'Edit Hospital' : 'Add New Hospital'}
      </Typography>

      {error && (
        <Typography color="error" sx={{ mb: 2 }}>
          {error}
        </Typography>
      )}

      <Box component="form" onSubmit={handleSubmit} noValidate>
        <TextField
          margin="normal"
          required
          fullWidth
          id="name"
          label="Hospital Name"
          name="name"
          value={formData.name}
          onChange={handleChange}
        />

        <TextField
          margin="normal"
          required
          fullWidth
          id="city"
          label="City"
          name="city"
          value={formData.city}
          onChange={handleChange}
        />

        <TextField
          margin="normal"
          required
          fullWidth
          id="image"
          label="Main Image URL"
          name="image"
          value={formData.image}
          onChange={handleChange}
        />

        <FormControl fullWidth margin="normal" required>
          <InputLabel id="speciality-label">Specialities</InputLabel>
          <Select
            labelId="speciality-label"
            id="speciality"
            multiple
            value={formData.speciality}
            onChange={handleSpecialityChange}
            input={<OutlinedInput id="select-multiple-chip" label="Specialities" />}
            renderValue={(selected) => (
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                {selected.map((value) => (
                  <Chip key={value} label={value} />
                ))}
              </Box>
            )}
            MenuProps={MenuProps}
          >
            {specialities.map((speciality) => (
              <MenuItem
                key={speciality}
                value={speciality}
                style={{
                  fontWeight:
                    formData.speciality.indexOf(speciality) === -1
                      ? theme.typography.fontWeightRegular
                      : theme.typography.fontWeightMedium,
                }}
              >
                {speciality}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <Box sx={{ mt: 2, mb: 2 }}>
          <Typography component="legend">Rating</Typography>
          <Rating
            name="rating"
            value={formData.rating}
            onChange={handleRatingChange}
            precision={0.5}
          />
        </Box>

        <TextField
          margin="normal"
          fullWidth
          id="description"
          label="Description"
          name="description"
          multiline
          rows={4}
          value={formData.description}
          onChange={handleChange}
        />

        <TextField
          margin="normal"
          fullWidth
          id="images"
          label="Additional Images (comma separated URLs)"
          name="images"
          value={formData.images}
          onChange={handleChange}
          helperText="Enter image URLs separated by commas"
        />

        <Box sx={{ display: 'flex', gap: 2, mt: 2 }}>
          <TextField
            margin="normal"
            fullWidth
            id="numberOfDoctors"
            label="Number of Doctors"
            name="numberOfDoctors"
            type="number"
            value={formData.numberOfDoctors}
            onChange={handleChange}
            InputProps={{ inputProps: { min: 0 } }}
          />

          <TextField
            margin="normal"
            fullWidth
            id="numberOfDepartments"
            label="Number of Departments"
            name="numberOfDepartments"
            type="number"
            value={formData.numberOfDepartments}
            onChange={handleChange}
            InputProps={{ inputProps: { min: 0 } }}
          />
        </Box>

        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
          disabled={loading}
        >
          {loading ? (
            <CircularProgress size={24} />
          ) : initialData ? (
            'Update Hospital'
          ) : (
            'Add Hospital'
          )}
        </Button>
      </Box>
    </Paper>
  );
};

export default HospitalForm; 