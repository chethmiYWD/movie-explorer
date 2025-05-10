import React, { useState, useEffect } from 'react';
import { TextField, Button } from '@mui/material';
import './SearchBar.css';

// SearchBar component for movie search functionality
function SearchBar({ onSearch, initialValue }) {
  // State for the search query input
  const [query, setQuery] = useState(initialValue || '');

  // Effect to sync with parent component's search query
  useEffect(() => {
    setQuery(initialValue || '');
  }, [initialValue]);

  // Handler for search button click
  const handleSearch = () => {
    onSearch(query); // Call parent's search function
  };

  // Handler for Enter key press in input field
  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearch(); // Trigger search on Enter key
    }
  };

  return (
    <div className="search-bar-container">
      {/* Search input field */}
      <TextField
        className="search-input"
        label="Search for a movie"
        value={query}
        onChange={(e) => setQuery(e.target.value)} // Update query state
        onKeyPress={handleKeyPress} // Listen for Enter key
        fullWidth
        variant="outlined"
      />
      
      {/* Search button */}
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