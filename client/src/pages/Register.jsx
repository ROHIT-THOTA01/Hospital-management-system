import React from 'react';
import { Container } from '@mui/material';
import RegisterForm from '../components/auth/RegisterForm';

const Register = () => {
  return (
    <Container maxWidth="md">
      <RegisterForm />
    </Container>
  );
};

export default Register; 