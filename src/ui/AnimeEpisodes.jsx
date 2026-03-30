import { useEffect } from "react";
import { useQueries, useQuery } from "@tanstack/react-query";
import { fetchAnime } from "../api/api";
import { Loading } from "./Loading";


const fetchEpisodes = async (animeId) => {
    try {
        const response = await fetchAnime(`/episodes/${animeId}`);
        if (response.status === 200) {
            return response.data;
        } else {
            return [];
        }
    } catch (e) {
        console.error("Error fetching anime episodes:", e);
    }
}
export const AnimeEpisodes = ({ episodes, episodeIdToPlay, setEpisodeIdToPlay }) => {
    // Set first episode as default only once
    useEffect(() => {
        if (episodes && episodes.length > 0 && !episodeIdToPlay) {
            setEpisodeIdToPlay(episodes[0].id);
        }
    }, [episodes, episodeIdToPlay, setEpisodeIdToPlay]);
    return (
        <>
            <div className="">
                <span className="bg-[var(--color-secondary)] px-3 md:px-5 inline-block rounded">
                    <h2 className="text-red-500/70 text-lg md:text-2xl font-bold">Episodes</h2>
                </span>
                <span className="ml-2 text-xs md:text-base">{episodes.length}</span>
                <div className="bg-[var(--color-secondary)] p-3 md:p-5 rounded-md h-[400px] md:h-[565px] overflow-y-auto mt-2">
                    <ul className="divide-y divide-[var(--color-text)]">
                        {episodes.map((episode) => (
                            <li key={episode.id} className="mb-1 p-2 text-xs md:text-sm hover:bg-[var(--color-primary)] transition-colors duration-300 cursor-pointer" onClick={() => {
                                setEpisodeIdToPlay(episode.id);
                                window.scrollTo(0, 0);
                            }}>
                                <span className="text-red-500">{episode.number}. </span>
                                <span className="line-clamp-2">{episode.title}</span>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </>
    );
}