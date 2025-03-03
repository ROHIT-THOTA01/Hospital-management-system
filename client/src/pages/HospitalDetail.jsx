import React, { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import {
  Container,
  Typography,
  Box,
  Grid,
  Paper,
  Chip,
  Button,
  Rating,
  Divider,
  ImageList,
  ImageListItem,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Alert,
  Snackbar,
} from '@mui/material';
import {
  LocationOn as LocationIcon,
  LocalHospital as DoctorIcon,
  Category as DepartmentIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
} from '@mui/icons-material';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';
import { API_BASE_URL } from '../config';

const HospitalDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  
  const [hospital, setHospital] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'success'
  });
  
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
  
  const handleDelete = async () => {
    try {
      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
        data: { id }
      };
      
      await axios.delete(`${API_BASE_URL}/hospitals/delete`, config);
      setSnackbar({
        open: true,
        message: 'Hospital deleted successfully',
        severity: 'success'
      });
      setTimeout(() => {
        navigate('/');
      }, 1500);
    } catch (err) {
      setSnackbar({
        open: true,
        message: err.response?.data?.error || 'Failed to delete hospital',
        severity: 'error'
      });
    }
    setOpenDialog(false);
  };

  const handleUpdate = () => {
    navigate(`/hospitals/${id}/edit`);
  };

  const handleCloseSnackbar = () => {
    setSnackbar({ ...snackbar, open: false });
  };
  
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
          <Typography color="error" variant="h6" align="center">
            {error || 'Hospital not found'}
          </Typography>
          <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
            <Button component={Link} to="/" variant="contained">
              Back to Home
            </Button>
          </Box>
        </Box>
      </Container>
    );
  }
  
  return (
    <Container maxWidth="lg">
      <Paper elevation={3} sx={{ p: 3, my: 4 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
          <Typography variant="h4" component="h1" gutterBottom>
            {hospital.name}
          </Typography>
        </Box>
        
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
          <LocationIcon color="primary" />
          <Typography variant="body1" sx={{ ml: 1 }}>
            {hospital.city}
          </Typography>
        </Box>
        
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
          <Rating value={hospital.rating} precision={0.5} readOnly />
          <Typography variant="body2" sx={{ ml: 1 }}>
            ({hospital.rating})
          </Typography>
        </Box>
        
        <Box sx={{ mb: 3 }}>
          <img
            src={hospital.image}
            alt={hospital.name}
            style={{ width: '100%', height: 'auto', maxHeight: '400px', objectFit: 'cover', borderRadius: '8px' }}
          />
        </Box>
        
        <Box sx={{ mb: 3 }}>
          <Typography variant="h6" gutterBottom>
            Specialities
          </Typography>
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
            {hospital.speciality.map((spec, index) => (
              <Chip key={index} label={spec} color="primary" />
            ))}
          </Box>
        </Box>
        
        {hospital.description && (
          <Box sx={{ mb: 3 }}>
            <Typography variant="h6" gutterBottom>
              Description
            </Typography>
            <Typography variant="body1" paragraph>
              {hospital.description}
            </Typography>
          </Box>
        )}
        
        <Grid container spacing={3} sx={{ mb: 3 }}>
          <Grid item xs={12} sm={6}>
            <Paper elevation={1} sx={{ p: 2, display: 'flex', alignItems: 'center' }}>
              <DoctorIcon color="primary" sx={{ mr: 1 }} />
              <Typography variant="body1">
                {hospital.numberOfDoctors || 0} Doctors
              </Typography>
            </Paper>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Paper elevation={1} sx={{ p: 2, display: 'flex', alignItems: 'center' }}>
              <DepartmentIcon color="primary" sx={{ mr: 1 }} />
              <Typography variant="body1">
                {hospital.numberOfDepartments || 0} Departments
              </Typography>
            </Paper>
          </Grid>
        </Grid>
        
        {hospital.images && hospital.images.length > 0 && (
          <Box sx={{ mb: 3 }}>
            <Typography variant="h6" gutterBottom>
              Gallery
            </Typography>
            <ImageList cols={3} gap={8}>
              {hospital.images.map((img, index) => (
                <ImageListItem key={index}>
                  <img
                    src={img}
                    alt={`${hospital.name} - ${index + 1}`}
                    loading="lazy"
                    style={{ borderRadius: '4px' }}
                  />
                </ImageListItem>
              ))}
            </ImageList>
          </Box>
        )}
        
        <Divider sx={{ my: 3 }} />
        
        {user && (
          <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2 }}>
            <Button
              onClick={handleUpdate}
              startIcon={<EditIcon />}
              variant="contained"
              color="primary"
              size="large"
            >
              Update Hospital
            </Button>
            <Button
              startIcon={<DeleteIcon />}
              variant="contained"
              color="error"
              onClick={() => setOpenDialog(true)}
              size="large"
            >
              Delete Hospital
            </Button>
          </Box>
        )}
      </Paper>
      
      {/* Delete Confirmation Dialog */}
      <Dialog
        open={openDialog}
        onClose={() => setOpenDialog(false)}
        aria-labelledby="delete-dialog-title"
        aria-describedby="delete-dialog-description"
      >
        <DialogTitle id="delete-dialog-title">
          Delete Hospital
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="delete-dialog-description">
            Are you sure you want to delete {hospital.name}? This action cannot be undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)} color="primary">
            Cancel
          </Button>
          <Button onClick={handleDelete} color="error" variant="contained" autoFocus>
            Delete
          </Button>
        </DialogActions>
      </Dialog>

      {/* Success/Error Snackbar */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert onClose={handleCloseSnackbar} severity={snackbar.severity} sx={{ width: '100%' }}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default HospitalDetail; 