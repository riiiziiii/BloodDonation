import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Box,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  IconButton,
  Typography,
  TextField,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Divider,
  Avatar
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import LogoutIcon from '@mui/icons-material/Logout';
import BloodtypeIcon from '@mui/icons-material/Bloodtype';
import RequestQuoteIcon from '@mui/icons-material/RequestQuote';
import HomeIcon from '@mui/icons-material/Home';
import PersonIcon from '@mui/icons-material/Person';
import NotificationsIcon from '@mui/icons-material/Notifications';
import HistoryIcon from '@mui/icons-material/History';
import FavoriteIcon from '@mui/icons-material/Favorite';
import './Dashboard.css';

const Dashboard = () => {
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [formData, setFormData] = useState({
    bloodGroup: 'A',
    city: '',
    hospital: ''
  });
  const sidebarRef = useRef(null);

  // Click outside to close sidebar
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (sidebarOpen && sidebarRef.current && !sidebarRef.current.contains(event.target)) {
        setSidebarOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [sidebarOpen]);

  const requests = [
    { bloodGroup: 'A', city: 'Lahore', hospital: 'Jinnash', status: 'Accept' },
    { bloodGroup: 'A+', city: 'Salan', hospital: 'Jinnish', status: 'Accept' },
    { bloodGroup: 'C+', city: 'Lahore', hospital: 'Chonah', status: 'Accept' },
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Request submitted:', formData);
    // Add your request submission logic here
  };

  const handleLogout = () => {
    navigate('/');
  };

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh' }}>
      {/* Backdrop when sidebar is open */}
      {sidebarOpen && (
        <Box
          sx={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0,0,0,0.5)',
            zIndex: 1199,
          }}
        />
      )}

      {/* Sidebar */}
      <Drawer
        variant="temporary"
        open={sidebarOpen}
        sx={{
          '& .MuiDrawer-paper': { 
            width: 280,
            boxSizing: 'border-box',
            backgroundColor: '#2d2d2d',
          },
        }}
        className={`sidebar ${!sidebarOpen ? 'sidebar-closed' : ''}`}
        ref={sidebarRef}
      >
        <Box sx={{ p: 3, display: 'flex', alignItems: 'center' }}>
          <IconButton 
            onClick={toggleSidebar} 
            sx={{ mr: 1, color: '#e0e0e0' }}
            className="hamburger-icon"
          >
            {sidebarOpen ? <CloseIcon /> : <MenuIcon />}
          </IconButton>
          <Typography variant="h5" className="sidebar-title">
            LifeBlood
          </Typography>
        </Box>
        
        {/* User Profile */}
        <Box sx={{ px: 3, py: 2, display: 'flex', alignItems: 'center' }}>
          <Avatar sx={{ bgcolor: '#8a0303', mr: 2 }}>
            <PersonIcon />
          </Avatar>
          <Box>
            <Typography variant="subtitle1" sx={{ color: '#e0e0e0' }}>John Doe</Typography>
            <Typography variant="caption" sx={{ color: '#8a0303' }}>O+ Donor</Typography>
          </Box>
        </Box>
        
        <Divider sx={{ backgroundColor: '#424242', my: 1 }} />
        
        {/* Main Navigation */}
        <List>
          <ListItem button className="menu-item" onClick={() => navigate('/dashboard')}>
            <ListItemIcon>
              <HomeIcon sx={{ color: '#b0b0b0' }} />
            </ListItemIcon>
            <ListItemText primary="Dashboard" sx={{ color: '#e0e0e0' }} />
          </ListItem>
          
          <ListItem button className="menu-item">
            <ListItemIcon>
              <BloodtypeIcon sx={{ color: '#b0b0b0' }} />
            </ListItemIcon>
            <ListItemText primary="Donate Blood" sx={{ color: '#e0e0e0' }} />
          </ListItem>
          
          <ListItem button className="menu-item">
            <ListItemIcon>
              <FavoriteIcon sx={{ color: '#b0b0b0' }} />
            </ListItemIcon>
            <ListItemText primary="Find Donors" sx={{ color: '#e0e0e0' }} />
          </ListItem>
          
          <ListItem button className="menu-item">
            <ListItemIcon>
              <RequestQuoteIcon sx={{ color: '#b0b0b0' }} />
            </ListItemIcon>
            <ListItemText primary="My Requests" sx={{ color: '#e0e0e0' }} />
          </ListItem>
          
          <ListItem button className="menu-item">
            <ListItemIcon>
              <HistoryIcon sx={{ color: '#b0b0b0' }} />
            </ListItemIcon>
            <ListItemText primary="Donation History" sx={{ color: '#e0e0e0' }} />
          </ListItem>
          
          <ListItem button className="menu-item">
            <ListItemIcon>
              <NotificationsIcon sx={{ color: '#b0b0b0' }} />
            </ListItemIcon>
            <ListItemText primary="Notifications" sx={{ color: '#e0e0e0' }} />
          </ListItem>
        </List>
        
        <Divider sx={{ backgroundColor: '#424242', my: 1 }} />
        
        {/* Bottom Menu */}
        <List sx={{ mt: 'auto' }}>
          <ListItem button className="menu-item" onClick={handleLogout}>
            <ListItemIcon>
              <LogoutIcon sx={{ color: '#b0b0b0' }} />
            </ListItemIcon>
            <ListItemText primary="Logout" sx={{ color: '#e0e0e0' }} />
          </ListItem>
        </List>
        
        {/* Blood Drop Decoration */}
        <Box sx={{ textAlign: 'center', py: 2 }}>
          <Typography variant="caption" sx={{ color: '#8a0303' }}>
            Every drop counts ❤️
          </Typography>
        </Box>
      </Drawer>

      {/* Main Content */}
      <Box 
        component="main" 
        sx={{ 
          flexGrow: 1, 
          p: 3,
          backgroundColor: '#fff5f5',
          minHeight: '100vh'
        }}
      >
        <IconButton
          edge="start"
          onClick={toggleSidebar}
          sx={{ mr: 2, color: '#8a0303' }}
        >
          <MenuIcon />
        </IconButton>

        <Box className="main-content-header">
          <Typography variant="h4" gutterBottom sx={{ color: '#8a0303' }}>
            Requests
          </Typography>
          <Typography variant="subtitle1" gutterBottom sx={{ color: '#8a0303', opacity: 0.8 }}>
            My Frontal Requests • Post New Request
          </Typography>
        </Box>

        {/* Request Form */}
        <Paper sx={{ p: 3, mb: 4 }} className="request-card">
          <Typography variant="h6" gutterBottom sx={{ color: '#8a0303' }}>
            Post New Request
          </Typography>
          <Box component="form" onSubmit={handleSubmit}>
            <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
              <TextField
                select
                label="Blood Group"
                name="bloodGroup"
                value={formData.bloodGroup}
                onChange={handleChange}
                SelectProps={{
                  native: true,
                }}
                sx={{ minWidth: 120 }}
              >
                {['Select','A-', 'A+', 'B-', 'B+', 'AB-', 'AB+', 'O-', 'O+'].map((group) => (
                  <option key={group} value={group}>
                    {group}
                  </option>
                ))}
              </TextField>
              <TextField
                label="City"
                name="city"
                value={formData.city}
                onChange={handleChange}
                placeholder="Lahore"
                fullWidth
              />
              <TextField
                label="Hospital"
                name="hospital"
                value={formData.hospital}
                onChange={handleChange}
                fullWidth
              />
            </Box>
            <Button
              type="submit"
              variant="contained"
              sx={{ mt: 1 }}
              className="submit-btn"
            >
              Submit Request
            </Button>
          </Box>
        </Paper>

        {/* Requests Table */}
        <Typography variant="h6" gutterBottom sx={{ color: '#8a0303' }}>
          My Requests
        </Typography>
        <TableContainer component={Paper}>
          <Table>
            <TableHead className="table-header">
              <TableRow>
                <TableCell className="table-header-cell">Blood Group</TableCell>
                <TableCell className="table-header-cell">City</TableCell>
                <TableCell className="table-header-cell">Hospital</TableCell>
                <TableCell className="table-header-cell">Status</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {requests.map((request, index) => (
                <TableRow key={index} className="table-row">
                  <TableCell>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <BloodtypeIcon className="blood-drop" />
                      {request.bloodGroup}
                    </Box>
                  </TableCell>
                  <TableCell>{request.city}</TableCell>
                  <TableCell>{request.hospital}</TableCell>
                  <TableCell>
                    <Typography 
                      className={`status-${request.status.toLowerCase()}`}
                      sx={{ fontWeight: 'bold' }}
                    >
                      {request.status}
                    </Typography>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </Box>
  );
};

export default Dashboard;