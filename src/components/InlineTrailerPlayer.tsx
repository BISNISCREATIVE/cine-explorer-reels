
import { Video } from "@/types/movie";

interface InlineTrailerPlayerProps {
  video: Video;
  onClose: () => void;
}

const InlineTrailerPlayer = ({ video, onClose }: InlineTrailerPlayerProps) => (
  <div className="w-full max-w-5xl mx-auto mt-8 mb-12 bg-black rounded-lg shadow-lg relative overflow-hidden">
    <button
      onClick={onClose}
      className="absolute right-3 top-3 z-10 text-white bg-black/40 hover:bg-black/90 rounded-full px-2 py-1"
      aria-label="Close trailer"
    >
      ×
    </button>
    <div className="aspect-video w-full">
      <iframe
        src={`https://www.youtube.com/embed/${video.key}?autoplay=1&controls=1&showinfo=0&rel=0`}
        title={video.name}
        className="w-full h-full rounded-lg"
        allowFullScreen
        allow="autoplay; encrypted-media"
      />
    </div>
  </div>
);

export default InlineTrailerPlayer;
