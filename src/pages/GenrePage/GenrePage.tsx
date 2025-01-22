import "./GenrePage.css"
import { FC, useEffect, useRef } from "react";
import { Link, useParams } from "react-router-dom";
import { getMovies } from "../../api/api";
import { MovieCard } from "../../ui/MovieCard/MovieCard";
import { Loader } from "../../ui/Loader/Loader";
import { useInfiniteQuery } from "@tanstack/react-query";


export const GenrePage: FC = () => {
    let { genre } = useParams();

    const genreInfiniteQuery = useInfiniteQuery({
        queryKey: ["genre", genre],
        queryFn: ({ pageParam = "1" }) => getMovies(undefined, genre, pageParam, 10),
        initialPageParam: "1",
        getNextPageParam: (lastPage, allPages) => {
            const currentPage = allPages.length;
            return lastPage.length === 10 ? (currentPage + 1).toString() : undefined;
        },
        retry: false,
    });

    const triggerRef = useRef<HTMLDivElement>(null);

    const {
        data,
        fetchNextPage,
        hasNextPage,
        isFetchingNextPage,
        status,
    } = genreInfiniteQuery;

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting && hasNextPage && !isFetchingNextPage) {
                    fetchNextPage();
                }
            },
            { threshold: 1.0 }
        );

        if (triggerRef.current) {
            observer.observe(triggerRef.current);
        }

        return () => {
            if (triggerRef.current) {
                observer.unobserve(triggerRef.current);
            }
        };
    }, [fetchNextPage, hasNextPage, isFetchingNextPage]);

    switch (status) {
        case "error":
            const error = genreInfiniteQuery.error as Error;
            return <p>{error.message}</p>;

        case "success":
            return (
                <div className="genre-page">
                    <Link className="top10-title genre-back" to={"/genres"}>
                        <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M18.047 20.0012L26.2967 28.2507L23.9397 30.6077L13.333 20.0012L23.9397 9.39453L26.2967 11.7515L18.047 20.0012Z" fill="white" />
                        </svg>
                        {genre && genre?.charAt(0).toUpperCase() + genre?.slice(1)}
                    </Link>
                    <ul className="r-list r-list-genre">
                        {data.pages.map((page, pageIndex) => (
                            page.map((movie, index) => (
                                <li key={`${pageIndex}-${index}`}>
                                    <MovieCard
                                        key={`${pageIndex}-${index}`}
                                        movieId={movie.id}
                                        moviePoster={movie.posterUrl}
                                        topPosition="no"
                                    />
                                </li>
                            ))
                        ))}
                    </ul>

                    <div
                        ref={triggerRef}
                        style={{ height: '10px' }}
                    />

                    {isFetchingNextPage && <Loader />}
                </div>
            );
        case "pending":
            return <Loader />
    }
}