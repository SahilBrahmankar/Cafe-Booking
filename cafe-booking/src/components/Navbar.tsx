import React from 'react';
import { Link } from 'react-router-dom';
import { AppBar, Toolbar, Button, Box } from '@mui/material';
import { styled } from '@mui/material/styles';

const StyledAppBar = styled(AppBar)(({ theme }: { theme: any }) => ({
  background: 'linear-gradient(45deg, #2d3436 30%, #6c5ce7 90%)',
  boxShadow: '0 0 10px rgba(108, 92, 231, 0.5)',
}));

const NavButton = styled(Button)<{ component?: React.ElementType; to?: string }>(({ theme }) => ({
  color: '#dfe6e9',
  margin: '0 8px',
  '&:hover': {
    background: 'rgba(108, 92, 231, 0.2)',
    boxShadow: '0 0 10px rgba(108, 92, 231, 0.5)',
  },
}));

const Navbar = () => {
  return (
    <StyledAppBar position="static">
      <Toolbar>
        <Box sx={{ flexGrow: 1, display: 'flex', alignItems: 'center' }}>
          <Link to="/" className="text-2xl font-bold neon-text">
            GameZone Café
          </Link>
        </Box>
        <Box>
          <NavButton component={Link} to="/">
            Home
          </NavButton>
          <NavButton component={Link} to="/booking">
            Book Now
          </NavButton>
          <NavButton component={Link} to="/about">
            About
          </NavButton>
          <NavButton component={Link} to="/contact">
            Contact
          </NavButton>
          <NavButton component={Link} to="/admin">
            Admin
          </NavButton>
        </Box>
      </Toolbar>
    </StyledAppBar>
  );
};

export default Navbar; 