
import '../index.css';
import { BiCalendar, BiPlay } from "react-icons/bi";
import { BsClock, BsClockFill } from "react-icons/bs";
import { FaClock } from "react-icons/fa";
import { SiDatefns, SiDatev } from "react-icons/si";
import { MdMic, MdSubtitles } from "react-icons/md";
import { useNavigate } from 'react-router-dom';

export const Spotlight = ({ spotlightAnime }) => {
    const navigate = useNavigate();
    
    const handleSpotlightClick = () => {
        navigate('/anime-detail', { state: { animeId: spotlightAnime.id } });
    };

    return (
        <div className="bg-[var(--color-primary)] flex flex-col min-h-[400px] sm:min-h-[500px] md:min-h-[600px]">
            <div
                className="overflow-hidden m-2 sm:m-5 flex-1 bg-cover bg-center bg-no-repeat items-center flex cursor-pointer hover:opacity-90 transition-opacity duration-300"
                style={{
                    backgroundImage: `url(${spotlightAnime["banner"]})`,
                }}
                onClick={handleSpotlightClick}
            >
                <div id={spotlightAnime.id} className="m-2 sm:m-5 bg-white/50 text-black/90 flex flex-col p-3 sm:p-5 rounded-md w-full sm:w-4/5 md:w-1/2">
                    <div className='flex'>
                        <p className="text bg-red-500 flex flex-row rounded-xl px-2 mr-2">#{spotlightAnime.rank} </p>
                        <p>spotlight</p>
                    </div>
                    <h1 className="text-lg sm:text-2xl font-bold mb-2">{spotlightAnime.title.length > 50 ? spotlightAnime.title.substring(0, 50) + "..." : spotlightAnime.title}</h1>
                    <span className="flex flex-wrap items-center gap-2 sm:gap-3 my-2 text-xs sm:text-sm">
                        <div className="flex items-center mr-2">
                            <BiPlay className="w-4 sm:w-6 h-4 sm:h-6" />
                            <p className="ml-1">{spotlightAnime.type}</p>
                        </div>
                        <div className="flex items-center">
                            <BsClockFill className="w-3 sm:w-4 h-3 sm:h-4" />
                            <p className="ml-1">{spotlightAnime.duration}</p>
                        </div>

                        <div className="flex items-center">
                            <BiCalendar className="w-3 sm:w-4 h-3 sm:h-4" />
                            <p className="ml-1">{spotlightAnime.releaseDate}</p>
                        </div>

                        <p className="bg-green-500 rounded-lg px-1 text-xs">{spotlightAnime.quality}</p>
                        <span className="bg-yellow-500 rounded-lg px-1 flex items-center text-xs">
                            <MdSubtitles className="w-3 sm:w-4 h-3 sm:h-4" />
                            <p className="ml-1">{spotlightAnime.sub}</p>
                        </span>
                        <span className="bg-blue-500 rounded-lg px-1 flex items-center text-xs">
                            <MdMic className="w-3 sm:w-4 h-3 sm:h-4" />
                            <p className="ml-1">{spotlightAnime.dub}</p>
                        </span>
                    </span>
                    <p className="text-xs sm:text-sm leading-relaxed">
                        {spotlightAnime.description.length > 200 ? spotlightAnime.description.substring(0, 200) + "..." : spotlightAnime.description}
                    </p>
                    <div className="flex gap-2 mt-2 flex-wrap">
                        <button onClick={() => navigate('/anime-detail', {state:{animeId: spotlightAnime.id}})}  className="bg-[var(--color-accent)] text-white px-3 sm:px-4 py-1 sm:py-2 rounded-md text-xs sm:text-sm">Watch Now</button>
                        <button onClick={() => navigate('/anime-detail', {state:{animeId: spotlightAnime.id}})} className="bg-black/30 text-white px-3 sm:px-4 py-1 sm:py-2 rounded-md text-xs sm:text-sm">Detail </button>
                    </div>
                </div>
            </div>
        </div>
    )
}
