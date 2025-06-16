
import { useState } from 'react';
import { Link } from "react-router-dom";
import { Star, Heart, X, Play } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useFavorites } from "@/hooks/useFavorites";
import { tmdbApi } from "@/services/tmdb";
import PlayCircleIcon from "@/components/PlayCircleIcon";

const EmptyState = () => (
  <div className="flex flex-col items-center text-center">
    <img src="/lovable-uploads/d5817bef-ac81-4d0e-9b45-4d019a2560c6.png" alt="Data Empty" className="w-32 h-32 mb-6" />
    <div className="text-white font-bold text-2xl mb-2">Data Empty</div>
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
  <div>
    {/* Mobile Layout */}
    <div className="md:hidden relative flex flex-col bg-[#181b21] rounded-2xl overflow-hidden shadow-lg p-4 border border-[#232831] w-full">
      <div className="flex gap-4 mb-4">
        <img
          src={tmdbApi.getImageUrl(movie.poster_path)}
          alt={movie.title}
          className="w-20 h-28 rounded-xl object-cover flex-shrink-0"
          draggable={false}
        />
        <div className="flex flex-col flex-1 min-w-0">
          <div className="flex items-start justify-between mb-2">
            <h3 className="text-white font-bold text-base line-clamp-2 flex-1 mr-2">
              {movie.title}
            </h3>
            <button
              onClick={() => onToggleFavorite(movie)}
              className="flex items-center justify-center w-8 h-8 rounded-full border border-[#232831] hover:bg-[#241316]/50 transition-colors flex-shrink-0"
              aria-label={isFavorite ? 'Unfavorite' : 'Favorite'}
            >
              {isFavorite ? (
                <Heart className="text-[#9A1E0C] fill-[#9A1E0C] w-4 h-4" />
              ) : (
                <Heart className="text-zinc-400 w-4 h-4" />
              )}
            </button>
          </div>
          <div className="flex items-center text-yellow-400 font-medium text-sm mb-2">
            <Star size={16} className="text-yellow-400 fill-yellow-400 mr-1" />
            <span className="text-white text-sm">{movie.vote_average.toFixed(1)}/10</span>
          </div>
          <p className="text-gray-300 text-sm line-clamp-2">
            {movie.overview}
          </p>
        </div>
      </div>
      <button
        onClick={() => onWatchTrailer(movie.id)}
        className="flex items-center justify-center rounded-full px-6 py-3 bg-[#9A1E0C] hover:bg-[#6c1308] transition-colors font-semibold text-sm text-white shadow w-full gap-2"
      >
        <span>{watchingTrailerId === movie.id ? 'Close Trailer' : 'Watch Trailer'}</span>
        {watchingTrailerId === movie.id ? (
          <X size={16} className="text-white" />
        ) : (
          <PlayCircleIcon size={24} />
        )}
      </button>
    </div>

    {/* Desktop Layout */}
    <div className="hidden md:flex relative flex-row bg-[#181b21] rounded-2xl overflow-hidden shadow-lg p-6 border border-[#232831] w-full">
      <img
        src={tmdbApi.getImageUrl(movie.poster_path)}
        alt={movie.title}
        className="w-32 h-48 rounded-xl object-cover flex-shrink-0 mr-7"
        draggable={false}
      />
      <div className="flex flex-col flex-1 min-w-0">
        <div className="flex flex-row items-center gap-5">
          <h3 className="text-white font-bold text-xl line-clamp-2">
            {movie.title}
          </h3>
          <div className="flex items-center text-yellow-400 font-medium text-sm gap-2">
            <Star size={18} className="text-yellow-400 fill-yellow-400" />
            <span className="text-white text-sm">{movie.vote_average.toFixed(1)}/10</span>
          </div>
        </div>
        <p className="text-gray-300 text-sm mt-2 mb-5 line-clamp-2">
          {movie.overview}
        </p>
        <div className="flex items-center">
          <button
            onClick={() => onWatchTrailer(movie.id)}
            className="flex items-center justify-between rounded-full px-10 py-4 bg-[#9A1E0C] hover:bg-[#6c1308] transition-colors font-semibold text-base text-white shadow min-w-[180px] gap-4"
          >
            <span className="pr-2">{watchingTrailerId === movie.id ? 'Close Trailer' : 'Watch Trailer'}</span>
            <span className="flex items-center justify-center">
              {watchingTrailerId === movie.id ? (
                <X size={20} className="text-white" />
              ) : (
                <PlayCircleIcon size={32} />
              )}
            </span>
          </button>
        </div>
      </div>
      <button
        onClick={() => onToggleFavorite(movie)}
        className="ml-auto flex items-center justify-center w-10 h-10 rounded-full border border-[#232831] hover:bg-[#241316]/50 transition-colors"
        aria-label={isFavorite ? 'Unfavorite' : 'Favorite'}
      >
        {isFavorite ? (
          <Heart className="text-[#9A1E0C] fill-[#9A1E0C] w-6 h-6" />
        ) : (
          <Heart className="text-zinc-400 w-6 h-6" />
        )}
      </button>
    </div>

    {watchingTrailerId === movie.id && movie._trailerKey && (
      <div className="w-full mt-5 animate-fadeIn">
        <div className="aspect-video rounded-xl overflow-hidden border border-[#232831] shadow-md">
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

  const moviesWithTrailer = favorites.map((movie) => ({
    ...movie,
    _trailerKey: trailerKeys[movie.id] ?? "",
  }));

  return (
    <div className="min-h-screen bg-black text-white pt-24 pb-12">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl md:text-4xl font-bold mb-8">
            Favorites
        </h1>

        {favorites.length === 0 ? (
          <div className="flex flex-col items-center justify-center text-center h-[50vh]">
            <EmptyState />
          </div>
        ) : (
          <div className="space-y-6 md:space-y-8 w-full max-w-3xl mx-auto">
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
        )}
      </div>
    </div>
  );
};

export default Favorites;
