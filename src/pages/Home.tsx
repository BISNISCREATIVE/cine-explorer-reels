
import { useEffect, useState } from 'react';
import { Movie } from '@/types/movie';
import { tmdbApi } from '@/services/tmdb';
import { Carousel, CarouselContent, CarouselItem, CarouselPrevious, CarouselNext } from '@/components/ui/carousel';
import MovieCard from '@/components/MovieCard';
import { Loader2, Play, X } from 'lucide-react';

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
    // Fetch trailer video TMDB
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
      <section className="relative h-[420px] md:h-[410px] w-full flex items-end overflow-hidden bg-gradient-to-b from-[#181c20] to-black">
        {heroMovie && (
          <>
            <img
              src={tmdbApi.getImageUrl(heroMovie.backdrop_path, 'w1280')}
              alt={heroMovie.title}
              className="absolute w-full h-full object-cover object-top opacity-80"
              draggable={false}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent" />
            <div className="container relative mx-auto z-10 px-4 flex flex-col justify-center h-full pb-10">
              <h1 className="text-white text-3xl md:text-5xl font-bold mb-3 drop-shadow leading-tight">{heroMovie.title}</h1>
              <p className="text-white/80 text-base md:text-lg mb-8 w-full md:w-1/2 drop-shadow-lg">{heroMovie.overview}</p>
              <div className="flex gap-4">
                {/* Watch Trailer Button */}
                <button
                  className={
                    "flex items-center gap-2 " +
                    (showTrailer
                      ? "bg-gray-700 hover:bg-gray-800"
                      : "bg-[#941C10] hover:bg-[#7e160c]") +
                    " text-white px-8 py-3 text-lg font-semibold rounded-full shadow transition-all duration-150"
                  }
                  style={{ minWidth: 180 }}
                  onClick={handleToggleTrailer}
                  disabled={trailerLoading}
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
                  className="bg-[#181B23] hover:bg-[#232631] text-white px-8 py-3 text-lg font-semibold rounded-full shadow transition-all duration-150 flex items-center justify-center"
                  style={{ minWidth: 180 }}
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
        <div className="flex justify-center bg-black py-6">
          <div className="w-full max-w-3xl aspect-video rounded-xl overflow-hidden shadow-lg border border-[#232631]">
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
      <section className="container mx-auto px-4 pb-8 pt-10">
        <h2 className="text-white text-2xl md:text-3xl font-bold mb-7">Trending Now</h2>
        {trendingLoading ? (
          <div className="flex items-center justify-center h-40">
            <Loader2 className="w-8 h-8 text-white animate-spin" />
          </div>
        ) : (
          <div className="relative">
            <Carousel className="w-full">
              <CarouselPrevious />
              <CarouselNext />
              <CarouselContent className="gap-7">
                {trendingMovies.map((movie, idx) => (
                  <CarouselItem
                    key={movie.id}
                    className="basis-2/3 sm:basis-1/3 md:basis-1/4 lg:basis-1/6"
                  >
                    <MovieCard movie={movie} rank={idx + 1} hideFavorite compact />
                  </CarouselItem>
                ))}
              </CarouselContent>
            </Carousel>
          </div>
        )}
      </section>

      {/* NEW RELEASE GRID */}
      <section className="container mx-auto px-4 pb-16">
        <h2 className="text-white text-2xl md:text-3xl font-bold mb-7">New Release</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-7">
          {newReleaseMovies.map((movie) => (
            <MovieCard key={movie.id} movie={movie} hideFavorite compact />
          ))}
        </div>
        <div className="flex justify-center mt-8">
          {hasMoreNewReleases && (
            <button
              disabled={newReleaseLoading}
              className="bg-white/5 border border-white/20 hover:bg-white/10 text-white px-7 py-3 text-base font-semibold rounded-full transition min-w-[180px]"
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
