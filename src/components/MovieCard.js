import React, { useContext } from 'react';
import { Card, CardMedia, CardContent, Typography, Button } from '@mui/material';
import { Link } from 'react-router-dom';
import { FavoritesContext } from '../context/FavoritesContext';
import './MovieCard.css';

function MovieCard({ movie }) {
  const { favorites, addFavorite, removeFavorite } = useContext(FavoritesContext);
  const isFavorite = favorites.some(fav => fav.id === movie.id);
  const posterUrl = movie.poster_path 
    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
    : 'https://via.placeholder.com/500x750?text=No+Poster';
  const releaseYear = movie.release_date ? movie.release_date.split('-')[0] : 'N/A';

  return (
    <Card className="movie-card">
      <Link to={`/movie/${movie.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
        <CardMedia
          className="movie-poster"
          component="img"
          image={posterUrl}
          alt={movie.title}
        />
        <CardContent className="movie-content">
          <Typography variant="h6" className="movie-title">{movie.title}</Typography>
          <Typography variant="body2" className="movie-info">Year: {releaseYear}</Typography>
          <Typography variant="body2" className="movie-info">Rating: {movie.vote_average}</Typography>
        </CardContent>
      </Link>
      <Button 
        className="favorite-button"
        onClick={() => isFavorite ? removeFavorite(movie.id) : addFavorite(movie)}
        fullWidth
        variant="contained"
      >
        {isFavorite ? 'Remove from Favorites' : 'Add to Favorites'}
      </Button>
    </Card>
  );
}

export default MovieCard;