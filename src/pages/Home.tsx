
import { useState, useEffect } from 'react';
import { Movie } from '@/types/movie';
import { tmdbApi } from '@/services/tmdb';
import HeroSection from '@/components/HeroSection';
import MovieGrid from '@/components/MovieGrid';
import { Button } from '@/components/ui/button';
import { Loader2 } from 'lucide-react';

const Home = () => {
  const [trendingMovies, setTrendingMovies] = useState<Movie[]>([]);
  const [newReleases, setNewReleases] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const [trendingResponse, upcomingResponse] = await Promise.all([
          tmdbApi.getTrending(),
          tmdbApi.getUpcoming(),
        ]);

        setTrendingMovies(trendingResponse.results?.slice(0, 10) || []);
        setNewReleases(upcomingResponse.results || []);
        setCurrentPage(1);
        setHasMore(upcomingResponse.total_pages > 1);
      } catch (error) {
        console.error('Error fetching movies:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, []);

  const loadMoreMovies = async () => {
    if (loadingMore || !hasMore) return;

    setLoadingMore(true);
    try {
      const nextPage = currentPage + 1;
      const response = await tmdbApi.getUpcoming(nextPage);
      
      if (response.results && response.results.length > 0) {
        setNewReleases(prev => [...prev, ...response.results]);
        setCurrentPage(nextPage);
        setHasMore(nextPage < response.total_pages);
      } else {
        setHasMore(false);
      }
    } catch (error) {
      console.error('Error loading more movies:', error);
    } finally {
      setLoadingMore(false);
    }
  };

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
        
        <div>
          <MovieGrid
            movies={newReleases}
            title="New Release"
          />
          
          {hasMore && (
            <div className="flex justify-center mt-8 pb-12">
              <Button
                onClick={loadMoreMovies}
                disabled={loadingMore}
                className="bg-red-600 hover:bg-red-700 text-white px-8 py-3 rounded-full"
              >
                {loadingMore ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Loading...
                  </>
                ) : (
                  'Load More'
                )}
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
