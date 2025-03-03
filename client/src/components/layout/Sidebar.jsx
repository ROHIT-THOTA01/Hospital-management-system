import React from 'react';
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
} from '@mui/material';
import {
  Person as PersonIcon,
  Settings as SettingsIcon,
  Dashboard as DashboardIcon,
  LocalHospital as HospitalIcon,
  Assignment as ReportsIcon,
  Help as HelpIcon,
} from '@mui/icons-material';
import { styled } from '@mui/material/styles';
import { alpha } from '@mui/material/styles';

const drawerWidth = 280;

const StyledDrawer = styled(Drawer)(({ theme }) => ({
  width: drawerWidth,
  flexShrink: 0,
  '& .MuiDrawer-paper': {
    width: drawerWidth,
    boxSizing: 'border-box',
    border: 'none',
    backgroundColor: theme.palette.mode === 'dark'
      ? alpha(theme.palette.background.paper, 0.95)
      : theme.palette.background.paper,
    boxShadow: '0 4px 12px 0 rgba(0,0,0,0.05)',
    borderRight: `1px solid ${theme.palette.mode === 'dark'
      ? alpha(theme.palette.common.white, 0.1)
      : alpha(theme.palette.common.black, 0.1)}`,
    transition: theme.transitions.create(['width', 'transform'], {
      duration: theme.transitions.duration.standard,
    }),
  },
}));

const StyledListItem = styled(ListItem)(({ theme, active }) => ({
  margin: '4px 12px',
  borderRadius: theme.shape.borderRadius,
  transition: 'all 0.3s ease',
  backgroundColor: active
    ? theme.palette.mode === 'dark'
      ? alpha(theme.palette.primary.main, 0.15)
      : alpha(theme.palette.primary.main, 0.08)
    : 'transparent',
  '&:hover': {
    backgroundColor: theme.palette.mode === 'dark'
      ? alpha(theme.palette.common.white, 0.08)
      : alpha(theme.palette.common.black, 0.04),
    transform: 'translateX(4px)',
  },
  '& .MuiListItemIcon-root': {
    color: active ? 'primary.main' : 'text.primary',
    minWidth: 40,
  },
  '& .MuiListItemText-primary': {
    fontSize: '0.9rem',
    fontWeight: active ? 600 : 400,
    color: active ? 'primary.main' : 'text.primary',
  },
}));

const menuItems = [
  { text: 'Dashboard', icon: <DashboardIcon />, path: '/' },
  { text: 'Hospitals', icon: <HospitalIcon />, path: '/hospitals' },
  { text: 'Profile', icon: <PersonIcon />, path: '/profile' },
  { text: 'Reports', icon: <ReportsIcon />, path: '/reports' },
  { text: 'Settings', icon: <SettingsIcon />, path: '/settings' },
  { text: 'Help', icon: <HelpIcon />, path: '/help' },
];

const Sidebar = ({ open }) => {
  const location = useLocation();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  return (
    <StyledDrawer
      variant={isMobile ? 'temporary' : 'persistent'}
      open={open}
      ModalProps={{
        keepMounted: true, // Better mobile performance
      }}
    >
      <Box sx={{ 
        p: 3, 
        display: 'flex', 
        alignItems: 'center',
        gap: 2,
        height: 64, // Match navbar height
        borderBottom: `1px solid ${theme.palette.mode === 'dark'
          ? alpha(theme.palette.common.white, 0.1)
          : alpha(theme.palette.common.black, 0.1)}`
      }}>
        <HospitalIcon sx={{ 
          color: 'primary.main',
          fontSize: 32
        }} />
        <Typography
          variant="h6"
          sx={{
            fontWeight: 600,
            color: 'primary.main',
            letterSpacing: '0.5px',
          }}
        >
          MEDCARE
        </Typography>
      </Box>

      <Box sx={{ mt: 2, px: 2 }}>
        <Typography
          variant="overline"
          sx={{
            px: 1,
            color: 'text.secondary',
            fontWeight: 500,
            letterSpacing: '1px',
          }}
        >
          MAIN MENU
        </Typography>
      </Box>
      
      <List sx={{ px: 1, py: 1 }}>
        {menuItems.map((item) => (
          <StyledListItem
            key={item.text}
            component={Link}
            to={item.path}
            active={location.pathname === item.path ? 1 : 0}
          >
            <ListItemIcon>{item.icon}</ListItemIcon>
            <ListItemText 
              primary={item.text}
              primaryTypographyProps={{
                fontSize: '0.9rem',
                fontWeight: location.pathname === item.path ? 600 : 400,
              }}
            />
          </StyledListItem>
        ))}
      </List>

      <Box sx={{ flexGrow: 1 }} />

      <Box sx={{ p: 2, mt: 'auto' }}>
        <Box
          sx={{
            p: 2,
            borderRadius: 2,
            bgcolor: theme => theme.palette.mode === 'dark'
              ? alpha(theme.palette.primary.main, 0.1)
              : alpha(theme.palette.primary.main, 0.05),
            display: 'flex',
            alignItems: 'center',
            gap: 2,
          }}
        >
          <HelpIcon color="primary" />
          <Box>
            <Typography variant="subtitle2" color="primary" fontWeight={600}>
              Need Help?
            </Typography>
            <Typography variant="caption" color="text.secondary">
              Check our docs
            </Typography>
          </Box>
        </Box>
      </Box>
    </StyledDrawer>
  );
};

export default Sidebar; 