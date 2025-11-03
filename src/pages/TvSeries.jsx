import { useQueries } from "@tanstack/react-query";
import { fetchAnime } from "../api/api";
import { Loading } from "../ui/Loading";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Browse } from "../ui/Browse";

export const TvSeries = () => {
    const navigate = useNavigate();
    const [currentPage, setCurrentPage] = useState(1);
    const [movies] = useQueries({
        queries: [
            {
                queryKey: ['movies', currentPage],
                queryFn: () => fetchAnime(`/tv?page=${currentPage}`)
            }
        ]
    })


    if (movies.isPending)
        return <Loading />

    return <Browse page='Tv series' result={movies} currentPage={currentPage} setCurrentPage={setCurrentPage}/>;
}