import { useQuery } from "@tanstack/react-query"
import { fetchAnime } from "../api/api";
import { useLocation } from "react-router-dom";
import { BiCalendar, BiPlay } from "react-icons/bi";
import { BsClockFill } from "react-icons/bs";
import { MdMic, MdSubtitles } from "react-icons/md";
import { AnimeOverview } from "../ui/AnimeOverview";
import { AnimeEpisodes } from "../ui/AnimeEpisodes";

const fetchAnimeDetail = async (animeId) => {
    try {
        const response = await fetchAnime(`/anime/${animeId}`);
        if (response.status === 200) {
            return response.data;
        } else {
            return null;
        }
    } catch (e) {
        console.error("Error fetching anime detail:", e);
    }
}

export const AnimeDetail = () => {
    const location = useLocation();
    const { animeId } = location.state;
    const { data, isPending, error } = useQuery({
        queryKey: ['anime-detail', animeId],
        queryFn: async () => {
            return fetchAnimeDetail(animeId);
        }
    });
    const animeDetail = data ? data.data : [];
    console.log(data);
    return (
        <>
            {isPending ? <div>Loading...</div> :
                <div className="w-full min-h-screen flex flex-col p-10">
                    <div className="p-5 flex justify-between bg-[var(--color-primary)] rounded-md ">
                        <AnimeOverview animeDetail={animeDetail} />
                    </div>
                    <div className="my-5 flex justify-between  rounded-md gap-5">
                        <div className="w-4/5 bg-[var(--color-primary)]"></div>
                        <div className="w-1/5 bg-[var(--color-primary)] p-5 rounded-md">
                            <AnimeEpisodes animeId={animeDetail.id} />
                        </div>
                    </div>
                </div>
            }
        </>
    )
}