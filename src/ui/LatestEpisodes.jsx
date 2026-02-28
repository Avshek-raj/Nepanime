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
        queryFn: () => fetchAnime(`recently-updated?page=${currentPage}`),
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
    const episodes  = showAll ? data.data.results : data.data.results.slice(0,15);

    return <>
        <h1 className="mx-2 sm:mx-3 mt-8 sm:mt-10 mb-5 text-lg sm:text-xl">Latest Episodes</h1>
        <ul className="mx-2 sm:mx-3 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 sm:gap-4">
            {episodes.map((latestEpisode, index) => {
                return (
                    <div key={latestEpisode.id} onClick={() => {navigate('/anime-detail', {state: {animeId: latestEpisode.id}})}}
                    className="bg-[var(--color-primary)] cursor-pointer hover:scale-105 transition-transform duration-200 flex flex-col rounded-lg overflow-hidden">
                        <img className="w-full aspect-[3/4] object-cover" src={latestEpisode.image}></img>
                        <span className="text-center text-xs sm:text-sm mt-1 px-1 line-clamp-2">
                            {latestEpisode.title}
                        </span>
                        <div className="flex justify-between mx-1 px-1 text-xs">
                            <span className="text-left text-white/70" >
                                {latestEpisode.type}
                            </span>
                            <span className="text-right text-white/70">
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