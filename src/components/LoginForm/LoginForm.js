import React, { useState} from 'react';
import { AuthContext } from '../AuthContext/AuthContext';
import { useContext } from 'react';
import { Button } from '@mui/material';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

function LoginForm() {
  const { login } = useContext(AuthContext);
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  // const emailInputRef = useRef(null);

  const handleLogin = () => {
    const { email, password } = formData;

    // Check if email and password are not empty
    if (!email || !password) {
      setError('Both email and password are required');
      return;
    }

    // Validate the email format
    if (!isValidEmail(email)) {
      setError('Please enter a valid email address');
      return;
    }

    // Validate the password length
    if (password.length < 7) {
      setError('Password must be at least 7 characters long');
      return;
    }

    // Perform the login logic here (e.g., send the data to a server)
    // If successful, you can clear the form data and handle the login state

    // Reset the form and error message
    setFormData({ email: '', password: '' });
    setError('');

    if (email && password) {
      if (email.includes('@') && password.length >= 7) {
        login();
      }
    }
  };

  // Function to validate the email format
  const isValidEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };




return (
  <div className="login-form">
    <Typography variant="h6" >Login</Typography>
    <Box mb={2}>
      <TextField
        label="Email"
        type="text"
        name="email"
        value={formData.email}
        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
        autoFocus
      />
    </Box>
    <Box mb={2}>
      <TextField
        label="Password"
        type="password"
        name="password"
        value={formData.password}
        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
      />
    </Box>
    {error && <Typography color="error">{error}</Typography>}
    <Button variant="contained" color="primary" onClick={handleLogin}>
      Login
    </Button>
  </div>
);
}




export default LoginForm;
