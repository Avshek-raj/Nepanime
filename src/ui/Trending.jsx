import { useQuery } from "@tanstack/react-query";
import { fetchAnime } from "../api/api";
import { Loading } from "./Loading";
import { useNavigate } from "react-router-dom";

export const Trending = ({ trendingAnime }) => {
    const navigate = useNavigate();
    return (
        <>
            <div className="mr-1 overflow-x-auto py-4 scrollbar-hidden">
                <h1 className="mx-3 text-[var(--color-text)]">Trending</h1>
                {/* scrollbar-thin scrollbar-thumb-gray-500 scrollbar-track-transparent hover:scrollbar-thumb-gray-400 transition-all duration-300"> */}
                <ul className="mt-2 flex px-1.25">
                    {trendingAnime.map((anime, index) => (
                        <div className="flex">
                            <span className="text-[160px] font-bold text-[var(--color-accent)]">{index + 1}</span>

                            <li
                                key={anime.id}
                                className="cursor-pointer hover:scale-101 transition-scale duration-200 p-1 min-w-[171px] bg-[var(--color-primary)] rounded-lg hover:bg-[var(--color-secondary)] transition-colors duration-300 shadow-md"
                            >
                                <div onClick={() => navigate('/anime-detail', {state:{animeId: anime.id}})}>
                                    <img
                                    src={anime.poster}
                                    alt={anime.title}
                                    className="w-auto h-60 object-cover rounded-t-lg"
                                />
                                <div className="p-3 text-center">
                                    <h2 className="text-xs font-semibold text-white/90">
                                        {anime.title.length > 39
                                            ? anime.title.substring(0, 39) + "..."
                                            : anime.title}
                                    </h2>
                                    {/* <p className="text-sm text-white/70">Type: {anime.type}</p>
              <p className="text-sm text-white/70">Aired: {anime.aired}</p> */}
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
