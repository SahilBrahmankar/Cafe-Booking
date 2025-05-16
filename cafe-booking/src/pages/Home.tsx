import React from 'react';
import { Container, Typography, Grid, Card, CardContent, CardMedia, Button, Box, Paper } from '@mui/material';
import { Link } from 'react-router-dom';
import { SportsEsports, Speed, Chair, Wifi, LocalCafe, EmojiEvents } from '@mui/icons-material';

const featuredGames = [
  {
    title: 'Fortnite',
    image: 'https://wallpapers.com/images/high/fortnite-1920x1080-hd-cvavgntkwzkn72rg.webp',
    description: 'Battle Royale gaming at its finest'
  },
  {
    title: 'League of Legends',
    image: 'https://wallpapers.com/images/high/official-league-of-legends-logo-zesnq2uulswyfrp2.webp',
    description: 'Strategic team-based gameplay'
  },
  {
    title: 'Valorant',
    image: 'https://wallpapers.com/images/high/valorant-viper-rzzp6bc9suun6y2x.webp',
    description: 'Tactical shooter with unique abilities'
  }
];

const features = [
  {
    icon: <SportsEsports sx={{ fontSize: 40 }} />,
    title: 'High-End Equipment',
    description: 'State-of-the-art gaming PCs with RTX 3080 graphics cards and 144Hz monitors'
  },
  {
    icon: <Speed sx={{ fontSize: 40 }} />,
    title: 'Fast Internet',
    description: '1Gbps fiber-optic connection for lag-free gaming experience'
  },
  {
    icon: <Chair sx={{ fontSize: 40 }} />,
    title: 'Comfortable Environment',
    description: 'Ergonomic gaming chairs and climate-controlled space'
  },
  {
    icon: <Wifi sx={{ fontSize: 40 }} />,
    title: 'Free Wi-Fi',
    description: 'High-speed Wi-Fi for all your devices'
  },
  {
    icon: <LocalCafe sx={{ fontSize: 40 }} />,
    title: 'Refreshments',
    description: 'Snacks and beverages available for purchase'
  },
  {
    icon: <EmojiEvents sx={{ fontSize: 40 }} />,
    title: 'Tournaments',
    description: 'Regular gaming tournaments with exciting prizes'
  }
];

const Home = () => {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <Box
        className="relative h-[80vh] flex items-center justify-center"
        sx={{
          background: 'linear-gradient(rgba(0,0,0,0.7), rgba(0,0,0,0.7)), url("https://images.unsplash.com/photo-1511512578047-dfb367046420?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2071&q=80")',
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
            Welcome to GameZone Café
          </Typography>
          <Typography 
            variant="h5" 
            className="mb-8 text-gray-300"
            sx={{ fontSize: { xs: '1.2rem', md: '1.5rem' } }}
          >
            Your ultimate gaming destination with high-end PCs and consoles
          </Typography>
          <Button
            component={Link}
            to="/booking"
            variant="contained"
            size="large"
            className="neon-border"
            sx={{ 
              fontSize: '1.2rem', 
              padding: '12px 32px',
              background: 'linear-gradient(45deg, #6c5ce7 30%, #00cec9 90%)',
              '&:hover': {
                background: 'linear-gradient(45deg, #5b4bc4 30%, #00b8b3 90%)',
              }
            }}
          >
            Book Your Session Now
          </Button>
        </Container>
      </Box>

      {/* Featured Games Section */}
      <Container maxWidth="lg" className="py-20">
        <Typography
          variant="h2"
          component="h2"
          className="mb-12 text-center neon-text"
          sx={{ fontWeight: 'bold' }}
        >
          Featured Games
        </Typography>
        <Grid container spacing={4}>
          {featuredGames.map((game) => (
            <Grid sx={{ xs: 12, md: 4 }} key={game.title}>
              <Card 
                className="h-full neon-border transform transition-transform duration-300 hover:scale-105"
                sx={{ 
                  background: 'rgba(45, 52, 54, 0.8)',
                  backdropFilter: 'blur(10px)'
                }}
              >
                <CardMedia
                  component="img"
                  sx={{ 
                    height: 200,
                    width: '100%',
                    objectFit: 'cover',
                    objectPosition: 'center'
                  }}
                  image={game.image}
                  alt={game.title}
                />
                <CardContent>
                  <Typography variant="h4" component="h3" className="mb-3 neon-text">
                    {game.title}
                  </Typography>
                  <Typography variant="body1" color="text.secondary" sx={{ fontSize: '1.1rem' }}>
                    {game.description}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* Features Section */}
      <Box className="bg-gray-900 py-20">
        <Container maxWidth="lg">
          <Typography
            variant="h2"
            component="h2"
            className="mb-12 text-center neon-text"
            sx={{ fontWeight: 'bold' }}
          >
            Why Choose GameZone?
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
            {features.map((feature) => (
              <Paper 
                key={feature.title}
                elevation={3}
                className="p-6 text-center neon-border h-full transform transition-transform duration-300 hover:scale-105"
                sx={{ 
                  background: 'rgba(45, 52, 54, 0.8)',
                  backdropFilter: 'blur(10px)',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  minHeight: '280px'
                }}
              >
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
                    marginBottom: '1.5rem'
                  }}
                >
                  {feature.icon}
                </Box>
                <Typography 
                  variant="h5" 
                  className="mb-3 neon-text"
                  sx={{ 
                    fontWeight: 'bold',
                    marginBottom: '1rem'
                  }}
                >
                  {feature.title}
                </Typography>
                <Typography 
                  variant="body1" 
                  color="text.secondary"
                  sx={{ 
                    fontSize: '1rem',
                    lineHeight: 1.6,
                    maxWidth: '90%',
                    margin: '0 auto'
                  }}
                >
                  {feature.description}
                </Typography>
              </Paper>
            ))}
          </Box>
        </Container>
      </Box>

      {/* Call to Action Section */}
      <Box className="py-20">
        <Container maxWidth="md" className="text-center">
          <Typography
            variant="h2"
            component="h2"
            className="mb-6 neon-text"
            sx={{ fontWeight: 'bold' }}
          >
            Ready to Game?
          </Typography>
          <Typography variant="h5" className="mb-8 text-gray-300">
            Book your session now and experience gaming like never before
          </Typography>
          <Button
            component={Link}
            to="/booking"
            variant="contained"
            size="large"
            className="neon-border"
            sx={{ 
              fontSize: '1.2rem', 
              padding: '12px 32px',
              background: 'linear-gradient(45deg, #6c5ce7 30%, #00cec9 90%)',
              '&:hover': {
                background: 'linear-gradient(45deg, #5b4bc4 30%, #00b8b3 90%)',
              }
            }}
          >
            Book Now
          </Button>
        </Container>
      </Box>
    </div>
  );
};

export default Home; 