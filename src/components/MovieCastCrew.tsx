
import { Credits } from '@/types/movie';
import { tmdbApi } from '@/services/tmdb';

interface MovieCastCrewProps {
  credits: Credits;
}

const MovieCastCrew = ({ credits }: MovieCastCrewProps) => {
  return (
    <section className="mt-10">
      <h2 className="text-white text-2xl font-extrabold mb-6">Cast &amp; Crew</h2>
      <div className="flex flex-col gap-6">
        {credits.cast.slice(0, 6).map((actor) => (
          <div
            key={actor.id}
            className="flex items-center gap-6 bg-transparent"
          >
            <div className="w-24 h-24 rounded-xl overflow-hidden shrink-0 bg-gray-700">
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
              <h3 className="text-white font-bold text-xl mb-1">{actor.name}</h3>
              {actor.character && (
                <p className="text-gray-400 text-lg font-medium">
                  {actor.character.split('/').map((part, i, arr) => (
                    <span key={i}>
                      {part.trim()}
                      {i < arr.length - 1 && <span className="mx-1 italic text-gray-400">/</span>}
                    </span>
                  ))}
                </p>
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default MovieCastCrew;
