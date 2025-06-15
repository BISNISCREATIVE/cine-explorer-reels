
import { useEffect, useState } from 'react';
import { Movie } from '@/types/movie';
import { tmdbApi } from '@/services/tmdb';
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
    <div className="bg-black min-h-screen flex flex-col">
      {/* HERO SECTION */}
      <section className="relative w-full h-[480px] flex flex-col justify-end items-start bg-gradient-to-b from-[#181c20] to-black overflow-hidden">
        {heroMovie && (
          <>
            <img
              src={tmdbApi.getImageUrl(heroMovie.backdrop_path, 'w1280')}
              alt={heroMovie.title}
              className="absolute w-full h-full object-cover object-top opacity-75"
              draggable={false}
              style={{ zIndex: 0 }}
            />
            {/* Overlay dark gradient */}
            <div className="absolute inset-0 h-full bg-gradient-to-b from-black/75 via-black/50 to-black/90 pointer-events-none" />
            {/* Hero Content */}
            <div className="relative z-10 flex flex-col px-14 pt-0 pb-[64px] h-full justify-center max-w-3xl">
              <div className="mb-6">
                <h1 className="text-white text-4xl font-extrabold leading-tight drop-shadow-lg mb-4">{heroMovie.title}</h1>
                <p className="text-white/85 text-base font-normal mb-6 max-w-2xl drop-shadow-lg">{heroMovie.overview}</p>
                <div className="flex gap-5">
                  {/* Watch Trailer Button */}
                  <button
                    className="flex items-center justify-center gap-2 bg-[#B91D12] hover:bg-[#941C10] text-white py-3 px-7 text-lg font-semibold rounded-full shadow transition-all duration-150 min-w-[160px]"
                    onClick={handleToggleTrailer}
                    disabled={trailerLoading}
                  >
                    {trailerLoading ? (
                      <Loader2 size={22} className="animate-spin" />
                    ) : showTrailer ? (
                      <>
                        Close Trailer
                        <X size={22} className="ml-1" />
                      </>
                    ) : (
                      <>
                        Watch Trailer
                        <Play size={22} className="ml-1" />
                      </>
                    )}
                  </button>
                  <a
                    href={`/movie/${heroMovie.id}`}
                    className="flex items-center justify-center px-7 py-3 bg-white/10 border border-white/30 hover:bg-white/15 text-white text-lg font-semibold rounded-full transition-all duration-150 min-w-[140px]"
                  >
                    See Detail
                  </a>
                </div>
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

      <main className="flex-1">
        {/* TRENDING NOW CAROUSEL */}
        <section className="container mx-auto px-10 pb-8 pt-10 max-w-7xl">
          <h2 className="text-white text-2xl font-extrabold mb-6 mt-0 drop-shadow">Trending Now</h2>
          {trendingLoading ? (
            <div className="flex items-center justify-center h-44">
              <Loader2 className="w-8 h-8 text-white animate-spin" />
            </div>
          ) : (
            <div className="flex gap-7 overflow-x-auto min-h-[290px] pb-2 scrollbar-thin scrollbar-thumb-white/20 scrollbar-track-transparent">
              {trendingMovies.slice(0, 10).map((movie, idx) => (
                <div
                  key={movie.id}
                  className="flex-shrink-0 w-[185px] group relative cursor-pointer hover:scale-105 transition-transform"
                >
                  <img
                    src={tmdbApi.getImageUrl(movie.poster_path)}
                    alt={movie.title}
                    className="rounded-2xl object-cover w-full h-[255px] bg-[#1a1a1a] shadow-md"
                    style={{ minHeight: '255px' }}
                  />
                  {/* Rank badge */}
                  <div className="absolute top-2 left-2 bg-black/75 text-white text-xs font-bold w-8 h-8 rounded-full flex items-center justify-center shadow-lg border-2 border-black/40">
                    {idx + 1}
                  </div>
                  <div className="mt-3">
                    <div className="text-white text-base font-semibold leading-tight line-clamp-1 mb-0">
                      {movie.title}
                    </div>
                    <div className="flex items-center gap-1 mt-1">
                      <Star size={15} className="text-yellow-400 fill-yellow-400" />
                      <span className="text-gray-200 text-sm">{movie.vote_average.toFixed(1)}/10</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>

        {/* NEW RELEASE GRID */}
        <section className="container mx-auto px-10 pb-20 pt-6 max-w-7xl">
          <h2 className="text-white text-2xl font-extrabold mb-6 mt-0 drop-shadow">New Release</h2>
          <div className="grid grid-cols-6 gap-x-7 gap-y-7">
            {newReleaseMovies.map((movie) => (
              <div
                key={movie.id}
                className="group cursor-pointer hover:scale-105 transition-transform"
              >
                <img
                  src={tmdbApi.getImageUrl(movie.poster_path)}
                  alt={movie.title}
                  className="rounded-2xl object-cover w-full h-[255px] bg-[#1a1a1a] shadow-md"
                  style={{ minHeight: '255px' }}
                />
                <div className="mt-3">
                  <div className="text-white text-base font-semibold leading-tight line-clamp-1 mb-0">{movie.title}</div>
                  <div className="flex items-center gap-1 mt-1">
                    <Star size={15} className="text-yellow-400 fill-yellow-400" />
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
                className="w-fit px-8 bg-white/10 border-2 border-[#232631] hover:bg-white/15 text-white py-3 text-base font-semibold rounded-full shadow transition min-h-[50px] mt-0"
                onClick={() => setNewReleasePage((p) => p + 1)}
              >
                {newReleaseLoading ? <Loader2 className="inline w-5 h-5 animate-spin" /> : 'Load More'}
              </button>
            )}
          </div>
        </section>
      </main>
    </div>
  );
};

export default Home;

