import { useQueries } from "@tanstack/react-query";
import { fetchAnime } from "../api/api";
import { Loading } from "../ui/Loading";
import { BiDownArrow, BiLeftArrow, BiRightArrow, BiUpArrow } from "react-icons/bi";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Browse } from "../ui/Browse";

export const Movies = () => {
    const navigate = useNavigate();
    const [currentPage, setCurrentPage] = useState(1);
    const [movies] = useQueries({
        queries: [
            {
                queryKey: ['movies', currentPage],
                queryFn: () => fetchAnime(`/movies?page=${currentPage}`)
            }
        ]
    })


    if (movies.isPending)
        return <Loading />

    return <Browse page='Movies' result={movies} currentPage={currentPage} setCurrentPage={setCurrentPage}/>;
}