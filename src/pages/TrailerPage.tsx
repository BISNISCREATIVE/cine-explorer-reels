
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { X, ExternalLink, Share2, Volume2, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { MovieDetails, Video } from '@/types/movie';
import { tmdbApi } from '@/services/tmdb';

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
      {/* Header */}
      <div className="flex items-center justify-between p-6 bg-gradient-to-b from-black/80 to-transparent relative z-10">
        <div className="flex items-center space-x-4">
          <Button
            onClick={handleGoBack}
            variant="ghost"
            size="icon"
            className="text-white hover:bg-white/10"
          >
            <ArrowLeft size={20} />
          </Button>
          <div>
            <h1 className="text-white text-2xl font-bold">Official Trailer</h1>
            <p className="text-gray-300">{movie.title}</p>
          </div>
        </div>
        
        <div className="flex items-center space-x-2">
          <Button
            variant="ghost"
            size="icon"
            className="text-white hover:bg-white/10"
          >
            <Volume2 size={20} />
          </Button>
          <Button
            onClick={handleShareTrailer}
            variant="ghost"
            size="icon"
            className="text-white hover:bg-white/10"
          >
            <Share2 size={20} />
          </Button>
          <Button
            onClick={handleWatchOnYouTube}
            variant="ghost"
            size="icon"
            className="text-white hover:bg-white/10"
          >
            <ExternalLink size={20} />
          </Button>
        </div>
      </div>

      {/* Video Player */}
      <div className="flex-1 flex items-center justify-center p-6">
        <div className="w-full max-w-6xl aspect-video relative">
          <iframe
            src={`https://www.youtube.com/embed/${selectedVideo.key}?autoplay=1&controls=1&showinfo=0&rel=0`}
            title={selectedVideo.name}
            className="w-full h-full rounded-lg"
            allowFullScreen
            allow="autoplay; encrypted-media"
          />
        </div>
      </div>

      {/* Footer */}
      <div className="p-6 bg-gradient-to-t from-black/80 to-transparent">
        <div className="flex flex-col items-center space-y-4">
          <div className="flex items-center space-x-2 text-gray-300 text-sm">
            <span>• Official Trailer</span>
            <span>• HD Quality</span>
            <span>• YouTube</span>
            <span>• {new Date(movie.release_date).getFullYear()}</span>
          </div>
          
          <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-4">
            <Button
              onClick={handleWatchOnYouTube}
              className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-full flex items-center space-x-2"
            >
              <ExternalLink size={16} />
              <span>Watch on YouTube</span>
            </Button>
            
            <Button
              onClick={handleShareTrailer}
              variant="ghost"
              className="bg-gray-800/50 hover:bg-gray-700/50 text-white px-6 py-2 rounded-full flex items-center space-x-2"
            >
              <Share2 size={16} />
              <span>Share Trailer</span>
            </Button>
          </div>

          {videos.length > 1 && (
            <div className="flex flex-wrap gap-2 justify-center">
              {videos.map((video, index) => (
                <Button
                  key={video.id}
                  onClick={() => setSelectedVideo(video)}
                  variant={selectedVideo.id === video.id ? "default" : "ghost"}
                  className="text-xs px-3 py-1 rounded-full"
                >
                  Trailer {index + 1}
                </Button>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TrailerPage;
