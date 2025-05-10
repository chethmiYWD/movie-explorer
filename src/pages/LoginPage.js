import React, { useState } from 'react';
import { TextField, Button, Container } from '@mui/material';
import './LoginPage.css';

function LoginPage({ onLogin }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    onLogin(username);
  };

  return (
    <Container className="login-container">
      <div className="login-form">
        <h2 className="login-title">Login</h2>
        <TextField
          className="login-field"
          label="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          fullWidth
          margin="normal"
        />
        <TextField
          className="login-field"
          label="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          fullWidth
          margin="normal"
        />
        <Button 
          className="login-button"
          onClick={handleLogin}
          fullWidth
          variant="contained"
        >
          Login
        </Button>
      </div>
    </Container>
  );
}

export default LoginPage;