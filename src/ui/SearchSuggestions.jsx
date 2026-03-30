import { useQuery } from "@tanstack/react-query";
import { fetchAnime } from "../api/api";
import { useNavigate } from "react-router-dom";

export const SearchSuggestions = ({ query }) => {
    const navigate = useNavigate();
    
    const { data, isPending } = useQuery({
        queryKey: ['search-suggestions', query],
        queryFn: () => fetchAnime(`/${query}`),
        enabled: query.trim().length > 0
    });

    if (!query.trim()) return null;

    const suggestions = data?.data?.results?.slice(0, 8) || [];

    return (
        <div className="absolute top-full left-0 right-0 mt-1 bg-[var(--color-secondary)] rounded-lg shadow-lg z-50 max-h-96 overflow-y-auto">
            {isPending ? (
                <div className="p-4 text-sm text-white/70">Searching...</div>
            ) : suggestions.length > 0 ? (
                <ul className="divide-y divide-[var(--color-primary)]">
                    {suggestions.map((anime) => (
                        <li
                            key={anime.id}
                            onClick={() => navigate('/anime-detail', { state: { animeId: anime.id } })}
                            className="p-3 hover:bg-[var(--color-primary)] cursor-pointer transition-colors duration-200 flex gap-3 items-center"
                        >
                            <img 
                                src={anime.image || anime.poster} 
                                alt={anime.title}
                                className="w-10 h-14 object-cover rounded"
                            />
                            <div className="flex-1 min-w-0">
                                <h4 className="text-sm font-semibold text-white/90 line-clamp-1">
                                    {anime.title}
                                </h4>
                                <p className="text-xs text-white/60">
                                    {anime.type || 'TV'} • {anime.episodes ? `${anime.episodes} eps` : 'N/A'}
                                </p>
                            </div>
                        </li>
                    ))}
                    <li 
                        onClick={() => {
                            const form = document.querySelector('[data-search-form]');
                            if (form) form.dispatchEvent(new Event('submit', { bubbles: true }));
                        }}
                        className="p-3 hover:bg-[var(--color-primary)] cursor-pointer text-center text-sm text-red-500 font-semibold transition-colors duration-200"
                    >
                        View all results
                    </li>
                </ul>
            ) : (
                <div className="p-4 text-sm text-white/70">No anime found</div>
            )}
        </div>
    );
};
