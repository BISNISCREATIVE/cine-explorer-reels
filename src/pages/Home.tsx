import { useEffect, useState } from 'react';
import { Movie } from '@/types/movie';
import { tmdbApi } from '@/services/tmdb';
import { Carousel, CarouselContent, CarouselItem, CarouselPrevious, CarouselNext } from '@/components/ui/carousel';
import MovieCard from '@/components/MovieCard';
import { Loader2, Play } from 'lucide-react';

const Home = () => {
  // Trending Now
  const [trendingMovies, setTrendingMovies] = useState<Movie[]>([]);
  const [trendingLoading, setTrendingLoading] = useState(true);

  // New Release Infinite
  const [newReleaseMovies, setNewReleaseMovies] = useState<Movie[]>([]);
  const [newReleasePage, setNewReleasePage] = useState(1);
  const [newReleaseLoading, setNewReleaseLoading] = useState(true);
  const [hasMoreNewReleases, setHasMoreNewReleases] = useState(true);

  // Fetch trending movies
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
                {/* Custom Watch Trailer Button */}
                <button
                  className="flex items-center gap-2 bg-[#941C10] hover:bg-[#7e160c] text-white px-8 py-3 text-lg font-semibold rounded-full shadow transition-all duration-150"
                  style={{ minWidth: 180 }}
                  onClick={() => window.open(`https://www.youtube.com/results?search_query=${encodeURIComponent(heroMovie.title + " trailer")}`, "_blank")}
                >
                  Watch Trailer
                  <Play size={24} className="ml-1" />
                </button>
                {/* Custom See Detail Button */}
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
