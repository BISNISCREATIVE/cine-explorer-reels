
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Star, Heart } from 'lucide-react';
import { Movie } from '@/types/movie';
import { tmdbApi } from '@/services/tmdb';
import { useFavorites } from '@/hooks/useFavorites';

interface MovieCardProps {
  movie: Movie;
  rank?: number;
}

const MovieCard = ({ movie, rank }: MovieCardProps) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const { isFavorite, toggleFavorite } = useFavorites();

  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggleFavorite(movie);
  };

  return (
    <Link to={`/movie/${movie.id}`} className="group block">
      <div className="relative overflow-hidden rounded-lg bg-gray-800 transition-transform duration-300 group-hover:scale-105">
        {rank && (
          <div className="absolute top-2 left-2 z-10 bg-black/80 text-white text-lg font-bold w-8 h-8 rounded-full flex items-center justify-center">
            {rank}
          </div>
        )}
        
        <button
          onClick={handleFavoriteClick}
          className="absolute top-2 right-2 z-10 p-2 bg-black/60 rounded-full transition-colors hover:bg-black/80"
        >
          <Heart
            size={20}
            className={`transition-colors ${
              isFavorite(movie.id) ? 'text-red-500 fill-red-500' : 'text-white'
            }`}
          />
        </button>

        <div className="aspect-[2/3] relative">
          {!imageLoaded && (
            <div className="absolute inset-0 bg-gray-700 animate-pulse" />
          )}
          <img
            src={tmdbApi.getImageUrl(movie.poster_path)}
            alt={movie.title}
            className={`w-full h-full object-cover transition-opacity duration-300 ${
              imageLoaded ? 'opacity-100' : 'opacity-0'
            }`}
            onLoad={() => setImageLoaded(true)}
          />
        </div>

        <div className="p-3">
          <h3 className="text-white font-medium text-sm mb-1 line-clamp-1">
            {movie.title}
          </h3>
          <div className="flex items-center space-x-2">
            <div className="flex items-center space-x-1">
              <Star size={12} className="text-yellow-500 fill-yellow-500" />
              <span className="text-gray-400 text-xs">
                {movie.vote_average.toFixed(1)}/10
              </span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default MovieCard;
