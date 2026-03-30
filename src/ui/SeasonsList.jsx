import { useState } from "react";
import { useNavigate } from "react-router-dom";

export const SeasonsList = ({ seasons = [] }) => {
    const [selectedSeason, setSelectedSeason] = useState(seasons[0]?.id || '');
    const navigate = useNavigate();

    if (!seasons || seasons.length <= 1) {
        return null;
    }

    const currentSeason = seasons.find(s => s.id === selectedSeason);

    return (
        <div className="mt-6 md:mt-8">
            <h2 className="text-lg md:text-xl font-bold text-red-500/70 mb-4">Seasons</h2>
            
            {/* Season Selector */}
            <div className="flex flex-wrap gap-2 mb-4">
                {seasons.map((season) => (
                    <button
                        key={season.id}
                        onClick={() => setSelectedSeason(season.id)}
                        className={`px-3 md:px-4 py-2 rounded text-xs md:text-sm font-semibold transition-all duration-200 ${
                            selectedSeason === season.id
                                ? 'bg-red-600 text-white'
                                : 'bg-[var(--color-secondary)] text-white/70 hover:text-white'
                        }`}
                    >
                        {season.season || `Season ${season.seasonNumber || seasons.indexOf(season) + 1}`}
                    </button>
                ))}
            </div>

            {/* Current Season Episodes */}
            {currentSeason && (
                <div className="bg-[var(--color-secondary)] rounded-lg p-4">
                    <h3 className="text-white/90 font-semibold mb-3">
                        {currentSeason.season || `Season ${currentSeason.seasonNumber || seasons.indexOf(currentSeason) + 1}`}
                    </h3>
                    <ul className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2 md:gap-3">
                        {currentSeason.episodes && currentSeason.episodes.map((episode, index) => (
                            <li
                                key={episode.id || index}
                                onClick={() => navigate('/anime-detail', { state: { animeId: episode.animeId || currentSeason.id }})}
                                className="bg-[var(--color-primary)] p-2 rounded cursor-pointer hover:bg-[var(--color-accent)] transition-colors duration-200 text-center"
                            >
                                <div className="text-xs md:text-sm font-semibold text-white/90">
                                    Ep {episode.number || index + 1}
                                </div>
                                <div className="text-xs text-white/60 line-clamp-1">
                                    {episode.title || `Episode ${episode.number || index + 1}`}
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
};
