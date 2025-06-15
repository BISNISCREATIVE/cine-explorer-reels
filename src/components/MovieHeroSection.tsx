
import { Calendar, Star, Heart, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { MovieDetails } from '@/types/movie';
import { tmdbApi } from '@/services/tmdb';
import { useFavorites } from '@/hooks/useFavorites';
import PlayIcon from './PlayIcon';
import CustomFilmIcon from './CustomFilmIcon';
import CustomSmileIcon from './CustomSmileIcon';

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
      <div className="relative z-10 container mx-auto px-4 pb-6 md:pb-10 pt-20 md:pt-32">
        <div className="flex flex-col md:flex-row md:gap-8 md:items-start">
          {/* Mobile Layout */}
          <div className="md:hidden">
            <div className="flex gap-4 mb-6">
              {/* Poster - Left aligned */}
              <div className="flex-shrink-0">
                <div className="rounded-xl shadow-2xl bg-white/5 backdrop-blur-md p-1 w-32">
                  <img
                    src={tmdbApi.getImageUrl(movie.poster_path, 'w500')}
                    alt={movie.title}
                    className="w-full h-auto object-cover rounded-lg"
                  />
                </div>
              </div>

              {/* Title and Date - Right side */}
              <div className="flex-1 flex flex-col justify-end">
                <h1 className="text-white text-xl font-bold mb-2 text-left">
                  {movie.title}
                </h1>
                <div className="flex items-center gap-2 text-gray-300 mb-4">
                  <Calendar size={16} className="mr-1" />
                  <span className="text-sm">
                    {new Date(movie.release_date).toLocaleDateString('id-ID', { day: '2-digit', month: 'long', year: 'numeric' })}
                  </span>
                </div>
              </div>
            </div>

            {/* Buttons Row */}
            <div className="flex items-center gap-4 mb-6">
              {/* Watch Trailer Button */}
              <Button
                onClick={onWatchTrailer}
                disabled={!hasTrailer}
                className="flex items-center justify-between px-6 rounded-full bg-[#961200] hover:bg-[#7d1000] text-white text-base font-bold transition disabled:bg-gray-700 disabled:hover:bg-gray-700 flex-1 h-[48px] shadow-none border-none"
              >
                <span className="font-bold text-base text-white flex-1 text-left leading-none select-none">
                  {isTrailerVisible ? "Close Trailer" : "Watch Trailer"}
                </span>
                <span className="flex items-center justify-center w-5 h-5 bg-white rounded-full">
                  {isTrailerVisible ? 
                    <X size={16} color="#961200" /> 
                    : 
                    <PlayIcon size={16} style={{ color: '#961200' }} />
                  }
                </span>
              </Button>

              {/* Favorite Button */}
              <button
                aria-label={isFavorite(movie.id) ? "Remove from Favorites" : "Add to Favorites"}
                onClick={() => toggleFavorite(movie)}
                className={`w-14 h-14 flex-shrink-0 flex justify-center items-center rounded-full border border-[#181D27] bg-[rgba(10,13,18,0.60)] backdrop-blur-[20px] transition-colors hover:bg-[rgba(10,13,18,0.8)]
                  ${isFavorite(movie.id) ? "text-red-500" : "text-white"}`}
              >
                <Heart
                  size={28}
                  className={`transition-colors ${isFavorite(movie.id) ? 'fill-red-500' : ''}`}
                />
              </button>
            </div>

            {/* Info Cards - Mobile */}
            <div className="flex flex-row gap-3 mt-4">
              {/* Rating Card */}
              <div className="flex px-4 py-4 flex-col items-center gap-2 flex-1 rounded-2xl border border-[#252B37] bg-black">
                <Star className="text-yellow-400 fill-yellow-400" size={24} strokeWidth={2.2} />
                <span className="text-[#D5D7DA] text-center font-normal text-sm leading-6">
                  Rating
                </span>
                <span className="text-[#FDFDFD] text-center font-semibold text-base leading-7">
                  {movie.vote_average.toFixed(1).replace('.', ',')}/10
                </span>
              </div>

              {/* Genre Card */}
              <div className="flex px-4 py-4 flex-col items-center gap-2 flex-1 rounded-2xl border border-[#252B37] bg-black">
                <CustomFilmIcon size={24} />
                <span className="text-[#D5D7DA] text-center font-normal text-sm leading-6">
                  Genre
                </span>
                <span className="text-[#FDFDFD] text-center font-semibold text-base leading-7">
                  {movie.genres[0]?.name || 'N/A'}
                </span>
              </div>

              {/* Age Limit Card */}
              <div className="flex px-4 py-4 flex-col items-center gap-2 flex-1 rounded-2xl border border-[#252B37] bg-black">
                <CustomSmileIcon size={24} />
                <span className="text-[#D5D7DA] text-center font-normal text-sm leading-6">
                  Age Limit
                </span>
                <span className="text-[#FDFDFD] text-center font-semibold text-base leading-7">
                  13
                </span>
              </div>
            </div>
          </div>

          {/* Desktop Layout */}
          <div className="hidden md:block flex-shrink-0">
            <div className="rounded-xl shadow-2xl bg-white/5 backdrop-blur-md p-1 w-72">
              <img
                src={tmdbApi.getImageUrl(movie.poster_path, 'w500')}
                alt={movie.title}
                className="w-full h-auto object-cover rounded-lg"
              />
            </div>
          </div>

          {/* Desktop Details Column */}
          <div className="hidden md:flex flex-1 flex-col gap-6 text-left">
            {/* Title & Date */}
            <div>
              <h1 className="text-white text-4xl lg:text-5xl font-bold mb-2">
                {movie.title}
              </h1>
              <div className="flex items-center gap-2 text-gray-300">
                <Calendar size={16} className="mr-1" />
                <span className="text-base">
                  {new Date(movie.release_date).toLocaleDateString('id-ID', { day: '2-digit', month: 'long', year: 'numeric' })}
                </span>
              </div>
            </div>

            {/* Buttons */}
            <div className="flex items-center gap-4">
              {/* Watch Trailer Button */}
              <Button
                onClick={onWatchTrailer}
                disabled={!hasTrailer}
                className="flex items-center justify-between px-6 rounded-full bg-[#961200] hover:bg-[#7d1000] text-white text-base font-bold transition disabled:bg-gray-700 disabled:hover:bg-gray-700 w-[230px] h-[48px] shadow-none border-none"
              >
                <span className="font-bold text-base text-white pl-0 pr-2 flex-1 text-left leading-none select-none">
                  {isTrailerVisible ? "Close Trailer" : "Watch Trailer"}
                </span>
                <span className="flex items-center justify-center w-5 h-5 bg-white rounded-full">
                  {isTrailerVisible ? 
                    <X size={16} color="#961200" /> 
                    : 
                    <PlayIcon size={16} style={{ color: '#961200' }} />
                  }
                </span>
              </Button>

              {/* Favorite Button */}
              <button
                aria-label={isFavorite(movie.id) ? "Remove from Favorites" : "Add to Favorites"}
                onClick={() => toggleFavorite(movie)}
                className={`w-14 h-14 flex-shrink-0 flex justify-center items-center rounded-full border border-[#181D27] bg-[rgba(10,13,18,0.60)] backdrop-blur-[20px] transition-colors hover:bg-[rgba(10,13,18,0.8)]
                  ${isFavorite(movie.id) ? "text-red-500" : "text-white"}`}
              >
                <Heart
                  size={28}
                  className={`transition-colors ${isFavorite(movie.id) ? 'fill-red-500' : ''}`}
                />
              </button>
            </div>

            {/* Desktop Info Cards - Below buttons */}
            <div className="flex flex-row gap-5 max-w-lg">
              {/* Rating Card */}
              <div className="flex p-5 flex-col items-center gap-2 flex-1 rounded-2xl border border-[#252B37] bg-black">
                <Star className="text-yellow-400 fill-yellow-400" size={32} strokeWidth={2.2} />
                <span className="text-[#D5D7DA] text-center font-normal text-base leading-[30px]">
                  Rating
                </span>
                <span className="text-[#FDFDFD] text-center font-semibold text-xl leading-[34px]">
                  {movie.vote_average.toFixed(1).replace('.', ',')}/10
                </span>
              </div>

              {/* Genre Card */}
              <div className="flex p-5 flex-col items-center gap-2 flex-1 rounded-2xl border border-[#252B37] bg-black">
                <CustomFilmIcon size={32} />
                <span className="text-[#D5D7DA] text-center font-normal text-base leading-[30px]">
                  Genre
                </span>
                <span className="text-[#FDFDFD] text-center font-semibold text-xl leading-[34px]">
                  {movie.genres[0]?.name || 'N/A'}
                </span>
              </div>

              {/* Age Limit Card */}
              <div className="flex p-5 flex-col items-center gap-2 flex-1 rounded-2xl border border-[#252B37] bg-black">
                <CustomSmileIcon size={32} />
                <span className="text-[#D5D7DA] text-center font-normal text-base leading-[30px]">
                  Age Limit
                </span>
                <span className="text-[#FDFDFD] text-center font-semibold text-xl leading-[34px]">
                  13
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieHeroSection;
