import "./TopTen.css"
import { useQuery } from "@tanstack/react-query"
import { getMovies } from "../../api/api"
import { MovieCard } from "../../ui/MovieCard/MovieCard"

export const TopTen = () => {
    const topTenQuery = useQuery({
        // изначально был запрос "top10", но топ10 отвратительный, часто без постеров и нормальной инфы
        queryFn: () => getMovies(''),
        retry: false,
        queryKey: ["top10"]})

    switch (topTenQuery.status) {
        case "error":
            return (
                <div className="r-error">
                    {topTenQuery.error.message}
                </div>
            );
        case "success":
            const list = topTenQuery.data;
            if (list.length > 0) {
                return (<div className="top10-wrapper">
                    <h2 className="top10-title">Топ 10 фильмов</h2>
                    <ul className="r-list r-list-top10">
                        {list.map((data, index) => (
                            <MovieCard key={index} movieId={data.id} moviePoster={data.posterUrl} topPosition={index} />
                        ))}
                    </ul>
                </div>
                )
            } else {
                return (<div>
                    Фильмы не найдены
                </div>)
            }
        case "pending":
            return (<div>
            </div>)
    }
}