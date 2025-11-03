import { useQueries } from "@tanstack/react-query";
import { fetchAnime } from "../api/api";

export const Movies = () => {
    const {data, isPending, error} = useQueries({
        queries: [
            {
                queryKey : ['movies'],
                queryFn: () => fetchAnime('/movies')
            }
        ]
    })

    
    return <div>Welcome to the Movies Page</div>;
}