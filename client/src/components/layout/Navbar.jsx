import React, { useContext, useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
  InputBase,
  Box,
  Tooltip,
  Avatar,
  Menu,
  MenuItem,
  Badge,
} from '@mui/material';
import {
  Search as SearchIcon,
  Brightness4 as DarkModeIcon,
  Brightness7 as LightModeIcon,
  LocalHospital as HospitalIcon,
  Menu as MenuIcon,
  Notifications as NotificationIcon,
  AccountCircle,
  ExitToApp as LogoutIcon,
  Add as AddIcon,
} from '@mui/icons-material';
import { styled, alpha } from '@mui/material/styles';
import { AuthContext } from '../../context/AuthContext';
import { ThemeContext } from '../../context/ThemeContext';
import axios from 'axios';
import { API_BASE_URL } from '../../config';

// Styled components
const SearchContainer = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius * 3,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(3),
    width: 'auto',
  },
  transition: 'all 0.3s ease',
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  width: '100%',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
}));

const StyledAppBar = styled(AppBar)(({ theme }) => ({
  boxShadow: '0 4px 12px 0 rgba(0, 0, 0, 0.05)',
  backdropFilter: 'blur(10px)',
  backgroundColor: theme.palette.mode === 'dark' 
    ? alpha(theme.palette.background.paper, 0.9)
    : alpha(theme.palette.primary.main, 0.9),
  transition: 'all 0.3s ease',
}));

const LogoContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  textDecoration: 'none',
  color: 'white',
  '& svg': {
    marginRight: theme.spacing(1),
    fontSize: '2rem',
  },
}));

const Navbar = ({ toggleDarkMode, toggleSidebar }) => {
  const { user, logout } = useContext(AuthContext);
  const { darkMode } = useContext(ThemeContext);
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState(null);
  const [searchValue, setSearchValue] = useState('');
  const [searchTimeout, setSearchTimeout] = useState(null);

  const handleLogout = () => {
    logout();
    navigate('/');
    handleMenuClose();
  };

  useEffect(() => {
    // Clear the previous timeout
    if (searchTimeout) {
      clearTimeout(searchTimeout);
    }

    // Only perform search if there is a value
    if (searchValue.trim()) {
      const timeoutId = setTimeout(async () => {
        try {
          const response = await axios.get(`${API_BASE_URL}/hospitals`, {
            params: { city: searchValue.trim() }
          });
          
          // Only navigate if we're performing a search
          if (window.location.pathname === '/') {
            navigate('/', { 
              state: { 
                searchResults: response.data.data,
                searchQuery: searchValue.trim() 
              }
            });
          }
        } catch (error) {
          console.error('Search failed:', error);
        }
      }, 300); // Debounce time of 300ms

      setSearchTimeout(timeoutId);
      return () => clearTimeout(timeoutId);
    }
  }, [searchValue, navigate]);

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchValue(value);
    
    // If search is cleared and we're on home page, reset results
    if (!value.trim() && window.location.pathname === '/') {
      navigate('/', { 
        state: { 
          searchResults: null,
          searchQuery: '' 
        }
      });
    }
  };

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const menuId = 'primary-search-account-menu';
  const isMenuOpen = Boolean(anchorEl);

  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'right',
      }}
      id={menuId}
      keepMounted
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={() => { navigate('/profile'); handleMenuClose(); }}>Profile</MenuItem>
      <MenuItem onClick={() => { navigate('/settings'); handleMenuClose(); }}>Settings</MenuItem>
      <MenuItem onClick={handleLogout}>
        <LogoutIcon fontSize="small" sx={{ mr: 1 }} />
        Logout
      </MenuItem>
    </Menu>
  );

  return (
    <>
      <StyledAppBar position="fixed">
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={toggleSidebar}
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          
          <LogoContainer component={Link} to="/" sx={{ flexGrow: { xs: 1, md: 0 } }}>
            <HospitalIcon />
            <Typography
              variant="h6"
              noWrap
              component="div"
              sx={{
                display: { xs: 'none', sm: 'block' },
                fontWeight: 'bold',
                letterSpacing: '0.5px'
              }}
            >
              MEDCARE
            </Typography>
          </LogoContainer>

          <SearchContainer sx={{ flexGrow: 1, maxWidth: { xs: '100%', md: '400px' }, display: 'flex' }}>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Search by city..."
              inputProps={{ 'aria-label': 'search' }}
              value={searchValue}
              onChange={handleSearchChange}
            />
          </SearchContainer>
          
          {user && (
            <Button
              variant="contained"
              color="secondary"
              startIcon={<AddIcon />}
              component={Link}
              to="/hospitals/create"
              sx={{
                ml: 2,
                borderRadius: '20px',
                px: 2,
                fontWeight: 'bold',
                boxShadow: '0 4px 10px rgba(220, 0, 78, 0.25)',
                '&:hover': {
                  boxShadow: '0 6px 15px rgba(220, 0, 78, 0.3)',
                  transform: 'translateY(-2px)',
                },
                transition: 'all 0.3s ease',
              }}
            >
              Create Hospital
            </Button>
          )}
          
          <Box sx={{ flexGrow: 1 }} />
          
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Tooltip title={darkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}>
              <IconButton color="inherit" onClick={toggleDarkMode} sx={{ ml: 1 }}>
                {darkMode ? <LightModeIcon /> : <DarkModeIcon />}
              </IconButton>
            </Tooltip>
            
            {user ? (
              <>
                <Tooltip title="Notifications">
                  <IconButton color="inherit" sx={{ ml: 1 }}>
                    <Badge badgeContent={4} color="error">
                      <NotificationIcon />
                    </Badge>
                  </IconButton>
                </Tooltip>
                
                <Tooltip title="Account">
                  <IconButton
                    edge="end"
                    aria-label="account of current user"
                    aria-controls={menuId}
                    aria-haspopup="true"
                    onClick={handleProfileMenuOpen}
                    color="inherit"
                    sx={{ ml: 1 }}
                  >
                    <Avatar 
                      sx={{ 
                        width: 32, 
                        height: 32, 
                        bgcolor: 'secondary.main',
                        fontSize: '0.875rem',
                        fontWeight: 'bold'
                      }}
                    >
                      {user.name ? user.name.charAt(0).toUpperCase() : 'U'}
                    </Avatar>
                  </IconButton>
                </Tooltip>
              </>
            ) : (
              <>
                <Button 
                  color="inherit" 
                  component={Link} 
                  to="/login"
                  sx={{ 
                    ml: 1,
                    borderRadius: '20px',
                    px: 2,
                    '&:hover': {
                      backgroundColor: 'rgba(255, 255, 255, 0.2)',
                    }
                  }}
                >
                  Login
                </Button>
                <Button 
                  variant="contained" 
                  color="secondary" 
                  component={Link} 
                  to="/register"
                  sx={{ 
                    ml: 1,
                    borderRadius: '20px',
                    px: 2,
                    boxShadow: '0 4px 10px rgba(220, 0, 78, 0.25)',
                    '&:hover': {
                      boxShadow: '0 6px 15px rgba(220, 0, 78, 0.3)',
                    }
                  }}
                >
                  Register
                </Button>
              </>
            )}
          </Box>
        </Toolbar>
      </StyledAppBar>
      <Toolbar /> {/* Empty toolbar to offset content */}
      {renderMenu}
    </>
  );
};

export default Navbar; 