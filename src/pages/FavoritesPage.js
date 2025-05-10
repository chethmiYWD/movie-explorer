import React, { useContext } from 'react';
import { FavoritesContext } from '../context/FavoritesContext';
import { Grid, Typography, Box, Button, Container } from '@mui/material';
import MovieCard from '../components/MovieCard';
import { useNavigate } from 'react-router-dom';
import './FavoritesPage.css';

// Favorites page component displaying user's favorite movies
function FavoritesPage() {
  // Access favorites from context
  const { favorites } = useContext(FavoritesContext);
  // Navigation hook for back button
  const navigate = useNavigate();

  return (
    // Main container with max width
    <Container maxWidth="lg" className="favorites-container">
      {/* Header section with back button and title */}
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={4}>
        {/* Back button */}
        <Button 
          variant="contained" 
          onClick={() => navigate(-1)}  // Go back to previous page
          className="back-button"
        >
          Back
        </Button>
        
        {/* Page title */}
        <Typography variant="h4" className="favorites-title">
          Your Favorite Movies
        </Typography>
        
        {/* Spacer for alignment */}
        <div style={{ width: '100px' }}></div>
      </Box>
      
      {/* Conditional rendering based on favorites */}
      {favorites.length === 0 ? (
        // Empty state message
        <Box textAlign="center" mt={4}>
          <Typography variant="body1" className="no-favorites">
            You haven't added any movies to your favorites yet.
          </Typography>
        </Box>
      ) : (
        // Grid of favorite movies
        <Grid container spacing={3} justifyContent="center">
          {favorites.map((movie) => (
            // Responsive grid item for each movie
            <Grid item key={movie.id} xs={11} sm={6} md={4} lg={3}>
              <MovieCard movie={movie} />
            </Grid>
          ))}
        </Grid>
      )}
    </Container>
  );
}

export default FavoritesPage;