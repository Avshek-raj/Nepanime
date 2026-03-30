import { useQuery } from "@tanstack/react-query";
import { fetchAnime } from "../api/api";
import { Loading } from "../ui/Loading";
import { BiLeftArrow, BiRightArrow } from "react-icons/bi";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { SkeletonLoader } from "../ui/SkeletonLoader";

export const TopAnimes = () => {
    const navigate = useNavigate();
    const [currentPage, setCurrentPage] = useState(1);

    const { data, isPending, error } = useQuery({
        queryKey: ['trending-all', currentPage],
        queryFn: () => fetchAnime(`/trending?page=${currentPage}`)
    });

    const handleLeftArrowClick = () => {
        if (currentPage > 1) setCurrentPage(currentPage - 1);
    };

    const handleRightArrowClick = () => {
        setCurrentPage(currentPage + 1);
    };

    if (isPending) return <Loading />;

    if (error) return <p className="text-center text-white/70 mt-10">Error fetching trending anime.</p>;

    const trendingAnime = data?.data?.results || [];

    return (
        <div className="px-5 py-10 min-h-screen">
            <h1 className="text-3xl font-bold mb-8">Trending Anime</h1>
            
            {isPending ? (
                <SkeletonLoader count={15} type="grid" />
            ) : trendingAnime.length === 0 ? (
                <p className="text-center text-white/70">No trending anime found.</p>
            ) : (
                <>
                    <ul className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 sm:gap-4">
                        {trendingAnime.map((anime) => (
                            <li
                                key={anime.id}
                                onClick={() => navigate('/anime-detail', { state: { animeId: anime.id } })}
                                className="bg-[var(--color-primary)] cursor-pointer hover:scale-105 transition-transform duration-200 flex flex-col rounded-lg overflow-hidden"
                            >
                                <img className="w-full aspect-[3/4] object-cover" src={anime.image || anime.poster} alt={anime.title}></img>
                                <span className="text-center text-xs sm:text-sm mt-1 px-1 line-clamp-2">
                                    {anime.title}
                                </span>
                                <div className="flex justify-between mx-1 px-1 text-xs">
                                    <span className="text-left text-white/70">
                                        {anime.type || 'TV'}
                                    </span>
                                    <span className="text-right text-white/70">
                                        {anime.episodes ? `Ep: ${anime.episodes}` : 'N/A'}
                                    </span>
                                </div>
                            </li>
                        ))}
                    </ul>

                    <span className="text-center text-[var(--color-text)] flex items-center justify-center gap-2 sm:gap-3 px-2 mt-8 sm:mt-10 mb-10">
                        <div 
                            className={`bg-[var(--color-primary)] p-2 sm:p-2.5 cursor-pointer hover:scale-105 text-sm ${currentPage === 1 ? 'pointer-events-none opacity-50' : ''}`} 
                            onClick={handleLeftArrowClick}
                        >
                            <BiLeftArrow />
                        </div>
                        <span className="text-sm sm:text-base">{currentPage}</span>
                        <div 
                            className="bg-[var(--color-primary)] p-2 sm:p-2.5 cursor-pointer hover:scale-105 text-sm"
                            onClick={handleRightArrowClick}
                        >
                            <BiRightArrow />
                        </div>
                    </span>
                </>
            )}
        </div>
    );
};