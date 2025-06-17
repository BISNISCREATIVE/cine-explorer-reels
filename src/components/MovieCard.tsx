
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Star, Heart } from 'lucide-react';
import { Movie } from '@/types/movie';
import { tmdbApi } from '@/services/tmdb';
import { useFavorites } from '@/hooks/useFavorites';

interface MovieCardProps {
  movie: Movie;
  rank?: number;
  hideFavorite?: boolean;
  compact?: boolean;
}

const MovieCard = ({ movie, rank, hideFavorite, compact }: MovieCardProps) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const { isFavorite, toggleFavorite } = useFavorites();

  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggleFavorite(movie);
  };

  return (
    <div className="relative group">
      <Link to={`/movie/${movie.id}`} className="group block hover:scale-[1.04] transition cursor-pointer">
        <div className={`flex flex-col items-start gap-3 p-0 bg-black rounded-xl overflow-hidden shadow-lg border border-[#232831] ${compact ? '' : 'h-full'}`}>
          {/* Rank badge (carousel only) */}
          {typeof rank !== 'undefined' && (
            <div className="absolute top-2 left-2 z-10 bg-[#131417]/80 text-white text-sm font-bold w-8 h-8 rounded-full flex items-center justify-center shadow">
              {rank}
            </div>
          )}

          <div className="aspect-[2/3] relative w-full">
            {!imageLoaded && (
              <div className="absolute inset-0 bg-gray-700 animate-pulse rounded-xl" />
            )}
            <img
              src={tmdbApi.getImageUrl(movie.poster_path)}
              alt={movie.title}
              className={`w-full h-full object-cover rounded-xl transition-opacity duration-300 ${imageLoaded ? 'opacity-100' : 'opacity-0'}`}
              onLoad={() => setImageLoaded(true)}
            />
          </div>

          {/* Card Content */}
          <div className="p-3 flex flex-col flex-1 items-start gap-3 w-full">
            <h3 className="text-white font-semibold text-base line-clamp-1">{movie.title}</h3>
            <div className="flex items-center gap-2">
              <Star size={16} className="text-yellow-400 fill-yellow-400" />
              <span className="text-gray-200 text-sm">{movie.vote_average.toFixed(1)}/10</span>
            </div>
          </div>
        </div>
      </Link>
      {!hideFavorite && (
        <button
          onClick={handleFavoriteClick}
          className="absolute top-4 right-4 z-20 p-2 bg-black/60 rounded-full text-white hover:bg-black/80 transition-all duration-200"
          aria-label="Toggle Favorite"
        >
          <Heart
            size={18}
            fill={isFavorite(movie.id) ? 'currentColor' : 'none'}
            className={isFavorite(movie.id) ? 'text-red-500' : 'text-white'}
          />
        </button>
      )}
    </div>
  );
};

export default MovieCard;
