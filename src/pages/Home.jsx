import { useQueries, useQuery } from "@tanstack/react-query"
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
import { Loading } from "../ui/Loading";
import { LatestEpisodes } from "../ui/LatestEpisodes";
import { EstimatedTime } from "../ui/EstimatedTime";
import { AnimeCategory } from "../ui/AnimeCategory";

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
            queryKey: ['latest-episode'],
            queryFn: async () => getAnime('recent-episodes')
        },
        {
            queryKey: ['hianime'],
            queryFn: async () => await fetchAnime('home', 'hianime')
        }]
    });
    const [spotlightQuery, latestEpisodeQuery, hianimeQuery] = results;
    const [spotlightIndex, setSpotlightIndex] = useState(0);
    
    useEffect(() => {
        setTimeout(() => {
            setSpotlightIndex((prevIndex) => (prevIndex + 1) % (spotlightQuery.data ? spotlightQuery.data.results.length : 8));
        }, 10000);
    }, [spotlightIndex]);
    if (spotlightQuery.isPending || hianimeQuery.isPending || latestEpisodeQuery.isPending)
        return <Loading />;

    if (spotlightQuery.isError || hianimeQuery.isError)
    return <p>Error fetching data</p>;

    const spotlightAnime = spotlightQuery.data ? spotlightQuery.data.results[spotlightIndex] : [];
    const top10Anime = hianimeQuery.data ? hianimeQuery.data.data.data["top10"] : [];
    const trendingAnime = hianimeQuery.data ? hianimeQuery.data.data.data["trending"] : [];
    const latestCompleted = hianimeQuery.data ? hianimeQuery.data.data.data["latestCompleted"] : [];
    const topUpcoming = hianimeQuery.data ? hianimeQuery.data.data.data["topUpcoming"] : [];
    const mostPopular = hianimeQuery.data ? hianimeQuery.data.data.data["mostPopular"] : [];
    const mostFavorite = hianimeQuery.data ? hianimeQuery.data.data.data["mostFavorite"] : [];


    return (<>
            <div className="px-5 py-10 min-h-screen w-full flex justify-between gap-5">
                <div className="flex flex-col w-3/4 ">
                    <Spotlight spotlightAnime={spotlightAnime} />
                    <Trending trendingAnime={trendingAnime}/>
                    <LatestEpisodes latestEpisodes={latestEpisodeQuery} />
                    <AnimeCategory />
                    {/* <h1 className="mt-10">Top Upcoming</h1>
                    <AnimeCategory animeList={topUpcoming}/>
                    <h1 className="mt-10">Most Popular</h1>
                    <AnimeCategory animeList={mostPopular}/>
                    <h1 className="mt-10">Most favourite</h1>
                    <AnimeCategory animeList={mostFavorite}/> */}
                </div>
                <div className="w-1/4 ">
                    <Top10 top10Anime={top10Anime} />
                    <EstimatedTime/>
                </div>
            </div>
    </>)
}