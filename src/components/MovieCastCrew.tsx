
import { Credits } from '@/types/movie';
import { tmdbApi } from '@/services/tmdb';

interface MovieCastCrewProps {
  credits: Credits;
}

const CARD_WIDTH = 69;
const CARD_HEIGHT = 104;

const MovieCastCrew = ({ credits }: MovieCastCrewProps) => {
  return (
    <section className="mt-10">
      <h2 className="text-white text-2xl font-extrabold mb-6">Cast &amp; Crew</h2>
      <div
        className="flex flex-col items-start gap-10"
        style={{ padding: 0, alignSelf: 'stretch' }}
      >
        {credits.cast.slice(0, 6).map((actor) => (
          <div
            key={actor.id}
            className="flex flex-col items-center"
            style={{ width: CARD_WIDTH, minWidth: CARD_WIDTH }}
          >
            <div
              className="w-[69px] h-[104px] flex-shrink-0 mb-2 relative overflow-hidden"
              style={{
                width: CARD_WIDTH,
                height: CARD_HEIGHT,
                borderRadius: '0px',
                background: actor.profile_path
                  ? `url(${tmdbApi.getImageUrl(actor.profile_path, 'w185')}) lightgray 50% / cover no-repeat`
                  : 'lightgray',
                display: 'flex',
                alignItems: 'flex-end',
                justifyContent: 'center',
                boxShadow: '0 2px 12px 0 rgba(0,0,0,0.15)',
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
            <div className="w-full flex flex-col items-center min-w-0">
              <h3 className="text-white text-xs font-bold leading-tight truncate w-full text-center">
                {actor.name}
              </h3>
              {actor.character && (
                <p className="text-gray-400 text-[10px] font-medium leading-tight whitespace-pre-line text-center w-full truncate">
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
