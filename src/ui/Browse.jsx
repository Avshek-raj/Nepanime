import { BiDownArrow, BiLeftArrow, BiRightArrow, BiUpArrow } from "react-icons/bi";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchAnime } from "../api/api";
import { SkeletonLoader } from "./SkeletonLoader";

export const Browse = ({page, result, currentPage, setCurrentPage, typeFilter}) => {
    const navigate = useNavigate();
    const [searchQuery, setSearchQuery] = useState('');

    const handleLeftArrowClick = () => {
        if (currentPage > 1) setCurrentPage(currentPage - 1);
    }

    const handleRightArrowClick = () => {
        setCurrentPage(currentPage + 1);
    }

    const handleSearchSubmit = (e) => {
        e.preventDefault();
        // Search is done in real-time, no action needed on submit
    };

    // Fetch search results when search query changes
    const { data: searchData, isPending: isSearchPending } = useQuery({
        queryKey: ['browse-search', searchQuery, typeFilter],
        queryFn: () => fetchAnime(`/${searchQuery}`),
        enabled: searchQuery.trim().length > 0
    });

    // Filter search results by type if needed
    const searchResults = searchData?.data?.results || [];
    const filteredSearchResults = typeFilter ? searchResults.filter(item => {
        const itemType = (item.type || 'TV').toLowerCase();
        const filterType = typeFilter.toLowerCase();
        return itemType.includes(filterType);
    }) : searchResults;

    // Show search results if query is active, otherwise show pagination results
    const displayResults = searchQuery.trim() ? filteredSearchResults : (result.data?.data?.results || []);
    const isLoading = searchQuery.trim() ? isSearchPending : result.isPending;

    return (
        <>
            <div className="mx-3 sm:mx-10 lg:mx-20">
                <form onSubmit={handleSearchSubmit} className="flex items-center justify-center">
                    <input 
                        className="text-sm sm:text-base lg:text-lg mt-10 sm:mt-20 bg-[var(--color-primary)] w-full sm:w-96 h-10 sm:h-12 px-4 sm:px-10 rounded-full" 
                        type="text" 
                        placeholder="Search item..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                </form>
                <h1 className="mt-8 sm:mt-10 mb-5 text-lg sm:text-xl">Browse {page}</h1>
                
                {isLoading && searchQuery.trim() ? (
                    <SkeletonLoader count={15} type="grid" />
                ) : displayResults.length === 0 && searchQuery.trim() ? (
                    <div className="text-center text-white/70 py-10">
                        <p>No {page.toLowerCase()} found matching "{searchQuery}"</p>
                        <button 
                            onClick={() => setSearchQuery('')}
                            className="mt-4 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition-colors text-sm"
                        >
                            Clear Search
                        </button>
                    </div>
                ) : (
                    <>
                        <ul className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 sm:gap-4 ">
                            {displayResults.map((item, index) => {
                                return (
                                    <div key={item.id} onClick={() => { navigate('/anime-detail', { state: { animeId: item.id } }) }}
                                        className="bg-[var(--color-primary)] cursor-pointer hover:scale-105 transition-transform duration-200 flex flex-col rounded-lg overflow-hidden">
                                        <img className="w-full aspect-[3/4] object-cover" src={item.image}></img>
                                        <div className="flex flex-col flex-1 p-2">
                                            <span className="text-center text-xs sm:text-sm line-clamp-2">
                                            {item.title}
                                        </span>
                                        <div className="flex justify-between text-xs mt-auto">
                                            <span className="text-left text-red-500" >
                                                {item.duration}
                                            </span>
                                            <span className="text-right text-red-500 line-clamp-1">
                                                {item.sub ? 'sub ': ""}
                                                {item.dub ? ' dub': ""}
                                            </span>
                                        </div>
                                        </div>
                                    </div>
                                )
                            })}
                        </ul>

                        {!searchQuery.trim() && (
                            <span className="text-center text-[var(--color-text)] flex items-center justify-center gap-2 sm:gap-3 px-2 mt-8 sm:mt-10 mb-10">
                                <div className={`bg-[var(--color-primary)] p-2 sm:p-2.5 cursor-pointer hover:scale-105 text-sm ${currentPage == 1 ? 'pointer-events-none opacity-50' : ''}`} onClick={() => handleLeftArrowClick()}>
                                    <BiLeftArrow />
                                </div>
                                <span className="text-sm sm:text-base">{currentPage}</span>
                                <div className={`bg-[var(--color-primary)] p-2 sm:p-2.5 cursor-pointer hover:scale-105 text-sm `} onClick={() => handleRightArrowClick()}>
                                    <BiRightArrow />
                                </div>
                            </span>
                        )}
                    </>
                )}
            </div>
        </>
    )
}