
import { useState, useEffect } from 'react';
import { Movie } from '@/types/movie';
import { tmdbApi } from '@/services/tmdb';
import HeroSection from '@/components/HeroSection';
import MovieGrid from '@/components/MovieGrid';
import { Button } from '@/components/ui/button';
import { Loader2, ChevronLeft, ChevronRight } from 'lucide-react';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import MovieCard from '@/components/MovieCard';

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
        {/* Trending Now Carousel */}
        <section className="py-12">
          <div className="container mx-auto px-4">
            <h2 className="text-white text-2xl md:text-3xl font-bold mb-8">Trending Now</h2>
            
            <Carousel
              opts={{
                align: "start",
                loop: true,
              }}
              className="w-full"
            >
              <CarouselContent className="-ml-2 md:-ml-4">
                {trendingMovies.map((movie, index) => (
                  <CarouselItem key={movie.id} className="pl-2 md:pl-4 basis-1/2 sm:basis-1/3 md:basis-1/4 lg:basis-1/5 xl:basis-1/6">
                    <MovieCard
                      movie={movie}
                      rank={index + 1}
                    />
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious className="absolute -left-4 top-1/2 -translate-y-1/2 bg-black/80 border-gray-600 text-white hover:bg-black/90 hover:text-white" />
              <CarouselNext className="absolute -right-4 top-1/2 -translate-y-1/2 bg-black/80 border-gray-600 text-white hover:bg-black/90 hover:text-white" />
            </Carousel>
          </div>
        </section>
        
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
