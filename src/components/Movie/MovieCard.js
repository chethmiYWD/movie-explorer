import React from 'react';
import { Card, CardMedia, CardContent, Typography, Button } from '@mui/material';
import { Link } from 'react-router-dom';

const MovieCard = ({ movie }) => {
    return (
      <Card sx={{ maxWidth: 345, m: 2 }}>
        <CardMedia
          component="img"
          height="400"
          image={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
          alt={movie.title}
        />
        <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {movie.title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {movie.release_date} | Rating: {movie.vote_average}
        </Typography>
        <Button
          component={Link}
          to={`/movie/${movie.id}`}
          variant="contained"
          sx={{ mt: 2 }}
        >
          Details
        </Button>
        </CardContent>
    </Card>
  );
};

export default MovieCard;

