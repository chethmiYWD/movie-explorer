import React, { useState } from 'react';
import { TextField, Button } from '@mui/material';
import './SearchBar.css';

function SearchBar({ onSearch }) {
  const [query, setQuery] = useState('');

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