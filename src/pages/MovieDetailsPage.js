import React, { useState, useEffect, useCallback, useContext } from 'react';
import { useParams } from 'react-router-dom';
import api from '../services/api';
import { Container, Typography, CircularProgress, Button, Box, Paper } from '@mui/material';
import { FavoritesContext } from '../context/FavoritesContext';
import './MovieDetailsPage.css';

function MovieDetailsPage() {
  const { id } = useParams();
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

  return (
    <Container className="movie-details-container">
      <Box display="flex" flexDirection={{ xs: 'column', md: 'row' }} gap={4}>
        <Box flex={1}>
          <img 
            src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} 
            alt={movie.title}
            className="movie-poster"
          />
        </Box>
        
        <Box flex={2}>
          <Typography variant="h3" className="movie-title" gutterBottom>
            {movie.title}
          </Typography>
          
          <Typography variant="body1" className="movie-overview">
            {movie.overview}
          </Typography>
          
          <Box mt={3} className="movie-info">
            <Typography variant="body2"><strong>Genres:</strong> {movie.genres.map(g => g.name).join(', ')}</Typography>
            <Typography variant="body2"><strong>Release Date:</strong> {movie.release_date}</Typography>
            <Typography variant="body2"><strong>Rating:</strong> {movie.vote_average}/10</Typography>
            <Typography variant="body2"><strong>Runtime:</strong> {movie.runtime} minutes</Typography>
          </Box>
          
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
        <Box mt={4}>
          <Typography variant="h5" className="section-heading">Cast</Typography>
          <ul className="cast-list">
            {movie.credits.cast.slice(0, 10).map(actor => (
              <li key={actor.id} className="cast-item">
                <strong>{actor.name}</strong> as {actor.character}
              </li>
            ))}
          </ul>
        </Box>
      )}

      {movie.videos?.results?.length > 0 && (
        <Box mt={4}>
          <Typography variant="h5" className="section-heading">Trailers</Typography>
          {movie.videos.results.filter(v => v.site === 'YouTube').map(video => (
            <a 
              key={video.id}
              href={`https://www.youtube.com/watch?v=${video.key}`}
              target="_blank"
              rel="noopener noreferrer"
              className="trailer-link"
            >
              {video.name}
            </a>
          ))}
        </Box>
      )}
    </Container>
  );
}

export default MovieDetailsPage;