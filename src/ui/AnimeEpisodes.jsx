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
    setEpisodeIdToPlay(episodes[0].id);
    return (
        <>
            <div className="">
                <span className="bg-[var(--color-secondary)] pr-10 pl-5 inline-block [clip-path:polygon(0_0,80%_0,100%_100%,0_100%)]">
                    <h2 className="text-red-500/70 text-2xl font-bold">Episodes</h2>
                </span>
                <span>{episodes.length}</span>
                <div className="bg-[var(--color-secondary)] p-5 rounded-md h-[565px] overflow-y-auto ">
                    <ul className="divide-y divide-[var(--color-text)]">
                        {episodes.map((episode) => (
                            <li key={episode.id} className="mb-2 p-2  hover:bg-[var(--color-primary)] transition-colors duration-300 cursor-pointer" onClick={() => setEpisodeIdToPlay(episode.id)}>
                                <span className="text-red-500">{episode.number}. </span>
                                <span>{episode.title}</span>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </>
    );
}