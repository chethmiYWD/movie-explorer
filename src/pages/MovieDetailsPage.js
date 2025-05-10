import React, { useState, useEffect, useCallback, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../services/api';
import { Container, Typography, CircularProgress, Button, Box, Chip } from '@mui/material';
import { FavoritesContext } from '../context/FavoritesContext';
import './MovieDetailsPage.css';

function MovieDetailsPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { favorites, addFavorite, removeFavorite } = useContext(FavoritesContext);

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

  useEffect(() => {
    fetchMovieDetails();
  }, [fetchMovieDetails]);

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" mt={4}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return <Typography color="error" className="error-message">{error}</Typography>;
  }

  const isFavorite = favorites.some(fav => fav.id === movie.id);
  const releaseYear = movie.release_date ? new Date(movie.release_date).getFullYear() : 'N/A';

  return (
    <Container maxWidth="lg" className="movie-details-container">
      <Button 
        onClick={() => navigate(-1)}
        className="back-button"
        variant="contained"
      >
        Back
      </Button>

      <Box display="flex" flexDirection={{ xs: 'column', md: 'row' }} gap={4} mt={2}>
        <Box flex={1} className="poster-container">
          <img 
            src={movie.poster_path 
              ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
              : '/placeholder-movie.png'}
            alt={movie.title}
            className="movie-poster"
          />
        </Box>
        
        <Box flex={2} className="details-container">
          <Typography variant="h3" className="movie-title" gutterBottom>
            {movie.title} <span className="release-year">({releaseYear})</span>
          </Typography>
          
          <Box display="flex" gap={1} mb={2}>
            {movie.genres?.map(genre => (
              <Chip key={genre.id} label={genre.name} className="genre-chip" />
            ))}
          </Box>
          
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
          
          <Typography variant="h6" mt={3} mb={1}>Overview</Typography>
          <Typography variant="body1" className="movie-overview">
            {movie.overview || 'No overview available.'}
          </Typography>
          
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