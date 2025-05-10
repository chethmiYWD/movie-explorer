import React, { useState, useEffect } from 'react';
import api from '../services/api';
import { Grid, Typography, Button } from '@mui/material';
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

  useEffect(() => {
    fetchTrendingMovies();
  }, []);

  const fetchTrendingMovies = async () => {
    try {
      const response = await api.get('/trending/movie/day');
      setTrendingMovies(response.data.results);
    } catch (err) {
      setError('Failed to fetch trending movies');
    }
  };

  const performSearch = async (query) => {
    setSearchQuery(query);
    setPage(1);
    try {
      const response = await api.get('/search/movie', {
        params: { query, page: 1 }
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
        params: { query: searchQuery, page: nextPage }
      });
      setSearchResults([...searchResults, ...response.data.results]);
      setPage(nextPage);
      setHasMore(nextPage < response.data.total_pages);
    } catch (err) {
      setError('Failed to load more results');
    }
  };

  const moviesToDisplay = searchQuery ? searchResults : trendingMovies;
  const title = searchQuery ? 'Search Results' : 'Trending Movies';

  return (
    <div className="home-container">
      <div className="search-container">
        <SearchBar onSearch={performSearch} />
      </div>
      
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