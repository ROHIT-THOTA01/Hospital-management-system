import React, { useContext, useState } from 'react';
import { 
  Container, 
  Typography, 
  Box, 
  Paper, 
  Avatar, 
  Grid, 
  TextField, 
  Button, 
  Divider, 
  Card, 
  CardContent,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Chip,
  Alert
} from '@mui/material';
import { 
  Person as PersonIcon, 
  Email as EmailIcon, 
  Phone as PhoneIcon, 
  LocationOn as LocationIcon,
  Edit as EditIcon,
  Save as SaveIcon,
  Cancel as CancelIcon,
  Favorite as FavoriteIcon,
  History as HistoryIcon
} from '@mui/icons-material';
import { AuthContext } from '../context/AuthContext';
import { styled } from '@mui/material/styles';

const ProfileAvatar = styled(Avatar)(({ theme }) => ({
  width: 120,
  height: 120,
  margin: '0 auto',
  border: `4px solid ${theme.palette.primary.main}`,
  boxShadow: theme.shadows[3]
}));

const ProfileSection = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  marginBottom: theme.spacing(3),
  borderRadius: theme.shape.borderRadius,
  boxShadow: theme.shadows[2]
}));

const Profile = () => {
  const { user } = useContext(AuthContext);
  const [editing, setEditing] = useState(false);
  const [profileData, setProfileData] = useState({
    name: user?.name || 'John Doe',
    email: user?.email || 'john.doe@example.com',
    phone: '(555) 123-4567',
    address: '123 Main St, Anytown, USA',
    bio: 'Healthcare professional with 5+ years of experience in hospital administration.'
  });

  // Mock data for favorite hospitals and appointment history
  const favoriteHospitals = [
    { id: 1, name: 'City General Hospital', city: 'New York' },
    { id: 2, name: 'Memorial Medical Center', city: 'Chicago' }
  ];
  
  const appointmentHistory = [
    { id: 1, hospital: 'City General Hospital', date: '2023-10-15', status: 'Completed' },
    { id: 2, hospital: 'Memorial Medical Center', date: '2023-11-20', status: 'Upcoming' }
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfileData({
      ...profileData,
      [name]: value
    });
  };

  const handleEditToggle = () => {
    setEditing(!editing);
  };

  const handleSave = () => {
    // Here you would typically save the data to your backend
    setEditing(false);
    // Show success message or handle errors
  };

  return (
    <Container maxWidth="lg">
      <Box sx={{ my: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom align="center">
          My Profile
        </Typography>

        <Grid container spacing={4}>
          {/* Left column - Profile Info */}
          <Grid item xs={12} md={8}>
            <ProfileSection>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                <Typography variant="h5" component="h2">
                  Personal Information
                </Typography>
                <Button 
                  startIcon={editing ? <CancelIcon /> : <EditIcon />}
                  onClick={handleEditToggle}
                  color={editing ? "error" : "primary"}
                  variant="outlined"
                >
                  {editing ? 'Cancel' : 'Edit Profile'}
                </Button>
              </Box>
              
              <Divider sx={{ mb: 3 }} />
              
              <Grid container spacing={3}>
                {editing ? (
                  // Edit mode
                  <>
                    <Grid item xs={12}>
                      <TextField
                        fullWidth
                        label="Full Name"
                        name="name"
                        value={profileData.name}
                        onChange={handleInputChange}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        fullWidth
                        label="Email"
                        name="email"
                        value={profileData.email}
                        onChange={handleInputChange}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        fullWidth
                        label="Phone"
                        name="phone"
                        value={profileData.phone}
                        onChange={handleInputChange}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        fullWidth
                        label="Address"
                        name="address"
                        value={profileData.address}
                        onChange={handleInputChange}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        fullWidth
                        label="Bio"
                        name="bio"
                        value={profileData.bio}
                        onChange={handleInputChange}
                        multiline
                        rows={4}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <Button 
                        variant="contained" 
                        color="primary" 
                        startIcon={<SaveIcon />}
                        onClick={handleSave}
                      >
                        Save Changes
                      </Button>
                    </Grid>
                  </>
                ) : (
                  // View mode
                  <>
                    <Grid item xs={12} sm={6}>
                      <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                        <PersonIcon color="primary" sx={{ mr: 1 }} />
                        <Box>
                          <Typography variant="body2" color="text.secondary">
                            Full Name
                          </Typography>
                          <Typography variant="body1">
                            {profileData.name}
                          </Typography>
                        </Box>
                      </Box>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                        <EmailIcon color="primary" sx={{ mr: 1 }} />
                        <Box>
                          <Typography variant="body2" color="text.secondary">
                            Email
                          </Typography>
                          <Typography variant="body1">
                            {profileData.email}
                          </Typography>
                        </Box>
                      </Box>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                        <PhoneIcon color="primary" sx={{ mr: 1 }} />
                        <Box>
                          <Typography variant="body2" color="text.secondary">
                            Phone
                          </Typography>
                          <Typography variant="body1">
                            {profileData.phone}
                          </Typography>
                        </Box>
                      </Box>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                        <LocationIcon color="primary" sx={{ mr: 1 }} />
                        <Box>
                          <Typography variant="body2" color="text.secondary">
                            Address
                          </Typography>
                          <Typography variant="body1">
                            {profileData.address}
                          </Typography>
                        </Box>
                      </Box>
                    </Grid>
                    <Grid item xs={12}>
                      <Typography variant="body2" color="text.secondary" gutterBottom>
                        Bio
                      </Typography>
                      <Typography variant="body1" paragraph>
                        {profileData.bio}
                      </Typography>
                    </Grid>
                  </>
                )}
              </Grid>
            </ProfileSection>

            <ProfileSection>
              <Typography variant="h5" component="h2" gutterBottom>
                Favorite Hospitals
              </Typography>
              <Divider sx={{ mb: 2 }} />
              
              {favoriteHospitals.length > 0 ? (
                <List>
                  {favoriteHospitals.map((hospital) => (
                    <ListItem key={hospital.id} divider>
                      <ListItemIcon>
                        <FavoriteIcon color="error" />
                      </ListItemIcon>
                      <ListItemText 
                        primary={hospital.name} 
                        secondary={`Location: ${hospital.city}`} 
                      />
                    </ListItem>
                  ))}
                </List>
              ) : (
                <Alert severity="info">
                  You haven't added any hospitals to your favorites yet.
                </Alert>
              )}
            </ProfileSection>
          </Grid>

          {/* Right column - Avatar and Stats */}
          <Grid item xs={12} md={4}>
            <ProfileSection sx={{ textAlign: 'center' }}>
              <ProfileAvatar>
                {profileData.name.charAt(0).toUpperCase()}
              </ProfileAvatar>
              <Typography variant="h5" sx={{ mt: 2 }}>
                {profileData.name}
              </Typography>
              <Typography variant="body2" color="text.secondary" gutterBottom>
                {user?.role === 'admin' ? 'Administrator' : 'User'}
              </Typography>
              <Box sx={{ mt: 2 }}>
                <Chip 
                  label="Verified Account" 
                  color="success" 
                  variant="outlined" 
                  sx={{ m: 0.5 }} 
                />
                {user?.role === 'admin' && (
                  <Chip 
                    label="Admin" 
                    color="primary" 
                    variant="outlined" 
                    sx={{ m: 0.5 }} 
                  />
                )}
              </Box>
            </ProfileSection>

            <ProfileSection>
              <Typography variant="h6" gutterBottom>
                Recent Activity
              </Typography>
              <Divider sx={{ mb: 2 }} />
              
              <List dense>
                {appointmentHistory.map((appointment) => (
                  <ListItem key={appointment.id}>
                    <ListItemIcon>
                      <HistoryIcon color="primary" />
                    </ListItemIcon>
                    <ListItemText 
                      primary={`Appointment at ${appointment.hospital}`} 
                      secondary={`${appointment.date} - ${appointment.status}`} 
                    />
                  </ListItem>
                ))}
              </List>
            </ProfileSection>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};

export default Profile; 