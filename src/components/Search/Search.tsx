import './Search.css'
import { FC, MouseEventHandler, useRef, useState } from "react"
import { getMovies, Movie } from "../../api/api";
import { Loader } from "../../ui/Loader/Loader";
import { SearchLink } from '../../ui/SearchLink/SearchLink';

interface SearchProps {
    closeModal?: MouseEventHandler<HTMLElement>
}

export const Search: FC<SearchProps> = ({closeModal}) => {
    const [searched, setSearched] = useState("");
    const [searchedList, setSearchedList] = useState<Movie[]>([]);
    const [loading, setLoading] = useState(false);
    const debounceTimeout = useRef<number | null>(null);

    function handleSearch(event: React.ChangeEvent<HTMLInputElement>) {
        const value = event.target.value.trim().toLowerCase();
        setSearched(event.target.value);

        if (debounceTimeout.current) {
            clearTimeout(debounceTimeout.current);
        }

        if (value === "") {
            // Clear the results when input is empty
            setSearchedList([]);
            setLoading(false);
            return;
        }

        setLoading(true);

        debounceTimeout.current = window.setTimeout(() => {
            getMovies(`?count=5&title=${value}`).then((result) => {
                setSearchedList(result);
                setLoading(false);
            });
        }, 500);
    }

    function handleLinkClick() {
        setTimeout(() => {
            setSearchedList([]);
            setSearched("");
        }, 100)

    }



    return (<div className="search-wrapper">
        <input placeholder='Поиск' className="search" type="text" value={searched} onChange={(e) => handleSearch(e)} onBlur={handleLinkClick}></input>
        <ul className="search-dropdown" onClick={closeModal}>
            {loading ? (
                <li className="search-dropdown-item"><Loader /></li> // Show loading message while fetching
            ) : searchedList.length > 0 ? (
                searchedList.map((movie) => (
                    <li key={movie.id} className="search-dropdown-item" onClick={handleLinkClick}>
                        <SearchLink movie={movie} />
                    </li>
                ))
            ) : (
                searched !== "" && <li className="search-dropdown-item">Фильмы не найдены</li> // Show no results if search returns empty
            )}
        </ul>
    </div>)
}