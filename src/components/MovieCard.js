import React, { useContext } from 'react';
import { Card, CardMedia, CardContent, Typography, Button } from '@mui/material';
import { Link } from 'react-router-dom';
import { FavoritesContext } from '../context/FavoritesContext';
import './MovieCard.css';

// Component for displaying individual movie cards
function MovieCard({ movie }) {
  // Access favorites context for managing favorite movies
  const { favorites, addFavorite, removeFavorite } = useContext(FavoritesContext);
  
  // Check if current movie is in favorites
  const isFavorite = favorites.some(fav => fav.id === movie.id);
  
  // Get movie poster URL or use placeholder if not available
  const posterUrl = movie.poster_path 
    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
    : 'https://via.placeholder.com/500x750?text=No+Poster';
  
  // Extract release year from date or show 'N/A'
  const releaseYear = movie.release_date ? movie.release_date.split('-')[0] : 'N/A';

  return (
    // Movie card container
    <Card className="movie-card">
      {/* Link to movie details page */}
      <Link to={`/movie/${movie.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
        {/* Movie poster image */}
        <CardMedia
          className="movie-poster"
          component="img"
          image={posterUrl}
          alt={movie.title}
        />
        
        {/* Movie information section */}
        <CardContent className="movie-content">
          <Typography variant="h6" className="movie-title">{movie.title}</Typography>
          <Typography variant="body2" className="movie-info">Year: {releaseYear}</Typography>
          <Typography variant="body2" className="movie-info">Rating: {movie.vote_average}</Typography>
        </CardContent>
      </Link>
      
      {/* Favorite button that toggles based on current state */}
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