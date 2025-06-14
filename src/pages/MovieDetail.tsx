
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { MovieDetails, Credits } from '@/types/movie';
import { tmdbApi } from '@/services/tmdb';
import MovieHeroSection from '@/components/MovieHeroSection';
import MovieOverview from '@/components/MovieOverview';
import MovieCastCrew from '@/components/MovieCastCrew';

const MovieDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [movie, setMovie] = useState<MovieDetails | null>(null);
  const [credits, setCredits] = useState<Credits | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMovieData = async () => {
      if (!id) return;

      try {
        const [movieResponse, creditsResponse] = await Promise.all([
          tmdbApi.getMovieDetails(parseInt(id)),
          tmdbApi.getMovieCredits(parseInt(id)),
        ]);

        setMovie(movieResponse);
        setCredits(creditsResponse);
      } catch (error) {
        console.error('Error fetching movie data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchMovieData();
  }, [id]);

  const handleWatchTrailer = () => {
    if (id) {
      navigate(`/movie/${id}/trailer`);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-white text-xl">Loading...</div>
      </div>
    );
  }

  if (!movie) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-white text-xl">Movie not found</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black">
      {/* Hero Section */}
      <MovieHeroSection movie={movie} onWatchTrailer={handleWatchTrailer} />

      {/* Content Sections */}
      <div className="container mx-auto px-4 py-12">
        <div className="space-y-12">
          {/* Overview */}
          <MovieOverview movie={movie} />

          {/* Cast & Crew */}
          {credits && <MovieCastCrew credits={credits} />}
        </div>
      </div>
    </div>
  );
};

export default MovieDetail;
