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
      <div className="relative z-10 container mx-auto px-4 pb-10 pt-32">
        <div className="md:flex md:flex-row md:gap-8 md:items-end">
          {/* Poster */}
          <div className="flex-shrink-0 mx-auto md:mx-0">
            <div className="rounded-xl shadow-2xl bg-white/5 backdrop-blur-md p-1 w-48 md:w-72">
              <img
                src={tmdbApi.getImageUrl(movie.poster_path, 'w500')}
                alt={movie.title}
                className="w-full h-auto object-cover rounded-lg"
              />
            </div>
          </div>

          {/* Details Column */}
          <div className="flex-1 flex flex-col gap-4 mt-6 md:mt-0 text-center md:text-left">
            {/* Title & Date */}
            <div>
              <h1 className="text-white text-3xl md:text-4xl lg:text-5xl font-bold">
                {movie.title}
              </h1>
              <div className="flex items-center justify-center md:justify-start gap-2 text-gray-300 mt-2">
                <Calendar size={16} className="mr-1" />
                <span className="text-sm md:text-base">
                  {new Date(movie.release_date).toLocaleDateString('id-ID', { day: '2-digit', month: 'long', year: 'numeric' })}
                </span>
              </div>
            </div>

            {/* Buttons */}
            <div
              className="
                flex flex-row items-center justify-center md:justify-start gap-4 
                w-full
              "
            >
              {/* Watch Trailer Button */}
              <Button
                onClick={onWatchTrailer}
                disabled={!hasTrailer}
                className="
                  flex items-center justify-between
                  px-6
                  rounded-full
                  bg-[#961200] hover:bg-[#7d1000] text-white text-base font-bold transition
                  disabled:bg-gray-700 disabled:hover:bg-gray-700
                  w-[230px] h-[48px] min-w-[230px] min-h-[48px] max-w-[230px] max-h-[48px]
                  shadow-none border-none
                "
                style={{
                  display: 'flex',
                  width: 230,
                  height: 48,
                  paddingLeft: 24,
                  paddingRight: 18,
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  gap: 8,
                  borderRadius: 9999,
                  background: '#961200',
                  boxShadow: 'none',
                  border: 'none'
                }}
              >
                <span className="font-bold text-base text-white pl-0 pr-2 flex-1 text-left leading-none select-none">
                  {isTrailerVisible ? "Close Trailer" : "Watch Trailer"}
                </span>
                <span
                  className="flex items-center justify-center"
                  style={{
                    width: 20,
                    height: 20,
                    padding: 0,
                    justifyContent: 'center',
                    alignItems: 'center',
                    flexShrink: 0,
                    aspectRatio: '1 / 1',
                    borderRadius: 9999,
                    background: 'white',
                  }}
                >
                  {isTrailerVisible ? 
                    <X size={16} color="#961200" style={{marginLeft: 0, marginRight: 0}} /> 
                    : 
                    <PlayIcon size={16} style={{ color: '#961200', marginLeft: 0, marginRight: 0 }} />
                  }
                </span>
              </Button>

              {/* Favorite Button */}
              <button
                aria-label={isFavorite(movie.id) ? "Remove from Favorites" : "Add to Favorites"}
                onClick={() => toggleFavorite(movie)}
                className={`w-14 h-14 flex-shrink-0 flex justify-center items-center rounded-full border border-[#181D27] bg-[rgba(10,13,18,0.60)] backdrop-blur-[20px] transition-colors hover:bg-[rgba(10,13,18,0.8)]
                  ${isFavorite(movie.id) ? "text-red-500" : "text-white"}`}
                style={{
                  marginLeft: '0',
                }}
              >
                <Heart
                  size={28}
                  className={`transition-colors ${isFavorite(movie.id) ? 'fill-red-500' : ''}`}
                />
              </button>
            </div>

            {/* Info Card */}
            {/* Layout Flex style: align center, gap 20px, no border-radius */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 20,
                alignSelf: 'stretch',
                padding: 0,
              }}
              className="mt-4"
            >
              {/* Rating Card */}
              <div className="flex-1 flex flex-col items-center bg-black border border-[#181D27] p-6 min-w-0" style={{ borderRadius: 0 }}>
                <Star className="text-yellow-400 fill-yellow-400 mb-3" size={32} strokeWidth={2.2} />
                <span className="text-gray-300 text-lg mb-2 font-normal">Rating</span>
                <span className="text-white font-extrabold text-2xl md:text-3xl tracking-tight">{movie.vote_average.toFixed(1).replace('.', ',')}/10</span>
              </div>
              {/* Genre Card */}
              <div className="flex-1 flex flex-col items-center bg-black border border-[#181D27] p-6 min-w-0" style={{ borderRadius: 0 }}>
                <CustomFilmIcon className="mb-3" size={32} />
                <span className="text-gray-300 text-lg mb-2 font-normal">Genre</span>
                <span className="text-white font-extrabold text-2xl md:text-3xl tracking-tight">{movie.genres[0]?.name || 'N/A'}</span>
              </div>
              {/* Age Limit Card */}
              <div className="flex-1 flex flex-col items-center bg-black border border-[#181D27] p-6 min-w-0" style={{ borderRadius: 0 }}>
                <CustomSmileIcon className="mb-3" size={32} />
                <span className="text-gray-300 text-lg mb-2 font-normal">Age Limit</span>
                <span className="text-white font-extrabold text-2xl md:text-3xl tracking-tight">13</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieHeroSection;
