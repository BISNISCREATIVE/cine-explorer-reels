
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { MovieDetails, Video } from '@/types/movie';
import { tmdbApi } from '@/services/tmdb';
import TrailerHeader from '@/components/TrailerHeader';
import TrailerPlayer from '@/components/TrailerPlayer';
import TrailerFooter from '@/components/TrailerFooter';

const TrailerPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [movie, setMovie] = useState<MovieDetails | null>(null);
  const [videos, setVideos] = useState<Video[]>([]);
  const [selectedVideo, setSelectedVideo] = useState<Video | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      if (!id) return;

      try {
        const [movieResponse, videosResponse] = await Promise.all([
          tmdbApi.getMovieDetails(parseInt(id)),
          tmdbApi.getMovieVideos(parseInt(id)),
        ]);

        setMovie(movieResponse);
        
        const trailers = videosResponse.results.filter((video: Video) => 
          video.type === 'Trailer' && video.site === 'YouTube'
        );
        setVideos(trailers);
        
        if (trailers.length > 0) {
          setSelectedVideo(trailers[0]);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  const handleWatchOnYouTube = () => {
    if (selectedVideo) {
      window.open(`https://www.youtube.com/watch?v=${selectedVideo.key}`, '_blank');
    }
  };

  const handleShareTrailer = () => {
    if (selectedVideo && movie) {
      navigator.share?.({
        title: `${movie.title} - ${selectedVideo.name}`,
        url: `https://www.youtube.com/watch?v=${selectedVideo.key}`
      }).catch(() => {
        navigator.clipboard?.writeText(`https://www.youtube.com/watch?v=${selectedVideo.key}`);
      });
    }
  };

  const handleGoBack = () => {
    navigate(-1);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-white text-xl">Loading trailer...</div>
      </div>
    );
  }

  if (!movie || !selectedVideo) {
    return (
      <div className="min-h-screen bg-black flex flex-col items-center justify-center">
        <div className="text-white text-xl mb-4">Trailer not available</div>
        <Button
          onClick={handleGoBack}
          variant="ghost"
          className="text-white hover:bg-white/10"
        >
          <ArrowLeft size={20} className="mr-2" />
          Go Back
        </Button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black flex flex-col">
      <TrailerHeader
        movie={movie}
        selectedVideo={selectedVideo}
        onGoBack={handleGoBack}
        onShareTrailer={handleShareTrailer}
        onWatchOnYouTube={handleWatchOnYouTube}
      />

      <TrailerPlayer selectedVideo={selectedVideo} />

      <TrailerFooter
        movie={movie}
        videos={videos}
        selectedVideo={selectedVideo}
        onWatchOnYouTube={handleWatchOnYouTube}
        onShareTrailer={handleShareTrailer}
        onVideoSelect={setSelectedVideo}
      />
    </div>
  );
};

export default TrailerPage;
