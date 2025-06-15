import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Movie } from '@/types/movie';
import { tmdbApi } from '@/services/tmdb';
import { Loader2, Play, X, Star } from 'lucide-react';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
} from '@/components/ui/carousel';
import MovieCard from '@/components/MovieCard';

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
        setNewReleaseMovies(prev => {
          const existingIds = new Set(prev.map(m => m.id));
          const newMovies = data.results.filter((m: Movie) => !existingIds.has(m.id));
          return [...prev, ...newMovies];
        });
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
      <section className="relative w-full min-h-[430px] md:h-[550px] flex flex-col justify-end items-start bg-gradient-to-b from-[#181c20] to-black overflow-hidden">
        {heroMovie && (
          <>
            <img
              src={tmdbApi.getImageUrl(heroMovie.backdrop_path, 'w1280')}
              alt={heroMovie.title}
              className="absolute z-0 w-full h-full object-cover object-top opacity-75"
              draggable={false}
              style={{ zIndex: 0 }}
            />
            {/* Overlay dark gradient */}
            <div className="absolute inset-0 h-full bg-gradient-to-b from-black/80 via-black/60 to-black/95 pointer-events-none z-10" />
            {/* Hero Content */}
            <div className="relative z-20 flex flex-col justify-center h-full px-5 pt-12 pb-7 md:px-16 md:pb-[72px] md:pt-0 max-w-full w-full md:max-w-3xl">
              <div className="mb-5 md:mb-6">
                <h1 className="text-white text-[2rem] md:text-5xl font-extrabold leading-tight drop-shadow-lg mb-4">{heroMovie.title}</h1>
                <p className="text-white/85 text-base md:text-lg mb-6 max-w-2xl drop-shadow-lg font-normal">{heroMovie.overview}</p>
                <div className="flex flex-col md:flex-row gap-3 md:gap-6">
                  {/* Watch Trailer Button */}
                  <button
                    className="flex items-center justify-center gap-2 bg-[#B91D12] hover:bg-[#941C10] text-white py-3 text-base md:text-lg font-semibold rounded-full md:min-w-[160px] min-w-0 w-full md:w-auto px-0 md:px-7 transition-all duration-150 shadow"
                    style={{ maxWidth: 360 }}
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
                    className="flex items-center justify-center bg-white/10 border border-white/30 hover:bg-white/15 text-white text-base md:text-lg font-semibold rounded-full px-0 md:px-7 w-full md:w-auto py-3 md:min-w-[140px] transition-all duration-150"
                    style={{ maxWidth: 360 }}
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
        <section className="container max-w-[1200px] mx-auto px-4 pb-8 pt-8 md:px-10 md:pt-12">
          <h2 className="text-white text-2xl md:text-4xl font-extrabold mb-7 md:mb-10 drop-shadow text-center md:text-left">
            Trending Now
          </h2>
          {trendingLoading ? (
            <div className="flex items-center justify-center h-44">
              <Loader2 className="w-8 h-8 text-white animate-spin" />
            </div>
          ) : (
            <div className="relative">
              <Carousel
                className="w-full"
                opts={{
                  align: 'start',
                  containScroll: 'trimSnaps',
                }}
              >
                <CarouselContent>
                  {trendingMovies.slice(0, 10).map((movie, idx) => (
                    <CarouselItem
                      key={movie.id}
                      className="max-w-[210px] md:max-w-[215px] min-w-[180px] md:min-w-[215px] px-1 pb-2"
                    >
                      <MovieCard movie={movie} rank={idx + 1} />
                    </CarouselItem>
                  ))}
                </CarouselContent>
                {/* Panah Carousel */}
                <div className="hidden md:block">
                  <CarouselPrevious className="-left-9 bg-[#18181c] border-none shadow-lg text-white" />
                  <CarouselNext className="-right-9 bg-[#18181c] border-none shadow-lg text-white" />
                </div>
              </Carousel>
            </div>
          )}
        </section>

        {/* NEW RELEASE GRID */}
        <section className="container max-w-[1200px] mx-auto px-4 pb-16 md:px-10 md:pb-24 pt-4 md:pt-6">
          <h2 className="text-white text-xl md:text-3xl font-extrabold mb-5 md:mb-7 mt-0 drop-shadow">New Release</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 xl:grid-cols-6 gap-x-4 md:gap-x-7 gap-y-6 md:gap-y-7">
            {newReleaseMovies.map((movie) => (
              <MovieCard key={movie.id} movie={movie} />
            ))}
          </div>
          <div className="flex justify-center mt-7 md:mt-8">
            {hasMoreNewReleases && (
              <button
                disabled={newReleaseLoading}
                className="w-full max-w-xs md:max-w-[220px] px-8 bg-white/5 border-2 border-[#232631] hover:bg-white/15 text-white py-3 text-base font-semibold rounded-full shadow transition min-h-[46px] md:min-h-[50px]"
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
