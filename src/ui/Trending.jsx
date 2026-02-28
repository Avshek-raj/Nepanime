import { useQuery } from "@tanstack/react-query";
import { fetchAnime } from "../api/api";
import { Loading } from "./Loading";
import { useNavigate } from "react-router-dom";

export const Trending = ({ trendingAnime }) => {
    const navigate = useNavigate();
    return (
        <>
            <div className="mr-1 overflow-x-auto py-3 sm:py-4 scrollbar-hidden">
                <h1 className="mx-2 sm:mx-3 text-[var(--color-text)] text-lg sm:text-xl">Trending</h1>
                <ul className="mt-2 flex px-1">
                    {trendingAnime.map((anime, index) => (
                        <div className="flex items-center" key={anime.id}>
                            <span className="text-6xl sm:text-8xl md:text-[120px] font-bold text-[var(--color-accent)] mr-2 sm:mr-4">{index + 1}</span>

                            <li
                                className="cursor-pointer hover:scale-105 transition-scale duration-200 p-1 min-w-[120px] sm:min-w-[150px] md:min-w-[171px] bg-[var(--color-primary)] rounded-lg hover:bg-[var(--color-secondary)] transition-colors duration-300 shadow-md"
                            >
                                <div onClick={() => navigate('/anime-detail', {state:{animeId: anime.id}})}>
                                    <img
                                    src={anime.poster}
                                    alt={anime.title}
                                    className="w-full h-32 sm:h-48 md:h-60 object-cover rounded-t-lg"
                                />
                                <div className="p-2 text-center">
                                    <h2 className="text-xs sm:text-sm font-semibold text-white/90">
                                        {anime.title.length > 25
                                            ? anime.title.substring(0, 25) + "..."
                                            : anime.title}
                                    </h2>
                                </div>
                                </div>
                            </li>
                        </div>
                    ))}
                </ul>
            </div>

        </>

    );
};
