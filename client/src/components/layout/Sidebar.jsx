import React, { useContext } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
  useTheme,
  useMediaQuery,
  Box,
  Typography,
  Avatar,
  IconButton,
  Tooltip,
} from '@mui/material';
import {
  Home as HomeIcon,
  LocationCity as CityIcon,
  Add as AddIcon,
  Person as PersonIcon,
  Settings as SettingsIcon,
  Dashboard as DashboardIcon,
  LocalHospital as HospitalIcon,
  MedicalServices as MedicalIcon,
  Healing as HealingIcon,
  ChevronLeft as ChevronLeftIcon,
} from '@mui/icons-material';
import { AuthContext } from '../../context/AuthContext';
import { styled } from '@mui/material/styles';

// Styled components
const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(2),
  justifyContent: 'space-between',
  backgroundColor: theme.palette.primary.main,
  color: theme.palette.primary.contrastText,
}));

const SidebarAvatar = styled(Avatar)(({ theme }) => ({
  backgroundColor: theme.palette.secondary.main,
  width: 40,
  height: 40,
  marginRight: theme.spacing(2),
}));

const Sidebar = ({ open }) => {
  const { user } = useContext(AuthContext);
  const location = useLocation();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  // Define sidebar items with improved icons
  const sidebarItems = [
    {
      text: 'Home',
      icon: <HomeIcon color="primary" />,
      path: '/',
    },
    {
      text: 'Find Hospitals',
      icon: <CityIcon color="primary" />,
      path: '/',
    },
  ];

  // Items that require authentication
  const authItems = [
    {
      text: 'Add Hospital',
      icon: <AddIcon color="secondary" />,
      path: '/hospitals/create',
      requiresAdmin: true,
    },
    {
      text: 'Profile',
      icon: <PersonIcon color="secondary" />,
      path: '/profile',
    },
    {
      text: 'Settings',
      icon: <SettingsIcon color="secondary" />,
      path: '/settings',
    },
  ];

  // Admin only items
  const adminItems = [
    {
      text: 'Dashboard',
      icon: <DashboardIcon sx={{ color: '#ff9800' }} />,
      path: '/admin/dashboard',
    },
  ];

  const drawerVariant = isMobile ? 'temporary' : 'persistent';

  return (
    <Drawer
      variant={drawerVariant}
      open={open}
      sx={{
        width: 240,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: 240,
          boxSizing: 'border-box',
          top: '64px',
          height: 'calc(100% - 64px)',
          borderRight: '1px solid rgba(0, 0, 0, 0.12)',
          boxShadow: '2px 0 10px rgba(0, 0, 0, 0.1)',
        },
      }}
    >
      <Box sx={{ overflow: 'auto' }}>
        {user && (
          <Box sx={{ p: 2, display: 'flex', alignItems: 'center' }}>
            <SidebarAvatar>
              {user.name ? user.name.charAt(0).toUpperCase() : 'U'}
            </SidebarAvatar>
            <Box>
              <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
                {user.name || 'User'}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {user.role === 'admin' ? 'Administrator' : 'User'}
              </Typography>
            </Box>
          </Box>
        )}

        <List>
          {sidebarItems.map((item) => (
            <ListItem
              button
              key={item.text}
              component={Link}
              to={item.path}
              selected={location.pathname === item.path}
              sx={{
                borderRadius: '0 20px 20px 0',
                margin: '4px 0',
                '&.Mui-selected': {
                  backgroundColor: 'rgba(25, 118, 210, 0.12)',
                  '&:hover': {
                    backgroundColor: 'rgba(25, 118, 210, 0.18)',
                  },
                },
                '&:hover': {
                  backgroundColor: 'rgba(0, 0, 0, 0.04)',
                },
              }}
            >
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItem>
          ))}
        </List>

        {user && (
          <>
            <Divider sx={{ my: 1 }} />
            <List>
              {authItems
                .filter((item) => !item.requiresAdmin || (user && user.role === 'admin'))
                .map((item) => (
                  <ListItem
                    button
                    key={item.text}
                    component={Link}
                    to={item.path}
                    selected={location.pathname === item.path}
                    sx={{
                      borderRadius: '0 20px 20px 0',
                      margin: '4px 0',
                      '&.Mui-selected': {
                        backgroundColor: 'rgba(220, 0, 78, 0.12)',
                        '&:hover': {
                          backgroundColor: 'rgba(220, 0, 78, 0.18)',
                        },
                      },
                      '&:hover': {
                        backgroundColor: 'rgba(0, 0, 0, 0.04)',
                      },
                    }}
                  >
                    <ListItemIcon>{item.icon}</ListItemIcon>
                    <ListItemText primary={item.text} />
                  </ListItem>
                ))}
            </List>
          </>
        )}

        {user && user.role === 'admin' && (
          <>
            <Divider sx={{ my: 1 }} />
            <List>
              {adminItems.map((item) => (
                <ListItem
                  button
                  key={item.text}
                  component={Link}
                  to={item.path}
                  selected={location.pathname === item.path}
                  sx={{
                    borderRadius: '0 20px 20px 0',
                    margin: '4px 0',
                    '&.Mui-selected': {
                      backgroundColor: 'rgba(255, 152, 0, 0.12)',
                      '&:hover': {
                        backgroundColor: 'rgba(255, 152, 0, 0.18)',
                      },
                    },
                    '&:hover': {
                      backgroundColor: 'rgba(0, 0, 0, 0.04)',
                    },
                  }}
                >
                  <ListItemIcon>{item.icon}</ListItemIcon>
                  <ListItemText primary={item.text} />
                </ListItem>
              ))}
            </List>
          </>
        )}
      </Box>
    </Drawer>
  );
};

export default Sidebar; 