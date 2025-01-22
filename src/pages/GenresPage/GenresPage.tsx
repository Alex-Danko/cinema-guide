import { useQuery } from "@tanstack/react-query"
import { getGenres } from "../../api/api"
import './GenresPage.css'
import { Loader } from "../../ui/Loader/Loader"
import { Link } from "react-router-dom"

export const GenresPage = () => {
    const genresQuery = useQuery({
        queryFn: () => getGenres(),
        retry: false,
        queryKey: ["genres"],
    })


    switch (genresQuery.status) {
        case "error":
            return (
                <div className="r-error">
                    {genresQuery.error.message}
                </div>
            );
        case "success":
            const list = genresQuery.data;

            return (
                <div className="genres-page">
                    <h2 className="top10-title">Жанры фильмов</h2>
                    <ul className="g-list">
                        {list.map((data, index) => (
                            <li key={index}>
                                <Link to={`/genres/${data}`} className="genre-card" style={{ backgroundImage: `url(${require(`../../assets/img/${data}.webp`)})`}}>
                                    <div className="genre-title">
                                        {data && data.charAt(0).toUpperCase() + data.slice(1)}
                                    </div>
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>
            )

        case "pending":
            return (<div>
                <Loader />
            </div>)
    }
}