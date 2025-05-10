import React, { useState, useEffect, useCallback, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../services/api';
import { Container, Typography, CircularProgress, Button, Box, Chip } from '@mui/material';
import { FavoritesContext } from '../context/FavoritesContext';
import './MovieDetailsPage.css';

// Movie details page component showing comprehensive movie information
function MovieDetailsPage() {
  // Hooks for routing and state management
  const { id } = useParams(); // Get movie ID from URL
  const navigate = useNavigate(); // For navigation
  const [movie, setMovie] = useState(null); // Movie data state
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(null); // Error state
  const { favorites, addFavorite, removeFavorite } = useContext(FavoritesContext); // Favorites context

  // Fetch movie details with credits and videos
  const fetchMovieDetails = useCallback(async () => {
    try {
      const response = await api.get(`/movie/${id}?append_to_response=credits,videos`);
      setMovie(response.data);
      setLoading(false);
    } catch (err) {
      setError('Failed to fetch movie details');
      setLoading(false);
    }
  }, [id]);

  // Fetch data on component mount
  useEffect(() => {
    fetchMovieDetails();
  }, [fetchMovieDetails]);

  // Loading state UI
  if (loading) {
    return (
      <Box display="flex" justifyContent="center" mt={4}>
        <CircularProgress />
      </Box>
    );
  }

  // Error state UI
  if (error) {
    return <Typography color="error" className="error-message">{error}</Typography>;
  }

  // Check if movie is in favorites
  const isFavorite = favorites.some(fav => fav.id === movie.id);
  // Extract release year or show 'N/A'
  const releaseYear = movie.release_date ? new Date(movie.release_date).getFullYear() : 'N/A';

  return (
    <Container maxWidth="lg" className="movie-details-container">
      {/* Back button */}
      <Button 
        onClick={() => navigate(-1)}
        className="back-button"
        variant="contained"
      >
        Back
      </Button>

      {/* Main content - responsive layout (column on mobile, row on desktop) */}
      <Box display="flex" flexDirection={{ xs: 'column', md: 'row' }} gap={4} mt={2}>
        {/* Movie poster section */}
        <Box flex={1} className="poster-container">
          <img 
            src={movie.poster_path 
              ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
              : '/placeholder-movie.png'}
            alt={movie.title}
            className="movie-poster"
          />
        </Box>
        
        {/* Movie details section */}
        <Box flex={2} className="details-container">
          {/* Movie title with release year */}
          <Typography variant="h3" className="movie-title" gutterBottom>
            {movie.title} <span className="release-year">({releaseYear})</span>
          </Typography>
          
          {/* Genre chips */}
          <Box display="flex" gap={1} mb={2}>
            {movie.genres?.map(genre => (
              <Chip key={genre.id} label={genre.name} className="genre-chip" />
            ))}
          </Box>
          
          {/* Rating and runtime chips */}
          <Box className="rating-runtime">
            <Chip 
              label={`⭐ ${movie.vote_average.toFixed(1)}/10`} 
              className="rating-chip"
            />
            <Chip 
              label={`⏱ ${movie.runtime} min`} 
              className="runtime-chip"
            />
          </Box>
          
          {/* Movie overview */}
          <Typography variant="h6" mt={3} mb={1}>Overview</Typography>
          <Typography variant="body1" className="movie-overview">
            {movie.overview || 'No overview available.'}
          </Typography>
          
          {/* Favorite button - toggles based on current state */}
          <Button 
            className="favorite-button"
            onClick={() => isFavorite ? removeFavorite(movie.id) : addFavorite(movie)}
            variant="contained"
            sx={{ mt: 3 }}
          >
            {isFavorite ? 'Remove from Favorites' : 'Add to Favorites'}
          </Button>
        </Box>
      </Box>

      {/* Cast section - only shown if cast exists */}
      {movie.credits?.cast?.length > 0 && (
        <Box mt={6} className="cast-section">
          <Typography variant="h4" className="section-heading">Cast</Typography>
          <Box className="cast-grid">
            {movie.credits.cast.slice(0, 10).map(actor => (
              <Box key={actor.id} className="cast-card">
                <img 
                  src={actor.profile_path 
                    ? `https://image.tmdb.org/t/p/w200${actor.profile_path}`
                    : '/placeholder-actor.png'}
                  alt={actor.name}
                  className="actor-image"
                />
                <Box className="actor-info">
                  <Typography variant="subtitle1" className="actor-name">
                    {actor.name}
                  </Typography>
                  <Typography variant="body2" className="actor-character">
                    {actor.character}
                  </Typography>
                </Box>
              </Box>
            ))}
          </Box>
        </Box>
      )}

      {/* Trailers section - only shown if YouTube trailers exist */}
      {movie.videos?.results?.filter(v => v.site === 'YouTube').length > 0 && (
        <Box mt={6} className="trailers-section">
          <Typography variant="h4" className="section-heading">Trailers</Typography>
          <Box className="trailers-grid">
            {movie.videos.results
              .filter(v => v.site === 'YouTube')
              .map(video => (
                <Box key={video.id} className="trailer-card">
                  <iframe
                    src={`https://www.youtube.com/embed/${video.key}`}
                    title={video.name}
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="trailer-iframe"
                  ></iframe>
                  <Typography variant="subtitle1" className="trailer-title">
                    {video.name}
                  </Typography>
                </Box>
              ))}
          </Box>
        </Box>
      )}
    </Container>
  );
}

export default MovieDetailsPage;