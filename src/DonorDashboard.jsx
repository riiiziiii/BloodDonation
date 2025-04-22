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
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Divider,
  Avatar,
  Badge,
  Button,
  Chip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Select,
  MenuItem,
  Alert,
  Stack
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import LogoutIcon from '@mui/icons-material/Logout';
import BloodtypeIcon from '@mui/icons-material/Bloodtype';
import HomeIcon from '@mui/icons-material/Home';
import PersonIcon from '@mui/icons-material/Person';
import NotificationsIcon from '@mui/icons-material/Notifications';
import HistoryIcon from '@mui/icons-material/History';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';
import ScheduleIcon from '@mui/icons-material/Schedule';
import EditIcon from '@mui/icons-material/Edit';
import SaveIcon from '@mui/icons-material/Save';
import EventAvailableIcon from '@mui/icons-material/EventAvailable';
import WarningIcon from '@mui/icons-material/Warning';

const DonorDashboard = () => {
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [profileDialogOpen, setProfileDialogOpen] = useState(false);
  const [requestDialogOpen, setRequestDialogOpen] = useState(false);
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [eligibilityError, setEligibilityError] = useState('');
  const [editMode, setEditMode] = useState(false);
  const sidebarRef = useRef(null);
  const notificationsRef = useRef(null);

  // User profile data
  const [profileData, setProfileData] = useState({
    name: 'Donor User',
    email: 'donor@example.com',
    phone: '+1234567890',
    bloodGroup: 'A+',
    address: '123 Main St, Labore',
    lastDonation: '2023-05-20' // YYYY-MM-DD format
  });

  // Sample data for donor requests
  const [donorRequests, setDonorRequests] = useState([
    { 
      id: 1,
      bloodGroup: 'A+', 
      hospital: 'Hepatitain Imtush Hospital', 
      city: 'Labore',
      urgency: 'High',
      date: '2023-06-15',
      status: 'Pending',
      action: 'Respond',
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
      hospital: 'Jmnah Hospital', 
      city: 'Labore',
      urgency: 'Medium',
      date: '2023-06-10',
      status: 'Accepted',
      action: 'Scheduled',
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
      hospital: 'Jmrian Hospital', 
      city: 'Jmnah Hom',
      urgency: 'Low',
      date: '2023-06-05',
      status: 'Completed',
      action: 'Completed',
      recipient: {
        name: 'Michael Brown',
        age: 28,
        condition: 'Regular transfusion',
        contact: 'michael.b@example.com',
        requiredBy: '2023-06-15'
      }
    },
  ]);

  const [notifications, setNotifications] = useState([
    { id: 1, message: 'New blood request from Hepatitain Imtush Hospital', time: '2 hours ago', read: false },
    { id: 2, message: 'Your donation scheduled for tomorrow at 10 AM', time: '1 day ago', read: false },
    { id: 3, message: 'Thank you for your recent donation', time: '1 week ago', read: true },
  ]);

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

  // Handle responding to a request
  const handleRespond = (request) => {
    setSelectedRequest(request);
    setRequestDialogOpen(true);
  };

  // Handle accepting a request
  const handleAcceptRequest = () => {
    if (isEligibleToDonate()) {
      // Update the request status
      const updatedRequests = donorRequests.map(req => 
        req.id === selectedRequest.id ? { ...req, status: 'Accepted', action: 'Scheduled' } : req
      );
      setDonorRequests(updatedRequests);
      
      // Update last donation date to today
      const today = new Date().toISOString().split('T')[0];
      setProfileData(prev => ({ ...prev, lastDonation: today }));
      
      // Add notification
      setNotifications(prev => [
        {
          id: Date.now(),
          message: `You accepted request from ${selectedRequest.hospital}`,
          time: 'Just now',
          read: false
        },
        ...prev
      ]);
      
      setRequestDialogOpen(false);
      setEligibilityError('');
    } else {
      setEligibilityError(`You can donate again after ${getNextEligibleDate()}`);
    }
  };

  // ... (keep all other existing functions like handleProfileChange, handleSaveProfile, etc.)

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
        ref={sidebarRef}
      >
        {/* ... (keep existing sidebar code) ... */}
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
        ref={notificationsRef}
      >
        {/* ... (keep existing notifications code) ... */}
      </Drawer>

      {/* Profile Dialog */}
      <Dialog 
        open={profileDialogOpen} 
        onClose={() => setProfileDialogOpen(false)}
        maxWidth="sm"
        fullWidth
      >
        {/* ... (keep existing profile dialog code) ... */}
      </Dialog>

      {/* Request Details Dialog */}
      <Dialog
        open={requestDialogOpen}
        onClose={() => {
          setRequestDialogOpen(false);
          setEligibilityError('');
        }}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle sx={{ backgroundColor: '#8a0303', color: 'white' }}>
          Request Details
        </DialogTitle>
        <DialogContent sx={{ py: 3 }}>
          {selectedRequest && (
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
              <Typography variant="h6" sx={{ color: '#8a0303' }}>
                Recipient Information
              </Typography>
              
              <Box sx={{ display: 'flex', gap: 2 }}>
                <TextField
                  label="Recipient Name"
                  value={selectedRequest.recipient.name}
                  fullWidth
                  disabled
                />
                <TextField
                  label="Age"
                  value={selectedRequest.recipient.age}
                  fullWidth
                  disabled
                />
              </Box>
              
              <TextField
                label="Medical Condition"
                value={selectedRequest.recipient.condition}
                fullWidth
                disabled
                multiline
                rows={2}
              />
              
              <Box sx={{ display: 'flex', gap: 2 }}>
                <TextField
                  label="Hospital"
                  value={selectedRequest.hospital}
                  fullWidth
                  disabled
                />
                <TextField
                  label="Required By"
                  value={selectedRequest.recipient.requiredBy}
                  fullWidth
                  disabled
                />
              </Box>
              
              <TextField
                label="Contact Information"
                value={selectedRequest.recipient.contact}
                fullWidth
                disabled
              />
              
              {eligibilityError && (
                <Alert severity="error" icon={<WarningIcon />}>
                  {eligibilityError}
                </Alert>
              )}
              
              <Box sx={{ mt: 2 }}>
                <Typography variant="body2" sx={{ fontStyle: 'italic' }}>
                  Your last donation was on {profileData.lastDonation}
                </Typography>
              </Box>
            </Box>
          )}
        </DialogContent>
        <DialogActions sx={{ px: 3, py: 2 }}>
          <Button 
            onClick={() => {
              setRequestDialogOpen(false);
              setEligibilityError('');
            }}
            color="error"
          >
            Cancel
          </Button>
          <Button 
            onClick={handleAcceptRequest}
            variant="contained"
            startIcon={<EventAvailableIcon />}
            sx={{ 
              backgroundColor: '#8a0303', 
              '&:hover': { backgroundColor: '#6a0000' } 
            }}
          >
            Accept Request
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
        <IconButton
          edge="start"
          onClick={toggleSidebar}
          sx={{ mr: 2, color: '#8a0303' }}
        >
          <MenuIcon />
        </IconButton>

        <Box sx={{ mb: 4 }}>
          <Typography variant="h4" gutterBottom sx={{ color: '#8a0303' }}>
            Donor Dashboard
          </Typography>
          <Typography variant="subtitle1" gutterBottom sx={{ color: '#8a0303', opacity: 0.8 }}>
            Recent blood requests in your area
          </Typography>
        </Box>

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
              {donorRequests.map((request) => (
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
                    {request.action === 'Respond' ? (
                      <Button 
                        variant="outlined" 
                        color="primary" 
                        size="small"
                        onClick={() => handleRespond(request)}
                      >
                        Respond
                      </Button>
                    ) : (
                      <Typography variant="body2">{request.action}</Typography>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        {/* Quick Stats */}
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 4 }}>
          <Paper sx={{ p: 3, width: '30%', textAlign: 'center' }}>
            <Typography variant="h6">Total Donations</Typography>
            <Typography variant="h4" sx={{ color: '#8a0303' }}>12</Typography>
          </Paper>
          <Paper sx={{ p: 3, width: '30%', textAlign: 'center' }}>
            <Typography variant="h6">Pending Requests</Typography>
            <Typography variant="h4" sx={{ color: '#8a0303' }}>
              {donorRequests.filter(req => req.status === 'Pending').length}
            </Typography>
          </Paper>
          <Paper sx={{ p: 3, width: '30%', textAlign: 'center' }}>
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

export default DonorDashboard;