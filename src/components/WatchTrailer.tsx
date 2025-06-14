
import { useState, useEffect } from 'react';
import { Play, X, ExternalLink, Share2, Volume2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { tmdbApi } from '@/services/tmdb';
import { Video } from '@/types/movie';

interface WatchTrailerProps {
  movieId: number;
  movieTitle: string;
  onTrailerClick?: () => void;
}

const WatchTrailer = ({ movieId, movieTitle, onTrailerClick }: WatchTrailerProps) => {
  const [videos, setVideos] = useState<Video[]>([]);
  const [selectedVideo, setSelectedVideo] = useState<Video | null>(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const response = await tmdbApi.getMovieVideos(movieId);
        const trailers = response.results.filter((video: Video) => 
          video.type === 'Trailer' && video.site === 'YouTube'
        );
        setVideos(trailers);
      } catch (error) {
        console.error('Error fetching videos:', error);
      }
    };

    fetchVideos();
  }, [movieId]);

  const handlePlayTrailer = (video?: Video) => {
    const trailerToPlay = video || videos[0];
    if (trailerToPlay) {
      setSelectedVideo(trailerToPlay);
      setShowModal(true);
      onTrailerClick?.();
    }
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedVideo(null);
  };

  const handleWatchOnYouTube = () => {
    if (selectedVideo) {
      window.open(`https://www.youtube.com/watch?v=${selectedVideo.key}`, '_blank');
    }
  };

  const handleShareTrailer = () => {
    if (selectedVideo) {
      navigator.share?.({
        title: `${movieTitle} - ${selectedVideo.name}`,
        url: `https://www.youtube.com/watch?v=${selectedVideo.key}`
      }).catch(() => {
        // Fallback to copying to clipboard
        navigator.clipboard?.writeText(`https://www.youtube.com/watch?v=${selectedVideo.key}`);
      });
    }
  };

  if (videos.length === 0) return null;

  return (
    <>
      {/* Modal for playing trailer */}
      {showModal && selectedVideo && (
        <div className="fixed inset-0 z-50 bg-black flex flex-col">
          {/* Header */}
          <div className="flex items-center justify-between p-6 bg-gradient-to-b from-black/80 to-transparent">
            <div>
              <h2 className="text-white text-2xl font-bold">Official Trailer</h2>
              <p className="text-gray-300">{movieTitle}</p>
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
                variant="ghost"
                size="icon"
                className="text-white hover:bg-white/10"
              >
                <Share2 size={20} />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="text-white hover:bg-white/10"
              >
                <ExternalLink size={20} />
              </Button>
              <Button
                onClick={closeModal}
                variant="ghost"
                size="icon"
                className="text-white hover:bg-white/10"
              >
                <X size={24} />
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
                <span>• 2025</span>
              </div>
              
              <div className="flex space-x-4">
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

              <button
                onClick={closeModal}
                className="text-gray-400 hover:text-white text-sm underline"
              >
                Close Trailer Player
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default WatchTrailer;
