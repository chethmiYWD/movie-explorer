import React, { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import api from '../services/api';
import { Container, Typography, CircularProgress, Button } from '@mui/material';
import { FavoritesContext } from '../context/FavoritesContext';

function MovieDetailsPage() {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { favorites, addFavorite, removeFavorite } = useContext(FavoritesContext);

  useEffect(() => {
    fetchMovieDetails();
  }, [fetchMovieDetails]);

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

  if (loading) {
    return <CircularProgress />;
  }

  if (error) {
    return <Typography color="error">{error}</Typography>;
  }

  const isFavorite = favorites.some(fav => fav.id === movie.id);

  return (
    <Container>
      <Typography variant="h4">{movie.title}</Typography>
      <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.title} />
      <Typography variant="body1">{movie.overview}</Typography>
      <Typography variant="body2">Genres: {movie.genres.map(g => g.name).join(', ')}</Typography>
      <Typography variant="body2">Release Date: {movie.release_date}</Typography>
      <Typography variant="body2">Rating: {movie.vote_average}</Typography>
      {movie.credits && movie.credits.cast && (
        <div>
          <Typography variant="h6">Cast</Typography>
          <ul>
            {movie.credits.cast.slice(0, 5).map(actor => (
              <li key={actor.id}>{actor.name} as {actor.character}</li>
            ))}
          </ul>
        </div>
      )}
      {movie.videos && movie.videos.results.length > 0 && (
        <div>
          <Typography variant="h6">Trailers</Typography>
          {movie.videos.results.map(video => (
            <div key={video.id}>
              <a href={`https://www.youtube.com/watch?v=${video.key}`} target="_blank" rel="noopener noreferrer">
                {video.name}
              </a>
            </div>
          ))}
        </div>
      )}
      <Button onClick={() => isFavorite ? removeFavorite(movie.id) : addFavorite(movie)}>
        {isFavorite ? 'Remove from Favorites' : 'Add to Favorites'}
      </Button>
    </Container>
  );
}

export default MovieDetailsPage;