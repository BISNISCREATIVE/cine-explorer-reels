
import { useState, useEffect } from 'react';
import { Movie } from '@/types/movie';
import { tmdbApi } from '@/services/tmdb';
import HeroSection from '@/components/HeroSection';
import MovieGrid from '@/components/MovieGrid';
import MovieSearchResults from '@/components/MovieSearchResults';
import { Input } from '@/components/ui/input';
import { Search, Loader2 } from 'lucide-react';

const Home = () => {
  const [trendingMovies, setTrendingMovies] = useState<Movie[]>([]);
  const [newReleases, setNewReleases] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);

  // Search state
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<Movie[]>([]);
  const [searchLoading, setSearchLoading] = useState(false);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const [trendingResponse, upcomingResponse] = await Promise.all([
          tmdbApi.getTrending(),
          tmdbApi.getUpcoming(),
        ]);
        setTrendingMovies(trendingResponse.results?.slice(0, 12) || []);
        setNewReleases(upcomingResponse.results || []);
      } catch (error) {
        console.error('Error fetching movies:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchMovies();
  }, []);

  // Handle search (debounce like figma's UX)
  useEffect(() => {
    if (!searchQuery) {
      setSearchResults([]);
      setSearchLoading(false);
      return;
    }
    setSearchLoading(true);
    const timeout = setTimeout(async () => {
      try {
        const data = await tmdbApi.searchMovies(searchQuery);
        setSearchResults(data.results?.slice(0, 12) || []);
      } catch {
        setSearchResults([]);
      }
      setSearchLoading(false);
    }, 400);
    return () => clearTimeout(timeout);
  }, [searchQuery]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black">
        <Loader2 className="w-8 h-8 text-white animate-spin" />
      </div>
    );
  }

  return (
    <div className="bg-[#0C1118] min-h-screen">
      {/* HERO SECTION */}
      <div className="w-full bg-gradient-to-b from-[#12161C] to-[#171B22] pt-20 pb-12 relative">
        <div className="container mx-auto px-4 flex flex-col items-center text-center">
          <h1 className="text-white font-extrabold text-4xl md:text-5xl tracking-tight mb-4 font-sans">
            Discover Your Next <span className="text-red-500">Movie</span>
          </h1>
          <p className="text-gray-400 text-lg md:text-xl mb-8 max-w-2xl">
            Browse trending films, explore new releases, and dive into thousands of movie titles. Search to get started!
          </p>
          <div className="w-full max-w-xl relative mb-2">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
            <Input
              type="text"
              className="w-full p-3 pl-12 pr-4 rounded-2xl bg-[#181E26] border border-[#262B33] text-white placeholder:text-gray-500 text-lg shadow-lg"
              placeholder="Search for movies, e.g. Interstellar"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            {searchLoading && (
              <Loader2 className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 animate-spin h-5 w-5" />
            )}
          </div>
        </div>
      </div>

      {/* SEARCH RESULT (shows if searchQuery ada) */}
      {searchQuery && (
        <section className="container mx-auto px-4 py-10">
          <h2 className="text-2xl font-bold text-white mb-6">Search Result</h2>
          <MovieSearchResults
            results={searchResults}
            loading={searchLoading}
            searchQuery={searchQuery}
            onSelect={() => {/* handled in MovieSearchResults */}}
          />
        </section>
      )}

      {/* IF NOT SEARCHING, Tampilkan list film */}
      {!searchQuery && (
        <>
          <div className="pt-6">
            <MovieGrid
              movies={trendingMovies}
              title="Trending Now"
            />
          </div>
          <div className="pb-16">
            <MovieGrid
              movies={newReleases}
              title="New Release"
            />
          </div>
        </>
      )}
    </div>
  );
};

export default Home;

