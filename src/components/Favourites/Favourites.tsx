import { useQuery } from "@tanstack/react-query";
import { FC } from "react";
import { getFavorites } from "../../api/api";
import { Loader } from "../../ui/Loader/Loader";
import { MovieCard } from "../../ui/MovieCard/MovieCard";

export const Favourites: FC = () => {
    const favsQuery = useQuery({
        queryFn: getFavorites,
        queryKey: ["favourites"],
    })

    switch (favsQuery.status) {

        case "error":
            return (
                <div className="r-error">
                    {favsQuery.error.message}
                </div>
            );

        case "success":
            const favourites = favsQuery.data
            if (favourites.length === 0) {
                return <p>Нет избранных фильмов</p>
            }
            return (<ul className="r-list r-list-top10">
                {favourites.map((movie, index) => (<li key={index}>
                    <MovieCard
                        movieId={movie.id}
                        moviePoster={movie.posterUrl}
                        topPosition="no" />
                </li>))}
            </ul>);

        case "pending":
            return <Loader />
    }


}