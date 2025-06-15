
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
    <Link to={`/movie/${movie.id}`} className="group block hover:scale-[1.025] transition">
      <div className="relative overflow-hidden rounded-xl bg-[#171B22] shadow-lg border border-[#232831]">
        {/* Rank badge if needed */}
        {rank && (
          <div className="absolute top-3 left-3 z-10 bg-[#1C2027] text-white text-base font-bold w-9 h-9 rounded-full flex items-center justify-center shadow">
            {rank}
          </div>
        )}

        {/* Favorite button */}
        <button
          onClick={handleFavoriteClick}
          className="absolute top-3 right-3 z-10 p-2 bg-[#232831] rounded-full hover:bg-red-600 transition-colors"
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
            className={`w-full h-full object-cover rounded-t-xl transition-opacity duration-300 ${
              imageLoaded ? 'opacity-100' : 'opacity-0'
            }`}
            onLoad={() => setImageLoaded(true)}
          />
        </div>

        {/* Card Content */}
        <div className="p-4 flex flex-col flex-1">
          <h3 className="text-white font-bold text-lg mb-1 line-clamp-1">{movie.title}</h3>
          <div className="flex items-center gap-2 mb-1">
            <Star size={14} className="text-yellow-400 fill-yellow-400" />
            <span className="text-gray-400 text-xs">
              {movie.vote_average.toFixed(1)}/10
            </span>
          </div>
          <div className="text-gray-400 text-xs">{movie.release_date?.slice(0, 4)}</div>
        </div>
      </div>
    </Link>
  );
};

export default MovieCard;
