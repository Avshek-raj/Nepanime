import { useQueries } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom"
import { fetchAnime } from "../api/api";
import { MdAllInclusive, MdAllOut } from "react-icons/md";
import { GiAllForOne } from "react-icons/gi";

export const AnimeCategory = () => {
    const navigate = useNavigate();
    const results = useQueries({
        // [latestCompleted, topUpcoming, MostPopular, MostFavourite]
        queries: [
            {
                queryKey: ['latest-completed'],
                queryFn: () => fetchAnime('/latest-completed')
            },
            {
                queryKey: ['top-upcoming'],
                queryFn: () => fetchAnime('/top-upcoming')
            },
            {
                queryKey: ['most-popular'],
                queryFn: () => fetchAnime('/most-popular')
            },
            {
                queryKey: ['most-favorite'],
                queryFn: () => fetchAnime('/most-favorite')
            }
        ]
    })
    const getCategoryInfo = (idx) => {
        let animeName = '';
        let key = '';
        switch(idx){
            case 0:
                animeName = 'Latest Completed';
                key='latest-completed';
                break;
            case 1:
                animeName = 'Top Upcoming';
                key='top-upcoming';
                break;
            case 2:
                animeName = 'Most Popular'
                key='most-popular';
                break;
            default:
                animeName = 'Most Favourite'
                key='most-favourite';
                break;
        }
        return {animeName, key};
    }
    let animeList = [];
    return <>
        {
            results.map((result, idx) => {
                console.log(result.data)
                return (
                <>
                    <div className="ml-3 flex justify-between items-center mt-5">
                        <h1 className="">{getCategoryInfo(idx).animeName}</h1>
                        {/* <span className="flex items-center text-center mt-1 text-[var(--color-text)] cursor-pointer hover:text-[17px] gap-3 px-2"
                            onClick={() => (navigate(`/category/${getCategoryInfo(idx).key}`, {state: {categoryInfo: getCategoryInfo(idx), animeList: result}}))}  >view all
                            <div className=" bg-[var(--color-primary)] p-2.5">
                                <MdAllOut />
                            </div>

                        </span> */}
                    </div>
                    <div className="ml-3 mr-1 overflow-x-auto py-4 scrollbar-hidden">
                        {/* scrollbar-thin scrollbar-thumb-gray-500 scrollbar-track-transparent hover:scrollbar-thumb-gray-400 transition-all duration-300"> */}
                        <ul className="mt-2 flex gap-2">
                            {result.data && result.data.data && result.data.data.results.length > 1 ? result.data.data.results.map((anime, index) => (
                                // <div className="flex">

                                <li
                                    key={anime.id}
                                    className="cursor-pointer hover:scale-101 transition-scale duration-200 p-1 min-w-[171px] bg-[var(--color-primary)] rounded-lg hover:bg-[var(--color-secondary)] transition-colors duration-300 shadow-md"
                                >
                                    <div onClick={() => navigate('/anime-detail', { state: { animeId: anime.id } })}>
                                        <img
                                            src={anime.image}
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
                                // </div>
                            ))
                                :
                                <ul className="flex flex-row gap-4">
                                    {Array.from({ length: 10 }).map((_, index) => (
                                        <li key={index} className="flex flex-col bg-[var(--color-primary)] w-40 h-60 items-center justify-top">
                                            <div className="flex bg-gray-100 w-38 h-50 object-cover  animate-pulse p-1">
                                            </div>
                                            <span className="text-center mt-2 bg-gray-100 w-35 h-3 animate-pulse rounded-md"></span>
                                            <span className="text-center mt-1 bg-gray-100 w-20 h-3 animate-pulse rounded-md"></span>
                                        </li>
                                    ))}
                                </ul>
                            }
                        </ul>
                    </div></>
            )})

        }
    </>
}