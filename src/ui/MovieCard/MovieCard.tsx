import "./MovieCard.css"
import { FC } from "react"
import { Link } from "react-router-dom"

export interface MovieCardProps {
    movieId: number,
    moviePoster: string,
    topPosition: number | string,
}


export const MovieCard: FC<MovieCardProps> = ({ movieId, moviePoster, topPosition }) => {
    return (
        <div className="movie-card-container">
            {typeof topPosition === "number" && <div className="top-position">{topPosition + 1}</div>}
            {/* Из отвратительного API в топ-10 часто приходят фильмы без постера. Их заменяем на случайный другой */}
            <Link className="movie-card" style={{ backgroundImage: `url(${moviePoster ? moviePoster : require("../../assets/img/no-poster.png")})` }} to={`/movie/${movieId}`} />
        </div>
    )

}