import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { BiDownArrow, BiLeftArrow, BiRightArrow, BiUpArrow } from "react-icons/bi"
import { fetchAnime } from "../api/api";
import { Loading } from "./Loading";
import { useNavigate, useNavigation } from "react-router-dom";

export const LatestEpisodes = ({ latestEpisodes}) => {
    console.log(latestEpisodes)
    const [showAll, setShowAll] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const navigate = useNavigate();

    const {data, isPending, error} = useQuery({
        queryKey: ['latest-episodes', currentPage],
        queryFn: () => fetchAnime(`recent-episodes?page=${currentPage}`),
        initialData: latestEpisodes,
    })


    const handleLeftArrowClick = () => {
            setCurrentPage(currentPage -1);
    }
    const handleRightArrowClick = () => {
        setCurrentPage(currentPage +1);
    }

    if (isPending) return <Loading/>;
    if (error) return <p>Error loading episodes.</p>;
    const episodes  = showAll ? data.data.results : data.data.results.slice(0,18);

    return <>
        <h1 className="mt-10 mb-5">Latest Episodes</h1>
        <ul className="flex flex-wrap gap-2.5 ">
            {episodes.map((latestEpisode, index) => {
                return (
                    <div key={latestEpisode.id} onClick={() => {navigate('/anime-detail', {state: {animeId: latestEpisode.id}})}}
                    className="bg-[var(--color-primary)] w-40 h-70 cursor-pointer hover:scale-105 flex flex-col">
                        <img className="h-59" src={latestEpisode.image}></img>
                        <span className="text-center text-sm mt-1">
                            {latestEpisode.title.length > 20 ? latestEpisode.title.substring(0, 20) + "..." : latestEpisode.title}
                        </span>
                        <div className="flex justify-between mx-2  text-xs">
                            <span className="text-left disabled:text-gray-500" >
                                {latestEpisode.type}
                            </span>
                            <span className="text-right ">
                                Ep: {latestEpisode.sub}
                            </span>
                        </div>
                    </div>
                )
            })}
        </ul>
        {showAll ?
            <span className="text-right mt-1 text-[var(--color-text)]  flex items-center justify-end gap-3 px-2">
                <span className="flex items-center justify-end gap-3 px-2 cursor-pointer hover:text-[17px]"onClick={() => (setShowAll(false))}  >
                    view less
                <div className="bg-[var(--color-primary)] p-2.5 ">
                    <BiUpArrow />
                </div>
                    </span>    
                <div className={`bg-[var(--color-primary)] p-2.5 cursor-pointer hover:scale-105 ${currentPage == 1 ? 'pointer-events-none opacity-50' : ''}`} onClick={() => handleLeftArrowClick()}>
                    <BiLeftArrow />
                </div>
                {currentPage}
                <div className={`bg-[var(--color-primary)] p-2.5 cursor-pointer hover:scale-105 `} onClick={() => handleRightArrowClick()}>
                    <BiRightArrow />
                </div>

            </span>
            :
            <span className="text-right mt-1 text-[var(--color-text)] cursor-pointer hover:text-[17px] flex items-center justify-end gap-3 px-2"
                onClick={() => (setShowAll(true))}  >view more
                <div className="bg-[var(--color-primary)] p-2.5">
                    <BiDownArrow />
                </div>

            </span>
        }


    </>
}