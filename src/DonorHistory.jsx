import './DonorHistory.css';
import React from 'react';
import { 
  Box,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Chip,
  Avatar
} from '@mui/material';
import BloodtypeIcon from '@mui/icons-material/Bloodtype';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import WarningIcon from '@mui/icons-material/Warning';

const DonorHistory = () => {
  // Sample donor history data
  const donationHistory = [
    {
      id: 1,
      date: '2023-06-15',
      bloodGroup: 'A+',
      hospital: 'City General Hospital',
      volume: '450ml',
      status: 'Completed',
      verified: true
    },
    {
      id: 2,
      date: '2023-04-22',
      bloodGroup: 'A+',
      hospital: 'Regional Blood Center',
      volume: '450ml',
      status: 'Completed',
      verified: true
    },
    {
      id: 3,
      date: '2023-02-10',
      bloodGroup: 'A+',
      hospital: 'Childrens Hospital',
      volume: '450ml',
      status: 'Cancelled',
      verified: false
    },
    {
      id: 4,
      date: '2022-11-30',
      bloodGroup: 'A+',
      hospital: 'University Medical Center',
      volume: '450ml',
      status: 'Completed',
      verified: true
    },
  ];

  return (
    <Box sx={{ padding: 3 }}>
      <Typography variant="h4" gutterBottom sx={{ color: '#8a0303', marginBottom: 3 }}>
        Donation History
      </Typography>
      
      <TableContainer component={Paper} sx={{ borderRadius: 2 }}>
        <Table>
          <TableHead sx={{ backgroundColor: '#f8d7da' }}>
            <TableRow>
              <TableCell sx={{ fontWeight: 'bold' }}>Date</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>Blood Group</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>Hospital</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>Volume</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>Status</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>Verified</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {donationHistory.map((donation) => (
              <TableRow key={donation.id} hover>
                <TableCell>{donation.date}</TableCell>
                <TableCell>
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <BloodtypeIcon sx={{ color: '#8a0303', marginRight: 1 }} />
                    {donation.bloodGroup}
                  </Box>
                </TableCell>
                <TableCell>{donation.hospital}</TableCell>
                <TableCell>{donation.volume}</TableCell>
                <TableCell>
                  <Chip 
                    label={donation.status}
                    color={donation.status === 'Completed' ? 'success' : 'error'}
                    icon={donation.status === 'Completed' ? <CheckCircleIcon /> : <WarningIcon />}
                  />
                </TableCell>
                <TableCell>
                  {donation.verified ? (
                    <Chip label="Verified" color="success" variant="outlined" />
                  ) : (
                    <Chip label="Not Verified" color="error" variant="outlined" />
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      
      <Box sx={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        marginTop: 4,
        gap: 2
      }}>
        <Paper sx={{ 
          padding: 2, 
          flex: 1, 
          backgroundColor: '#f8d7da',
          borderRadius: 2
        }}>
          <Typography variant="h6">Total Donations</Typography>
          <Typography variant="h4" sx={{ color: '#8a0303' }}>4</Typography>
        </Paper>
        <Paper sx={{ 
          padding: 2, 
          flex: 1,
          backgroundColor: '#f8d7da',
          borderRadius: 2
        }}>
          <Typography variant="h6">Total Volume</Typography>
          <Typography variant="h4" sx={{ color: '#8a0303' }}>1800ml</Typography>
        </Paper>
        <Paper sx={{ 
          padding: 2, 
          flex: 1,
          backgroundColor: '#f8d7da',
          borderRadius: 2
        }}>
          <Typography variant="h6">Last Donation</Typography>
          <Typography variant="h4" sx={{ color: '#8a0303' }}>2023-06-15</Typography>
        </Paper>
      </Box>
    </Box>
  );
};

export default DonorHistory;

