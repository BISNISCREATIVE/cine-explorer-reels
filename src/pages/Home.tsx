
import { useEffect, useState } from 'react';
import { Movie } from '@/types/movie';
import { tmdbApi } from '@/services/tmdb';
import { Carousel, CarouselContent, CarouselItem, CarouselPrevious, CarouselNext } from '@/components/ui/carousel';
import MovieCard from '@/components/MovieCard';
import { Loader2, Play, X, Star } from 'lucide-react';

const Home = () => {
  // Trending Now
  const [trendingMovies, setTrendingMovies] = useState<Movie[]>([]);
  const [trendingLoading, setTrendingLoading] = useState(true);

  // New Release Infinite
  const [newReleaseMovies, setNewReleaseMovies] = useState<Movie[]>([]);
  const [newReleasePage, setNewReleasePage] = useState(1);
  const [newReleaseLoading, setNewReleaseLoading] = useState(true);
  const [hasMoreNewReleases, setHasMoreNewReleases] = useState(true);

  // Trailer & Video
  const [showTrailer, setShowTrailer] = useState(false);
  const [trailerVideoKey, setTrailerVideoKey] = useState<string | null>(null);
  const [trailerLoading, setTrailerLoading] = useState(false);

  // Fetch trending movies (live)
  useEffect(() => {
    const fetchTrending = async () => {
      setTrendingLoading(true);
      const res = await tmdbApi.getTrending();
      setTrendingMovies(res.results || []);
      setTrendingLoading(false);
    };
    fetchTrending();
  }, []);

  // Fetch upcoming (new release) movies with pagination
  useEffect(() => {
    const fetchUpcoming = async () => {
      setNewReleaseLoading(true);
      const data = await tmdbApi.getUpcoming(newReleasePage);
      if (!data.results || data.results.length === 0) {
        setHasMoreNewReleases(false);
      } else {
        setNewReleaseMovies(prev => [...prev, ...data.results]);
      }
      setNewReleaseLoading(false);
    };
    fetchUpcoming();
  }, [newReleasePage]);

  // Hero Movie
  const heroMovie = trendingMovies[0];

  // Handle Watch Trailer and Close Trailer
  const handleToggleTrailer = async () => {
    if (showTrailer) {
      setShowTrailer(false);
      setTrailerVideoKey(null);
      return;
    }
    if (!heroMovie) return;
    setTrailerLoading(true);
    try {
      const response = await tmdbApi.getMovieVideos(heroMovie.id);
      const trailers = response.results?.filter(
        (video: any) =>
          video.type === 'Trailer' && video.site === 'YouTube'
      );
      if (trailers && trailers.length > 0) {
        setTrailerVideoKey(trailers[0].key);
        setShowTrailer(true);
      } else {
        setTrailerVideoKey(null);
        setShowTrailer(false);
        alert('Trailer not available');
      }
    } catch {
      setTrailerVideoKey(null);
      setShowTrailer(false);
      alert('Failed to fetch trailer');
    }
    setTrailerLoading(false);
  };

  return (
    <div className="bg-black min-h-screen">
      {/* HERO SECTION */}
      <section className="relative w-full min-h-[430px] flex flex-col items-center bg-gradient-to-b from-[#181c20] to-black overflow-hidden sm:min-h-[420px]">
        {heroMovie && (
          <>
            <img
              src={tmdbApi.getImageUrl(heroMovie.backdrop_path, 'w1280')}
              alt={heroMovie.title}
              className="absolute w-full h-[300px] object-cover object-top opacity-80 sm:h-full sm:object-top"
              draggable={false}
              style={{ top: 0 }}
            />
            {/* Overlay gradient */}
            <div className="absolute inset-0 h-[300px] bg-gradient-to-b from-black/70 via-black/50 to-transparent pointer-events-none" />
            {/* Poster+Title+Desc */}
            <div className="relative z-10 flex flex-col w-full px-4 items-start pt-[210px] pb-6 sm:px-4 sm:pt-[260px]">
              <h1 className="text-white text-[26px] font-extrabold mb-2 drop-shadow md:text-3xl">{heroMovie.title}</h1>
              <p className="text-white/80 text-base mb-6 line-clamp-3 max-w-lg">{heroMovie.overview}</p>
              <div className="flex flex-col gap-3 w-full">
                {/* Watch Trailer Button */}
                <button
                  className={
                    "w-full flex items-center justify-center gap-2 bg-[#B91D12] hover:bg-[#941C10] text-white py-3 text-lg font-semibold rounded-full shadow transition-all duration-150"
                  }
                  onClick={handleToggleTrailer}
                  disabled={trailerLoading}
                  style={{ minHeight: 50 }}
                >
                  {trailerLoading ? (
                    <Loader2 size={24} className="animate-spin" />
                  ) : showTrailer ? (
                    <>
                      Close Trailer
                      <X size={24} className="ml-1" />
                    </>
                  ) : (
                    <>
                      Watch Trailer
                      <Play size={24} className="ml-1" />
                    </>
                  )}
                </button>
                {/* See Detail Button */}
                <a
                  href={`/movie/${heroMovie.id}`}
                  className="w-full flex items-center justify-center border-2 border-[#232631] bg-transparent hover:bg-[#181B23] text-white py-3 text-lg font-semibold rounded-full shadow transition-all duration-150"
                  style={{ minHeight: 50 }}
                >
                  See Detail
                </a>
              </div>
            </div>
          </>
        )}
      </section>

      {/* Trailer Player (shown below Hero Section) */}
      {showTrailer && trailerVideoKey && (
        <div className="flex justify-center bg-black py-5 px-2">
          <div className="w-full max-w-2xl aspect-video rounded-xl overflow-hidden shadow-lg border border-[#232631]">
            <iframe
              width="100%"
              height="100%"
              src={`https://www.youtube.com/embed/${trailerVideoKey}?autoplay=1&controls=1&showinfo=0&rel=0`}
              title="Official Movie Trailer"
              className="w-full h-full"
              allowFullScreen
              allow="autoplay; encrypted-media"
            />
          </div>
        </div>
      )}

      {/* TRENDING NOW CAROUSEL */}
      <section className="container mx-auto px-3 pb-6 pt-2">
        <h2 className="text-white text-xl font-bold mb-4 mt-0 md:text-2xl">Trending Now</h2>
        {trendingLoading ? (
          <div className="flex items-center justify-center h-40">
            <Loader2 className="w-8 h-8 text-white animate-spin" />
          </div>
        ) : (
          <div className="flex gap-3 overflow-x-auto scrollbar-none min-h-[278px]">
            {trendingMovies.slice(0, 10).map((movie, idx) => (
              <div key={movie.id} className="flex-shrink-0 w-[140px] relative group">
                <img
                  src={tmdbApi.getImageUrl(movie.poster_path)}
                  alt={movie.title}
                  className="rounded-2xl object-cover w-full h-[210px] bg-[#1a1a1a] group-hover:scale-105 transition"
                  style={{ minHeight: '210px' }}
                />
                {/* Rank badge */}
                <div className="absolute top-2 left-2 z-10 bg-[#131417]/80 text-white text-xs font-bold w-6 h-6 rounded-full flex items-center justify-center shadow">
                  {idx + 1}
                </div>
                <div className="mt-2">
                  <div className="text-white text-xs font-semibold leading-tight line-clamp-1 mb-0">{movie.title}</div>
                  <div className="flex items-center gap-1 mt-0.5">
                    <Star size={13} className="text-yellow-400 fill-yellow-400" />
                    <span className="text-gray-200 text-sm">{movie.vote_average.toFixed(1)}/10</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* NEW RELEASE GRID */}
      <section className="container mx-auto px-3 pb-16 pt-1">
        <h2 className="text-white text-xl font-bold mb-4 md:text-2xl">New Release</h2>
        <div className="grid grid-cols-2 gap-3">
          {newReleaseMovies.map((movie) => (
            <div key={movie.id} className="group">
              <img
                src={tmdbApi.getImageUrl(movie.poster_path)}
                alt={movie.title}
                className="rounded-2xl object-cover w-full h-[220px] bg-[#1a1a1a] group-hover:scale-105 transition"
                style={{ minHeight: '220px' }}
              />
              <div className="mt-1">
                <div className="text-white text-xs font-semibold leading-tight line-clamp-1 mb-0">{movie.title}</div>
                <div className="flex items-center gap-1 mt-0.5">
                  <Star size={13} className="text-yellow-400 fill-yellow-400" />
                  <span className="text-gray-200 text-sm">{movie.vote_average.toFixed(1)}/10</span>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="flex justify-center mt-8">
          {hasMoreNewReleases && (
            <button
              disabled={newReleaseLoading}
              className="w-full bg-transparent border-2 border-[#232631] hover:bg-[#181B23] text-white py-3 text-base font-semibold rounded-full transition min-h-[50px] mt-0"
              onClick={() => setNewReleasePage(p => p + 1)}
            >
              {newReleaseLoading ? <Loader2 className="inline w-5 h-5 animate-spin" /> : 'Load More'}
            </button>
          )}
        </div>
      </section>
    </div>
  );
};

export default Home;
