import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
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
  Paper,
  Divider,
  Avatar,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Badge,
  Chip,
  Select,
  MenuItem,
  Snackbar,
  Alert,
  AppBar,
  Toolbar,
  Container
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
import EditIcon from '@mui/icons-material/Edit';
import SaveIcon from '@mui/icons-material/Save';
import ClearAllIcon from '@mui/icons-material/ClearAll';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ScheduleIcon from '@mui/icons-material/Schedule';
import CancelIcon from '@mui/icons-material/Cancel';
import './Dashboard.css';

const Dashboard = () => {
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showError, setShowError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  
  const { register, handleSubmit, formState: { errors }, reset } = useForm({
    defaultValues: {
      bloodGroup: 'A+',
      city: '',
      hospital: '',
      urgency: 'Medium',
      requiredBy: ''
    }
  });

  const [profileData, setProfileData] = useState({
    name: 'Recipient User',
    email: 'recipient@example.com',
    phone: '+1234567890',
    bloodGroup: 'O+',
    address: '123 Main St, Lahore',
    medicalCondition: 'Chronic anemia'
  });

  const [notifications, setNotifications] = useState([
    { id: 1, message: 'Your blood request has been received', time: '2 hours ago', read: false },
    { id: 2, message: 'Potential donor found for your request', time: '1 day ago', read: false },
    { id: 3, message: 'Blood donation camp near your location', time: '3 days ago', read: true },
  ]);

  const sidebarRef = useRef(null);
  const notificationsRef = useRef(null);

  // Click outside to close sidebar or notifications
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (sidebarOpen && sidebarRef.current && !sidebarRef.current.contains(event.target)) {
        setSidebarOpen(false);
      }
      if (notificationsOpen && notificationsRef.current && !notificationsRef.current.contains(event.target)) {
        setNotificationsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [sidebarOpen, notificationsOpen]);

  const handleProfileChange = (e) => {
    const { name, value } = e.target;
    setProfileData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const onSubmit = (data) => {
    console.log('Form submitted:', data);
    
    // Here you would typically make an API call to submit the request
    // For now, we'll simulate success/error responses
    
    // Simulate recursive request error (same hospital within 7 days)
    const isRecursive = Math.random() > 0.7; // 30% chance of error for demo
    
    if (isRecursive) {
      setErrorMessage('You already have an active request for this hospital. Please wait 7 days before submitting another.');
      setShowError(true);
    } else {
      setShowSuccess(true);
      reset();
      setNotifications([
        {
          id: Date.now(),
          message: `New request created for ${data.bloodGroup} blood at ${data.hospital}`,
          time: 'Just now',
          read: false
        },
        ...notifications
      ]);
    }
  };

  const handleSaveProfile = () => {
    console.log('Profile saved:', profileData);
    setEditMode(false);
  };

  const handleLogout = () => {
    navigate('/');
  };

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const toggleNotifications = () => {
    setNotificationsOpen(!notificationsOpen);
    // Mark notifications as read when opened
    if (!notificationsOpen) {
      setNotifications(notifications.map(n => ({ ...n, read: true })));
    }
  };

  const openProfile = () => {
    setProfileOpen(true);
    setSidebarOpen(false);
  };

  const clearNotifications = () => {
    setNotifications([]);
  };

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      {/* Navbar */}
      <AppBar position="static" sx={{ backgroundColor: '#d32f2f', boxShadow: 'none' }}>
        <Container maxWidth="xl">
          <Toolbar disableGutters sx={{ justifyContent: 'space-between' }}>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <IconButton
                edge="start"
                onClick={toggleSidebar}
                sx={{ mr: 2, color: 'white' }}
              >
                <MenuIcon />
              </IconButton>
              <Typography variant="h6" component="div" sx={{ display: { xs: 'none', sm: 'block' } }}>
                BloodBridge
              </Typography>
            </Box>
            
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <IconButton onClick={toggleNotifications} sx={{ color: 'white', mr: 2 }}>
                <Badge badgeContent={unreadCount} color="error">
                  <NotificationsIcon />
                </Badge>
              </IconButton>
              <Avatar 
                onClick={openProfile} 
                sx={{ backgroundColor: '#ffcdd2', color: '#d32f2f', cursor: 'pointer' }}
              >
                {profileData.name.charAt(0)}
              </Avatar>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>

      {/* Backdrop when sidebar or notifications are open */}
      {(sidebarOpen || notificationsOpen) && (
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

      {/* Main Sidebar */}
      <Drawer
        variant="temporary"
        open={sidebarOpen}
        sx={{
          '& .MuiDrawer-paper': { 
            width: 280,
            boxSizing: 'border-box',
            backgroundColor: '#d32f2f',
            color: 'white',
          },
        }}
        className={`sidebar ${!sidebarOpen ? 'sidebar-closed' : ''}`}
        ref={sidebarRef}
      >
        <Box sx={{ p: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography variant="h6">Recipient Menu</Typography>
          <IconButton onClick={toggleSidebar} sx={{ color: 'white' }}>
            <CloseIcon />
          </IconButton>
        </Box>
        <Divider sx={{ borderColor: 'rgba(255,255,255,0.2)' }} />
        <List>
          <ListItem button sx={{ '&:hover': { backgroundColor: 'rgba(255,255,255,0.1)' } }}>
            <ListItemIcon sx={{ color: 'white' }}>
              <HomeIcon />
            </ListItemIcon>
            <ListItemText primary="Dashboard" />
          </ListItem>
          <ListItem button onClick={openProfile} sx={{ '&:hover': { backgroundColor: 'rgba(255,255,255,0.1)' } }}>
            <ListItemIcon sx={{ color: 'white' }}>
              <PersonIcon />
            </ListItemIcon>
            <ListItemText primary="Profile" />
          </ListItem>
          <ListItem button sx={{ '&:hover': { backgroundColor: 'rgba(255,255,255,0.1)' } }}>
            <ListItemIcon sx={{ color: 'white' }}>
              <RequestQuoteIcon />
            </ListItemIcon>
            <ListItemText primary="My Requests" />
          </ListItem>
          <ListItem button onClick={toggleNotifications} sx={{ '&:hover': { backgroundColor: 'rgba(255,255,255,0.1)' } }}>
            <ListItemIcon sx={{ color: 'white' }}>
              <Badge badgeContent={unreadCount} color="error">
                <NotificationsIcon />
              </Badge>
            </ListItemIcon>
            <ListItemText primary="Notifications" />
          </ListItem>
          <ListItem button onClick={handleLogout} sx={{ '&:hover': { backgroundColor: 'rgba(255,255,255,0.1)' } }}>
            <ListItemIcon sx={{ color: 'white' }}>
              <LogoutIcon />
            </ListItemIcon>
            <ListItemText primary="Logout" />
          </ListItem>
        </List>
      </Drawer>

      {/* Notifications Sidebar */}
      <Drawer
        anchor="right"
        variant="temporary"
        open={notificationsOpen}
        sx={{
          '& .MuiDrawer-paper': {
            width: 350,
            boxSizing: 'border-box',
            backgroundColor: '#d32f2f',
            color: 'white',
          },
        }}
        className={`notifications-sidebar ${!notificationsOpen ? 'notifications-sidebar-closed' : ''}`}
        ref={notificationsRef}
      >
        <Box sx={{ p: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography variant="h6">Notifications</Typography>
          <Box>
            <IconButton 
              onClick={clearNotifications}
              sx={{ color: 'white' }}
              title="Clear all notifications"
            >
              <ClearAllIcon />
            </IconButton>
            <IconButton 
              onClick={toggleNotifications} 
              sx={{ ml: 1, color: 'white' }}
            >
              <CloseIcon />
            </IconButton>
          </Box>
        </Box>
        
        <Divider sx={{ borderColor: 'rgba(255,255,255,0.2)' }} />
        
        <List sx={{ overflowY: 'auto', maxHeight: 'calc(100vh - 120px)' }}>
          {notifications.length > 0 ? (
            notifications.map((notification) => (
              <ListItem 
                key={notification.id} 
                sx={{ 
                  backgroundColor: notification.read ? 'inherit' : 'rgba(255,255,255,0.1)',
                  borderLeft: notification.read ? 'none' : '4px solid #ffcdd2',
                  '&:hover': { backgroundColor: 'rgba(255,255,255,0.15)' }
                }}
              >
                <ListItemText
                  primary={notification.message}
                  secondary={notification.time}
                  sx={{ color: 'white' }}
                  secondaryTypographyProps={{ color: 'rgba(255,255,255,0.7)' }}
                />
              </ListItem>
            ))
          ) : (
            <ListItem>
              <Typography variant="body2" sx={{ fontStyle: 'italic', color: 'rgba(255,255,255,0.7)' }}>
                No notifications to display
              </Typography>
            </ListItem>
          )}
        </List>
      </Drawer>

      {/* Profile Dialog */}
      <Dialog 
        open={profileOpen} 
        onClose={() => setProfileOpen(false)}
        maxWidth="sm"
        fullWidth
        PaperProps={{ sx: { borderRadius: '12px' } }}
      >
        <DialogTitle sx={{ backgroundColor: '#d32f2f', color: 'white' }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Typography>Recipient Profile</Typography>
            {editMode ? (
              <IconButton onClick={handleSaveProfile} sx={{ color: 'white' }}>
                <SaveIcon />
              </IconButton>
            ) : (
              <IconButton onClick={() => setEditMode(true)} sx={{ color: 'white' }}>
                <EditIcon />
              </IconButton>
            )}
          </Box>
        </DialogTitle>
        <DialogContent sx={{ py: 3 }}>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
            <Box sx={{ display: 'flex', justifyContent: 'center', mb: 2 }}>
              <Avatar sx={{ width: 100, height: 100, backgroundColor: '#ffcdd2', color: '#d32f2f' }}>
                {profileData.name.charAt(0)}
              </Avatar>
            </Box>
            
            <TextField
              label="Full Name"
              name="name"
              value={profileData.name}
              onChange={handleProfileChange}
              fullWidth
              disabled={!editMode}
              variant="outlined"
              size="small"
            />
            
            <TextField
              label="Email"
              name="email"
              value={profileData.email}
              onChange={handleProfileChange}
              fullWidth
              disabled={!editMode}
              variant="outlined"
              size="small"
            />
            
            <TextField
              label="Phone Number"
              name="phone"
              value={profileData.phone}
              onChange={handleProfileChange}
              fullWidth
              disabled={!editMode}
              variant="outlined"
              size="small"
            />
            
            <Select
              label="Blood Group"
              name="bloodGroup"
              value={profileData.bloodGroup}
              onChange={handleProfileChange}
              fullWidth
              disabled={!editMode}
              variant="outlined"
              size="small"
            >
              <MenuItem value="A+">A+</MenuItem>
              <MenuItem value="A-">A-</MenuItem>
              <MenuItem value="B+">B+</MenuItem>
              <MenuItem value="B-">B-</MenuItem>
              <MenuItem value="AB+">AB+</MenuItem>
              <MenuItem value="AB-">AB-</MenuItem>
              <MenuItem value="O+">O+</MenuItem>
              <MenuItem value="O-">O-</MenuItem>
            </Select>
            
            <TextField
              label="Medical Condition"
              name="medicalCondition"
              value={profileData.medicalCondition}
              onChange={handleProfileChange}
              fullWidth
              disabled={!editMode}
              variant="outlined"
              size="small"
            />
            
            <TextField
              label="Address"
              name="address"
              value={profileData.address}
              onChange={handleProfileChange}
              fullWidth
              multiline
              rows={3}
              disabled={!editMode}
              variant="outlined"
              size="small"
            />
          </Box>
        </DialogContent>
        <DialogActions sx={{ px: 3, py: 2 }}>
          <Button 
            onClick={() => {
              setProfileOpen(false);
              setEditMode(false);
            }}
            color="error"
            variant="outlined"
          >
            Close
          </Button>
        </DialogActions>
      </Dialog>

      {/* Main Content */}
      <Container maxWidth="lg" sx={{ py: 4, flex: 1 }}>
        <Box sx={{ mb: 4 }}>
          <Typography variant="h4" gutterBottom sx={{ color: '#d32f2f', fontWeight: 'bold' }}>
            Request Blood
          </Typography>
          <Typography variant="subtitle1" gutterBottom sx={{ color: 'text.secondary' }}>
            Fill out the form below to request blood donation
          </Typography>
        </Box>

        {/* Request Form */}
        <Paper sx={{ 
          p: 4, 
          mb: 4, 
          borderRadius: '12px',
          boxShadow: '0 4px 20px rgba(0,0,0,0.08)'
        }}>
          <Box 
            component="form" 
            onSubmit={handleSubmit(onSubmit)}
            sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}
          >
            <Box sx={{ display: 'flex', gap: 3, flexWrap: 'wrap' }}>
              <Box sx={{ flex: 1, minWidth: '200px' }}>
                <Typography variant="subtitle2" gutterBottom sx={{ color: 'text.secondary' }}>
                  Blood Group
                </Typography>
                <Select
                  {...register("bloodGroup", { required: true })}
                  fullWidth
                  size="small"
                  variant="outlined"
                >
                  <MenuItem value="A+">A+</MenuItem>
                  <MenuItem value="A-">A-</MenuItem>
                  <MenuItem value="B+">B+</MenuItem>
                  <MenuItem value="B-">B-</MenuItem>
                  <MenuItem value="AB+">AB+</MenuItem>
                  <MenuItem value="AB-">AB-</MenuItem>
                  <MenuItem value="O+">O+</MenuItem>
                  <MenuItem value="O-">O-</MenuItem>
                </Select>
              </Box>
              
              <Box sx={{ flex: 1, minWidth: '200px' }}>
                <Typography variant="subtitle2" gutterBottom sx={{ color: 'text.secondary' }}>
                  City
                </Typography>
                <TextField
                  {...register("city", { required: "City is required" })}
                  fullWidth
                  size="small"
                  variant="outlined"
                  error={!!errors.city}
                  helperText={errors.city?.message}
                />
              </Box>
            </Box>
            
            <Box sx={{ display: 'flex', gap: 3, flexWrap: 'wrap' }}>
              <Box sx={{ flex: 1, minWidth: '200px' }}>
                <Typography variant="subtitle2" gutterBottom sx={{ color: 'text.secondary' }}>
                  Hospital
                </Typography>
                <TextField
                  {...register("hospital", { required: "Hospital is required" })}
                  fullWidth
                  size="small"
                  variant="outlined"
                  error={!!errors.hospital}
                  helperText={errors.hospital?.message}
                />
              </Box>
              
              <Box sx={{ flex: 1, minWidth: '200px' }}>
                <Typography variant="subtitle2" gutterBottom sx={{ color: 'text.secondary' }}>
                  Urgency
                </Typography>
                <Select
                  {...register("urgency", { required: true })}
                  fullWidth
                  size="small"
                  variant="outlined"
                >
                  <MenuItem value="High">High</MenuItem>
                  <MenuItem value="Medium">Medium</MenuItem>
                  <MenuItem value="Low">Low</MenuItem>
                </Select>
              </Box>
            </Box>
            
            <Box sx={{ width: '100%', maxWidth: '400px' }}>
              <Typography variant="subtitle2" gutterBottom sx={{ color: 'text.secondary' }}>
                Required By Date
              </Typography>
              <TextField
                {...register("requiredBy", { required: "Date is required" })}
                type="date"
                fullWidth
                size="small"
                variant="outlined"
                InputLabelProps={{ shrink: true }}
                error={!!errors.requiredBy}
                helperText={errors.requiredBy?.message}
              />
            </Box>
            
            <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
              <Button
                type="submit"
                variant="contained"
                size="large"
                sx={{ 
                  backgroundColor: '#d32f2f',
                  '&:hover': { backgroundColor: '#b71c1c' },
                  px: 4,
                  borderRadius: '8px'
                }}
                startIcon={<BloodtypeIcon />}
              >
                Submit Request
              </Button>
            </Box>
          </Box>
        </Paper>
      </Container>

      {/* Success Snackbar */}
      <Snackbar
        open={showSuccess}
        autoHideDuration={6000}
        onClose={() => setShowSuccess(false)}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert 
          onClose={() => setShowSuccess(false)} 
          severity="success" 
          sx={{ width: '100%' }}
        >
          Your blood request has been submitted successfully!
        </Alert>
      </Snackbar>

      {/* Error Snackbar */}
      <Snackbar
        open={showError}
        autoHideDuration={6000}
        onClose={() => setShowError(false)}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert 
          onClose={() => setShowError(false)} 
          severity="error" 
          sx={{ width: '100%' }}
        >
          {errorMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default Dashboard;