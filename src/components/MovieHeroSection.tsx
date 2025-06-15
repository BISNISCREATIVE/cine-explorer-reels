
import { Calendar, Star, Heart, Film, User, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { MovieDetails } from '@/types/movie';
import { tmdbApi } from '@/services/tmdb';
import { useFavorites } from '@/hooks/useFavorites';
import PlayIcon from './PlayIcon';

interface MovieHeroSectionProps {
  movie: MovieDetails;
  onWatchTrailer: () => void;
  hasTrailer?: boolean;
  isTrailerVisible?: boolean;
}

const MovieHeroSection = ({ movie, onWatchTrailer, hasTrailer, isTrailerVisible }: MovieHeroSectionProps) => {
  const { isFavorite, toggleFavorite } = useFavorites();

  return (
    <div className="relative min-h-screen overflow-hidden flex flex-col justify-end">
      {/* Background */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url(${tmdbApi.getImageUrl(movie.backdrop_path, 'original')})`,
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
      
      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 pb-10 pt-32 flex flex-col">
        <div className="flex flex-col md:flex-row gap-10 md:items-end">
          {/* Poster */}
          <div className="flex-shrink-0 mx-auto md:mx-0 mb-6 md:mb-0">
            <div className="rounded-xl shadow-2xl bg-white/5 backdrop-blur-md p-1 w-60 md:w-72">
              <img
                src={tmdbApi.getImageUrl(movie.poster_path, 'w500')}
                alt={movie.title}
                className="w-full h-[315px] md:h-[410px] object-cover rounded-lg"
              />
            </div>
          </div>
          {/* Movie Info */}
          <div className="flex-1 max-w-3xl flex flex-col gap-4">
            <h1 className="text-white text-3xl md:text-4xl lg:text-5xl font-bold mb-1">
              {movie.title}
            </h1>
            <div className="flex items-center gap-2 mb-3 text-gray-300">
              <Calendar size={18} className="mr-1" />
              <span className="text-base">
                {new Date(movie.release_date).toLocaleDateString('id-ID', { day: '2-digit', month: 'long', year: 'numeric' })}
              </span>
            </div>
            <div className="flex items-center gap-3 mb-6">
              <Button 
                onClick={onWatchTrailer}
                disabled={!hasTrailer}
                className="bg-red-600 hover:bg-red-700 text-white px-7 py-2 text-base font-semibold rounded-lg shadow transition disabled:bg-gray-700 disabled:hover:bg-gray-700"
              >
                {isTrailerVisible ? (
                  <>
                    <X size={18} className="mr-2" /> Close Trailer
                  </>
                ) : (
                  <>
                    <PlayIcon size={18} className="mr-2" /> Watch Trailer
                  </>
                )}
              </Button>
              <button
                aria-label={isFavorite(movie.id) ? "Remove from Favorites" : "Add to Favorites"}
                onClick={() => toggleFavorite(movie)}
                className={`ml-2 w-11 h-11 rounded-full flex items-center justify-center bg-white/10 hover:bg-white/20 border border-white/20 shadow transition-colors
                  ${isFavorite(movie.id) ? "text-red-500" : "text-white"}`}
              >
                <Heart
                  size={24}
                  className={`transition-colors ${isFavorite(movie.id) ? 'fill-red-500' : ''}`}
                />
              </button>
            </div>
            {/* Info Card */}
            <div className="flex flex-col sm:flex-row gap-3 mt-2">
              <div className="flex-1 flex flex-col items-center rounded-xl bg-black/60 border border-white/10 p-5 shadow">
                <Star className="text-yellow-400 fill-yellow-400 mb-2" size={28} />
                <span className="text-white font-bold text-xl">{movie.vote_average.toFixed(1).replace('.', ',')}/10</span>
                <span className="text-gray-300 mt-2 text-sm">Rating</span>
              </div>
              <div className="flex-1 flex flex-col items-center rounded-xl bg-black/60 border border-white/10 p-5 shadow">
                <Film className="text-white mb-2" size={28} />
                <span className="text-white font-bold text-xl">{movie.genres[0]?.name || 'N/A'}</span>
                <span className="text-gray-300 mt-2 text-sm">Genre</span>
              </div>
              <div className="flex-1 flex flex-col items-center rounded-xl bg-black/60 border border-white/10 p-5 shadow">
                <User className="text-white mb-2" size={28} />
                <span className="text-white font-bold text-xl">13</span>
                <span className="text-gray-300 mt-2 text-sm">Age Limit</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieHeroSection;
