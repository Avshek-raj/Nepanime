import { useQueries, useQuery } from "@tanstack/react-query"
import { fetchAnime } from "../api/api";
import { useEffect, useState, useRef } from "react";
import '../index.css';
import { BiCalendar, BiPlay, BiLeftArrow, BiRightArrow } from "react-icons/bi";
import { BsClock, BsClockFill } from "react-icons/bs";
import { FaClock } from "react-icons/fa";
import { SiDatefns, SiDatev } from "react-icons/si";
import { MdMic, MdSubtitles } from "react-icons/md";
import { Spotlight } from "../ui/Spotlight";
import { Trending } from "../ui/Trending";
import { Top10 } from "../ui/Top10";
import { useNavigate } from "react-router-dom";
import { Loading } from "../ui/Loading";
import { LatestEpisodes } from "../ui/LatestEpisodes";
import { EstimatedTime } from "../ui/EstimatedTime";
import { AnimeCategory } from "../ui/AnimeCategory";
import DevNoticeModal from "../ui/DevNoticeModel";

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
    const results = useQueries({
        queries: [{
            queryKey: ['spotlight-animes'],
            queryFn: async () => getAnime('spotlight')
        },
        {
            queryKey: ['recent-episodes'],
            queryFn: async () => getAnime('recent-episodes')
        },
        {
            queryKey: ['trending'],
            queryFn: async () => getAnime('trending')
        },
        {
            queryKey: ['top10'],
            queryFn: async () => await fetchAnime('/top10')
        }]
    });
    const [spotlightQuery, latestEpisodeQuery, trendingQuery, top10Query] = results;
    const [spotlightIndex, setSpotlightIndex] = useState(0);
    const timeoutRef = useRef(null);

    const spotlightCount = spotlightQuery.data ? spotlightQuery.data.results.length : 0;

    // Function to start auto-scroll timer
    const startAutoScroll = (currentIndex) => {
        if (timeoutRef.current) clearTimeout(timeoutRef.current);
        
        timeoutRef.current = setTimeout(() => {
            setSpotlightIndex((currentIndex + 1) % spotlightCount);
        }, 5000);
    };

    // Auto-scroll effect
    useEffect(() => {
        if (spotlightCount > 0) {
            startAutoScroll(spotlightIndex);
        }
        
        return () => {
            if (timeoutRef.current) clearTimeout(timeoutRef.current);
        };
    }, [spotlightIndex, spotlightCount]);

    const handlePrevSpotlight = () => {
        const newIndex = (spotlightIndex - 1 + spotlightCount) % spotlightCount;
        setSpotlightIndex(newIndex);
        startAutoScroll(newIndex); // Reset timer on manual navigation
    };

    const handleNextSpotlight = () => {
        const newIndex = (spotlightIndex + 1) % spotlightCount;
        setSpotlightIndex(newIndex);
        startAutoScroll(newIndex); // Reset timer on manual navigation
    };

    const handleDotClick = (idx) => {
        setSpotlightIndex(idx);
        startAutoScroll(idx); // Reset timer on manual navigation
    };

    if (spotlightQuery.isPending || top10Query.isPending || latestEpisodeQuery.isPending || trendingQuery.isPending)
        return <Loading />;

    if (spotlightQuery.isError || top10Query.isError || trendingQuery.isError)
    return <p>Error fetching data</p>;

    const spotlightAnime = spotlightQuery.data ? spotlightQuery.data.results[spotlightIndex] : [];
    const trendingAnime = trendingQuery.data ? trendingQuery.data.results : [];
    const top10Anime = top10Query.data ? (top10Query.data.data || top10Query.data) : {};

    return (<>
            <DevNoticeModal/>
            <div className="px-2 sm:px-5 py-5 sm:py-10 min-h-screen w-full flex flex-col lg:flex-row justify-between gap-5">
                <div className="flex flex-col lg:w-3/4 w-full">
                    <div className="relative flex items-center gap-2">
                        <button 
                            onClick={handlePrevSpotlight}
                            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-colors duration-200"
                        >
                            <BiLeftArrow className="w-6 h-6" />
                        </button>
                        <Spotlight spotlightAnime={spotlightAnime} spotlightIndex={spotlightIndex} />
                        <button 
                            onClick={handleNextSpotlight}
                            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-colors duration-200"
                        >
                            <BiRightArrow className="w-6 h-6" />
                        </button>
                    </div>
                    <div className="flex justify-center gap-2 mt-2">
                        {Array.from({ length: spotlightCount }).map((_, idx) => (
                            <button
                                key={idx}
                                onClick={() => handleDotClick(idx)}
                                className={`w-2 h-2 rounded-full transition-all duration-200 ${
                                    idx === spotlightIndex ? 'bg-red-500 w-6' : 'bg-white/50 hover:bg-white/70'
                                }`}
                            />
                        ))}
                    </div>
                    {trendingAnime.length > 0 && <Trending trendingAnime={trendingAnime} />}
                    <LatestEpisodes latestEpisodes={latestEpisodeQuery} />
                    <AnimeCategory />
                </div>
                <div className="lg:w-1/4 w-full ">
                    <Top10 top10Anime={top10Anime} />
                    <EstimatedTime/>
                </div>
            </div>
    </>)
}