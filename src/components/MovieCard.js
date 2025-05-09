import React, { useContext } from 'react';
import { Card, CardMedia, CardContent, Typography, Button } from '@mui/material';
import { Link } from 'react-router-dom';
import { FavoritesContext } from '../context/FavoritesContext';

function MovieCard({ movie }) {
  const { favorites, addFavorite, removeFavorite } = useContext(FavoritesContext);
  const isFavorite = favorites.some(fav => fav.id === movie.id);
  const posterUrl = `https://image.tmdb.org/t/p/w500${movie.poster_path}`;
  const releaseYear = movie.release_date ? movie.release_date.split('-')[0] : 'N/A';

  return (
    <Card>
      <Link to={`/movie/${movie.id}`} style={{ textDecoration: 'none' }}>
        <CardMedia
          component="img"
          height="300"
          image={posterUrl}
          alt={movie.title}
        />
        <CardContent>
          <Typography variant="h6">{movie.title}</Typography>
          <Typography variant="body2">Year: {releaseYear}</Typography>
          <Typography variant="body2">Rating: {movie.vote_average}</Typography>
        </CardContent>
      </Link>
      <Button onClick={() => isFavorite ? removeFavorite(movie.id) : addFavorite(movie)}>
        {isFavorite ? 'Remove from Favorites' : 'Add to Favorites'}
      </Button>
    </Card>
  );
}

export default MovieCard;