import React, { createContext, useState, useEffect } from 'react';

// Create the Favorites context
export const FavoritesContext = createContext();

// Helper function to extract only needed movie properties
const getFavoriteMovie = (movie) => ({
  id: movie.id,
  title: movie.title,
  poster_path: movie.poster_path,
  release_date: movie.release_date,
  vote_average: movie.vote_average,
});

// Context provider component
export const FavoritesProvider = ({ children }) => {
  // State for storing favorite movies
  const [favorites, setFavorites] = useState([]);

  // Load favorites from localStorage on initial render
  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem('favorites')) || [];
    setFavorites(stored);
  }, []);

  // Add a movie to favorites
  const addFavorite = (movie) => {
    const favoriteMovie = getFavoriteMovie(movie);
    // Check if movie isn't already a favorite
    if (!favorites.find(fav => fav.id === favoriteMovie.id)) {
      const newFavorites = [...favorites, favoriteMovie];
      setFavorites(newFavorites);
      // Persist to localStorage
      localStorage.setItem('favorites', JSON.stringify(newFavorites));
    }
  };

  // Remove a movie from favorites
  const removeFavorite = (movieId) => {
    const newFavorites = favorites.filter(fav => fav.id !== movieId);
    setFavorites(newFavorites);
    // Update localStorage
    localStorage.setItem('favorites', JSON.stringify(newFavorites));
  };

  // Provide the context value to children
  return (
    <FavoritesContext.Provider 
      value={{ 
        favorites, 
        addFavorite, 
        removeFavorite 
      }}
    >
      {children}
    </FavoritesContext.Provider>
  );
};