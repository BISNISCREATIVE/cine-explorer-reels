
import { MovieDetails } from '@/types/movie';

interface MovieOverviewProps {
  movie: MovieDetails;
}

const MovieOverview = ({ movie }: MovieOverviewProps) => {
  return (
    <section className="mt-10">
      <h2 className="text-white text-2xl font-extrabold mb-3">Overview</h2>
      <p className="text-gray-300 text-base leading-relaxed">{movie.overview}</p>
    </section>
  );
};

export default MovieOverview;
