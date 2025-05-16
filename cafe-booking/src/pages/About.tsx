import React from 'react';
import { Container, Typography, Grid, Card, CardContent, CardMedia, Box, Paper, Divider } from '@mui/material';
import { SportsEsports, Computer, VideogameAsset, EmojiEvents, LocalCafe, Wifi } from '@mui/icons-material';

const staffMembers = [
  {
    name: 'Ninad Golar',
    position: 'Manager',
    image: 'ninad.jpg',
    description: 'Gaming enthusiast with 10+ years of experience in the industry. Passionate about creating the perfect gaming environment for our community.'
  },
  {
    name: 'Sahil',
    position: 'Technical Support',
    image: '',
    description: 'Certified IT professional and avid gamer. Ensures all our gaming systems run at peak performance.'
  },
  {
    name: 'Viraj',
    position: 'Event Coordinator',
    image: '',
    description: 'Organizes tournaments and gaming events. Creates memorable experiences for our gaming community.'
  }
];

const facilities = [
  {
    icon: <Computer sx={{ fontSize: 40 }} />,
    title: 'Gaming PCs',
    description: 'High-performance gaming PCs with RTX 3080 graphics cards, 32GB RAM, and 144Hz monitors for the ultimate gaming experience.'
  },
  {
    icon: <VideogameAsset sx={{ fontSize: 40 }} />,
    title: 'Console Gaming',
    description: 'Latest generation consoles including PS5 and Xbox Series X, with 4K displays and premium gaming chairs.'
  },
  {
    icon: <SportsEsports sx={{ fontSize: 40 }} />,
    title: 'VR Zone',
    description: 'Dedicated VR gaming area with Oculus Quest 2 and HTC Vive for immersive virtual reality experiences.'
  }
];

const stats = [
  { number: '50+', label: 'Gaming PCs' },
  { number: '1000+', label: 'Happy Gamers' },
  { number: '24/7', label: 'Support' },
  { number: '10+', label: 'Tournaments Monthly' }
];

