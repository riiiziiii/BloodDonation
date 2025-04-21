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
  Avatar,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Badge
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
import './Dashboard.css';

const Dashboard = () => {
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [formData, setFormData] = useState({
    bloodGroup: 'A',
    city: '',
    hospital: ''
  });
  const [profileOpen, setProfileOpen] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [profileData, setProfileData] = useState({
    name: 'John Doe',
    email: 'john.doe@example.com',
    phone: '+1234567890',
    bloodGroup: 'O+',
    address: '123 Main St, Lahore',
    lastDonation: '2023-01-15'
  });
  const [notifications, setNotifications] = useState([
    { id: 1, message: 'Your blood donation request has been accepted', time: '2 hours ago', read: false },
    { id: 2, message: 'New donor available in your area', time: '1 day ago', read: false },
    { id: 3, message: 'Upcoming blood donation camp in Lahore', time: '3 days ago', read: true },
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

  const handleProfileChange = (e) => {
    const { name, value } = e.target;
    setProfileData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Request submitted:', formData);
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
    <Box sx={{ display: 'flex', minHeight: '100vh' }}>
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
        
        {/* User Profile - Clickable */}
        <Box 
          sx={{ px: 3, py: 2, display: 'flex', alignItems: 'center', cursor: 'pointer' }}
          onClick={openProfile}
          className="profile-section"
        >
          <Avatar sx={{ bgcolor: '#8a0303', mr: 2 }}>
            <PersonIcon />
          </Avatar>
          <Box>
            <Typography variant="subtitle1" sx={{ color: '#e0e0e0' }}>{profileData.name}</Typography>
            <Typography variant="caption" sx={{ color: '#8a0303' }}>{profileData.bloodGroup} Donor</Typography>
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
          
          <ListItem 
            button 
            className="menu-item" 
            onClick={toggleNotifications}
          >
            <ListItemIcon>
              <Badge badgeContent={unreadCount} color="error">
                <NotificationsIcon sx={{ color: '#b0b0b0' }} />
              </Badge>
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

      {/* Notifications Sidebar */}
      <Drawer
        anchor="right"
        variant="temporary"
        open={notificationsOpen}
        sx={{
          '& .MuiDrawer-paper': {
            width: 350,
            boxSizing: 'border-box',
            backgroundColor: '#2d2d2d',
            color: '#e0e0e0',
          },
        }}
        className={`notifications-sidebar ${!notificationsOpen ? 'notifications-sidebar-closed' : ''}`}
        ref={notificationsRef}
      >
        <Box sx={{ p: 3, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography variant="h6">Notifications</Typography>
          <Box>
            <IconButton 
              onClick={clearNotifications}
              sx={{ color: '#e0e0e0' }}
              title="Clear all notifications"
            >
              <ClearAllIcon />
            </IconButton>
            <IconButton 
              onClick={toggleNotifications} 
              sx={{ ml: 1, color: '#e0e0e0' }}
            >
              <CloseIcon />
            </IconButton>
          </Box>
        </Box>
        
        <Divider sx={{ backgroundColor: '#424242' }} />
        
        <List sx={{ overflowY: 'auto', maxHeight: 'calc(100vh - 120px)' }}>
          {notifications.length > 0 ? (
            notifications.map((notification) => (
              <ListItem 
                key={notification.id} 
                className={`notification-item ${!notification.read ? 'unread' : ''}`}
              >
                <Box sx={{ width: '100%' }}>
                  <Typography variant="body1">{notification.message}</Typography>
                  <Typography variant="caption" sx={{ color: '#8a0303', display: 'block', mt: 1 }}>
                    {notification.time}
                  </Typography>
                </Box>
              </ListItem>
            ))
          ) : (
            <ListItem>
              <Typography variant="body2" sx={{ color: '#b0b0b0', fontStyle: 'italic' }}>
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
        maxWidth="md"
        fullWidth
      >
        <DialogTitle sx={{ backgroundColor: '#8a0303', color: 'white' }}>
          <Box display="flex" justifyContent="space-between" alignItems="center">
            <Typography variant="h6">My Profile</Typography>
            {!editMode && (
              <IconButton 
                onClick={() => setEditMode(true)}
                sx={{ color: 'white' }}
              >
                <EditIcon />
              </IconButton>
            )}
          </Box>
        </DialogTitle>
        <DialogContent sx={{ py: 3 }}>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
            <Box sx={{ display: 'flex', justifyContent: 'center', mb: 3 }}>
              <Avatar sx={{ 
                bgcolor: '#8a0303', 
                width: 100, 
                height: 100,
                fontSize: '2.5rem'
              }}>
                {profileData.name.charAt(0)}
              </Avatar>
            </Box>
            
            <Box sx={{ display: 'flex', gap: 2 }}>
              <TextField
                label="Full Name"
                name="name"
                value={profileData.name}
                onChange={handleProfileChange}
                fullWidth
                disabled={!editMode}
              />
              <TextField
                label="Email"
                name="email"
                value={profileData.email}
                onChange={handleProfileChange}
                fullWidth
                disabled={!editMode}
              />
            </Box>
            
            <Box sx={{ display: 'flex', gap: 2 }}>
              <TextField
                label="Phone Number"
                name="phone"
                value={profileData.phone}
                onChange={handleProfileChange}
                fullWidth
                disabled={!editMode}
              />
              <TextField
                select
                label="Blood Group"
                name="bloodGroup"
                value={profileData.bloodGroup}
                onChange={handleProfileChange}
                SelectProps={{
                  native: true,
                }}
                fullWidth
                disabled={!editMode}
              >
                {['Select','A-', 'A+', 'B-', 'B+', 'AB-', 'AB+', 'O-', 'O+'].map((group) => (
                  <option key={group} value={group}>
                    {group}
                  </option>
                ))}
              </TextField>
            </Box>
            
            <TextField
              label="Address"
              name="address"
              value={profileData.address}
              onChange={handleProfileChange}
              fullWidth
              multiline
              rows={2}
              disabled={!editMode}
            />
            
            <TextField
              label="Last Donation Date"
              name="lastDonation"
              type="date"
              value={profileData.lastDonation}
              onChange={handleProfileChange}
              fullWidth
              InputLabelProps={{ shrink: true }}
              disabled={!editMode}
            />
          </Box>
        </DialogContent>
        <DialogActions sx={{ px: 3, py: 2 }}>
          {editMode ? (
            <>
              <Button 
                onClick={() => setEditMode(false)}
                color="error"
              >
                Cancel
              </Button>
              <Button 
                onClick={handleSaveProfile}
                variant="contained"
                startIcon={<SaveIcon />}
                sx={{ backgroundColor: '#8a0303', '&:hover': { backgroundColor: '#6a0000' } }}
              >
                Save Changes
              </Button>
            </>
          ) : (
            <Button 
              onClick={() => setProfileOpen(false)}
              variant="contained"
              sx={{ backgroundColor: '#8a0303', '&:hover': { backgroundColor: '#6a0000' } }}
            >
              Close
            </Button>
          )}
        </DialogActions>
      </Dialog>

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