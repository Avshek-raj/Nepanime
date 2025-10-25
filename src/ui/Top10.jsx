import { useState } from "react";
import { AnimeDetail } from "../pages/AnimeDetail";
import { useNavigate } from "react-router-dom";
export const Top10 = ({ top10Anime }) => {
    const navigate = useNavigate();
     const [selectedTop10, setSelectedTop10] = useState('today');
    return (
        <>
            <div className="flex justify-between">
                <h2 className="text-red-500/70 text-2xl font-bold">Top 10</h2>
                <span className="flex gap-0.5">
                    <button className={(selectedTop10 == "today" ? "active " : "") + "hover:bg-[var(--color-accent)] ml-5 pl-10 pr-3 bg-[var(--color-primary)] [clip-path:polygon(45%_0,100%_0,100%_100%,0_100%)]"} onClick={() => setSelectedTop10('today')}>Day</button>
                    <button className={(selectedTop10 == "week" ? "active " : "") + "px-3 bg-[var(--color-primary)]"} onClick={() => setSelectedTop10('week')}>Week</button>
                    <button className={(selectedTop10 == "month" ? "active " : "") + " px-3 bg-[var(--color-primary)]"} onClick={() => setSelectedTop10('month')}>Month</button>
                </span>
            </div>
            <div className="bg-[var(--color-primary)] text-white/80">
                <ul className="flex flex-col pb-2">
                    {top10Anime[selectedTop10].map((anime, index) => {
                        return (
                            <li key={anime.id} className="mx-2 mt-2 bg-[var(--color-secondary)] flex items-center hover:cursor-pointer hover:bg-[var(--color-primary)] transition-colors duration-300" onClick={() => navigate('/anime-detail', {state: {animeId: anime.id}})}>
                                <span className="text-red-500/70 font-bold ml-2 mr-3">{anime.rank < 10 ? "0" + anime.rank : anime.rank}</span>
                                <img src={anime.poster} alt={anime.title} className="w-12 h-16 object-cover rounded-md mr-3" />
                                <div className="flex flex-col">
                                    <h3 className="text-md font-semibold">{anime.title.length > 25 ? anime.title.substring(0, 25) + "..." : anime.title}</h3>
                                    <p className="text-sm text-white/70">Sub: {anime.episodes.sub}</p>
                                </div>
                            </li>
                        )
                    })}
                </ul>
            </div>
        </>
    );
}