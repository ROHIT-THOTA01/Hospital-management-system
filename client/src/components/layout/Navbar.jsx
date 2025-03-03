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
  borderRadius: theme.shape.borderRadius,
  backgroundColor: theme.palette.mode === 'dark'
    ? alpha(theme.palette.common.white, 0.08)
    : alpha(theme.palette.common.black, 0.04),
  '&:hover': {
    backgroundColor: theme.palette.mode === 'dark'
      ? alpha(theme.palette.common.white, 0.12)
      : alpha(theme.palette.common.black, 0.06),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(3),
    width: 'auto',
  },
  transition: 'all 0.3s ease',
  border: `1px solid ${theme.palette.mode === 'dark'
    ? alpha(theme.palette.common.white, 0.1)
    : alpha(theme.palette.common.black, 0.1)}`,
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
  boxShadow: 'none',
  backdropFilter: 'blur(8px)',
  backgroundColor: theme.palette.mode === 'dark' 
    ? alpha(theme.palette.background.paper, 0.95)
    : alpha(theme.palette.background.paper, 0.95),
  borderBottom: `1px solid ${theme.palette.mode === 'dark' 
    ? alpha(theme.palette.common.white, 0.1)
    : alpha(theme.palette.common.black, 0.1)}`,
  transition: 'all 0.3s ease',
  position: 'sticky',
  top: 0,
  zIndex: theme.zIndex.drawer + 1,
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
  }, [searchValue, navigate, searchTimeout]);

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
      <StyledAppBar>
        <Toolbar sx={{ 
          px: { xs: 2, sm: 4 },
          minHeight: 64,
          display: 'flex',
          alignItems: 'center',
          gap: 2
        }}>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={toggleSidebar}
            sx={{ mr: { xs: 1, sm: 2 } }}
          >
            <MenuIcon />
          </IconButton>
          
          <LogoContainer component={Link} to="/" sx={{ 
            flexGrow: { xs: 0, md: 0 },
            minWidth: 'fit-content'
          }}>
            <HospitalIcon sx={{ color: 'primary.main' }} />
            <Typography
              variant="h6"
              noWrap
              component="div"
              sx={{
                display: { xs: 'none', sm: 'block' },
                fontWeight: 'bold',
                letterSpacing: '0.5px',
                color: 'text.primary',
                ml: 1
              }}
            >
              MEDCARE
            </Typography>
          </LogoContainer>

          <SearchContainer sx={{ 
            flexGrow: 1,
            maxWidth: { sm: '100%', md: '400px' },
            mx: { xs: 1, md: 4 },
            position: 'relative'
          }}>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Search by city..."
              inputProps={{ 'aria-label': 'search' }}
              value={searchValue}
              onChange={handleSearchChange}
              fullWidth
            />
          </SearchContainer>
          
          <Box sx={{ 
            display: 'flex', 
            alignItems: 'center', 
            gap: { xs: 0.5, sm: 1 },
            ml: 'auto'
          }}>
            {user && (
              <Button
                variant="contained"
                color="primary"
                startIcon={<AddIcon />}
                component={Link}
                to="/hospitals/create"
                sx={{
                  display: { xs: 'none', md: 'flex' },
                  borderRadius: 2,
                  px: 2,
                  py: 1,
                  fontWeight: 500,
                  textTransform: 'none',
                  whiteSpace: 'nowrap',
                  '&:hover': {
                    transform: 'translateY(-1px)',
                  },
                }}
              >
                Add Hospital
              </Button>
            )}
            
            <Tooltip title={darkMode ? 'Light Mode' : 'Dark Mode'}>
              <IconButton 
                color="inherit" 
                onClick={toggleDarkMode}
                sx={{ 
                  bgcolor: theme => theme.palette.mode === 'dark'
                    ? alpha(theme.palette.common.white, 0.08)
                    : alpha(theme.palette.common.black, 0.04),
                }}
              >
                {darkMode ? <LightModeIcon /> : <DarkModeIcon />}
              </IconButton>
            </Tooltip>
            
            {user ? (
              <>
                <Tooltip title="Notifications">
                  <IconButton 
                    color="inherit"
                    sx={{ 
                      display: { xs: 'none', sm: 'flex' },
                      bgcolor: theme => theme.palette.mode === 'dark'
                        ? alpha(theme.palette.common.white, 0.08)
                        : alpha(theme.palette.common.black, 0.04),
                    }}
                  >
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
                    sx={{ 
                      ml: { xs: 0.5, sm: 1 },
                      bgcolor: theme => theme.palette.mode === 'dark'
                        ? alpha(theme.palette.common.white, 0.08)
                        : alpha(theme.palette.common.black, 0.04),
                    }}
                  >
                    <Avatar 
                      sx={{ 
                        width: 32, 
                        height: 32, 
                        bgcolor: 'primary.main',
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
              <Box sx={{ display: 'flex', gap: 1 }}>
                <Button 
                  color="inherit" 
                  component={Link} 
                  to="/login"
                  sx={{ 
                    display: { xs: 'none', sm: 'flex' },
                    borderRadius: 2,
                    px: 2,
                    fontWeight: 500,
                    textTransform: 'none',
                    whiteSpace: 'nowrap',
                    '&:hover': {
                      bgcolor: theme => theme.palette.mode === 'dark'
                        ? alpha(theme.palette.common.white, 0.08)
                        : alpha(theme.palette.common.black, 0.04),
                    }
                  }}
                >
                  Login
                </Button>
                <Button 
                  variant="contained" 
                  color="primary" 
                  component={Link} 
                  to="/register"
                  sx={{ 
                    borderRadius: 2,
                    px: 2,
                    fontWeight: 500,
                    textTransform: 'none',
                    whiteSpace: 'nowrap',
                    '&:hover': {
                      transform: 'translateY(-1px)',
                    }
                  }}
                >
                  Register
                </Button>
              </Box>
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