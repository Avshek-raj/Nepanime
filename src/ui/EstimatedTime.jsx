import { useQuery } from "@tanstack/react-query"
import { fetchAnime } from "../api/api"

export const EstimatedTime = () => {
    const today = new Date();
    const currentDate = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, "0")}-${String(today.getDate()).padStart(2, "0")}`;
    const {data, isPending, error} = useQuery({
        queryKey: ['schedule', currentDate],
        queryFn: () => {
            return fetchAnime(`schedule/${currentDate}`)
        }
    })
    const schedules = data ? data.data? data.data.results: [] : [];
    return (
        <>
            <div className="mt-33">
                <span className="bg-[var(--color-primary)] pr-10 pl-5 inline-block [clip-path:polygon(0_0,90%_0,100%_100%,0_100%)]">
                    <h2 className="text-red-500/70 pt-2 text-2xl font-bold">Estimated schedule</h2>
                </span>
                
                <div className="min-h-250 bg-[var(--color-primary)] p-5  ">
                    <ul className="divide-y divide-[var(--color-text)]">
                        {isPending ? 

                            Array.from({ length: 10 }).map((_, index) => (
                                <li key={index} className="flex items-center gap-4 my-4 animate-pulse">
                                    {/* Image placeholder */}
                                    <div className="w-16 h-16 bg-gray-300 rounded"></div>

                                    {/* Text placeholders */}
                                    <div className="flex-1 space-y-2">
                                        <div className="h-4 bg-gray-300 rounded w-3/4"></div>
                                        <div className="h-3 bg-gray-300 rounded w-1/2"></div>
                                    </div>
                                </li>
                            ))    
                        :
                        
                         schedules.map((schedule) => (
                            <li key={schedule.id} className="bg-[var(--color-secondary)] flex justify-between mb-2 p-2  hover:bg-[var(--color-primary)] transition-colors duration-300 cursor-pointer" >
                                <div className="flex flex-col mr-2">
                                    <span className="font-bold">{schedule.title}. </span>
                                    <span>{schedule.airingEpisode}</span>
                                </div>
                                <span className="">{schedule.airingTime}</span>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </>
    )
}