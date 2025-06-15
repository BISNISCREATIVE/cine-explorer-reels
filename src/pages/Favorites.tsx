import { useState } from 'react';
import { Link } from "react-router-dom";
import { Play, Star, Heart, Clapperboard, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useFavorites } from "@/hooks/useFavorites";
import { tmdbApi } from "@/services/tmdb";

const EmptyState = () => (
  <div className="flex flex-col items-center pt-16">
    <Clapperboard size={96} strokeWidth={1.5} className="text-zinc-500 mb-6" />
    <div className="text-white font-bold text-xl mb-1">Data Empty</div>
    <div className="text-gray-400 mb-6">You don't have a favorite movie yet</div>
    <Link to="/">
      <Button
        className="bg-[#9A1E0C] hover:bg-[#6c1308] px-10 py-4 text-base rounded-full font-semibold transition-colors duration-150"
        style={{ minWidth: 180 }}
      >
        Explore Movie
      </Button>
    </Link>
  </div>
);

const getTrailerKey = async (movieId: number): Promise<string|null> => {
  try {
    const res = await tmdbApi.getMovieVideos(movieId);
    const trailers = (res.results || []).filter(
      (vid: any) => vid.type === "Trailer" && vid.site === "YouTube"
    );
    return trailers.length > 0 ? trailers[0].key : null;
  } catch {
    return null;
  }
};

const FavoriteMovieCard = ({
  movie,
  isFavorite,
  onToggleFavorite,
  onWatchTrailer,
  watchingTrailerId,
}: any) => (
  <div className="relative flex flex-col md:flex-row bg-[#181b21] rounded-2xl overflow-hidden shadow-lg p-4 md:p-6 mb-8 border border-[#232831] w-full">
    <img
      src={tmdbApi.getImageUrl(movie.poster_path)}
      alt={movie.title}
      className="w-32 h-48 rounded-xl object-cover flex-shrink-0 mb-3 md:mb-0 md:mr-7"
      style={{ minWidth: 128, minHeight: 192 }}
      draggable={false}
    />
    <div className="flex flex-col flex-1 min-w-0">
      <div className="flex flex-col md:flex-row md:items-center md:gap-5">
        <h3 className="text-white font-bold text-lg md:text-xl mb-2 md:mb-0 line-clamp-2">
          {movie.title}
        </h3>
        <div className="flex items-center text-yellow-400 font-medium text-sm mt-1 md:mt-0 gap-2 ml-0 md:ml-0">
          <Star size={18} className="text-yellow-400 fill-yellow-400" />
          <span className="text-white text-sm">{movie.vote_average.toFixed(1)}/10</span>
        </div>
      </div>
      <p className="text-gray-300 text-sm mt-2 mb-5 line-clamp-2 md:line-clamp-2">
        {movie.overview}
      </p>
      <div className="flex items-center">
        <Button
          onClick={() => onWatchTrailer(movie.id)}
          className="bg-[#9A1E0C] hover:bg-[#6c1308] px-7 py-3 text-base rounded-full font-semibold transition-colors gap-2 flex items-center"
          style={{ minWidth: 180 }}
        >
          {watchingTrailerId === movie.id ? 'Close Trailer' : 'Watch Trailer'}{' '}
          {watchingTrailerId === movie.id ? <X className="w-5 h-5" /> : <Play className="w-5 h-5" />}
        </Button>
      </div>
      {watchingTrailerId === movie.id && movie._trailerKey && (
        <div className="w-full mt-5 animate-fadeIn">
          <div className="aspect-video rounded-xl overflow-hidden border border-[#232831] shadow-md mb-2">
            <iframe
              width="100%"
              height="100%"
              src={`https://www.youtube.com/embed/${movie._trailerKey}?autoplay=1&controls=1&showinfo=0&rel=0`}
              title={`Trailer ${movie.title}`}
              className="w-full h-full"
              allowFullScreen
              allow="autoplay; encrypted-media"
            />
          </div>
        </div>
      )}
    </div>
    {/* Favorite icon button */}
    <button
      onClick={() => onToggleFavorite(movie)}
      className="absolute top-4 right-4 md:static ml-auto flex items-center justify-center w-10 h-10 rounded-full border border-[#232831] hover:bg-[#241316]/50 transition-colors"
      aria-label={isFavorite ? 'Unfavorite' : 'Favorite'}
    >
      {isFavorite ? (
        <Heart className="text-[#9A1E0C] fill-[#9A1E0C] w-6 h-6" />
      ) : (
        <Heart className="text-zinc-400 w-6 h-6" />
      )}
    </button>
  </div>
);

const Favorites = () => {
  const { favorites, isFavorite, toggleFavorite } = useFavorites();
  const [watchingTrailerId, setWatchingTrailerId] = useState<number | null>(null);
  const [loadingTrailerId, setLoadingTrailerId] = useState<number | null>(null);
  const [trailerKeys, setTrailerKeys] = useState<Record<number, string>>({});

  const handleWatchTrailer = async (movieId: number) => {
    if (watchingTrailerId === movieId) {
      setWatchingTrailerId(null);
      return;
    }
    
    if (loadingTrailerId) return;
    setLoadingTrailerId(movieId);
    if (!trailerKeys[movieId]) {
      const key = await getTrailerKey(movieId);
      setTrailerKeys((prev) => ({ ...prev, [movieId]: key || "" }));
      setLoadingTrailerId(null);
      setWatchingTrailerId(key ? movieId : null);
    } else {
      setLoadingTrailerId(null);
      setWatchingTrailerId(trailerKeys[movieId] ? movieId : null);
    }
  };

  // Attach trailer key to each movie if available
  const moviesWithTrailer = favorites.map((movie) => ({
    ...movie,
    _trailerKey: trailerKeys[movie.id] ?? "",
  }));

  if (favorites.length === 0) {
    return (
      <div className="min-h-screen bg-black flex flex-col justify-between">
        <main className="flex-1 flex flex-col justify-center items-center">
          <h1 className="text-white text-3xl md:text-4xl font-bold mb-8 mt-16 md:mt-24 text-center">
            Favorites
          </h1>
          <EmptyState />
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black flex flex-col justify-between">
      <main className="flex-1 w-full pb-2">
        <div className="container mx-auto px-4 py-12">
          <h1 className="text-white text-3xl md:text-4xl font-bold mb-8">Favorites</h1>
          <div className="space-y-8 w-full max-w-3xl mx-auto">
            {moviesWithTrailer.map((movie) => (
              <FavoriteMovieCard
                key={movie.id}
                movie={movie}
                isFavorite={isFavorite(movie.id)}
                onToggleFavorite={toggleFavorite}
                onWatchTrailer={handleWatchTrailer}
                watchingTrailerId={watchingTrailerId}
              />
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Favorites;
