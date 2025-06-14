
import { Movie } from '@/types/movie';
import MovieCard from './MovieCard';

interface MovieGridProps {
  movies: Movie[];
  title: string;
  showRanking?: boolean;
}

const MovieGrid = ({ movies, title, showRanking = false }: MovieGridProps) => {
  return (
    <section className="py-12">
      <div className="container mx-auto px-4">
        <h2 className="text-white text-2xl md:text-3xl font-bold mb-8">{title}</h2>
        
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-6">
          {movies.map((movie, index) => (
            <MovieCard
              key={movie.id}
              movie={movie}
              rank={showRanking ? index + 1 : undefined}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default MovieGrid;
