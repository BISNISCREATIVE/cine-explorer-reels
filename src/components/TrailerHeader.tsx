
import { ArrowLeft, Volume2, Share2, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { MovieDetails, Video } from '@/types/movie';

interface TrailerHeaderProps {
  movie: MovieDetails;
  selectedVideo: Video;
  onGoBack: () => void;
  onShareTrailer: () => void;
  onWatchOnYouTube: () => void;
}

const TrailerHeader = ({ 
  movie, 
  selectedVideo, 
  onGoBack, 
  onShareTrailer, 
  onWatchOnYouTube 
}: TrailerHeaderProps) => {
  return (
    <div className="flex items-center justify-between p-6 bg-gradient-to-b from-black/80 to-transparent relative z-10">
      <div className="flex items-center space-x-4">
        <Button
          onClick={onGoBack}
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
          onClick={onShareTrailer}
          variant="ghost"
          size="icon"
          className="text-white hover:bg-white/10"
        >
          <Share2 size={20} />
        </Button>
        <Button
          onClick={onWatchOnYouTube}
          variant="ghost"
          size="icon"
          className="text-white hover:bg-white/10"
        >
          <ExternalLink size={20} />
        </Button>
      </div>
    </div>
  );
};

export default TrailerHeader;