const About = () => {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <Box
        className="relative h-[60vh] flex items-center justify-center"
        sx={{
          background: 'linear-gradient(rgba(0,0,0,0.8), rgba(0,0,0,0.8)), url("https://images.unsplash.com/photo-1542751371-adc38448a05e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80")',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundAttachment: 'fixed'
        }}
      >
        <Container maxWidth="md" className="text-center">
          <Typography
            variant="h1"
            component="h1"
            className="mb-6 neon-text"
            sx={{ 
              fontWeight: 'bold',
              fontSize: { xs: '2.5rem', md: '4rem' },
              textShadow: '0 0 10px rgba(108, 92, 231, 0.5)'
            }}
          >
            About GameZone Café
          </Typography>
          <Typography 
            variant="h5" 
            className="mb-8 text-gray-300"
            sx={{ fontSize: { xs: '1.2rem', md: '1.5rem' } }}
          >
            Your ultimate gaming destination since 2020
          </Typography>
        </Container>
      </Box>

      {/* Stats Section */}
      <Box className="bg-gray-900 py-12">
        <Container maxWidth="lg">
          <Grid container spacing={4} justifyContent="center" alignItems="center">
            {stats.map((stat) => (
              <Grid sx={{ xs: 6, md: 3 }} key={stat.label}>
                <Box className="text-center">
                  <Typography
                    variant="h3"
                    className="mb-2 neon-text"
                    sx={{ fontWeight: 'bold' }}
                  >
                    {stat.number}
                  </Typography>
                  <Typography variant="h6" color="text.secondary">
                    {stat.label}
                  </Typography>
                </Box>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* Mission Statement */}
      <Container maxWidth="lg" className="py-16">
        <Box 
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 4
          }}
        >
          <Typography 
            variant="h4" 
            component="h2" 
            className="neon-text text-center"
            sx={{
              position: 'relative',
              '&::after': {
                content: '""',
                position: 'absolute',
                bottom: '-10px',
                left: '50%',
                transform: 'translateX(-50%)',
                width: '60px',
                height: '3px',
                background: 'linear-gradient(90deg, #6c5ce7, #00cec9)',
                borderRadius: '2px'
              }
            }}
          >
            Our Mission
          </Typography>
          
          <Paper 
            elevation={3} 
            className="p-8 neon-border"
            sx={{ 
              background: 'rgba(45, 52, 54, 0.8)',
              backdropFilter: 'blur(10px)',
              maxWidth: '800px',
              width: '100%',
              mx: 'auto'
            }}
          >
            <Box sx={{ textAlign: 'center' }}>
              <Typography 
                variant="body1" 
                className="text-lg"
                sx={{
                  lineHeight: 1.8,
                  fontSize: { xs: '1rem', md: '1.1rem' },
                  color: 'text.secondary'
                }}
              >
                At GameZone Café, we're passionate about creating the perfect gaming environment
                for our community. Our state-of-the-art facility combines high-end gaming equipment,
                comfortable seating, and a vibrant atmosphere to ensure an unforgettable gaming
                experience for players of all levels.
              </Typography>
            </Box>
          </Paper>
        </Box>
      </Container>

      {/* Facilities */}
      <Box className="bg-gray-900 py-16">
        <Container maxWidth="lg">
          <Typography variant="h4" component="h2" className="mb-12 text-center neon-text">
            Our Facilities
          </Typography>
          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: {
                xs: '1fr',
                sm: 'repeat(2, 1fr)',
                md: 'repeat(3, 1fr)'
              },
              gap: 3
            }}
          >
            {facilities.map((facility) => (
              <Card 
                key={facility.title}
                className="h-full neon-border transform transition-transform duration-300 hover:scale-105"
                sx={{ 
                  background: 'rgba(45, 52, 54, 0.8)',
                  backdropFilter: 'blur(10px)',
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column'
                }}
              >
                <CardContent className="text-center flex-grow">
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
                    {facility.icon}
                  </Box>
                  <Typography variant="h5" component="h3" className="mb-3 neon-text">
                    {facility.title}
                  </Typography>
                  <Typography variant="body1" color="text.secondary">
                    {facility.description}
                  </Typography>
                </CardContent>
              </Card>
            ))}
          </Box>
        </Container>
      </Box>

      {/* Staff Section */}
      <Container maxWidth="lg" className="py-16">
        <Typography variant="h4" component="h2" className="mb-12 text-center neon-text">
          Meet Our Team
        </Typography>
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: {
              xs: '1fr',
              sm: 'repeat(2, 1fr)',
              md: 'repeat(3, 1fr)'
            },
            gap: 3
          }}
        >
          {staffMembers.map((member) => (
            <Card 
              key={member.name}
              className="h-full neon-border transform transition-transform duration-300 hover:scale-105"
              sx={{ 
                background: 'rgba(45, 52, 54, 0.8)',
                backdropFilter: 'blur(10px)',
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                pt: 3
              }}
            >
              <Box
                sx={{
                  width: 150,
                  height: 150,
                  borderRadius: '50%',
                  overflow: 'hidden',
                  border: '3px solid',
                  borderColor: 'primary.main',
                  mb: 2,
                  boxShadow: '0 0 15px rgba(108, 92, 231, 0.3)'
                }}
              >
                <CardMedia
                  component="img"
                  image={member.image}
                  alt={member.name}
                  sx={{ 
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover'
                  }}
                />
              </Box>
              <CardContent className="flex-grow text-center">
                <Typography variant="h5" component="h3" className="mb-1 neon-text">
                  {member.name}
                </Typography>
                <Typography variant="subtitle1" color="primary" className="mb-3">
                  {member.position}
                </Typography>
                <Typography variant="body1" color="text.secondary">
                  {member.description}
                </Typography>
              </CardContent>
            </Card>
          ))}
        </Box>
      </Container>
    </div>
  );
};

export default About; 