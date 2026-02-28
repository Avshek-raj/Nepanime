import { BiCalendar, BiPlay } from "react-icons/bi";
import { BsClockFill } from "react-icons/bs";
import { MdMic, MdSubtitles } from "react-icons/md";

export const AnimeOverview = ({ animeDetail }) => {
    return (
        <>
            <div className="flex flex-col md:flex-row gap-4 md:gap-5">
                <div className="w-full md:w-1/6 flex-shrink-0">
                    <img src={animeDetail.image} alt={animeDetail.title} className="w-full md:w-auto h-auto rounded-md" />
                </div>
                <div className="w-full md:w-5/6 gap-4">
                    <h1 className="text-2xl md:text-4xl font-bold ">{animeDetail.title}</h1>
                    <div className="mt-3 md:mt-5 flex flex-wrap items-center gap-2">
                        {animeDetail.genres.map((genre, index) => (
                            <span key={index} className="bg-[var(--color-secondary)] px-2 md:px-3 rounded-lg text-xs md:text-sm">{genre}</span>
                        ))}
                    </div>
                    <span className="flex flex-wrap items-center gap-2 md:gap-4 my-3 md:my-5 text-xs md:text-base">
                        <div className="flex items-center">
                            <BiPlay className="w-4 md:w-6 h-4 md:h-6" />
                            <p className="ml-1">{animeDetail.type}</p>
                        </div>
                        <div className="flex items-center">
                            <BiCalendar className="w-4 md:w-4 h-4 md:h-4" />
                            <p className="ml-1">{animeDetail.season}</p>
                        </div>

                        <span className="flex items-center bg-yellow-500 rounded-lg px-2 md:px-1">
                            <MdSubtitles className="w-3 md:w-4 h-3 md:h-4" />
                            <p className="ml-1 text-xs">{animeDetail.hasSub ? 'sub': ""}</p>
                        </span>
                        <span className="flex items-center bg-blue-500 rounded-lg px-2 md:px-1">
                            <MdMic className="w-3 md:w-4 h-3 md:h-4" />
                            <p className="ml-1 text-xs">{animeDetail.hasDub? 'dub': ""}</p>
                        </span>
                    </span>
                    <p className="font-bold text-sm md:text-base mt-2">Overview</p>
                    <p className="text-xs md:text-sm leading-relaxed">{animeDetail.description}</p>
                </div>
            </div>
        </>
    );
}