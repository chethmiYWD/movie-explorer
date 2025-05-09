import React, { useContext } from 'react';
import { FavoritesContext } from '../context/FavoritesContext';
import { Grid, Typography } from '@mui/material';
import MovieCard from '../components/MovieCard';

function FavoritesPage() {
  const { favorites } = useContext(FavoritesContext);

  return (
    <div>
      <Typography variant="h5" style={{ margin: '20px 0' }}>Favorites</Typography>
      <Grid container spacing={2}>
        {favorites.map((movie) => (
          <Grid item xs={12} sm={6} md={4} key={movie.id}>
            <MovieCard movie={movie} />
          </Grid>
        ))}
      </Grid>
    </div>
  );
}

export default FavoritesPage;