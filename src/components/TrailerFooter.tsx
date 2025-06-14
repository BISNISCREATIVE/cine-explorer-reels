
import { ExternalLink, Share2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { MovieDetails, Video } from '@/types/movie';

interface TrailerFooterProps {
  movie: MovieDetails;
  videos: Video[];
  selectedVideo: Video;
  onWatchOnYouTube: () => void;
  onShareTrailer: () => void;
  onVideoSelect: (video: Video) => void;
}

const TrailerFooter = ({ 
  movie, 
  videos, 
  selectedVideo, 
  onWatchOnYouTube, 
  onShareTrailer, 
  onVideoSelect 
}: TrailerFooterProps) => {
  return (
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
            onClick={onWatchOnYouTube}
            className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-full flex items-center space-x-2"
          >
            <ExternalLink size={16} />
            <span>Watch on YouTube</span>
          </Button>
          
          <Button
            onClick={onShareTrailer}
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
                onClick={() => onVideoSelect(video)}
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
  );
};

export default TrailerFooter;
