const API_URL = 'https://cinemaguide.skillbox.cc'

export interface Movie {
    "keywords": string[],
    "backdropUrl": string,
    "production": string,
    "trailerYouTubeId": string,
    "language": string,
    "tmdbRating": number,
    "title": string,
    "cast": string[],
    "revenue": string,
    "posterUrl": string,
    "plot": string,
    "genres": string[],
    "id": number,
    "budget": string,
    "languages": string[],
    "releaseDate": string,
    "director": string,
    "awardsSummary": string,
    "runtime": number,
    "trailerUrl": string,
    "releaseYear": number,
    "countriesOfOrigin": string[],
    "originalTitle": "originalTitle",
    "searchL": "searchL",
    "homepage": "homepage",
    "status": "status"
}

export const getMovies = (
    params?: string,
    genre?: string,
    page?: string,
    count: number = 10
): Promise<Movie[]> => {
    let url = `${API_URL}/movie`;

    if (params) {
        url += `/${params}`;
    } else {
        const queryParams = new URLSearchParams();
        if (genre) queryParams.append('genre', genre);
        if (page) queryParams.append('page', page);
        queryParams.append('count', count.toString());

        url += `?${queryParams.toString()}`;
    }

    return fetch(url)
        .then((res) => res.json())
        .catch((error) => console.error('Error fetching movies:', error));
};

export const getMovie = (params: String | undefined): Promise<Movie> => {
    if (params === undefined) {
        return fetch(`${API_URL}/movie/0`).then((res) => res.json())
    } else {
        return fetch(`${API_URL}/movie/${params}`).then((res) => res.json());
    }
}


export const getGenres = (): Promise<String[]> =>
    fetch(`${API_URL}/movie/genres`).then((res) => res.json());


type getMeResponse = {
    "email": string,
    "favorites": string[],
    "name": string,
    "surname": string,
}

export const getMe = (): Promise<getMeResponse> => {
    return fetch(`${API_URL}/profile`, {
        method: 'GET',
        credentials: 'include', // Include cookies in the request
      }).then((res) => res.json());
}
    


interface loginData {
    email: string;
    password: string;
}

export function loginUser(data: loginData): Promise<void> {
    const email = data.email;
    const password = data.password;
    return fetch(`${API_URL}/auth/login`, {
        method: "POST",
        credentials: 'include', // Include cookies in the request
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            email,
            password,
        })
    }).then(() => undefined)
}

interface registerData {
    email: string,
    password: string,
    name: string,
    surname: string
}

export function registerUser(data: registerData): Promise<void> {
    const email = data.email;
    const password = data.password;
    const name = data.name;
    const surname = data.surname;
    return fetch(`${API_URL}/user`, {
        method: "POST",
        credentials: 'include', // Include cookies in the request
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            email,
            password,
            name,
            surname,
        })
    }).then(() => undefined)
}

export function logout(): Promise<void> {
    return fetch(`${API_URL}/auth/logout`, {
        method: 'GET',
        credentials: 'include', // Include cookies in the request
      }).then(() => undefined);
}

export const getFavorites = (): Promise<Movie[]> => {
    return fetch(`${API_URL}/favorites`, {
        method: 'GET',
        credentials: 'include', // Include cookies in the request
    }).then((res) => res.json());
}
    

export function addFavourite(id: string): Promise<void> {
    return fetch(`${API_URL}/favorites`, {
        method: "POST",
        credentials: 'include', // Include cookies in the request
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            id
        })
    }).then(() => undefined)}

    export function removeFavourite(id: string): Promise<void> {
        return fetch(`${API_URL}/favorites/${id}`, {
            method: "DELETE",
            credentials: 'include', // Include cookies in the request
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                id
            })
        }).then(() => undefined)}
