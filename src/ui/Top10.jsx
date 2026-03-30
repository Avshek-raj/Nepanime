import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { SkeletonLoader } from "./SkeletonLoader";

export const Top10 = ({ top10Anime, isLoading = false }) => {
    const navigate = useNavigate();
    const [selectedTop10, setSelectedTop10] = useState('today');
    
    const hasData = top10Anime && top10Anime[selectedTop10] && top10Anime[selectedTop10].length > 0;

    // Show popular anime as alternative if top10 not available
    const createAlternativeSection = () => {
        return (
            <div className="bg-[var(--color-primary)] text-white/80 rounded mt-3 p-4 text-center">
                <h2 className="text-red-500/70 text-xl sm:text-2xl font-bold mb-3">Trending Now</h2>
                <p className="text-sm text-white/60 mb-4">Top 10 data coming soon! Check out trending anime instead.</p>
                <button 
                    onClick={() => navigate('/top-animes')}
                    className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition-colors text-sm"
                >
                    View All Trending
                </button>
            </div>
        );
    };

    if (isLoading) {
        return (
            <div>
                <div className="flex flex-wrap justify-between items-center gap-2 mb-3">
                    <h2 className="text-red-500/70 text-xl sm:text-2xl font-bold">Top 10</h2>
                    <span className="flex gap-1 sm:gap-0.5">
                        <button disabled className="text-xs sm:text-sm px-2 sm:pl-5 sm:pr-2 py-1 bg-[var(--color-primary)] rounded opacity-50" >Day</button>
                        <button disabled className="text-xs sm:text-sm px-2 sm:px-3 py-1 bg-[var(--color-primary)] rounded opacity-50" >Week</button>
                        <button disabled className="text-xs sm:text-sm px-2 sm:px-3 py-1 bg-[var(--color-primary)] rounded opacity-50" >Month</button>
                    </span>
                </div>
                <SkeletonLoader count={10} type="list" />
            </div>
        );
    }

    if (!hasData) {
        return createAlternativeSection();
    }

    return (
        <>
            <div className="flex flex-wrap justify-between items-center gap-2">
                <h2 className="text-red-500/70 text-xl sm:text-2xl font-bold">Top 10</h2>
                <span className="flex gap-1 sm:gap-0.5">
                    <button className={(selectedTop10 == "today" ? "active bg-red-600 text-white " : "") + "hover:bg-[var(--color-accent)] text-xs sm:text-sm px-2 sm:pl-5 sm:pr-2 py-1 bg-[var(--color-primary)] rounded transition-all duration-200"} onClick={() => setSelectedTop10('today')}>Day</button>
                    <button className={(selectedTop10 == "week" ? "active bg-red-600 text-white " : "") + "text-xs sm:text-sm px-2 sm:px-3 py-1 bg-[var(--color-primary)] hover:bg-[var(--color-accent)] rounded transition-all duration-200"} onClick={() => setSelectedTop10('week')}>Week</button>
                    <button className={(selectedTop10 == "month" ? "active bg-red-600 text-white " : "") + "text-xs sm:text-sm px-2 sm:px-3 py-1 bg-[var(--color-primary)] hover:bg-[var(--color-accent)] rounded transition-all duration-200"} onClick={() => setSelectedTop10('month')}>Month</button>
                </span>
            </div>
            <div className="bg-[var(--color-primary)] text-white/80 rounded mt-3">
                <ul className="flex flex-col pb-2">
                    {top10Anime[selectedTop10] && top10Anime[selectedTop10].map((anime, index) => {
                        return (
                            <li key={anime.id} className="mx-1 sm:mx-2 mt-2 bg-[var(--color-secondary)] flex items-center text-xs sm:text-sm hover:cursor-pointer hover:bg-[var(--color-primary)] transition-colors duration-300" onClick={() => navigate('/anime-detail', {state: {animeId: anime.id}})}>
                                <span className="text-red-500/70 font-bold ml-1 sm:ml-2 mr-2 sm:mr-3 text-xs sm:text-base">{anime.rank < 10 ? "0" + anime.rank : anime.rank}</span>
                                <img src={anime.poster} alt={anime.title} className="w-8 sm:w-12 h-12 sm:h-16 object-cover rounded-md mr-2 sm:mr-3" />
                                <div className="flex flex-col flex-1">
                                    <h3 className="text-xs sm:text-sm font-semibold line-clamp-1">{anime.title.length > 20 ? anime.title.substring(0, 20) + "..." : anime.title}</h3>
                                    <p className="text-xs text-white/70">Sub: {anime.episodes?.sub || 'N/A'}   Dub: {anime.episodes?.dub || 'N/A'}</p>
                                </div>
                            </li>
                        )
                    })}
                </ul>
            </div>
        </>
    );
}