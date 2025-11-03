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
            <div className="mx-20">
                <div className="flex items-center justify-center">
                    <input className="text-xl mt-20 bg-[var(--color-primary)] w-200 h-12 px-10 rounded-full" type="text" placeholder="Search item...">
                    </input>
                </div>
                <h1 className="mt-10 mb-5">Browse {page}</h1>
                <ul className="flex flex-wrap gap-4 ">
                    {result.data.data.results.map((item, index) => {
                        return (
                            <div key={item.id} onClick={() => { navigate('/anime-detail', { state: { animeId: item.id } }) }}
                                className="bg-[var(--color-primary)] w-40 h-75 cursor-pointer hover:scale-105 flex flex-col">
                                <img className="h-59" src={item.image}></img>
                                <div className="flex flex-col ">
                                    <span className="text-center text-sm mt-1">
                                    {item.title.length > 40 ? item.title.substring(0, 40) + "..." : item.title}
                                </span>
                                <div className="flex justify-between mx-2  text-xs">
                                    <span className="text-left text-red-500 disabled:text-gray-500" >
                                        {item.duration}
                                    </span>
                                    <span className="text-right gap-2 text-red-500">
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
                    <span className="text-right mt-1 text-[var(--color-text)]  flex items-center justify-center gap-3 px-2 mt-10 mb-10">
                        <div className={`bg-[var(--color-primary)] p-2.5 cursor-pointer hover:scale-105 ${currentPage == 1 ? 'pointer-events-none opacity-50' : ''}`} onClick={() => handleLeftArrowClick()}>
                            <BiLeftArrow />
                        </div>
                        {currentPage}
                        <div className={`bg-[var(--color-primary)] p-2.5 cursor-pointer hover:scale-105 `} onClick={() => handleRightArrowClick()}>
                            <BiRightArrow />
                        </div>

                    </span>

                }
            </div>
        </>
    )
}