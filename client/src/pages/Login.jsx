import React from 'react';
import { Container } from '@mui/material';
import LoginForm from '../components/auth/LoginForm';

const Login = () => {
  return (
    <Container maxWidth="md">
      <LoginForm />
    </Container>
  );
};

export default Login; 