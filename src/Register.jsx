import React, { useState } from 'react';
import { 
  Box, 
  Button, 
  Container, 
  CssBaseline, 
  Typography, 
  TextField, 
  Select, 
  MenuItem, 
  FormControl, 
  InputLabel, 
  ToggleButton, 
  ToggleButtonGroup,
  Paper
} from '@mui/material';
import { ThemeProvider, createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#d32f2f',
    },
  },
});

const bloodGroups = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];

const Register = () => {
  const [formData, setFormData] = useState({
    role: 'donor',
    name: '',
    email: '',
    city: '',
    bloodGroup: '',
    password: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleRoleChange = (event, newRole) => {
    if (newRole !== null) {
      setFormData(prev => ({
        ...prev,
        role: newRole
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    alert('Registration successful!');
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container maxWidth="sm">
        <Box sx={{ 
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          py: 4
        }}>
          <Paper elevation={3} sx={{ p: 4, borderRadius: 2 }}>
            <Typography variant="h4" component="h1" align="center" color="primary" gutterBottom>
              Register
            </Typography>

            <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
              <FormControl fullWidth sx={{ mb: 3 }}>
                <Typography variant="subtitle1" gutterBottom>
                  I want to register as:
                </Typography>
                <ToggleButtonGroup
                  color="primary"
                  value={formData.role}
                  exclusive
                  onChange={handleRoleChange}
                  fullWidth
                >
                  <ToggleButton value="donor">Donor</ToggleButton>
                  <ToggleButton value="recipient">Recipient</ToggleButton>
                </ToggleButtonGroup>
              </FormControl>

              <TextField
                margin="normal"
                required
                fullWidth
                label="Name"
                name="name"
                value={formData.name}
                onChange={handleChange}
              />

              <TextField
                margin="normal"
                required
                fullWidth
                label="Email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
              />

              <TextField
                margin="normal"
                required
                fullWidth
                label="Password"
                name="password"
                type="password"
                value={formData.password}
                onChange={handleChange}
              />

              <TextField
                margin="normal"
                required
                fullWidth
                label="City"
                name="city"
                value={formData.city}
                onChange={handleChange}
              />

              <FormControl fullWidth margin="normal" required>
                <InputLabel>Blood Group</InputLabel>
                <Select
                  name="bloodGroup"
                  value={formData.bloodGroup}
                  label="Blood Group"
                  onChange={handleChange}
                >
                  {bloodGroups.map(group => (
                    <MenuItem key={group} value={group}>{group}</MenuItem>
                  ))}
                </Select>
              </FormControl>

              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2, py: 1.5 }}
              >
                Register
              </Button>

              <Typography variant="body2" align="center">
                Already have an account? <Button href="/login" color="primary">Login</Button>
              </Typography>
            </Box>
          </Paper>
        </Box>
      </Container>
    </ThemeProvider>
  );
};

export default Register;