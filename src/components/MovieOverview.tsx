
import { MovieDetails } from '@/types/movie';

interface MovieOverviewProps {
  movie: MovieDetails;
}

const MovieOverview = ({ movie }: MovieOverviewProps) => {
  return (
    <section>
      <h2 className="text-white text-2xl font-bold mb-4">Overview</h2>
      <p className="text-gray-300 text-lg leading-relaxed">{movie.overview}</p>
    </section>
  );
};

export default MovieOverview;
