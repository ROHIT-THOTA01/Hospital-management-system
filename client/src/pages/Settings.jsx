import React, { useState, useContext } from 'react';
import {
  Container,
  Typography,
  Box,
  Paper,
  Switch,
  FormControlLabel,
  Divider,
  Button,
  Grid,
  TextField,
  Alert,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Snackbar
} from '@mui/material';
import {
  Notifications as NotificationsIcon,
  Visibility as VisibilityIcon,
  Security as SecurityIcon,
  Language as LanguageIcon,
  Delete as DeleteIcon,
  ColorLens as ColorLensIcon,
  DarkMode as DarkModeIcon,
  Logout as LogoutIcon,
  Save as SaveIcon
} from '@mui/icons-material';
import { ThemeContext } from '../context/ThemeContext';
import { AuthContext } from '../context/AuthContext';
import { styled } from '@mui/material/styles';

const SettingsSection = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  marginBottom: theme.spacing(3),
  borderRadius: theme.shape.borderRadius,
  boxShadow: theme.shadows[2]
}));

const Settings = () => {
  const { darkMode, toggleDarkMode } = useContext(ThemeContext);
  const { user } = useContext(AuthContext);
  
  const [settings, setSettings] = useState({
    emailNotifications: true,
    smsNotifications: false,
    profileVisibility: 'public',
    language: 'english',
    twoFactorAuth: false
  });
  
  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  
  const handleSettingChange = (setting) => (event) => {
    setSettings({
      ...settings,
      [setting]: event.target.checked
    });
    
    // Show feedback
    setSnackbarMessage(`${setting} setting updated`);
    setSnackbarOpen(true);
  };
  
  const handlePasswordChange = (field) => (event) => {
    setPasswordData({
      ...passwordData,
      [field]: event.target.value
    });
  };
  
  const handlePasswordSubmit = (event) => {
    event.preventDefault();
    
    // Validate passwords
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      setSnackbarMessage('New passwords do not match');
      setSnackbarOpen(true);
      return;
    }
    
    // Here you would typically call your API to update the password
    
    // Reset form and show success message
    setPasswordData({
      currentPassword: '',
      newPassword: '',
      confirmPassword: ''
    });
    
    setSnackbarMessage('Password updated successfully');
    setSnackbarOpen(true);
  };
  
  const handleDeleteAccount = () => {
    // Here you would typically call your API to delete the account
    setDeleteDialogOpen(false);
    
    // Show feedback
    setSnackbarMessage('Account deletion request submitted');
    setSnackbarOpen(true);
  };
  
  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  return (
    <Container maxWidth="lg">
      <Box sx={{ my: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom align="center">
          Account Settings
        </Typography>
        
        <Grid container spacing={3}>
          <Grid item xs={12} md={8}>
            {/* Appearance Settings */}
            <SettingsSection>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <ColorLensIcon color="primary" sx={{ mr: 1 }} />
                <Typography variant="h6">
                  Appearance
                </Typography>
              </Box>
              <Divider sx={{ mb: 2 }} />
              
              <FormControlLabel
                control={
                  <Switch
                    checked={darkMode}
                    onChange={toggleDarkMode}
                    color="primary"
                  />
                }
                label={
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <DarkModeIcon sx={{ mr: 1, fontSize: 20 }} />
                    <Typography>Dark Mode</Typography>
                  </Box>
                }
              />
            </SettingsSection>
            
            {/* Notification Settings */}
            <SettingsSection>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <NotificationsIcon color="primary" sx={{ mr: 1 }} />
                <Typography variant="h6">
                  Notifications
                </Typography>
              </Box>
              <Divider sx={{ mb: 2 }} />
              
              <List>
                <ListItem>
                  <ListItemText 
                    primary="Email Notifications" 
                    secondary="Receive updates and alerts via email"
                  />
                  <ListItemSecondaryAction>
                    <Switch
                      edge="end"
                      checked={settings.emailNotifications}
                      onChange={handleSettingChange('emailNotifications')}
                      color="primary"
                    />
                  </ListItemSecondaryAction>
                </ListItem>
                <ListItem>
                  <ListItemText 
                    primary="SMS Notifications" 
                    secondary="Receive updates and alerts via text message"
                  />
                  <ListItemSecondaryAction>
                    <Switch
                      edge="end"
                      checked={settings.smsNotifications}
                      onChange={handleSettingChange('smsNotifications')}
                      color="primary"
                    />
                  </ListItemSecondaryAction>
                </ListItem>
              </List>
            </SettingsSection>
            
            {/* Privacy Settings */}
            <SettingsSection>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <VisibilityIcon color="primary" sx={{ mr: 1 }} />
                <Typography variant="h6">
                  Privacy
                </Typography>
              </Box>
              <Divider sx={{ mb: 2 }} />
              
              <FormControlLabel
                control={
                  <Switch
                    checked={settings.profileVisibility === 'public'}
                    onChange={(e) => {
                      setSettings({
                        ...settings,
                        profileVisibility: e.target.checked ? 'public' : 'private'
                      });
                      setSnackbarMessage('Profile visibility updated');
                      setSnackbarOpen(true);
                    }}
                    color="primary"
                  />
                }
                label="Public Profile"
              />
              <Typography variant="body2" color="text.secondary" sx={{ mt: 1, ml: 3 }}>
                When enabled, your profile information will be visible to other users.
              </Typography>
            </SettingsSection>
            
            {/* Security Settings */}
            <SettingsSection>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <SecurityIcon color="primary" sx={{ mr: 1 }} />
                <Typography variant="h6">
                  Security
                </Typography>
              </Box>
              <Divider sx={{ mb: 2 }} />
              
              <Box component="form" onSubmit={handlePasswordSubmit} sx={{ mb: 3 }}>
                <Typography variant="subtitle1" gutterBottom>
                  Change Password
                </Typography>
                
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      type="password"
                      label="Current Password"
                      value={passwordData.currentPassword}
                      onChange={handlePasswordChange('currentPassword')}
                      required
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      type="password"
                      label="New Password"
                      value={passwordData.newPassword}
                      onChange={handlePasswordChange('newPassword')}
                      required
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      type="password"
                      label="Confirm New Password"
                      value={passwordData.confirmPassword}
                      onChange={handlePasswordChange('confirmPassword')}
                      required
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Button 
                      type="submit" 
                      variant="contained" 
                      color="primary"
                      startIcon={<SaveIcon />}
                    >
                      Update Password
                    </Button>
                  </Grid>
                </Grid>
              </Box>
              
              <Divider sx={{ my: 2 }} />
              
              <FormControlLabel
                control={
                  <Switch
                    checked={settings.twoFactorAuth}
                    onChange={handleSettingChange('twoFactorAuth')}
                    color="primary"
                  />
                }
                label="Two-Factor Authentication"
              />
              <Typography variant="body2" color="text.secondary" sx={{ mt: 1, ml: 3, mb: 2 }}>
                Add an extra layer of security to your account by requiring a verification code.
              </Typography>
            </SettingsSection>
          </Grid>
          
          <Grid item xs={12} md={4}>
            {/* Language Settings */}
            <SettingsSection>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <LanguageIcon color="primary" sx={{ mr: 1 }} />
                <Typography variant="h6">
                  Language
                </Typography>
              </Box>
              <Divider sx={{ mb: 2 }} />
              
              <TextField
                select
                fullWidth
                label="Language"
                value={settings.language}
                onChange={(e) => {
                  setSettings({
                    ...settings,
                    language: e.target.value
                  });
                  setSnackbarMessage('Language preference updated');
                  setSnackbarOpen(true);
                }}
                SelectProps={{
                  native: true,
                }}
              >
                <option value="english">English</option>
                <option value="spanish">Spanish</option>
                <option value="french">French</option>
                <option value="german">German</option>
                <option value="chinese">Chinese</option>
              </TextField>
            </SettingsSection>
            
            {/* Account Actions */}
            <SettingsSection>
              <Typography variant="h6" gutterBottom>
                Account Actions
              </Typography>
              <Divider sx={{ mb: 2 }} />
              
              <List>
                <ListItem>
                  <ListItemIcon>
                    <LogoutIcon color="primary" />
                  </ListItemIcon>
                  <ListItemText 
                    primary="Logout from all devices" 
                    secondary="Secure your account by logging out everywhere"
                  />
                  <ListItemSecondaryAction>
                    <Button 
                      variant="outlined" 
                      color="primary"
                      size="small"
                      onClick={() => {
                        setSnackbarMessage('Logged out from all devices');
                        setSnackbarOpen(true);
                      }}
                    >
                      Logout All
                    </Button>
                  </ListItemSecondaryAction>
                </ListItem>
                
                <ListItem>
                  <ListItemIcon>
                    <DeleteIcon color="error" />
                  </ListItemIcon>
                  <ListItemText 
                    primary="Delete Account" 
                    secondary="Permanently remove your account and all data"
                  />
                  <ListItemSecondaryAction>
                    <Button 
                      variant="outlined" 
                      color="error"
                      size="small"
                      onClick={() => setDeleteDialogOpen(true)}
                    >
                      Delete
                    </Button>
                  </ListItemSecondaryAction>
                </ListItem>
              </List>
            </SettingsSection>
            
            {/* Data Export */}
            <SettingsSection>
              <Typography variant="h6" gutterBottom>
                Data & Privacy
              </Typography>
              <Divider sx={{ mb: 2 }} />
              
              <Alert severity="info" sx={{ mb: 2 }}>
                You can request a copy of your personal data at any time.
              </Alert>
              
              <Button 
                variant="outlined" 
                fullWidth
                onClick={() => {
                  setSnackbarMessage('Data export request submitted');
                  setSnackbarOpen(true);
                }}
              >
                Export My Data
              </Button>
            </SettingsSection>
          </Grid>
        </Grid>
      </Box>
      
      {/* Delete Account Confirmation Dialog */}
      <Dialog
        open={deleteDialogOpen}
        onClose={() => setDeleteDialogOpen(false)}
      >
        <DialogTitle>Delete Your Account?</DialogTitle>
        <DialogContent>
          <DialogContentText>
            This action cannot be undone. All your data will be permanently deleted.
            Are you sure you want to proceed?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDeleteDialogOpen(false)} color="primary">
            Cancel
          </Button>
          <Button onClick={handleDeleteAccount} color="error">
            Delete Account
          </Button>
        </DialogActions>
      </Dialog>
      
      {/* Feedback Snackbar */}
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={4000}
        onClose={handleSnackbarClose}
        message={snackbarMessage}
      />
    </Container>
  );
};

export default Settings; 