import { useQuery } from "@tanstack/react-query"
import { fetchAnime } from "../api/api";
import { useLocation } from "react-router-dom";
import { BiCalendar, BiPlay } from "react-icons/bi";
import { BsClockFill } from "react-icons/bs";
import { MdMic, MdSubtitles } from "react-icons/md";

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
                <div className="">
                    <div className="w-full h-screen flex m-20 justify-between">
                        <div className="w-1/3">
                            <img src={animeDetail.poster} alt={animeDetail.title} className="w-70 h-100 rounded-md" />
                        </div>
                        <div>
                            <h1 className="text-4xl font-bold mb-5">{animeDetail.title}</h1>
                            <p className="">MAL_score:{animeDetail.MAL_score}</p>
                            <p className="">18+:{animeDetail.is18Plus}</p>
                            <p className="">18+:{animeDetail.rating}</p>
                            <div className="flex mx-4 items-center">
                                    <p className="">genres:{animeDetail.genres}</p>
                                </div>
                            <div className="flex mx-4 items-center">
                                    <p className="">premiered:{animeDetail.premiered}</p>
                                </div>
                                <div className="flex mx-4 items-center">
                                    <p className="">studios:{animeDetail.studios}</p>
                                    <p className="">producers:{animeDetail.producers}</p>
                                </div>
                            <span className="flex items-center my-2">
                                <div className="flex mr-4">
                                    <BiPlay className="w-6 h-6" />
                                    <p className="">{animeDetail.type}</p>
                                </div>
                                 <div className="flex mx-4 items-center">
                                    <BsClockFill className="w-4 h-4" />
                                    <p className="">{animeDetail.duration}</p>
                                </div>

                                <div className="flex mx-4 items-center">
                                    <BiCalendar className="w-4 h-4" />
                                    <p>{animeDetail.aired.from}</p>
                                    <p className="m-3">-</p>
                                    <BiCalendar className="w-4 h-4" />
                                    <p>{animeDetail.aired.to ? animeDetail.aired.to : "-----"}</p>
                                    <p className="m-5">{animeDetail.status}</p>
                                    
                                </div>

                                <p className="ml-4 bg-green-500 rounded-lg px-1">{animeDetail.quality}</p> 
                                
                                <span className="mx-2 bg-yellow-500 rounded-lg px-1 flex flex-row items-center">
                                    <MdSubtitles className="w-4 h-4" />
                                    <p>{animeDetail.episodes.sub}</p>
                                </span>
                                <span className="bg-blue-500 rounded-lg px-1 flex flex-row items-center">
                                    <MdMic className="w-4 h-4" />
                                    <p>{animeDetail.episodes.dub}</p>
                                </span>
                            </span>
                        </div>
                    </div>
                </div>
            }
        </>
    )
}