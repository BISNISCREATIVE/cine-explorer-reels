
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
        <div 
          className="relative overflow-hidden shadow-lg border border-[#232831]"
          style={{
            width: '216px',
            height: '321px',
            borderRadius: '12px',
            background: `url(${tmdbApi.getImageUrl(movie.poster_path)}) lightgray 50% / cover no-repeat`
          }}
        >
          {/* Rank badge (carousel only) */}
          {typeof rank !== 'undefined' && (
            <div className="absolute top-2 left-2 z-10 bg-[#131417]/80 text-white text-sm font-bold w-8 h-8 rounded-full flex items-center justify-center shadow">
              {rank}
            </div>
          )}

          {/* Loading state */}
          {!imageLoaded && (
            <div className="absolute inset-0 bg-gray-700 animate-pulse" style={{ borderRadius: '12px' }} />
          )}

          {/* Hidden image for loading detection */}
          <img
            src={tmdbApi.getImageUrl(movie.poster_path)}
            alt={movie.title}
            className="absolute inset-0 w-full h-full object-cover opacity-0"
            onLoad={() => setImageLoaded(true)}
          />

          {/* Card Content Overlay */}
          <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black/80 to-transparent">
            <h3 className="text-white font-semibold text-base line-clamp-1 mb-2">{movie.title}</h3>
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
