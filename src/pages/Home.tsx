
import { useState, useEffect } from 'react';
import { Movie } from '@/types/movie';
import { tmdbApi } from '@/services/tmdb';
import HeroSection from '@/components/HeroSection';
import MovieGrid from '@/components/MovieGrid';

const Home = () => {
  const [trendingMovies, setTrendingMovies] = useState<Movie[]>([]);
  const [newReleases, setNewReleases] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const [trendingResponse, upcomingResponse] = await Promise.all([
          tmdbApi.getTrending(),
          tmdbApi.getUpcoming(),
        ]);

        setTrendingMovies(trendingResponse.results?.slice(0, 10) || []);
        setNewReleases(upcomingResponse.results?.slice(0, 10) || []);
      } catch (error) {
        console.error('Error fetching movies:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-white text-xl">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black">
      <HeroSection />
      
      <div className="space-y-8">
        <MovieGrid
          movies={trendingMovies}
          title="Trending Now"
          showRanking={true}
        />
        
        <MovieGrid
          movies={newReleases}
          title="New Release"
        />
      </div>
    </div>
  );
};

export default Home;
