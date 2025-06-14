
import { useState, useEffect } from 'react';
import { Movie } from '@/types/movie';
import { useToast } from '@/hooks/use-toast';

export const useFavorites = () => {
  const [favorites, setFavorites] = useState<Movie[]>([]);
  const { toast } = useToast();

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
    
    toast({
      title: "Success Add to Favorites",
      description: `${movie.title} has been added to your favorites.`,
      duration: 3000,
    });
  };

  const removeFromFavorites = (movieId: number) => {
    const movie = favorites.find(fav => fav.id === movieId);
    const newFavorites = favorites.filter(movie => movie.id !== movieId);
    setFavorites(newFavorites);
    localStorage.setItem('movie-favorites', JSON.stringify(newFavorites));
    
    if (movie) {
      toast({
        title: "Removed from Favorites",
        description: `${movie.title} has been removed from your favorites.`,
        duration: 3000,
      });
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
