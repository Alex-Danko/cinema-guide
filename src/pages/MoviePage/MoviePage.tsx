import "./MoviePage.css"
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { Dispatch, FC, SetStateAction, useContext, useEffect, useState } from "react"
import { getMovie } from "../../api/api";
import { Link, useParams } from "react-router-dom";
import { Loader } from "../../ui/Loader/Loader";
import { TrailerModal } from "../../components/TrailerModal/TrailerModal";
import { FavouriteButton } from "../../ui/FavouriteButton/FavouriteButton";
import { AuthContext } from "../../AppWrapper";
import { Rating } from "../../ui/Rating/Rating";

interface MovieBannerProps {
    random: boolean,
    setAuthOpen: Dispatch<SetStateAction<boolean>>;
}

export const MoviePage: FC<MovieBannerProps> = ({ random, setAuthOpen }) => {
    const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
    const queryClient = useQueryClient();
    const [trailerOpen, setTrailerOpen] = useState(false);
    const authContext = useContext(AuthContext);
    let { movieId } = useParams();

    if (random) {
        movieId = "random"
    };

    useEffect(() => {
        const handleResize = () => setIsMobile(window.innerWidth <= 768);
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);



    const movieQuery = useQuery({
        queryKey: ["movie", movieId],
        queryFn: () => getMovie(movieId),
        retry: false,
        enabled: !!movieId,
        refetchOnWindowFocus: false,
    })

    if (authContext === undefined) {
        return null
    }



    const handeRefresh = () => {
        queryClient.invalidateQueries({ queryKey: ["movie", movieId] });
        queryClient.invalidateQueries({ queryKey: ["favourites"] });
    }

    switch (movieQuery.status) {
        case "error":
            return (
                <div className="r-error">
                    {movieQuery.error.message}
                </div>
            );
        case "success":
            const movieData = movieQuery.data;
            if (movieQuery.data.title === undefined) {
                return (<>No movie found</>)
            }
            if (!movieData.backdropUrl) {
                handeRefresh();
            }


            return (
                <div className="banner-wrapper" >
                    <div className="upper-banner">
                        <div className="upper-banner-left">
                            <div className="movie-numeric-info">
                                <Rating rating={movieData.tmdbRating} forSearch={false} />
                                <span className="above-title-info movie-year">{movieData.releaseYear}</span>
                                <span className="above-title-info movie-genre">{movieData.genres[0]}</span>
                                <span className="above-title-info movie-length">{movieData.runtime} minutes</span>
                            </div>
                            <h2 className="movie-title">{movieData.title}</h2>
                            <p className="movie-plot">{movieData.plot}</p>
                            <div className="movie-buttons">
                                <button className={`primary-btn ${random ? "trailer-main" : "primary-btn-trailer"} primary-btn-blue`} onClick={() => setTrailerOpen(true)}>Трейлер</button>
                                <TrailerModal open={trailerOpen} trailerUrl={movieData.trailerYouTubeId} onClose={() => setTrailerOpen(false)} />
                                {random && (<Link className="primary-btn primary-btn-about" to={`/movie/${movieData.id}`}>
                                    О фильме
                                </Link>)}
                                {authContext.authorized === "loading" ? <Loader /> : (authContext.authorized === "yes"
                                    ? <FavouriteButton key={movieData.id} movieId={movieData.id} />
                                    : <button className="primary-btn primary-btn-svg primary-btn-favfake" onClick={() => setAuthOpen(true)}>
                                        <svg style={{ display: "block" }} width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M16.5 3C19.5376 3 22 5.5 22 9C22 16 14.5 20 12 21.5C9.5 20 2 16 2 9C2 5.5 4.5 3 7.5 3C9.35997 3 11 4 12 5C13 4 14.64 3 16.5 3ZM12.9339 18.6038C13.8155 18.0485 14.61 17.4955 15.3549 16.9029C18.3337 14.533 20 11.9435 20 9C20 6.64076 18.463 5 16.5 5C15.4241 5 14.2593 5.56911 13.4142 6.41421L12 7.82843L10.5858 6.41421C9.74068 5.56911 8.5759 5 7.5 5C5.55906 5 4 6.6565 4 9C4 11.9435 5.66627 14.533 8.64514 16.9029C9.39 17.4955 10.1845 18.0485 11.0661 18.6038C11.3646 18.7919 11.6611 18.9729 12 19.1752C12.3389 18.9729 12.6354 18.7919 12.9339 18.6038Z" fill="white" />
                                        </svg>
                                    </button>)}

                                {random && (<button className="primary-btn primary-btn-svg primary-btn-refresh" onClick={handeRefresh}>
                                    <svg style={{ display: "block" }} width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M12 4C14.7486 4 17.1749 5.38626 18.6156 7.5H16V9.5H22V3.5H20V5.99936C18.1762 3.57166 15.2724 2 12 2C6.47715 2 2 6.47715 2 12H4C4 7.58172 7.58172 4 12 4ZM20 12C20 16.4183 16.4183 20 12 20C9.25144 20 6.82508 18.6137 5.38443 16.5H8V14.5H2V20.5H4V18.0006C5.82381 20.4283 8.72764 22 12 22C17.5228 22 22 17.5228 22 12H20Z" fill="white" />
                                    </svg>
                                </button>)}
                            </div>
                        </div>
                        <div className="upper-banner-right" style={{ backgroundImage: `url(${movieData.backdropUrl ? movieData.backdropUrl : require("../../assets/img/no-poster.png")})` }} />
                    </div>

                    {!random && (
                        <div className="movie-info">
                            <h2 className="movie-info-title">О фильме</h2>

                            {isMobile
                                ? (
                                    <div className="movie-info-wrapper">
                                        <ul className="movie-info-list">
                                            <li className="movie-info-list-item">
                                                <span className="movie-info-list-item-descr">Язык&nbsp;оригинала</span>
                                                <p className="movie-info-list-item-value">{movieData.language ? movieData.language : "неизвестно"}</p>
                                            </li>
                                            <li className="movie-info-list-item">
                                                <span className="movie-info-list-item-descr">Бюджет</span>
                                                <p className="movie-info-list-item-value">{movieData.budget ? movieData.budget : "неизвестно"}</p>
                                            </li>
                                            <li className="movie-info-list-item">
                                                <span className="movie-info-list-item-descr">Выручка</span>
                                                <p className="movie-info-list-item-value">{movieData.revenue ? movieData.revenue : "неизвестно"}</p>
                                            </li>
                                            <li className="movie-info-list-item">
                                                <span className="movie-info-list-item-descr">Режиссёр</span>
                                                <p className="movie-info-list-item-value">{movieData.director ? movieData.director : "неизвестно"}</p>
                                            </li>
                                            <li className="movie-info-list-item">
                                                <span className="movie-info-list-item-descr">Продакшен</span>
                                                <p className="movie-info-list-item-value">{movieData.production ? movieData.production : "неизвестно"}</p>

                                            </li>
                                            <li className="movie-info-list-item">
                                                <span className="movie-info-list-item-descr">Награды</span>
                                                <p className="movie-info-list-item-value">{movieData.awardsSummary ? movieData.awardsSummary : "неизвестно"}</p>
                                            </li>
                                        </ul>
                                    </div>
                                )
                                : (<div className="movie-info-wrapper">
                                    <ul className="movie-info-list">
                                        <li className="movie-info-list-item">Язык&nbsp;оригинала<div className="movie-info-list-item-sep"></div></li>
                                        <li className="movie-info-list-item">Бюджет<div className="movie-info-list-item-sep"></div></li>
                                        <li className="movie-info-list-item">Выручка<div className="movie-info-list-item-sep"></div></li>
                                        <li className="movie-info-list-item">Режиссёр<div className="movie-info-list-item-sep"></div></li>
                                        <li className="movie-info-list-item">Продакшен<div className="movie-info-list-item-sep"></div></li>
                                        <li className="movie-info-list-item">Награды<div className="movie-info-list-item-sep"></div></li>
                                    </ul>
                                    <ul className="movie-info-list movie-info-list2">
                                        <li className="movie-info-list-item">{movieData.language ? movieData.language : "неизвестно"}</li>
                                        <li className="movie-info-list-item">{movieData.budget ? movieData.budget : "неизвестно"}</li>
                                        <li className="movie-info-list-item">{movieData.revenue ? movieData.revenue : "неизвестно"}</li>
                                        <li className="movie-info-list-item">{movieData.director ? movieData.director : "неизвестно"}</li>
                                        <li className="movie-info-list-item">{movieData.production ? movieData.production : "неизвестно"}</li>
                                        <li className="movie-info-list-item">{movieData.awardsSummary ? movieData.awardsSummary : "неизвестно"}</li>
                                    </ul>
                                </div>)}


                        </div>
                    )
                    }

                </div >
            )
        case "pending":
            return <Loader />
    }
}