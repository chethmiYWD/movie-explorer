import React, { useContext } from 'react';
import { FavoritesContext } from '../context/FavoritesContext';
import { Grid, Typography, Box, Button, Container } from '@mui/material';
import MovieCard from '../components/MovieCard';
import { useNavigate } from 'react-router-dom';
import './FavoritesPage.css';

function FavoritesPage() {
  const { favorites } = useContext(FavoritesContext);
  const navigate = useNavigate();

  return (
    <Container maxWidth="lg" className="favorites-container">
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={4}>
        <Button 
          variant="contained" 
          onClick={() => navigate(-1)}
          className="back-button"
        >
          Back
        </Button>
        <Typography variant="h4" className="favorites-title">
          Your Favorite Movies
        </Typography>
        <div style={{ width: '100px' }}></div> {/* Spacer for alignment */}
      </Box>
      
      {favorites.length === 0 ? (
        <Box textAlign="center" mt={4}>
          <Typography variant="body1" className="no-favorites">
            You haven't added any movies to your favorites yet.
          </Typography>
        </Box>
      ) : (
        <Grid container spacing={3} justifyContent="center">
          {favorites.map((movie) => (
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