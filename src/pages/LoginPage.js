import React, { useState } from 'react';
import { TextField, Button, Container } from '@mui/material';
import './LoginPage.css';

// LoginPage component for user authentication
function LoginPage({ onLogin }) {
  // State for form inputs
  const [username, setUsername] = useState(''); // Stores username input
  const [password, setPassword] = useState(''); // Stores password input

  // Handle login button click
  const handleLogin = () => {
    onLogin(username); // Call parent's login function with username
  };

  return (
    // Main container with centered content
    <Container className="login-container">
      {/* Login form wrapper */}
      <div className="login-form">
        {/* Form title */}
        <h2 className="login-title">Login</h2>
        
        {/* Username input field */}
        <TextField
          className="login-field"
          label="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)} // Update username state
          fullWidth // Take full width of container
          margin="normal" // Standard margin
        />
        
        {/* Password input field */}
        <TextField
          className="login-field"
          label="Password"
          type="password" // Hide password characters
          value={password}
          onChange={(e) => setPassword(e.target.value)} // Update password state
          fullWidth
          margin="normal"
        />
        
        {/* Login button */}
        <Button 
          className="login-button"
          onClick={handleLogin} // Trigger login on click
          fullWidth
          variant="contained" // Filled button style
        >
          Login
        </Button>
      </div>
    </Container>
  );
}

export default LoginPage;