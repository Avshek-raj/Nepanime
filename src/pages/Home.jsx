import { useQuery } from "@tanstack/react-query"
import { fetchAnime } from "../api/api";
import { useEffect, useState } from "react";
import '../index.css';
import { BiCalendar, BiPlay } from "react-icons/bi";
import { BsClock, BsClockFill } from "react-icons/bs";
import { FaClock } from "react-icons/fa";
import { SiDatefns, SiDatev } from "react-icons/si";
import { MdMic, MdSubtitles } from "react-icons/md";
import { Spotlight } from "../ui/Spotlight";
import { Trending } from "../ui/Trending";
import { Top10 } from "../ui/Top10";
import { useNavigate } from "react-router-dom";

const getAnime = async (endpoint) => {
    try {
        const response = await fetchAnime(endpoint);
        if (response.status === 200) {
            return response.data;
        } else {
            return [];
        }
    } catch (e) {
        console.error("Error fetching anime data:", e);
    }
}

export const Home = () => {
    const { data, isPending } = useQuery({
        queryKey: ['top-airing-animes'],
        queryFn: async () => getAnime('/home')
    });
    const [spotlightIndex, setSpotlightIndex] = useState(0);
    useEffect(() => {
        setTimeout(() => {
            setSpotlightIndex((prevIndex) => (prevIndex + 1) % 3);
        }, 10000);
    }, [spotlightIndex]);
    const spotlightAnime = data ? data.data["spotlight"][spotlightIndex] : [];
    const top10Anime = data ? data.data["top10"] : [];

   
    return (<>
        {isPending ? <div>Loading...</div> :
            <div className="px-5 py-10 min-h-screen w-full flex justify-between gap-5">
                <div className="flex flex-col w-3/4 ">
                    <Spotlight spotlightAnime={spotlightAnime} />
                    <Trending trendingAnime={data ? data.data["trending"] : []} />
                </div>
                <div className="w-1/4 ">
                    <Top10 top10Anime={top10Anime} />
                </div>
            </div>
        }
    </>)
}