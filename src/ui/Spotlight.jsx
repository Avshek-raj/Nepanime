
import '../index.css';
import { BiCalendar, BiPlay } from "react-icons/bi";
import { BsClock, BsClockFill } from "react-icons/bs";
import { FaClock } from "react-icons/fa";
import { SiDatefns, SiDatev } from "react-icons/si";
import { MdMic, MdSubtitles } from "react-icons/md";
import { useNavigate } from 'react-router-dom';

export const Spotlight = ({ spotlightAnime }) => {
    const navigate = useNavigate();
    return (
        <div className="bg-[var(--color-primary)] flex flex-col h-115">
            <div
                className="overflow-hidden m-5 flex-1 bg-cover bg-center bg-no-repeat items-center flex"
                style={{
                    backgroundImage: `url(${spotlightAnime["banner"]})`,
                }}
            >
                <div id={spotlightAnime.id} className="m-5 bg-white/50 text-black/90 flex flex-col  p-5 rounded-md w-1/2">
                    <div className='flex'>
                        <p className="text bg-red-500 flex flex-row rounded-xl px-2 mr-2">#{spotlightAnime.rank} </p>
                        <p>spotlight</p>
                    </div>
                    <h1 className="">{spotlightAnime.title.length > 50 ? spotlightAnime.title.substring(0, 50) + "..." : spotlightAnime.title}</h1>
                    <span className="flex items-center my-2">
                        <div className="flex mr-4">
                            <BiPlay className="w-6 h-6" />
                            <p className="">{spotlightAnime.type}</p>
                        </div>
                        <div className="flex mx-4 items-center">
                            <BsClockFill className="w-4 h-4" />
                            <p className="">{spotlightAnime.duration}</p>
                        </div>

                        <div className="flex mx-4 items-center">
                            <BiCalendar className="w-4 h-4" />
                            <p>{spotlightAnime.releaseDate}</p>
                        </div>

                        <p className="ml-4 bg-green-500 rounded-lg px-1">{spotlightAnime.quality}</p>
                        <span className="mx-2 bg-yellow-500 rounded-lg px-1 flex flex-row items-center">
                            <MdSubtitles className="w-4 h-4" />
                            <p>{spotlightAnime.sub}</p>
                        </span>
                        <span className="bg-blue-500 rounded-lg px-1 flex flex-row items-center">
                            <MdMic className="w-4 h-4" />
                            <p>{spotlightAnime.dub}</p>
                        </span>
                    </span>
                    <p className="text-sm">
                        {spotlightAnime.description.length > 340 ? spotlightAnime.description.substring(0, 340) + "..." : spotlightAnime.description}
                    </p>
                    <div>
                        <button onClick={() => navigate('/anime-detail', {state:{animeId: spotlightAnime.id}})}  className="bg-[var(--color-accent)] text-white px-4 py-2 rounded-md mt-2">Watch Now</button>
                        <button onClick={() => navigate('/anime-detail', {state:{animeId: spotlightAnime.id}})} className="bg-black/30 text-white px-4 py-2 rounded-md mt-2 ml-2">Detail </button>
                    </div>
                </div>
            </div>
        </div>
    )
}