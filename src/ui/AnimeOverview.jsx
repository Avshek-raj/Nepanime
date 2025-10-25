import { BiCalendar, BiPlay } from "react-icons/bi";
import { BsClockFill } from "react-icons/bs";
import { MdMic, MdSubtitles } from "react-icons/md";

export const AnimeOverview = ({ animeDetail }) => {
    return (
        <>
            <div className="w-1/6">
                <img src={animeDetail.poster} alt={animeDetail.title} className="w-auto h-auto rounded-md" />
            </div>
            <div className="w-5/6 gap-4 px-5">
                <h1 className="text-4xl font-bold ">{animeDetail.title}</h1>
                <div className="mt-5 flex items-center">
                    {animeDetail.genres.map((genre, index) => (
                        <span key={index} className="mx-1 bg-[var(--color-secondary)] px-3 rounded-lg px-1">{genre}</span>
                    ))}
                </div>
                <span className="flex items-center">
                    <div className="flex mr-4">
                        <BiPlay className="w-6 h-6" />
                        <p className="">{animeDetail.type}</p>
                    </div>
                    <div className="flex mr-4 bg-green-500 rounded-lg px-2">
                        <p className="">MAL : {animeDetail.MAL_score == "?" || !animeDetail.MAL_score ? "0.0" : animeDetail.MAL_score}</p>
                    </div>
                    <div className="flex mx-4 items-center">
                        <BsClockFill className="w-4 h-4" />
                        <p className="m-1">{animeDetail.duration}</p>
                    </div>

                    <div className="flex mx-4 items-center">
                        <BiCalendar className="w-4 h-4" />
                        <p className="m-1">{animeDetail.aired.from}</p>
                        <p className="m-3">-</p>
                        <BiCalendar className="w-4 h-4" />
                        <p className="m-1" >{animeDetail.aired.to ? animeDetail.aired.to : "-----"}</p>
                        <p className="m-5">{animeDetail.status}</p>

                    </div>

                    <p className="ml-4 bg-green-500 rounded-lg px-1">{animeDetail.quality}</p>

                    <span className="gap-1 mx-2 bg-yellow-500 rounded-lg px-1 flex flex-row items-center">
                        <MdSubtitles className="w-4 h-4" />
                        <p>{animeDetail.episodes.sub}</p>
                    </span>
                    <span className="gap-1 bg-blue-500 rounded-lg px-1 flex flex-row items-center">
                        <MdMic className="w-4 h-4" />
                        <p>{animeDetail.episodes.dub}</p>
                    </span>
                    <span className="mx-2 bg-red-500 rounded-lg px-1 flex flex-row items-center">
                        <p>{animeDetail.is18Plus ? "18+" : ""}</p>
                    </span>
                </span>
                <p className="font-bold">Overview</p>
                <p className="">{animeDetail.synopsis}</p>
                <p className="mt-5">Rating: {animeDetail.rating}</p>
                <p className="">Premiered: {animeDetail.premiered}</p>
                <p className="">Studios: {animeDetail.studios}</p>
                <p className="">Producers: {animeDetail.producers}</p>
            </div>
        </>
    );
}