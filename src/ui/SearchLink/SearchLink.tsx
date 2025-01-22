import "./SearchLink.css"
import { FC } from "react";
import { Link } from "react-router-dom"
import { Movie } from "../../api/api";
import { Rating } from "../Rating/Rating";

export interface SearchLinkProps {
    movie: Movie;
}

export const SearchLink: FC<SearchLinkProps> = ({ movie }) => {
    return (
        <Link className="search-link" to={`/movie/${movie.id}`}>
            <img className="search-link-poster" src={movie.posterUrl} alt="Постер" />
            <div className="search-link-info">
                <div className="movie-numeric-info movie-numeric-info-search">
                    <Rating rating={movie.tmdbRating} forSearch={true} />
                    <span className="above-title-info movie-year">{movie.releaseYear}</span>
                    <span className="above-title-info movie-genre">{movie.genres[0]}</span>
                    <span className="above-title-info movie-length">{movie.runtime} minutes</span>
                </div>
                <h3 className="search-title">{movie.title}</h3>
            </div>
        </Link>
    )
}