import React from 'react';
import {
  Container,
  Typography,
  Grid,
  Paper,
  Box,
  Card,
  CardContent,
  Divider
} from '@mui/material';
import { LocationOn, AccessTime, Phone, Email, Facebook, Twitter, Instagram } from '@mui/icons-material';

const Contact = () => {
  const contactInfo = [
    {
      icon: <LocationOn sx={{ fontSize: 40 }} />,
      title: 'Address',
      content: '7 , Parimal Villa Appartment\n Holaram Colony,Sharanpur Road\n Nashik'
    },
    {
      icon: <AccessTime sx={{ fontSize: 40 }} />,
      title: 'Hours',
      content: 'Monday - Friday: 10:00 AM - 6:00 PM\nSaturday - Sunday: 9:00 AM - 9:00 PM'
    },
    {
      icon: <Phone sx={{ fontSize: 40 }} />,
      title: 'Phone',
      content: '+91 8767512499'
    },
    {
      icon: <Email sx={{ fontSize: 40 }} />,
      title: 'Email',
      content: 'golarninad@gmail.com'
    }
  ];

  const socialLinks = [
    { icon: <Facebook />, label: 'Facebook', url: '#' },
    { icon: <Twitter />, label: 'Twitter', url: '#' },
    { icon: <Instagram />, label: 'Instagram', url: '#' }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <Box
        className="relative h-[40vh] flex items-center justify-center"
        sx={{
          background: 'linear-gradient(rgba(0,0,0,0.7), rgba(0,0,0,0.7)), url("https://images.unsplash.com/photo-1511512578047-dfb367046420?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2071&q=80")',
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}
      >
        <Container maxWidth="md" className="text-center">
          <Typography
            variant="h1"
            component="h1"
            className="mb-4 neon-text"
            sx={{ 
              fontWeight: 'bold',
              fontSize: { xs: '2.5rem', md: '4rem' },
              textShadow: '0 0 10px rgba(108, 92, 231, 0.5)'
            }}
          >
            Contact Us
          </Typography>
          <Typography 
            variant="h5" 
            className="text-gray-300"
            sx={{ fontSize: { xs: '1.2rem', md: '1.5rem' } }}
          >
            Get in touch with us
          </Typography>
        </Container>
      </Box>

      {/* Contact Information */}
      <Container maxWidth="lg" className="py-16">
        <Grid container spacing={4} justifyContent="center">
          {contactInfo.map((info) => (
            <Grid sx={{ xs: 12, sm: 6, md: 3 }} key={info.title}>
              <Card 
                className="h-full neon-border transform transition-transform duration-300 hover:scale-105"
                sx={{ 
                  background: 'rgba(45, 52, 54, 0.8)',
                  backdropFilter: 'blur(10px)',
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center'
                }}
              >
                <CardContent className="text-center w-full">
                  <Box 
                    className="mb-4 text-primary"
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      width: '80px',
                      height: '80px',
                      borderRadius: '50%',
                      background: 'rgba(108, 92, 231, 0.1)',
                      margin: '0 auto 1.5rem'
                    }}
                  >
                    {info.icon}
                  </Box>
                  <Typography variant="h5" component="h3" className="mb-3 neon-text">
                    {info.title}
                  </Typography>
                  <Typography 
                    variant="body1" 
                    color="text.secondary"
                    sx={{ whiteSpace: 'pre-line' }}
                  >
                    {info.content}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>

        {/* Social Links */}
        <Box className="mt-16 text-center">
          <Typography variant="h4" component="h2" className="mb-8 neon-text">
            Follow Us
          </Typography>
          <Box className="flex justify-center gap-6">
            {socialLinks.map((social) => (
              <a
                key={social.label}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:text-primary-dark transition-colors"
              >
                <Box
                  sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: 1
                  }}
                >
                  <Box
                    sx={{
                      width: '60px',
                      height: '60px',
                      borderRadius: '50%',
                      background: 'rgba(108, 92, 231, 0.1)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      transition: 'transform 0.3s ease',
                      '&:hover': {
                        transform: 'scale(1.1)'
                      }
                    }}
                  >
                    {social.icon}
                  </Box>
                  <Typography variant="body2" color="text.secondary">
                    {social.label}
                  </Typography>
                </Box>
              </a>
            ))}
          </Box>
        </Box>

        {/* Google Maps Embed */}
        <Paper 
          elevation={3} 
          className="mt-16 p-6 neon-border"
          sx={{ 
            background: 'rgba(45, 52, 54, 0.8)',
            backdropFilter: 'blur(10px)',
            maxWidth: '800px',
            margin: '0 auto'
          }}
        >
          <Typography variant="h4" component="h2" className="mb-6 neon-text text-center">
            Find Us
          </Typography>
          <Box 
            className="w-full h-[300px] rounded-lg overflow-hidden"
            sx={{
              boxShadow: '0 0 20px rgba(108, 92, 231, 0.2)'
            }}
          >
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15015.123456789012!2d73.7890123456789!3d20.012345678901234!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bddebaa5a5a5a5a%3A0x1234567890abcdef!2sHolaram%20Colony%2C%20Sharanpur%20Road%2C%20Nashik%2C%20Maharashtra!5e0!3m2!1sen!2sin!4v1234567890!5m2!1sen!2sin"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="GameZone Café Location"
            />
          </Box>
          <Typography 
            variant="body1" 
            className="mt-4 text-center text-gray-300"
            sx={{ fontSize: '1.1rem' }}
          >
            Holaram Colony, Sharanpur Road, Nashik
          </Typography>
        </Paper>
      </Container>
    </div>
  );
};

export default Contact; 