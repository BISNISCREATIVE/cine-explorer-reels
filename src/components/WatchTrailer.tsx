
import { useState, useEffect } from 'react';
import { Play, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { tmdbApi } from '@/services/tmdb';
import { Video } from '@/types/movie';

interface WatchTrailerProps {
  movieId: number;
}

const WatchTrailer = ({ movieId }: WatchTrailerProps) => {
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

  const handlePlayTrailer = (video: Video) => {
    setSelectedVideo(video);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedVideo(null);
  };

  if (videos.length === 0) return null;

  return (
    <section className="py-8">
      <h2 className="text-white text-2xl font-bold mb-6">Watch Trailer</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {videos.slice(0, 6).map((video) => (
          <div key={video.id} className="relative group cursor-pointer">
            <div className="relative aspect-video bg-gray-800 rounded-lg overflow-hidden">
              <img
                src={`https://img.youtube.com/vi/${video.key}/maxresdefault.jpg`}
                alt={video.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black/40 group-hover:bg-black/60 transition-colors flex items-center justify-center">
                <Button
                  onClick={() => handlePlayTrailer(video)}
                  className="bg-red-600 hover:bg-red-700 text-white rounded-full p-4"
                >
                  <Play size={24} className="fill-white" />
                </Button>
              </div>
            </div>
            <h3 className="text-white font-medium mt-2 text-sm">{video.name}</h3>
          </div>
        ))}
      </div>

      {/* Modal for playing trailer */}
      {showModal && selectedVideo && (
        <div className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4">
          <div className="relative w-full max-w-4xl aspect-video">
            <Button
              onClick={closeModal}
              className="absolute -top-12 right-0 bg-transparent hover:bg-white/10 text-white p-2"
            >
              <X size={24} />
            </Button>
            <iframe
              src={`https://www.youtube.com/embed/${selectedVideo.key}?autoplay=1`}
              title={selectedVideo.name}
              className="w-full h-full rounded-lg"
              allowFullScreen
              allow="autoplay"
            />
          </div>
        </div>
      )}
    </section>
  );
};

export default WatchTrailer;
