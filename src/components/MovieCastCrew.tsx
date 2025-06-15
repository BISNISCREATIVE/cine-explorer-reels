
import { Credits } from '@/types/movie';
import { tmdbApi } from '@/services/tmdb';

interface MovieCastCrewProps {
  credits: Credits;
}

const MovieCastCrew = ({ credits }: MovieCastCrewProps) => {
  return (
    <section className="mt-10">
      <h2 className="text-white text-2xl font-extrabold mb-6">Cast &amp; Crew</h2>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {credits.cast.slice(0, 6).map((actor) => (
          <div key={actor.id} className="flex items-center gap-4 bg-transparent">
            <div className="w-16 h-16 rounded-full overflow-hidden border-4 border-white/10 shadow">
              {actor.profile_path ? (
                <img
                  src={tmdbApi.getImageUrl(actor.profile_path, 'w185')}
                  alt={actor.name}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full bg-gray-700 flex items-center justify-center">
                  <span className="text-gray-400 text-xs">N/A</span>
                </div>
              )}
            </div>
            <div>
              <h3 className="text-white font-semibold text-lg">{actor.name}</h3>
              <p className="text-gray-400 text-sm">{actor.character}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default MovieCastCrew;
