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
  Badge,
  Chip,
  Select,
  MenuItem,
  Alert
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
import EventAvailableIcon from '@mui/icons-material/EventAvailable';
import WarningIcon from '@mui/icons-material/Warning';
import './Dashboard.css';

const Dashboard = () => {
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [eligibilityError, setEligibilityError] = useState('');
  
  const [formData, setFormData] = useState({
    bloodGroup: 'A+',
    city: '',
    hospital: ''
  });

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

  const [requests, setRequests] = useState([
    { 
      id: 1,
      bloodGroup: 'A+', 
      city: 'Lahore', 
      hospital: 'Jinnah Hospital', 
      status: 'Pending',
      urgency: 'High',
      date: '2023-06-15',
      recipient: {
        name: 'John Smith',
        age: 32,
        condition: 'Emergency surgery',
        contact: 'hospital@example.com',
        requiredBy: '2023-06-20'
      }
    },
    { 
      id: 2,
      bloodGroup: 'B-', 
      city: 'Karachi', 
      hospital: 'Aga Khan Hospital', 
      status: 'Accepted',
      urgency: 'Medium',
      date: '2023-06-10',
      recipient: {
        name: 'Sarah Johnson',
        age: 45,
        condition: 'Chronic anemia',
        contact: 'sarah.j@example.com',
        requiredBy: '2023-06-25'
      }
    },
    { 
      id: 3,
      bloodGroup: 'O+', 
      city: 'Islamabad', 
      hospital: 'PIMS Hospital', 
      status: 'Completed',
      urgency: 'Low',
      date: '2023-06-05',
      recipient: {
        name: 'Michael Brown',
        age: 28,
        condition: 'Regular transfusion',
        contact: 'michael.b@example.com',
        requiredBy: '2023-06-15'
      }
    },
  ]);

  const sidebarRef = useRef(null);
  const notificationsRef = useRef(null);

  // Check if donor is eligible to donate (minimum 1 month since last donation)
  const isEligibleToDonate = () => {
    const lastDonationDate = new Date(profileData.lastDonation);
    const currentDate = new Date();
    const timeDiff = currentDate - lastDonationDate;
    const daysDiff = timeDiff / (1000 * 60 * 60 * 24);
    return daysDiff >= 30; // 30 days = 1 month
  };

  // Calculate next eligible donation date
  const getNextEligibleDate = () => {
    const lastDonationDate = new Date(profileData.lastDonation);
    const nextDate = new Date(lastDonationDate);
    nextDate.setDate(nextDate.getDate() + 30);
    return nextDate.toISOString().split('T')[0]; // Format as YYYY-MM-DD
  };

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
    // Add the new request to the requests array
    const newRequest = {
      id: requests.length + 1,
      bloodGroup: formData.bloodGroup,
      city: formData.city,
      hospital: formData.hospital,
      status: 'Pending',
      urgency: 'Medium',
      date: new Date().toISOString().split('T')[0],
      recipient: {
        name: 'Unknown',
        age: 0,
        condition: 'Not specified',
        contact: 'N/A',
        requiredBy: 'N/A'
      }
    };
    setRequests([newRequest, ...requests]);
    setFormData({ bloodGroup: 'A+', city: '', hospital: '' });
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

  const handleRespond = (request) => {
    if (isEligibleToDonate()) {
      // Update the request status
      const updatedRequests = requests.map(req => 
        req.id === request.id ? { ...req, status: 'Accepted' } : req
      );
      setRequests(updatedRequests);
      
      // Update last donation date to today
      const today = new Date().toISOString().split('T')[0];
      setProfileData(prev => ({ ...prev, lastDonation: today }));
      
      // Add notification
      setNotifications(prev => [
        {
          id: Date.now(),
          message: `You accepted request from ${request.hospital}`,
          time: 'Just now',
          read: false
        },
        ...prev
      ]);
      
      setEligibilityError('');
    } else {
      setEligibilityError(`You can donate again after ${getNextEligibleDate()}`);
    }
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
        <Box sx={{ p: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography variant="h6" sx={{ color: '#e0e0e0' }}>Donor Menu</Typography>
          <IconButton onClick={toggleSidebar} sx={{ color: '#e0e0e0' }}>
            <CloseIcon />
          </IconButton>
        </Box>
        <Divider sx={{ borderColor: '#444' }} />
        <List>
          <ListItem button>
            <ListItemIcon sx={{ color: '#e0e0e0' }}>
              <HomeIcon />
            </ListItemIcon>
            <ListItemText primary="Dashboard" />
          </ListItem>
          <ListItem button onClick={openProfile}>
            <ListItemIcon sx={{ color: '#e0e0e0' }}>
              <PersonIcon />
            </ListItemIcon>
            <ListItemText primary="Profile" />
          </ListItem>
          <ListItem button>
            <ListItemIcon sx={{ color: '#e0e0e0' }}>
              <HistoryIcon />
            </ListItemIcon>
            <ListItemText primary="Donation History" />
          </ListItem>
          <ListItem button onClick={toggleNotifications}>
            <ListItemIcon sx={{ color: '#e0e0e0' }}>
              <Badge badgeContent={unreadCount} color="error">
                <NotificationsIcon />
              </Badge>
            </ListItemIcon>
            <ListItemText primary="Notifications" />
          </ListItem>
          <ListItem button onClick={handleLogout}>
            <ListItemIcon sx={{ color: '#e0e0e0' }}>
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
            backgroundColor: '#2d2d2d',
            color: '#e0e0e0',
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
        
        <Divider sx={{ borderColor: '#424242' }} />
        
        <List sx={{ overflowY: 'auto', maxHeight: 'calc(100vh - 120px)' }}>
          {notifications.length > 0 ? (
            notifications.map((notification) => (
              <ListItem 
                key={notification.id} 
                sx={{ 
                  backgroundColor: notification.read ? 'inherit' : 'rgba(138, 3, 3, 0.2)',
                  borderLeft: notification.read ? 'none' : '4px solid #8a0303'
                }}
              >
                <ListItemText
                  primary={notification.message}
                  secondary={notification.time}
                  sx={{ color: '#e0e0e0' }}
                />
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
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle sx={{ backgroundColor: '#8a0303', color: 'white' }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Typography>Your Profile</Typography>
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
              <Avatar sx={{ width: 100, height: 100, backgroundColor: '#8a0303' }}>
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
            />
            
            <TextField
              label="Email"
              name="email"
              value={profileData.email}
              onChange={handleProfileChange}
              fullWidth
              disabled={!editMode}
            />
            
            <TextField
              label="Phone Number"
              name="phone"
              value={profileData.phone}
              onChange={handleProfileChange}
              fullWidth
              disabled={!editMode}
            />
            
            <Select
              label="Blood Group"
              name="bloodGroup"
              value={profileData.bloodGroup}
              onChange={handleProfileChange}
              fullWidth
              disabled={!editMode}
              sx={{ textAlign: 'left' }}
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
              label="Address"
              name="address"
              value={profileData.address}
              onChange={handleProfileChange}
              fullWidth
              multiline
              rows={3}
              disabled={!editMode}
            />
            
            <TextField
              label="Last Donation Date"
              name="lastDonation"
              value={profileData.lastDonation}
              onChange={handleProfileChange}
              fullWidth
              disabled
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
          >
            Close
          </Button>
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
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
          <IconButton
            edge="start"
            onClick={toggleSidebar}
            sx={{ mr: 2, color: '#8a0303' }}
          >
            <MenuIcon />
          </IconButton>
          
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <IconButton onClick={toggleNotifications} sx={{ color: '#8a0303', mr: 2 }}>
              <Badge badgeContent={unreadCount} color="error">
                <NotificationsIcon />
              </Badge>
            </IconButton>
            <Avatar 
              onClick={openProfile} 
              sx={{ backgroundColor: '#8a0303', cursor: 'pointer' }}
            >
              {profileData.name.charAt(0)}
            </Avatar>
          </Box>
        </Box>

        <Box sx={{ mb: 4 }}>
          <Typography variant="h4" gutterBottom sx={{ color: '#8a0303' }}>
            Blood Requests
          </Typography>
          <Typography variant="subtitle1" gutterBottom sx={{ color: '#8a0303', opacity: 0.8 }}>
            Recent blood requests in your area
          </Typography>
        </Box>

        {/* Request Form */}
        <Paper sx={{ p: 3, mb: 4, borderLeft: '4px solid #8a0303' }}>
          <Typography variant="h6" gutterBottom sx={{ color: '#8a0303' }}>
            Post New Request
          </Typography>
          <Box component="form" onSubmit={handleSubmit}>
            <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
              <Select
                label="Blood Group"
                name="bloodGroup"
                value={formData.bloodGroup}
                onChange={handleChange}
                sx={{ minWidth: 120 }}
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
              sx={{ 
                backgroundColor: '#8a0303',
                '&:hover': { backgroundColor: '#6a0000' }
              }}
            >
              Submit Request
            </Button>
          </Box>
        </Paper>

        {/* Requests Table */}
        <TableContainer component={Paper}>
          <Table>
            <TableHead sx={{ backgroundColor: '#8a0303' }}>
              <TableRow>
                <TableCell sx={{ color: 'white' }}>Blood Group</TableCell>
                <TableCell sx={{ color: 'white' }}>Hospital</TableCell>
                <TableCell sx={{ color: 'white' }}>City</TableCell>
                <TableCell sx={{ color: 'white' }}>Urgency</TableCell>
                <TableCell sx={{ color: 'white' }}>Date</TableCell>
                <TableCell sx={{ color: 'white' }}>Status</TableCell>
                <TableCell sx={{ color: 'white' }}>Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {requests.map((request) => (
                <TableRow key={request.id} hover>
                  <TableCell>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <BloodtypeIcon sx={{ color: '#8a0303', mr: 1 }} />
                      {request.bloodGroup}
                    </Box>
                  </TableCell>
                  <TableCell>{request.hospital}</TableCell>
                  <TableCell>{request.city}</TableCell>
                  <TableCell>
                    <Chip 
                      label={request.urgency} 
                      color={
                        request.urgency === 'High' ? 'error' : 
                        request.urgency === 'Medium' ? 'warning' : 'success'
                      } 
                      size="small" 
                    />
                  </TableCell>
                  <TableCell>{request.date}</TableCell>
                  <TableCell>
                    {request.status === 'Pending' && <Chip icon={<ScheduleIcon />} label="Pending" color="warning" size="small" />}
                    {request.status === 'Accepted' && <Chip icon={<CheckCircleIcon />} label="Accepted" color="success" size="small" />}
                    {request.status === 'Completed' && <Chip icon={<CheckCircleIcon />} label="Completed" color="primary" size="small" />}
                  </TableCell>
                  <TableCell>
                    {request.status === 'Pending' ? (
                      <Button 
                        variant="outlined" 
                        color="primary" 
                        size="small"
                        onClick={() => handleRespond(request)}
                      >
                        Respond
                      </Button>
                    ) : (
                      <Typography variant="body2">{request.status}</Typography>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        {/* Quick Stats */}
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 4, gap: 3 }}>
          <Paper sx={{ p: 3, flex: 1, textAlign: 'center' }}>
            <Typography variant="h6">Total Requests</Typography>
            <Typography variant="h4" sx={{ color: '#8a0303' }}>{requests.length}</Typography>
          </Paper>
          <Paper sx={{ p: 3, flex: 1, textAlign: 'center' }}>
            <Typography variant="h6">Pending Requests</Typography>
            <Typography variant="h4" sx={{ color: '#8a0303' }}>
              {requests.filter(req => req.status === 'Pending').length}
            </Typography>
          </Paper>
          <Paper sx={{ p: 3, flex: 1, textAlign: 'center' }}>
            <Typography variant="h6">Next Eligible</Typography>
            <Typography variant="h4" sx={{ color: '#8a0303' }}>
              {isEligibleToDonate() ? 'Now' : getNextEligibleDate()}
            </Typography>
          </Paper>
        </Box>
      </Box>
    </Box>
  );
};

export default Dashboard;