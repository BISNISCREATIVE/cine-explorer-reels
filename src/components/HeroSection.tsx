
import { useState, useEffect } from 'react';
import { Movie } from '@/types/movie';
import { tmdbApi } from '@/services/tmdb';

const HeroSection = () => {
  const [featuredMovie, setFeaturedMovie] = useState<Movie | null>(null);

  useEffect(() => {
    const fetchFeaturedMovie = async () => {
      try {
        const response = await tmdbApi.getTrending();
        if (response.results && response.results.length > 0) {
          setFeaturedMovie(response.results[0]);
        }
      } catch (error) {
        // ignore error
      }
    };
    fetchFeaturedMovie();
  }, []);

  if (!featuredMovie) {
    return (
      <div className="h-64 w-full bg-[#12161C] rounded-b-2xl"></div>
    );
  }

  return (
    <div className="relative rounded-b-2xl overflow-hidden h-64 mb-0 bg-[#12161C]">
      <img
        src={tmdbApi.getImageUrl(featuredMovie.backdrop_path, "w1280")}
        alt={featuredMovie.title}
        className="absolute inset-0 w-full h-full object-cover opacity-30"
        draggable={false}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-[#12161C]/70 via-[#12161C]/70 to-[#171B22]/90" />
      <div className="relative flex flex-col justify-center h-full container mx-auto px-4 z-10">
        <h2 className="text-xl md:text-2xl text-gray-100 font-bold mb-2 max-w-xl">
          Now Trending:
        </h2>
        <h1 className="text-2xl md:text-4xl font-black text-white mb-3 max-w-xl">
          {featuredMovie.title}
        </h1>
        <p className="text-gray-300 text-base mb-1 max-w-xl line-clamp-2">
          {featuredMovie.overview}
        </p>
      </div>
    </div>
  );
};

export default HeroSection;
