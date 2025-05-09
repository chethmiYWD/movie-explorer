import React, { createContext, useState, useEffect } from 'react';

export const FavoritesContext = createContext();

const getFavoriteMovie = (movie) => ({
  id: movie.id,
  title: movie.title,
  poster_path: movie.poster_path,
  release_date: movie.release_date,
  vote_average: movie.vote_average,
});

export const FavoritesProvider = ({ children }) => {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem('favorites')) || [];
    setFavorites(stored);
  }, []);

  const addFavorite = (movie) => {
    const favoriteMovie = getFavoriteMovie(movie);
    if (!favorites.find(fav => fav.id === favoriteMovie.id)) {
      const newFavorites = [...favorites, favoriteMovie];
      setFavorites(newFavorites);
      localStorage.setItem('favorites', JSON.stringify(newFavorites));
    }
  };

  const removeFavorite = (movieId) => {
    const newFavorites = favorites.filter(fav => fav.id !== movieId);
    setFavorites(newFavorites);
    localStorage.setItem('favorites', JSON.stringify(newFavorites));
  };

  return (
    <FavoritesContext.Provider value={{ favorites, addFavorite, removeFavorite }}>
      {children}
    </FavoritesContext.Provider>
  );
};