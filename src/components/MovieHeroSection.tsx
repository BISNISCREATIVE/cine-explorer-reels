
import { Calendar, Clock, Star, Play, Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { MovieDetails } from '@/types/movie';
import { tmdbApi } from '@/services/tmdb';
import { useFavorites } from '@/hooks/useFavorites';

interface MovieHeroSectionProps {
  movie: MovieDetails;
  onWatchTrailer: () => void;
}

const MovieHeroSection = ({ movie, onWatchTrailer }: MovieHeroSectionProps) => {
  const { isFavorite, toggleFavorite } = useFavorites();

  return (
    <div className="relative min-h-screen overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url(${tmdbApi.getImageUrl(movie.backdrop_path, 'original')})`,
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
      
      <div className="relative min-h-screen flex items-center pt-20 pb-12">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row items-start gap-8">
            {/* Poster */}
            <div className="flex-shrink-0 mx-auto lg:mx-0">
              <img
                src={tmdbApi.getImageUrl(movie.poster_path, 'w500')}
                alt={movie.title}
                className="w-48 h-72 md:w-64 md:h-96 object-cover rounded-lg shadow-2xl"
              />
            </div>

            {/* Movie Info */}
            <div className="flex-1 max-w-2xl text-center lg:text-left">
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
                {movie.title}
              </h1>
              
              <div className="flex items-center justify-center lg:justify-start space-x-4 text-gray-300 mb-6">
                <div className="flex items-center space-x-1">
                  <Calendar size={16} />
                  <span>{new Date(movie.release_date).getFullYear()}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Clock size={16} />
                  <span>{movie.runtime} min</span>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 mb-8 justify-center lg:justify-start">
                <Button 
                  onClick={onWatchTrailer}
                  className="bg-red-600 hover:bg-red-700 text-white px-8 py-3 rounded-lg flex items-center justify-center space-x-2"
                >
                  <Play size={20} className="fill-white" />
                  <span>Watch Trailer</span>
                </Button>
                
                <Button
                  variant="ghost"
                  onClick={() => toggleFavorite(movie)}
                  className="text-white hover:bg-white/10 px-4 py-3 rounded-lg flex items-center justify-center space-x-2"
                >
                  <Heart
                    size={24}
                    className={`transition-colors ${
                      isFavorite(movie.id) ? 'text-red-500 fill-red-500' : 'text-white'
                    }`}
                  />
                  <span className="hidden sm:inline">
                    {isFavorite(movie.id) ? 'Remove from Favorites' : 'Add to Favorites'}
                  </span>
                </Button>
              </div>

              {/* Rating and Genre */}
              <div className="grid grid-cols-3 gap-4 mb-8">
                <div className="bg-black/50 p-4 rounded-lg text-center">
                  <Star className="text-yellow-500 fill-yellow-500 mx-auto mb-2" size={24} />
                  <div className="text-white font-semibold">{movie.vote_average.toFixed(1)}/10</div>
                  <div className="text-gray-400 text-sm">Rating</div>
                </div>
                <div className="bg-black/50 p-4 rounded-lg text-center">
                  <div className="text-white font-semibold">{movie.genres[0]?.name || 'N/A'}</div>
                  <div className="text-gray-400 text-sm">Genre</div>
                </div>
                <div className="bg-black/50 p-4 rounded-lg text-center">
                  <div className="text-white font-semibold">13</div>
                  <div className="text-gray-400 text-sm">Age Limit</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieHeroSection;
