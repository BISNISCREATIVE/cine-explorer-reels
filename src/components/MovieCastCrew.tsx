
import { Credits } from '@/types/movie';
import { tmdbApi } from '@/services/tmdb';

interface MovieCastCrewProps {
  credits: Credits;
}

const MovieCastCrew = ({ credits }: MovieCastCrewProps) => {
  return (
    <section>
      <h2 className="text-white text-2xl font-bold mb-6">Cast & Crew</h2>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {credits.cast.slice(0, 8).map((actor) => (
          <div key={actor.id} className="flex flex-col items-center text-center">
            <div className="w-20 h-20 md:w-24 md:h-24 rounded-full overflow-hidden bg-gray-700 mb-3">
              {actor.profile_path ? (
                <img
                  src={tmdbApi.getImageUrl(actor.profile_path, 'w185')}
                  alt={actor.name}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full bg-gray-600 flex items-center justify-center">
                  <span className="text-gray-400 text-xs">N/A</span>
                </div>
              )}
            </div>
            <div className="space-y-1">
              <h3 className="text-white font-medium text-sm">{actor.name}</h3>
              <p className="text-gray-400 text-xs">{actor.character}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default MovieCastCrew;
