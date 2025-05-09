import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { TextField, Button, Box, Typography } from '@mui/material';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        if (login(username, password)) {
          navigate('/');
        } else {
          setError('Invalid credentials');
        }
      };

      return (
        <Box sx={{ maxWidth: 400, mx: 'auto', mt: 4, p: 3 }}>
          <Typography variant="h4" gutterBottom>Login</Typography>
          <form onSubmit={handleSubmit}>
            <TextField
              label="Username"
              fullWidth
              margin="normal"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />