
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Play, Calendar, Star, Clock, Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { MovieDetails, Credits } from '@/types/movie';
import { tmdbApi } from '@/services/tmdb';
import { useFavorites } from '@/hooks/useFavorites';
import WatchTrailer from '@/components/WatchTrailer';

const MovieDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [movie, setMovie] = useState<MovieDetails | null>(null);
  const [credits, setCredits] = useState<Credits | null>(null);
  const [loading, setLoading] = useState(true);
  const [showTrailer, setShowTrailer] = useState(false);
  const { isFavorite, toggleFavorite } = useFavorites();

  useEffect(() => {
    const fetchMovieData = async () => {
      if (!id) return;

      try {
        const [movieResponse, creditsResponse] = await Promise.all([
          tmdbApi.getMovieDetails(parseInt(id)),
          tmdbApi.getMovieCredits(parseInt(id)),
        ]);

        setMovie(movieResponse);
        setCredits(creditsResponse);
      } catch (error) {
        console.error('Error fetching movie data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchMovieData();
  }, [id]);

  const handleWatchTrailer = () => {
    setShowTrailer(true);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-white text-xl">Loading...</div>
      </div>
    );
  }

  if (!movie) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-white text-xl">Movie not found</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black">
      {/* Hero Section */}
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
                    onClick={handleWatchTrailer}
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

      {/* Trailer Component */}
      {id && (
        <WatchTrailer 
          movieId={parseInt(id)} 
          movieTitle={movie.title}
          onTrailerClick={() => setShowTrailer(true)}
        />
      )}

      {/* Content Sections */}
      <div className="container mx-auto px-4 py-12">
        <div className="space-y-12">
          {/* Overview */}
          <section>
            <h2 className="text-white text-2xl font-bold mb-4">Overview</h2>
            <p className="text-gray-300 text-lg leading-relaxed">{movie.overview}</p>
          </section>

          {/* Cast & Crew */}
          {credits && (
            <section>
              <h2 className="text-white text-2xl font-bold mb-6">Cast & Crew</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {credits.cast.slice(0, 6).map((actor) => (
                  <div key={actor.id} className="flex items-center space-x-4 bg-gray-900/50 p-4 rounded-lg">
                    <div className="w-16 h-16 rounded-full overflow-hidden bg-gray-700 flex-shrink-0">
                      {actor.profile_path ? (
                        <img
                          src={tmdbApi.getImageUrl(actor.profile_path, 'w185')}
                          alt={actor.name}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full bg-gray-600 flex items-center justify-center">
                          <span className="text-gray-400 text-xs">N/A</span>
                        </div>
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="text-white font-medium text-base truncate">{actor.name}</h3>
                      <p className="text-gray-400 text-sm truncate">{actor.character}</p>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>
      </div>
    </div>
  );
};

export default MovieDetail;
