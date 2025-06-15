
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
      <div className="relative z-10 container mx-auto px-4 pb-10 pt-32 flex flex-col gap-6">
        {/* Poster + Title/Date */}
        <div className="flex flex-row gap-4 items-end">
          {/* Poster */}
          <div className="flex-shrink-0">
            <div className="rounded-xl shadow-2xl bg-white/5 backdrop-blur-md p-1 w-32 md:w-72">
              <img
                src={tmdbApi.getImageUrl(movie.poster_path, 'w500')}
                alt={movie.title}
                className="w-full h-auto object-cover rounded-lg"
              />
            </div>
          </div>
          {/* Movie Title and Date */}
          <div className="flex-1 flex flex-col gap-2">
            <h1 className="text-white text-2xl md:text-4xl lg:text-5xl font-bold">
              {movie.title}
            </h1>
            <div className="flex items-center gap-2 text-gray-300">
              <Calendar size={16} className="mr-1" />
              <span className="text-sm md:text-base">
                {new Date(movie.release_date).toLocaleDateString('id-ID', { day: '2-digit', month: 'long', year: 'numeric' })}
              </span>
            </div>
          </div>
        </div>

        {/* Buttons */}
        <div className="flex items-center gap-3">
          <Button 
            onClick={onWatchTrailer}
            disabled={!hasTrailer}
            className="flex-1 h-11 p-2 flex justify-center items-center gap-2 rounded-full bg-[#961200] hover:bg-[#7d1000] text-white text-base font-semibold shadow transition disabled:bg-gray-700 disabled:hover:bg-gray-700"
          >
            {isTrailerVisible ? (
              <>
                Close Trailer <X size={18} className="ml-2" />
              </>
            ) : (
              <>
                Watch Trailer <PlayIcon size={18} className="ml-2" />
              </>
            )}
          </Button>
          <button
            aria-label={isFavorite(movie.id) ? "Remove from Favorites" : "Add to Favorites"}
            onClick={() => toggleFavorite(movie)}
            className={`w-11 h-11 p-2 flex justify-center items-center gap-2 aspect-square rounded-full border border-[#181D27] bg-[rgba(10,13,18,0.60)] backdrop-blur-[20px] transition-colors hover:bg-[rgba(10,13,18,0.8)]
              ${isFavorite(movie.id) ? "text-red-500" : "text-white"}`}
          >
            <Heart
              size={24}
              className={`transition-colors ${isFavorite(movie.id) ? 'fill-red-500' : ''}`}
            />
          </button>
        </div>

        {/* Info Card */}
        <div className="flex flex-row gap-3">
          <div className="flex-1 flex flex-col items-center rounded-xl bg-black/60 border border-white/10 p-3 md:p-5 shadow">
            <Star className="text-yellow-400 fill-yellow-400 mb-2" size={24} />
            <span className="text-white font-bold text-lg md:text-xl">{movie.vote_average.toFixed(1).replace('.', ',')}/10</span>
            <span className="text-gray-300 mt-1 md:mt-2 text-xs md:text-sm">Rating</span>
          </div>
          <div className="flex-1 flex flex-col items-center rounded-xl bg-black/60 border border-white/10 p-3 md:p-5 shadow">
            <Film className="text-white mb-2" size={24} />
            <span className="text-white font-bold text-lg md:text-xl">{movie.genres[0]?.name || 'N/A'}</span>
            <span className="text-gray-300 mt-1 md:mt-2 text-xs md:text-sm">Genre</span>
          </div>
          <div className="flex-1 flex flex-col items-center rounded-xl bg-black/60 border border-white/10 p-3 md:p-5 shadow">
            <User className="text-white mb-2" size={24} />
            <span className="text-white font-bold text-lg md:text-xl">13</span>
            <span className="text-gray-300 mt-1 md:mt-2 text-xs md:text-sm">Age Limit</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieHeroSection;
