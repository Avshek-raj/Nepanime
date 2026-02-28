import { BiDownArrow, BiLeftArrow, BiRightArrow, BiUpArrow } from "react-icons/bi";
import { useNavigate } from "react-router-dom";

export const Browse = ({page, result, currentPage, setCurrentPage}) => {
    const navigate = useNavigate();
    const handleLeftArrowClick = () => {
        setCurrentPage(currentPage - 1);
    }
    const handleRightArrowClick = () => {
        setCurrentPage(currentPage + 1);
    }
    return (
        <>
            <div className="mx-3 sm:mx-10 lg:mx-20">
                <div className="flex items-center justify-center">
                    <input className="text-sm sm:text-base lg:text-lg mt-10 sm:mt-20 bg-[var(--color-primary)] w-full sm:w-96 h-10 sm:h-12 px-4 sm:px-10 rounded-full" type="text" placeholder="Search item...">
                    </input>
                </div>
                <h1 className="mt-8 sm:mt-10 mb-5 text-lg sm:text-xl">Browse {page}</h1>
                <ul className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 sm:gap-4 ">
                    {result.data.data.results.map((item, index) => {
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
                {
                    <span className="text-center text-[var(--color-text)] flex items-center justify-center gap-2 sm:gap-3 px-2 mt-8 sm:mt-10 mb-10">
                        <div className={`bg-[var(--color-primary)] p-2 sm:p-2.5 cursor-pointer hover:scale-105 text-sm ${currentPage == 1 ? 'pointer-events-none opacity-50' : ''}`} onClick={() => handleLeftArrowClick()}>
                            <BiLeftArrow />
                        </div>
                        <span className="text-sm sm:text-base">{currentPage}</span>
                        <div className={`bg-[var(--color-primary)] p-2 sm:p-2.5 cursor-pointer hover:scale-105 text-sm `} onClick={() => handleRightArrowClick()}>
                            <BiRightArrow />
                        </div>

                    </span>

                }
            </div>
        </>
    )
}