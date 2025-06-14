
import { useState, useEffect } from 'react';
import { Play, Info, Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Movie } from '@/types/movie';
import { tmdbApi } from '@/services/tmdb';
import { useFavorites } from '@/hooks/useFavorites';
import { Link } from 'react-router-dom';

const HeroSection = () => {
  const [featuredMovie, setFeaturedMovie] = useState<Movie | null>(null);
  const [loading, setLoading] = useState(true);
  const { isFavorite, toggleFavorite } = useFavorites();

  useEffect(() => {
    const fetchFeaturedMovie = async () => {
      try {
        const response = await tmdbApi.getTrending();
        if (response.results && response.results.length > 0) {
          setFeaturedMovie(response.results[0]);
        }
      } catch (error) {
        console.error('Error fetching featured movie:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchFeaturedMovie();
  }, []);

  if (loading) {
    return (
      <div className="relative h-screen bg-gray-900 animate-pulse">
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
      </div>
    );
  }

  if (!featuredMovie) {
    return null;
  }

  return (
    <div className="relative h-screen overflow-hidden">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url(${tmdbApi.getImageUrl(featuredMovie.backdrop_path, 'original')})`,
        }}
      />
      
      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
      
      {/* Content */}
      <div className="relative h-full flex items-center">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl">
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">
              {featuredMovie.title}
            </h1>
            <p className="text-gray-300 text-lg mb-8 line-clamp-3">
              {featuredMovie.overview}
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 mb-8">
              <Button className="bg-red-600 hover:bg-red-700 text-white px-8 py-3 rounded-lg flex items-center space-x-2">
                <Play size={20} className="fill-white" />
                <span>Watch Trailer</span>
              </Button>
              
              <Link to={`/movie/${featuredMovie.id}`}>
                <Button variant="outline" className="border-white text-white hover:bg-white hover:text-black px-8 py-3 rounded-lg flex items-center space-x-2">
                  <Info size={20} />
                  <span>See Detail</span>
                </Button>
              </Link>
              
              <Button
                variant="ghost"
                onClick={() => toggleFavorite(featuredMovie)}
                className="text-white hover:bg-white/10 px-4 py-3 rounded-lg"
              >
                <Heart
                  size={24}
                  className={`transition-colors ${
                    isFavorite(featuredMovie.id) ? 'text-red-500 fill-red-500' : 'text-white'
                  }`}
                />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
