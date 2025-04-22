import React, { useState } from 'react';
import { 
  Box, 
  Button, 
  Container, 
  CssBaseline, 
  Typography, 
  TextField, 
  Paper,
  CircularProgress,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions
} from '@mui/material';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';

const theme = createTheme({
  palette: {
    primary: {
      main: '#d32f2f',
    },
  },
});

const Login = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [roleDialogOpen, setRoleDialogOpen] = useState(false);
  const [userRoles, setUserRoles] = useState([]);
  const navigate = useNavigate();
  
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: '',
      password: ''
    }
  });

  const onSubmit = async (data) => {
    setLoading(true);
    setError('');

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // In a real app, this would come from your backend
      // For demo purposes, we'll simulate different user types
      const email = data.email.toLowerCase();
      
      let roles = [];
      if (email.includes('donor')) roles.push('donor');
      if (email.includes('recipient')) roles.push('recipient');
      
      // Default to recipient if no role detected
      if (roles.length === 0) roles.push('recipient');
      
      setUserRoles(roles);
      
      if (roles.length === 1) {
        // Single role - redirect directly
        if (roles[0] === 'donor') {
          navigate('/donor-dashboard');
        } else {
          navigate('/dashboard');
        }
      } else {
        // Multiple roles - show selection dialog
        setRoleDialogOpen(true);
      }
      
    } catch (err) {
      setError(err.message || 'Login failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleRoleSelection = (role) => {
    setRoleDialogOpen(false);
    if (role === 'donor') {
      navigate('/donor-dashboard');
    } else {
      navigate('/dashboard');
    }
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
              Login
            </Typography>

            {error && (
              <Typography color="error" align="center" sx={{ mb: 2 }}>
                {error}
              </Typography>
            )}

            <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={{ mt: 3 }}>
              <TextField
                margin="normal"
                required
                fullWidth
                label="Email"
                type="email"
                autoComplete="email"
                disabled={loading}
                error={!!errors.email}
                helperText={errors.email?.message}
                {...register('email', {
                  required: 'Email is required',
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: 'Invalid email address'
                  }
                })}
              />

              <TextField
                margin="normal"
                required
                fullWidth
                label="Password"
                type="password"
                autoComplete="current-password"
                disabled={loading}
                error={!!errors.password}
                helperText={errors.password?.message}
                {...register('password', {
                  required: 'Password is required',
                  minLength: {
                    value: 6,
                    message: 'Password must be at least 6 characters'
                  }
                })}
              />

              <Button
                type="submit"
                fullWidth
                variant="contained"
                disabled={loading}
                sx={{ mt: 3, mb: 2, py: 1.5 }}
              >
                {loading ? (
                  <CircularProgress size={24} color="inherit" />
                ) : (
                  'Login'
                )}
              </Button>

              <Typography variant="body2" align="center">
                Don't have an account?{' '}
                <Button 
                  href="/register" 
                  color="primary"
                  disabled={loading}
                >
                  Register
                </Button>
              </Typography>
            </Box>
          </Paper>
        </Box>
      </Container>

      {/* Role Selection Dialog */}
      <Dialog open={roleDialogOpen} onClose={() => setRoleDialogOpen(false)}>
        <DialogTitle>Select Your Role</DialogTitle>
        <DialogContent>
          <Typography variant="body1" sx={{ mb: 2 }}>
            You have multiple roles. How would you like to proceed?
          </Typography>
        </DialogContent>
        <DialogActions sx={{ justifyContent: 'center', pb: 3 }}>
          {userRoles.includes('donor') && (
            <Button 
              variant="contained" 
              color="primary" 
              onClick={() => handleRoleSelection('donor')}
              sx={{ mx: 1 }}
            >
              Login as Donor
            </Button>
          )}
          {userRoles.includes('recipient') && (
            <Button 
              variant="contained" 
              color="primary" 
              onClick={() => handleRoleSelection('recipient')}
              sx={{ mx: 1 }}
            >
              Login as Recipient
            </Button>
          )}
        </DialogActions>
      </Dialog>
    </ThemeProvider>
  );
};

export default Login;