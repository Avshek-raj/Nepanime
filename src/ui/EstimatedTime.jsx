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
            <div className="mt-8 sm:mt-12 lg:mt-16">
                <span className="bg-[var(--color-primary)] px-3 sm:px-5 inline-block rounded-t-lg">
                    <h2 className="text-red-500/70 pt-2 text-lg sm:text-2xl font-bold">Estimated schedule</h2>
                </span>
                
                <div className="min-h-[250px] max-h-[400px] bg-[var(--color-primary)] p-3 sm:p-5 rounded-b-lg overflow-y-auto">
                    <ul className="divide-y divide-[var(--color-text)]">
                        {isPending ? 

                            Array.from({ length: 10 }).map((_, index) => (
                                <li key={index} className="flex items-center gap-3 my-3 animate-pulse">
                                    <div className="w-12 sm:w-16 h-12 sm:h-16 bg-gray-300 rounded flex-shrink-0"></div>

                                    <div className="flex-1 space-y-2">
                                        <div className="h-3 sm:h-4 bg-gray-300 rounded w-3/4"></div>
                                        <div className="h-2 sm:h-3 bg-gray-300 rounded w-1/2"></div>
                                    </div>
                                </li>
                            ))    
                        :
                        
                         schedules.map((schedule) => (
                            <li key={schedule.id} className="bg-[var(--color-secondary)] flex justify-between mb-2 p-2 sm:p-3 text-xs sm:text-sm hover:bg-[var(--color-primary)] transition-colors duration-300 cursor-pointer rounded" >
                                <div className="flex flex-col mr-2 flex-1">
                                    <span className="font-bold line-clamp-1">{schedule.title}</span>
                                    <span className="text-white/70">{schedule.airingEpisode}</span>
                                </div>
                                <span className="text-white/70 flex-shrink-0 ml-2">{schedule.airingTime}</span>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </>
    )
}