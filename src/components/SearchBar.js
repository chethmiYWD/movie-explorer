import React, { useState, useEffect } from 'react';
import { TextField, Button } from '@mui/material';
import './SearchBar.css';

function SearchBar({ onSearch, initialValue }) {
  const [query, setQuery] = useState(initialValue || '');

  // Sync with parent component's searchQuery
  useEffect(() => {
    setQuery(initialValue || '');
  }, [initialValue]);

  const handleSearch = () => {
    onSearch(query);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <div className="search-bar-container">
      <TextField
        className="search-input"
        label="Search for a movie"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onKeyPress={handleKeyPress}
        fullWidth
        variant="outlined"
      />
      <Button 
        className="search-button"
        onClick={handleSearch}
        variant="contained"
      >
        Search
      </Button>
    </div>
  );
}

export default SearchBar;