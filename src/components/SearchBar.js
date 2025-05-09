import React, { useState } from 'react';
import { TextField, Button } from '@mui/material';

function SearchBar({ onSearch }) {
  const [query, setQuery] = useState('');

  const handleSearch = () => {
    onSearch(query);
  };

  return (
    <div>
      <TextField
        label="Search for a movie"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <Button onClick={handleSearch}>Search</Button>
    </div>
  );
}

export default SearchBar;