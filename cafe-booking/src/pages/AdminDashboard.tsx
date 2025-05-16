import React, { useState, useEffect } from 'react';
import {
  Container,
  Paper,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Alert,
  Box,
  Card,
  CardContent,
  InputAdornment,
  IconButton
} from '@mui/material';
import { collection, query, orderBy, getDocs, deleteDoc, doc, addDoc, Timestamp } from 'firebase/firestore';
import { db } from '../config/firebase';
import { Visibility, VisibilityOff } from '@mui/icons-material';

interface Booking {
  id: string;
  date: string;
  time: string;
  name: string;
  email: string;
  phone: string;
  createdAt: Timestamp;
}

const AdminDashboard = () => {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [newBooking, setNewBooking] = useState({
    date: '',
    time: '',
    name: '',
    email: '',
    phone: ''
  });
  const [error, setError] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loginCredentials, setLoginCredentials] = useState({
    email: '',
    password: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [loginError, setLoginError] = useState('');

  useEffect(() => {
    if (isAuthenticated) {
      fetchBookings();
    }
  }, [isAuthenticated]);

  const handleLogin = () => {
    if (loginCredentials.email === 'golarninad@gmail.com' && loginCredentials.password === 'Golar@123') {
      setIsAuthenticated(true);
      setLoginError('');
    } else {
      setLoginError('Invalid email or password');
    }
  };

  const fetchBookings = async () => {
    try {
      const bookingsRef = collection(db, 'bookings');
      const q = query(bookingsRef, orderBy('date', 'desc'));
      const querySnapshot = await getDocs(q);
      
      const bookingsData = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as Booking[];
      
      setBookings(bookingsData);
    } catch (error) {
      console.error('Error fetching bookings:', error);
      setError('Failed to fetch bookings');
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteDoc(doc(db, 'bookings', id));
      setBookings(bookings.filter(booking => booking.id !== id));
    } catch (error) {
      console.error('Error deleting booking:', error);
      setError('Failed to delete booking');
    }
  };

  const handleAddBooking = async () => {
    try {
      if (!newBooking.date || !newBooking.time || !newBooking.name || !newBooking.email || !newBooking.phone) {
        setError('Please fill in all fields');
        return;
      }

      await addDoc(collection(db, 'bookings'), {
        ...newBooking,
        createdAt: Timestamp.now()
      });

      setOpenDialog(false);
      setNewBooking({
        date: '',
        time: '',
        name: '',
        email: '',
        phone: ''
      });
      fetchBookings();
    } catch (error) {
      console.error('Error adding booking:', error);
      setError('Failed to add booking');
    }
  };

  if (!isAuthenticated) {
    return (
      <Container maxWidth="sm" className="py-16">
        <Card className="neon-border">
          <CardContent className="p-6">
            <Typography variant="h4" component="h1" className="mb-6 text-center neon-text">
              Admin Login
            </Typography>
            
            {loginError && (
              <Alert severity="error" className="mb-4">
                {loginError}
              </Alert>
            )}

            <Box className="space-y-4">
              <TextField
                fullWidth
                label="Email"
                type="email"
                value={loginCredentials.email}
                onChange={(e) => setLoginCredentials({ ...loginCredentials, email: e.target.value })}
                error={!!loginError}
              />
              <TextField
                fullWidth
                label="Password"
                type={showPassword ? 'text' : 'password'}
                value={loginCredentials.password}
                onChange={(e) => setLoginCredentials({ ...loginCredentials, password: e.target.value })}
                error={!!loginError}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={() => setShowPassword(!showPassword)}
                        edge="end"
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  )
                }}
              />
              <Button
                fullWidth
                variant="contained"
                onClick={handleLogin}
                className="neon-border mt-4"
                sx={{ 
                  background: 'linear-gradient(45deg, #6c5ce7 30%, #00cec9 90%)',
                  '&:hover': {
                    background: 'linear-gradient(45deg, #5b4bc4 30%, #00b8b3 90%)',
                  }
                }}
              >
                Login
              </Button>
            </Box>
          </CardContent>
        </Card>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg">
      <Paper elevation={3} className="p-6 neon-border">
        <Box className="flex justify-between items-center mb-6">
          <Typography variant="h4" component="h1" className="neon-text">
            Admin Dashboard
          </Typography>
          <Box className="flex gap-4">
            <Button
              variant="contained"
              onClick={() => setOpenDialog(true)}
              className="neon-border"
            >
              Add New Booking
            </Button>
            <Button
              variant="outlined"
              color="error"
              onClick={() => {
                setIsAuthenticated(false);
                setLoginCredentials({ email: '', password: '' });
              }}
              className="neon-border"
              sx={{
                borderColor: 'error.main',
                '&:hover': {
                  borderColor: 'error.dark',
                  backgroundColor: 'rgba(211, 47, 47, 0.04)'
                }
              }}
            >
              Logout
            </Button>
          </Box>
        </Box>

        {error && (
          <Alert severity="error" className="mb-4">
            {error}
          </Alert>
        )}

        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Date</TableCell>
                <TableCell>Time</TableCell>
                <TableCell>Name</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Phone</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {bookings.map((booking) => (
                <TableRow key={booking.id}>
                  <TableCell>{booking.date}</TableCell>
                  <TableCell>{booking.time}</TableCell>
                  <TableCell>{booking.name}</TableCell>
                  <TableCell>{booking.email}</TableCell>
                  <TableCell>{booking.phone}</TableCell>
                  <TableCell>
                    <Button
                      variant="outlined"
                      color="error"
                      onClick={() => handleDelete(booking.id)}
                    >
                      Delete
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
          <DialogTitle>Add New Booking</DialogTitle>
          <DialogContent>
            <Box className="space-y-4 pt-4">
              <TextField
                fullWidth
                label="Date"
                type="date"
                value={newBooking.date}
                onChange={(e) => setNewBooking({ ...newBooking, date: e.target.value })}
                InputLabelProps={{ shrink: true }}
              />
              <TextField
                fullWidth
                label="Time"
                value={newBooking.time}
                onChange={(e) => setNewBooking({ ...newBooking, time: e.target.value })}
              />
              <TextField
                fullWidth
                label="Name"
                value={newBooking.name}
                onChange={(e) => setNewBooking({ ...newBooking, name: e.target.value })}
              />
              <TextField
                fullWidth
                label="Email"
                type="email"
                value={newBooking.email}
                onChange={(e) => setNewBooking({ ...newBooking, email: e.target.value })}
              />
              <TextField
                fullWidth
                label="Phone"
                value={newBooking.phone}
                onChange={(e) => setNewBooking({ ...newBooking, phone: e.target.value })}
              />
            </Box>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setOpenDialog(false)}>Cancel</Button>
            <Button onClick={handleAddBooking} variant="contained">
              Add Booking
            </Button>
          </DialogActions>
        </Dialog>
      </Paper>
    </Container>
  );
};

export default AdminDashboard; 