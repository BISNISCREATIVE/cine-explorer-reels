
import { Credits } from '@/types/movie';
import { tmdbApi } from '@/services/tmdb';

interface MovieCastCrewProps {
  credits: Credits;
}

const CARD_WIDTH = 69;
const CARD_HEIGHT = 104;

const MovieCastCrew = ({ credits }: MovieCastCrewProps) => {
  // Slice only first 6 cast
  const castList = credits.cast.slice(0, 6);
  return (
    <section className="mt-10">
      <h2 className="text-white text-2xl font-extrabold mb-6">Cast &amp; Crew</h2>
      <div
        className="flex flex-wrap gap-x-[96px] gap-y-[48px] items-start"
        style={{
          padding: 0,
          alignSelf: 'stretch',
        }}
      >
        {castList.map((actor, idx) => (
          <div
            key={actor.id}
            className="flex flex-row items-center"
            style={{
              flex: '0 0 calc(33.3333% - 64px)', // minus 2/3 gap for 3 columns
              minWidth: 230,
              maxWidth: 320,
              padding: 0,
              alignSelf: 'stretch',
              gap: 24,
            }}
          >
            {/* Cast Image */}
            <div
              className="flex-shrink-0"
              style={{
                width: CARD_WIDTH,
                height: CARD_HEIGHT,
                borderRadius: '10px',
                background: actor.profile_path
                  ? `url(${tmdbApi.getImageUrl(actor.profile_path, 'w185')}) lightgray 50% / cover no-repeat`
                  : 'lightgray',
                overflow: 'hidden',
                position: 'relative',
                boxShadow: '0 2px 12px 0 rgba(0,0,0,0.12)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              {!actor.profile_path && (
                <span
                  className="text-gray-400 text-xs w-full text-center"
                  style={{
                    position: 'absolute',
                    top: '50%',
                    left: 0,
                    right: 0,
                    transform: 'translateY(-50%)',
                  }}
                >
                  N/A
                </span>
              )}
            </div>
            {/* Cast Info */}
            <div className="flex flex-col items-start min-w-0">
              <h3 className="text-white text-lg font-extrabold leading-snug truncate max-w-[180px]">
                {actor.name}
              </h3>
              {actor.character && (
                <p className="text-gray-400 text-base font-medium leading-snug whitespace-pre-line truncate max-w-[180px]">
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
