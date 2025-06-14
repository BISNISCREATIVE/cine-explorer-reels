
import { Clapperboard } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useFavorites } from '@/hooks/useFavorites';
import MovieGrid from '@/components/MovieGrid';
import { Link } from 'react-router-dom';

const Favorites = () => {
  const { favorites } = useFavorites();

  if (favorites.length === 0) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-center">
          <div className="mb-8">
            <Clapperboard size={80} className="text-gray-600 mx-auto mb-4" />
            <h1 className="text-white text-3xl font-bold mb-2">Favorites</h1>
            <h2 className="text-white text-xl mb-4">Data Empty</h2>
            <p className="text-gray-400 mb-8">You don't have a favorite movie yet</p>
          </div>
          
          <Link to="/">
            <Button className="bg-red-600 hover:bg-red-700 text-white px-8 py-3 rounded-lg">
              Explore Movie
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black pt-20">
      <div className="container mx-auto px-4">
        <h1 className="text-white text-3xl font-bold mb-8">Favorites</h1>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-6">
          {favorites.map((movie) => (
            <div key={movie.id} className="group">
              <Link to={`/movie/${movie.id}`} className="block">
                <div className="relative overflow-hidden rounded-lg bg-gray-800 transition-transform duration-300 group-hover:scale-105">
                  <div className="aspect-[2/3] relative">
                    <img
                      src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                      alt={movie.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-3">
                    <h3 className="text-white font-medium text-sm mb-1 line-clamp-1">
                      {movie.title}
                    </h3>
                    <div className="flex items-center space-x-1">
                      <span className="text-yellow-500">★</span>
                      <span className="text-gray-400 text-xs">
                        {movie.vote_average.toFixed(1)}/10
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Favorites;
