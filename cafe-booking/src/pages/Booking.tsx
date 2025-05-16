import React, { useState, useEffect } from 'react';
import { 
  Container, 
  Paper, 
  Typography, 
  Grid, 
  TextField, 
  Button,
  Box,
  Alert,
  Stepper,
  Step,
  StepLabel,
  Card,
  CardContent,
  Divider,
  IconButton,
  Tooltip,
  Dialog,
  DialogContent,
  DialogActions
} from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { collection, query, where, getDocs, addDoc, Timestamp } from 'firebase/firestore';
import { db } from '../config/firebase';
import { Info, AccessTime, Person, Email, Phone, CheckCircle } from '@mui/icons-material';

interface TimeSlot {
  time: string;
  available: number;
}

const steps = ['Select Date & Time', 'Personal Information', 'Confirmation'];

const Booking = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTime, setSelectedTime] = useState<string>('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [timeSlots, setTimeSlots] = useState<TimeSlot[]>([]);
  const [bookingStatus, setBookingStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');
  const [showSuccessDialog, setShowSuccessDialog] = useState(false);

  const generateTimeSlots = () => {
    const slots: TimeSlot[] = [];
    for (let hour = 10; hour <= 18; hour++) {
      slots.push({
        time: `${hour}:00`,
        available: 10
      });
    }
    return slots;
  };

  useEffect(() => {
    setTimeSlots(generateTimeSlots());
  }, []);

  useEffect(() => {
    const fetchBookings = async () => {
      if (!selectedDate) return;

      const dateStr = selectedDate.toISOString().split('T')[0];
      const bookingsRef = collection(db, 'bookings');
      const q = query(
        bookingsRef,
        where('date', '==', dateStr)
      );

      try {
        const querySnapshot = await getDocs(q);
        const bookings = querySnapshot.docs.map(doc => doc.data());
        
        const updatedSlots = timeSlots.map(slot => {
          const slotBookings = bookings.filter(
            (booking: any) => booking.time === slot.time
          );
          return {
            ...slot,
            available: 10 - slotBookings.length
          };
        });

        setTimeSlots(updatedSlots);
      } catch (error) {
        console.error('Error fetching bookings:', error);
      }
    };

    fetchBookings();
  }, [selectedDate, timeSlots]);

  const handleNext = () => {
    if (activeStep === 0 && (!selectedDate || !selectedTime)) {
      setErrorMessage('Please select both date and time');
      setBookingStatus('error');
      return;
    }
    if (activeStep === 1 && (!name || !email || !phone)) {
      setErrorMessage('Please fill in all fields');
      setBookingStatus('error');
      return;
    }
    setActiveStep((prevStep) => prevStep + 1);
    setBookingStatus('idle');
  };

  const handleBack = () => {
    setActiveStep((prevStep) => prevStep - 1);
    setBookingStatus('idle');
  };

  const handleSubmit = async () => {
    if (!selectedDate || !selectedTime || !name || !email || !phone) {
      setErrorMessage('Please fill in all fields');
      setBookingStatus('error');
      return;
    }

    const dateStr = selectedDate.toISOString().split('T')[0];
    const selectedSlot = timeSlots.find(slot => slot.time === selectedTime);

    if (!selectedSlot || selectedSlot.available <= 0) {
      setErrorMessage('Selected time slot is no longer available');
      setBookingStatus('error');
      return;
    }

    try {
      const bookingData = {
        date: dateStr,
        time: selectedTime,
        name,
        email,
        phone,
        createdAt: Timestamp.now()
      };

      await addDoc(collection(db, 'bookings'), bookingData);

      setBookingStatus('success');
      setShowSuccessDialog(true);
      setName('');
      setEmail('');
      setPhone('');
      setSelectedTime('');
      
      const updatedSlots = timeSlots.map(slot =>
        slot.time === selectedTime
          ? { ...slot, available: slot.available - 1 }
          : slot
      );
      setTimeSlots(updatedSlots);
    } catch (error) {
      console.error('Error creating booking:', error);
      setErrorMessage('Failed to create booking. Please try again.');
      setBookingStatus('error');
    }
  };

  const renderStepContent = (step: number) => {
    switch (step) {
      case 0:
        return (
          <Box className="space-y-6">
            <Card className="neon-border">
              <CardContent>
                <Box className="flex items-center mb-4">
                  <AccessTime className="mr-2 text-primary" />
                  <Typography variant="h6">Select Date & Time</Typography>
                </Box>
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                  <DatePicker
                    label="Select Date"
                    value={selectedDate}
                    onChange={(newValue: Date | null) => setSelectedDate(newValue)}
                    minDate={new Date()}
                    sx={{ width: '100%', mb: 4 }}
                  />
                </LocalizationProvider>
                <Typography variant="h6" className="mb-3">
                  Available Time Slots
                </Typography>
                <Grid container spacing={2}>
                  {timeSlots.map((slot) => (
                    <Grid sx={{ xs: 6, sm: 4, md: 3 }} key={slot.time}>
                      <Button
                        fullWidth
                        variant={selectedTime === slot.time ? 'contained' : 'outlined'}
                        onClick={() => setSelectedTime(slot.time)}
                        disabled={slot.available <= 0}
                        className="neon-border"
                        sx={{
                          height: '80px',
                          display: 'flex',
                          flexDirection: 'column',
                          justifyContent: 'center',
                          alignItems: 'center',
                          gap: 1
                        }}
                      >
                        <Typography variant="h6">{slot.time}</Typography>
                        <Typography variant="body2" color={slot.available <= 0 ? 'error' : 'inherit'}>
                          {slot.available} seats left
                        </Typography>
                      </Button>
                    </Grid>
                  ))}
                </Grid>
              </CardContent>
            </Card>
          </Box>
        );
      case 1:
        return (
          <Card className="neon-border">
            <CardContent>
              <Box className="flex items-center mb-4">
                <Person className="mr-2 text-primary" />
                <Typography variant="h6">Personal Information</Typography>
              </Box>
              <Grid container spacing={3}>
                <Grid sx={{ xs: 12 }}>
                  <TextField
                    fullWidth
                    label="Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    InputProps={{
                      startAdornment: <Person className="mr-2 text-gray-400" />
                    }}
                  />
                </Grid>
                <Grid sx={{ xs: 12 }}>
                  <TextField
                    fullWidth
                    label="Email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    InputProps={{
                      startAdornment: <Email className="mr-2 text-gray-400" />
                    }}
                  />
                </Grid>
                <Grid sx={{ xs: 12 }}>
                  <TextField
                    fullWidth
                    label="Phone"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    required
                    InputProps={{
                      startAdornment: <Phone className="mr-2 text-gray-400" />
                    }}
                  />
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        );
      case 2:
        return (
          <Card className="neon-border">
            <CardContent>
              <Typography variant="h6" className="mb-4">Booking Summary</Typography>
              <Box className="space-y-4">
                <Box className="flex justify-between items-center">
                  <Typography variant="body1">Date:</Typography>
                  <Typography variant="body1" className="font-bold">
                    {selectedDate?.toLocaleDateString()}
                  </Typography>
                </Box>
                <Box className="flex justify-between items-center">
                  <Typography variant="body1">Time:</Typography>
                  <Typography variant="body1" className="font-bold">
                    {selectedTime}
                  </Typography>
                </Box>
                <Box className="flex justify-between items-center">
                  <Typography variant="body1">Name:</Typography>
                  <Typography variant="body1" className="font-bold">
                    {name}
                  </Typography>
                </Box>
                <Box className="flex justify-between items-center">
                  <Typography variant="body1">Email:</Typography>
                  <Typography variant="body1" className="font-bold">
                    {email}
                  </Typography>
                </Box>
                <Box className="flex justify-between items-center">
                  <Typography variant="body1">Phone:</Typography>
                  <Typography variant="body1" className="font-bold">
                    {phone}
                  </Typography>
                </Box>
                <Divider className="my-4" />
                <Box className="flex justify-between items-center">
                  <Typography variant="h6">Total:</Typography>
                  <Typography variant="h6" className="text-primary">
                  ₹ 100.00
                  </Typography>
                </Box>
              </Box>
            </CardContent>
          </Card>
        );
      default:
        return null;
    }
  };

  return (
    <Container maxWidth="lg" className="py-8">
      <Paper elevation={3} className="p-6 neon-border">
        <Typography variant="h4" component="h1" className="mb-8 text-center neon-text">
          Book Your Gaming Session
        </Typography>

        <Stepper activeStep={activeStep} className="mb-8">
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>

        {bookingStatus === 'success' && (
          <Alert severity="success" className="mb-4">
            Booking successful! We'll send you a confirmation email shortly.
          </Alert>
        )}

        {bookingStatus === 'error' && (
          <Alert severity="error" className="mb-4">
            {errorMessage}
          </Alert>
        )}

        {renderStepContent(activeStep)}

        <Box className="flex justify-between mt-8">
          <Button
            disabled={activeStep === 0}
            onClick={handleBack}
            variant="outlined"
            className="neon-border"
          >
            Back
          </Button>
          <Button
            variant="contained"
            onClick={activeStep === steps.length - 1 ? handleSubmit : handleNext}
            className="neon-border"
            sx={{ 
              background: 'linear-gradient(45deg, #6c5ce7 30%, #00cec9 90%)',
              '&:hover': {
                background: 'linear-gradient(45deg, #5b4bc4 30%, #00b8b3 90%)',
              }
            }}
          >
            {activeStep === steps.length - 1 ? 'Confirm Booking' : 'Next'}
          </Button>
        </Box>
      </Paper>

      {/* Success Dialog */}
      <Dialog 
        open={showSuccessDialog} 
        onClose={() => setShowSuccessDialog(false)}
        maxWidth="sm"
        fullWidth
      >
        <DialogContent className="text-center p-6">
          <Box className="flex flex-col items-center gap-4">
            <CheckCircle 
              sx={{ 
                fontSize: 80, 
                color: '#4caf50',
                animation: 'scaleIn 0.5s ease-out'
              }} 
            />
            <Typography variant="h4" component="h2" className="neon-text">
              Booking Confirmed!
            </Typography>
            <Typography variant="body1" color="text.secondary" className="mt-2">
              Thank you for choosing GameZone Café. Your gaming session has been successfully booked.
            </Typography>
            <Box className="mt-4 p-4 bg-gray-900 rounded-lg w-full">
              <Typography variant="body1" className="text-gray-300">
                Please arrive 5 minutes before your scheduled time.
              </Typography>
            </Box>
          </Box>
        </DialogContent>
        <DialogActions className="p-4">
          <Button 
            onClick={() => {
              setShowSuccessDialog(false);
              setActiveStep(0);
              setBookingStatus('idle');
            }}
            variant="contained"
            fullWidth
            className="neon-border"
          >
            Book Another Session
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default Booking; 