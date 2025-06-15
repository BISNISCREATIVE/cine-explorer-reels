
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { MovieDetails, Credits, Video } from '@/types/movie';
import { tmdbApi } from '@/services/tmdb';
import MovieHeroSection from '@/components/MovieHeroSection';
import MovieOverview from '@/components/MovieOverview';
import MovieCastCrew from '@/components/MovieCastCrew';
import InlineTrailerPlayer from '@/components/InlineTrailerPlayer';

const MovieDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [movie, setMovie] = useState<MovieDetails | null>(null);
  const [credits, setCredits] = useState<Credits | null>(null);
  const [loading, setLoading] = useState(true);

  // Tambahan untuk trailer
  const [trailers, setTrailers] = useState<Video[]>([]);
  const [showTrailer, setShowTrailer] = useState(false);
  const [selectedTrailer, setSelectedTrailer] = useState<Video | null>(null);

  useEffect(() => {
    // Reset state every time id changes
    setMovie(null);
    setCredits(null);
    setLoading(true);
    setTrailers([]);
    setShowTrailer(false);
    setSelectedTrailer(null);

    const fetchMovieData = async () => {
      if (!id) return;

      try {
        const [movieResponse, creditsResponse, trailerResponse] = await Promise.all([
          tmdbApi.getMovieDetails(parseInt(id)),
          tmdbApi.getMovieCredits(parseInt(id)),
          tmdbApi.getMovieVideos(parseInt(id)),
        ]);
        setMovie(movieResponse);
        setCredits(creditsResponse);

        const trailersFiltered = trailerResponse.results.filter(
          (video: Video) => video.type === 'Trailer' && video.site === 'YouTube'
        );
        setTrailers(trailersFiltered);
      } catch (error) {
        console.error('Error fetching movie data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchMovieData();
  }, [id]);

  const handleWatchTrailer = () => {
    if (showTrailer) {
      setShowTrailer(false);
      setSelectedTrailer(null);
    } else {
      if (trailers.length > 0) {
        setSelectedTrailer(trailers[0]);
        setShowTrailer(true);
        // Scroll otomatis ke inline trailer jika tampil
        setTimeout(() => {
          const trailerSection = document.getElementById('inline-trailer-player');
          if (trailerSection) {
            trailerSection.scrollIntoView({ behavior: 'smooth', block: 'center' });
          }
        }, 200);
      }
    }
  };

  const handleCloseTrailer = () => {
    setShowTrailer(false);
    setSelectedTrailer(null);
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
      {/* Hero Section - no top padding since header is transparent */}
      <MovieHeroSection
        movie={movie}
        onWatchTrailer={handleWatchTrailer}
        hasTrailer={trailers.length > 0}
        isTrailerVisible={showTrailer}
      />

      {/* Content Sections */}
      <div className="container mx-auto px-4 py-8 md:py-12">
        <div className="space-y-8 md:space-y-12">
          {/* Overview */}
          <MovieOverview movie={movie} />

          {/* Inline Trailer */}
          {showTrailer && selectedTrailer && (
            <div id="inline-trailer-player">
              <InlineTrailerPlayer video={selectedTrailer} onClose={handleCloseTrailer} />
            </div>
          )}

          {/* Cast & Crew */}
          {credits && <MovieCastCrew credits={credits} />}
        </div>
      </div>
    </div>
  );
};

export default MovieDetail;
