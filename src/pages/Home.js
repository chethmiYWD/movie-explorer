import React, { useState, useEffect } from 'react';
import api from '../services/api';
import { Grid, Typography, Button, Box, FormControl, InputLabel, Select, MenuItem, Slider } from '@mui/material';
import SearchBar from '../components/SearchBar';
import MovieCard from '../components/MovieCard';
import InfiniteScroll from 'react-infinite-scroll-component';
import './Home.css';

function Home() {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(false);
  const [trendingMovies, setTrendingMovies] = useState([]);
  const [error, setError] = useState(null);
  const [genres, setGenres] = useState([]);
  const [selectedGenre, setSelectedGenre] = useState('');
  const [yearRange, setYearRange] = useState([1990, new Date().getFullYear()]);
  const [ratingRange, setRatingRange] = useState([0, 10]);

  useEffect(() => {
    fetchTrendingMovies();
    fetchGenres();
  }, []);

  const fetchTrendingMovies = async () => {
    try {
      const response = await api.get('/trending/movie/day');
      setTrendingMovies(response.data.results);
    } catch (err) {
      setError('Failed to fetch trending movies');
    }
  };

  const fetchGenres = async () => {
    try {
      const response = await api.get('/genre/movie/list');
      setGenres(response.data.genres);
    } catch (err) {
      console.error('Failed to fetch genres', err);
    }
  };

  const performSearch = async (query) => {
    setSearchQuery(query);
    setPage(1);
    try {
      const response = await api.get('/search/movie', {
        params: { 
          query, 
          page: 1,
          with_genres: selectedGenre,
          primary_release_date: {
            gte: `${yearRange[0]}-01-01`,
            lte: `${yearRange[1]}-12-31`
          },
          'vote_average.gte': ratingRange[0],
          'vote_average.lte': ratingRange[1]
        }
      });
      setSearchResults(response.data.results);
      setHasMore(response.data.page < response.data.total_pages);
    } catch (err) {
      setError('Failed to perform search');
    }
  };

  const loadMore = async () => {
    const nextPage = page + 1;
    try {
      const response = await api.get('/search/movie', {
        params: { 
          query: searchQuery, 
          page: nextPage,
          with_genres: selectedGenre,
          primary_release_date: {
            gte: `${yearRange[0]}-01-01`,
            lte: `${yearRange[1]}-12-31`
          },
          'vote_average.gte': ratingRange[0],
          'vote_average.lte': ratingRange[1]
        }
      });
      setSearchResults([...searchResults, ...response.data.results]);
      setPage(nextPage);
      setHasMore(nextPage < response.data.total_pages);
    } catch (err) {
      setError('Failed to load more results');
    }
  };

  const handleGenreChange = (event) => {
    setSelectedGenre(event.target.value);
  };

  const handleYearChange = (event, newValue) => {
    setYearRange(newValue);
  };

  const handleRatingChange = (event, newValue) => {
    setRatingRange(newValue);
  };

  const applyFilters = () => {
    if (searchQuery) {
      performSearch(searchQuery);
    } else {
      // Apply filters to trending movies client-side
      const filtered = trendingMovies.filter(movie => {
        const matchesGenre = !selectedGenre || movie.genre_ids.includes(Number(selectedGenre));
        const releaseYear = movie.release_date ? new Date(movie.release_date).getFullYear() : 0;
        const matchesYear = releaseYear >= yearRange[0] && releaseYear <= yearRange[1];
        const matchesRating = movie.vote_average >= ratingRange[0] && movie.vote_average <= ratingRange[1];
        return matchesGenre && matchesYear && matchesRating;
      });
      setSearchResults(filtered);
    }
  };

  const resetFilters = () => {
    setSelectedGenre('');
    setYearRange([1990, new Date().getFullYear()]);
    setRatingRange([0, 10]);
    setSearchQuery(''); // Reset search query
    setSearchResults([]); // Clear search results
    fetchTrendingMovies(); // Reload trending movies
  };

  const moviesToDisplay = searchQuery || searchResults.length > 0 ? searchResults : trendingMovies;
  const title = searchQuery ? 'Search Results' : 'Trending Movies';

  return (
    <div className="home-container">
      <div className="search-container">
        <SearchBar onSearch={performSearch} initialValue={searchQuery} />
      </div>
      
      <Box className="filters-container">
        <Typography variant="h6" gutterBottom>Filters</Typography>
        
        <Box display="flex" flexWrap="wrap" gap={3} mb={3}>
          <FormControl sx={{ minWidth: 200 }}>
            <InputLabel>Genre</InputLabel>
            <Select
              value={selectedGenre}
              onChange={handleGenreChange}
              label="Genre"
            >
              <MenuItem value="">All Genres</MenuItem>
              {genres.map(genre => (
                <MenuItem key={genre.id} value={genre.id}>
                  {genre.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <Box sx={{ width: 300 }}>
            <Typography gutterBottom>Release Year: {yearRange[0]} - {yearRange[1]}</Typography>
            <Slider
              value={yearRange}
              onChange={handleYearChange}
              min={1900}
              max={new Date().getFullYear()}
              valueLabelDisplay="auto"
            />
          </Box>

          <Box sx={{ width: 300 }}>
            <Typography gutterBottom>Rating: {ratingRange[0]} - {ratingRange[1]}</Typography>
            <Slider
              value={ratingRange}
              onChange={handleRatingChange}
              min={0}
              max={10}
              step={0.5}
              valueLabelDisplay="auto"
            />
          </Box>
        </Box>

        <Box display="flex" gap={2}>
          <Button 
            variant="contained" 
            onClick={applyFilters}
            className="apply-filters-button"
          >
            Apply Filters
          </Button>
          <Button 
            variant="outlined" 
            onClick={resetFilters}
            className="reset-filters-button"
          >
            Reset
          </Button>
        </Box>
      </Box>
      
      {error && <Typography className="error-message">{error}</Typography>}
      
      <Typography variant="h5" className="section-title">{title}</Typography>
      
      <InfiniteScroll
        dataLength={moviesToDisplay.length}
        next={loadMore}
        hasMore={searchQuery ? hasMore : false}
        loader={<h4>Loading...</h4>}
        endMessage={
          <p style={{ textAlign: 'center' }}>
            <b>{searchQuery ? 'No more results' : 'End of trending movies'}</b>
          </p>
        }
      >
        <Grid container spacing={3}>
          {moviesToDisplay.map((movie) => (
            <Grid item xs={12} sm={6} md={4} key={movie.id}>
              <MovieCard movie={movie} />
            </Grid>
          ))}
        </Grid>
      </InfiniteScroll>

      {hasMore && (
        <div className="load-more-container">
          <Button className="load-more-button" onClick={loadMore} variant="contained">
            Load More
          </Button>
        </div>
      )}
    </div>
  );
}

export default Home;