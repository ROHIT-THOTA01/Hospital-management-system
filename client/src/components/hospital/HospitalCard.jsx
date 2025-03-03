import React from 'react';
import { Link } from 'react-router-dom';
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Chip,
  Box,
  Rating,
  CardActionArea,
  Avatar,
  Divider,
} from '@mui/material';
import { 
  LocationOn as LocationIcon,
  LocalHospital as HospitalIcon,
  Star as StarIcon,
} from '@mui/icons-material';
import { styled } from '@mui/material/styles';

const StyledCard = styled(Card)(({ theme }) => ({
  maxWidth: 345,
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  borderRadius: 12,
  overflow: 'hidden',
  boxShadow: '0 8px 16px rgba(0, 0, 0, 0.1)',
  transition: 'all 0.3s ease',
  '&:hover': {
    transform: 'translateY(-8px)',
    boxShadow: '0 16px 32px rgba(0, 0, 0, 0.15)',
  },
}));

const StyledCardMedia = styled(CardMedia)(({ theme }) => ({
  height: 200,
  position: 'relative',
}));

const HospitalBadge = styled(Box)(({ theme }) => ({
  position: 'absolute',
  top: 16,
  right: 16,
  backgroundColor: theme.palette.primary.main,
  color: theme.palette.primary.contrastText,
  borderRadius: 20,
  padding: '4px 12px',
  fontWeight: 'bold',
  fontSize: '0.75rem',
  boxShadow: '0 2px 8px rgba(0, 0, 0, 0.2)',
  display: 'flex',
  alignItems: 'center',
}));

const SpecialtyChip = styled(Chip)(({ theme }) => ({
  borderRadius: 16,
  fontWeight: 500,
  boxShadow: '0 2px 4px rgba(0, 0, 0, 0.05)',
  transition: 'all 0.2s ease',
  '&:hover': {
    transform: 'scale(1.05)',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
  },
}));

const HospitalCard = ({ hospital }) => {
  // Get a random image if none is provided
  const imageUrl = hospital.image || `https://source.unsplash.com/random/400x200/?hospital,medical,healthcare&sig=${hospital._id}`;
  
  // Limit specialties to display
  const displaySpecialties = hospital.speciality.slice(0, 3);
  const hasMoreSpecialties = hospital.speciality.length > 3;
  
  return (
    <StyledCard className="card">
      <CardActionArea component={Link} to={`/hospitals/${hospital._id}`}>
        <StyledCardMedia
          component="img"
          image={imageUrl}
          alt={hospital.name}
          className="hospital-image"
        />
        <HospitalBadge>
          <StarIcon sx={{ fontSize: 16, mr: 0.5 }} />
          {hospital.rating}
        </HospitalBadge>
        
        <CardContent sx={{ p: 3 }}>
          <Typography 
            gutterBottom 
            variant="h5" 
            component="div" 
            color="text.primary"
            sx={{ 
              fontWeight: 600,
              mb: 1,
              display: '-webkit-box',
              overflow: 'hidden',
              WebkitBoxOrient: 'vertical',
              WebkitLineClamp: 1,
            }}
          >
            {hospital.name}
          </Typography>
          
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
            <Avatar 
              sx={{ 
                bgcolor: 'rgba(25, 118, 210, 0.1)', 
                width: 24, 
                height: 24,
                mr: 1
              }}
            >
              <LocationIcon fontSize="small" color="primary" />
            </Avatar>
            <Typography 
              variant="body2" 
              color="text.secondary"
              sx={{ fontWeight: 500 }}
            >
              {hospital.city}
            </Typography>
          </Box>
          
          <Divider sx={{ my: 1.5 }} />
          
          <Box sx={{ mt: 2 }}>
            <Typography 
              variant="subtitle2" 
              color="text.secondary"
              sx={{ mb: 1, fontWeight: 600 }}
            >
              Specialties:
            </Typography>
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.8 }}>
              {displaySpecialties.map((spec, index) => (
                <SpecialtyChip
                  key={index}
                  label={spec}
                  size="small"
                  color={index % 2 === 0 ? "primary" : "secondary"}
                  variant={index % 2 === 0 ? "outlined" : "filled"}
                />
              ))}
              {hasMoreSpecialties && (
                <SpecialtyChip
                  label={`+${hospital.speciality.length - 3} more`}
                  size="small"
                  variant="outlined"
                />
              )}
            </Box>
          </Box>
        </CardContent>
      </CardActionArea>
    </StyledCard>
  );
};

export default HospitalCard; 