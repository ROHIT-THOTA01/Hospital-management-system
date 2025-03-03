import React from 'react';
import { Link } from 'react-router-dom';
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Chip,
  Box,
  CardActionArea,
  Avatar,
  Divider,
} from '@mui/material';
import { 
  LocationOn as LocationIcon,
  Star as StarIcon,
} from '@mui/icons-material';
import { styled } from '@mui/material/styles';
import { alpha } from '@mui/material/styles';

const StyledCard = styled(Card)(({ theme }) => ({
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  borderRadius: 16,
  overflow: 'hidden',
  backgroundColor: theme.palette.mode === 'dark' 
    ? alpha(theme.palette.background.paper, 0.6)
    : theme.palette.background.paper,
  boxShadow: '0 4px 12px 0 rgba(0,0,0,0.05)',
  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
  '&:hover': {
    transform: 'translateY(-8px)',
    boxShadow: '0 12px 24px 0 rgba(0,0,0,0.1)',
    '& .hospital-image': {
      transform: 'scale(1.1)',
    },
  },
}));

const StyledCardMedia = styled(CardMedia)(({ theme }) => ({
  height: 220,
  position: 'relative',
  overflow: 'hidden',
  '& img': {
    transition: 'transform 0.6s cubic-bezier(0.4, 0, 0.2, 1)',
  },
}));

const HospitalBadge = styled(Box)(({ theme }) => ({
  position: 'absolute',
  top: 16,
  right: 16,
  backgroundColor: alpha(theme.palette.primary.main, 0.9),
  color: theme.palette.primary.contrastText,
  borderRadius: 20,
  padding: '6px 12px',
  fontWeight: 600,
  fontSize: '0.875rem',
  backdropFilter: 'blur(4px)',
  boxShadow: '0 2px 8px rgba(0, 0, 0, 0.15)',
  display: 'flex',
  alignItems: 'center',
  zIndex: 1,
}));

const SpecialtyChip = styled(Chip)(({ theme }) => ({
  borderRadius: 12,
  height: 28,
  fontWeight: 500,
  fontSize: '0.75rem',
  transition: 'all 0.2s ease',
  '&:hover': {
    transform: 'scale(1.05)',
  },
  '&.MuiChip-outlined': {
    borderColor: alpha(theme.palette.primary.main, 0.5),
  },
  '&.MuiChip-filled': {
    backgroundColor: alpha(theme.palette.secondary.main, 0.1),
  },
}));

const LocationBadge = styled(Avatar)(({ theme }) => ({
  backgroundColor: alpha(theme.palette.primary.main, 0.1),
  width: 32,
  height: 32,
  '& svg': {
    fontSize: '1.25rem',
  },
}));

const HospitalCard = ({ hospital }) => {
  const imageUrl = hospital.image || `https://source.unsplash.com/random/400x200/?hospital,medical,healthcare&sig=${hospital._id}`;
  const displaySpecialties = hospital.speciality.slice(0, 3);
  const hasMoreSpecialties = hospital.speciality.length > 3;
  
  return (
    <StyledCard elevation={0}>
      <CardActionArea component={Link} to={`/hospitals/${hospital._id}`}>
        <StyledCardMedia
          component="div"
          className="hospital-image"
          sx={{
            backgroundImage: `url(${imageUrl})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        >
          <Box
            sx={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background: 'linear-gradient(180deg, rgba(0,0,0,0.2) 0%, rgba(0,0,0,0) 40%)',
            }}
          />
          <HospitalBadge>
            <StarIcon sx={{ fontSize: 18, mr: 0.5 }} />
            {hospital.rating}
          </HospitalBadge>
        </StyledCardMedia>
        
        <CardContent sx={{ p: 3 }}>
          <Typography 
            variant="h6"
            color="text.primary"
            sx={{ 
              fontWeight: 600,
              mb: 2,
              display: '-webkit-box',
              overflow: 'hidden',
              WebkitBoxOrient: 'vertical',
              WebkitLineClamp: 1,
              lineHeight: 1.3,
            }}
          >
            {hospital.name}
          </Typography>
          
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 2.5 }}>
            <LocationBadge>
              <LocationIcon color="primary" />
            </LocationBadge>
            <Typography 
              variant="body2"
              color="text.secondary"
              sx={{ 
                ml: 1.5,
                fontWeight: 500,
                fontSize: '0.875rem',
              }}
            >
              {hospital.city}
            </Typography>
          </Box>
          
          <Divider sx={{ 
            my: 2,
            borderColor: theme => alpha(theme.palette.divider, 0.08),
          }} />
          
          <Box>
            <Typography 
              variant="subtitle2" 
              color="text.secondary"
              sx={{ mb: 1.5, fontWeight: 600, fontSize: '0.75rem', letterSpacing: '0.5px' }}
            >
              SPECIALTIES
            </Typography>
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
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
                  label={`+${hospital.speciality.length - 3}`}
                  size="small"
                  variant="outlined"
                  color="primary"
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