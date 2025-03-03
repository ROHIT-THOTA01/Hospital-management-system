import React, { useState, useContext } from 'react';
import { useNavigate, Link as RouterLink } from 'react-router-dom';
import {
  Box,
  TextField,
  Button,
  Typography,
  Paper,
  Link,
  Alert,
  CircularProgress,
  Divider,
} from '@mui/material';
import { AuthContext } from '../../context/AuthContext';

const LoginForm = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [formErrors, setFormErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { login, error, clearError } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    // Clear field error when user types
    if (formErrors[name]) {
      setFormErrors({
        ...formErrors,
        [name]: '',
      });
    }
    // Clear global error when user makes changes
    if (error) {
      clearError();
    }
  };

  const validateForm = () => {
    const errors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!formData.email) {
      errors.email = 'Email is required';
    } else if (!emailRegex.test(formData.email)) {
      errors.email = 'Please enter a valid email address';
    }

    if (!formData.password) {
      errors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      errors.password = 'Password must be at least 6 characters';
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (validateForm()) {
      setIsSubmitting(true);
      const success = await login(formData);
      setIsSubmitting(false);

      if (success) {
        navigate('/');
      }
    }
  };

  const handleDemoLogin = async () => {
    const demoCredentials = {
      email: 'vikash@gmail.com',
      password: 'vikash123'
    };
    
    setFormData(demoCredentials);
    setIsSubmitting(true);
    const success = await login(demoCredentials);
    setIsSubmitting(false);

    if (success) {
      navigate('/');
    }
  };

  return (
    <Paper elevation={3} sx={{ p: 4, maxWidth: 500, mx: 'auto', mt: 8 }}>
      <Typography variant="h4" component="h1" align="center" gutterBottom>
        Login
      </Typography>

      {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}

      <Button
        fullWidth
        variant="contained"
        color="primary"
        onClick={handleDemoLogin}
        disabled={isSubmitting}
        sx={{ 
          mb: 3,
          bgcolor: '#4caf50',
          '&:hover': { bgcolor: '#388e3c' },
          fontSize: '1.1rem',
          py: 1.5
        }}
      >
        {isSubmitting ? <CircularProgress size={24} /> : 'Login with Demo Account'}
      </Button>

      <Divider sx={{ mb: 3 }}>
        <Typography variant="body2" color="text.secondary">
          Or login with your account
        </Typography>
      </Divider>

      <Box component="form" onSubmit={handleSubmit} noValidate>
        <TextField
          margin="normal"
          required
          fullWidth
          id="email"
          label="Email Address"
          name="email"
          autoComplete="email"
          autoFocus
          value={formData.email}
          onChange={handleChange}
          error={!!formErrors.email}
          helperText={formErrors.email}
        />

        <TextField
          margin="normal"
          required
          fullWidth
          name="password"
          label="Password"
          type="password"
          id="password"
          autoComplete="current-password"
          value={formData.password}
          onChange={handleChange}
          error={!!formErrors.password}
          helperText={formErrors.password}
        />

        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
          disabled={isSubmitting}
        >
          {isSubmitting ? <CircularProgress size={24} /> : 'Login'}
        </Button>

        <Box sx={{ textAlign: 'center' }}>
          <Typography variant="body2">
            Don't have an account?{' '}
            <Link component={RouterLink} to="/register" variant="body2">
              Sign Up
            </Link>
          </Typography>
        </Box>
      </Box>

      <Divider sx={{ my: 3 }} />
      

    </Paper>
  );
};

export default LoginForm; 