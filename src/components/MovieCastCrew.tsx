
import { Credits } from '@/types/movie';
import { tmdbApi } from '@/services/tmdb';

interface MovieCastCrewProps {
  credits: Credits;
}

const PROFILE_SIZE = 56;

const MovieCastCrew = ({ credits }: MovieCastCrewProps) => {
  // Ambil hanya 6 cast teratas
  const castList = credits.cast.slice(0, 6);

  return (
    <section className="mt-8">
      <h2 className="text-white text-xl font-bold mb-4">Cast &amp; Crew</h2>
      <div
        className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-x-12 gap-y-8"
        style={{
          alignSelf: 'stretch',
        }}
      >
        {castList.map((actor) => (
          <div
            key={actor.id}
            className="flex flex-row items-center"
            style={{
              padding: 0,
              borderRadius: 0,
              alignSelf: 'stretch',
            }}
          >
            {/* Cast Image */}
            <div
              className={`flex-shrink-0 w-[${PROFILE_SIZE}px] h-[${PROFILE_SIZE}px] rounded-full bg-gray-800 overflow-hidden flex items-center justify-center mr-4`}
              style={{
                width: PROFILE_SIZE,
                height: PROFILE_SIZE,
                borderRadius: '50%',
                background: actor.profile_path
                  ? `url(${tmdbApi.getImageUrl(actor.profile_path, 'w185')}) center/cover no-repeat`
                  : '#23272F',
              }}
            >
              {!actor.profile_path && (
                <span
                  className="text-gray-400 text-xs w-full text-center"
                  style={{
                    position: 'absolute',
                  }}
                >
                  N/A
                </span>
              )}
            </div>
            {/* Cast Info */}
            <div className="flex flex-col items-start min-w-0">
              <h3 className="text-white text-base font-semibold leading-tight truncate max-w-[150px] mb-0.5">
                {actor.name}
              </h3>
              {actor.character && (
                <p className="text-gray-400 text-xs font-medium leading-tight truncate max-w-[150px]">
                  {actor.character}
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
