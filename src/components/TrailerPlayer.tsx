
import { Video } from '@/types/movie';

interface TrailerPlayerProps {
  selectedVideo: Video;
}

const TrailerPlayer = ({ selectedVideo }: TrailerPlayerProps) => {
  return (
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
  );
};

export default TrailerPlayer;
