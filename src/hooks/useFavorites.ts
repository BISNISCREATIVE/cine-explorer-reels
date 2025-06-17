
import { useState, useEffect } from 'react';
import { Movie } from '@/types/movie';
import { useGlobalToast } from '@/App';

export const useFavorites = () => {
  const [favorites, setFavorites] = useState<Movie[]>([]);
  const { showToast } = useGlobalToast();

  useEffect(() => {
    const stored = localStorage.getItem('movie-favorites');
    if (stored) {
      setFavorites(JSON.parse(stored));
    }
  }, []);

  const addToFavorites = (movie: Movie) => {
    const newFavorites = [...favorites, movie];
    setFavorites(newFavorites);
    localStorage.setItem('movie-favorites', JSON.stringify(newFavorites));
    
    showToast('Success Add to Favorites');
  };

  const removeFromFavorites = (movieId: number) => {
    const movie = favorites.find(fav => fav.id === movieId);
    const newFavorites = favorites.filter(movie => movie.id !== movieId);
    setFavorites(newFavorites);
    localStorage.setItem('movie-favorites', JSON.stringify(newFavorites));
    
    if (movie) {
      showToast('Removed from Favorites');
    }
  };

  const isFavorite = (movieId: number) => {
    return favorites.some(movie => movie.id === movieId);
  };

  const toggleFavorite = (movie: Movie) => {
    if (isFavorite(movie.id)) {
      removeFromFavorites(movie.id);
    } else {
      addToFavorites(movie);
    }
  };

  return {
    favorites,
    addToFavorites,
    removeFromFavorites,
    isFavorite,
    toggleFavorite,
  };
};
