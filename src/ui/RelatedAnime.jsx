import { useNavigate } from "react-router-dom";

export const RelatedAnime = ({ recommendations = [] }) => {
    const navigate = useNavigate();

    if (!recommendations || recommendations.length === 0) {
        return null;
    }

    return (
        <div className="mt-6 md:mt-8">
            <h2 className="text-lg md:text-xl font-bold text-red-500/70 mb-4">Related Anime</h2>
            <ul className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 sm:gap-4">
                {recommendations.slice(0, 10).map((anime) => (
                    <li
                        key={anime.id}
                        onClick={() => navigate('/anime-detail', { state: { animeId: anime.id } })}
                        className="bg-[var(--color-primary)] cursor-pointer hover:scale-105 transition-transform duration-200 flex flex-col rounded-lg overflow-hidden"
                    >
                        <img 
                            className="w-full aspect-[3/4] object-cover" 
                            src={anime.image || anime.poster} 
                            alt={anime.title}
                        />
                        <span className="text-center text-xs sm:text-sm mt-1 px-1 line-clamp-2">
                            {anime.title}
                        </span>
                        <div className="flex justify-between mx-1 px-1 text-xs">
                            <span className="text-left text-white/70">
                                {anime.type || 'TV'}
                            </span>
                            <span className="text-right text-white/70">
                                {anime.episodes ? `Ep: ${anime.episodes}` : 'N/A'}
                            </span>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
};
