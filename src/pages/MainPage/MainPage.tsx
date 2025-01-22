import { Dispatch, FC, SetStateAction } from "react";
import { MoviePage } from "../MoviePage/MoviePage"
import { TopTen } from "../../components/TopTen/TopTen"
import "./MainPage.css"

interface MainPageProps {
    setAuthOpen: Dispatch<SetStateAction<boolean>>;
}

export const MainPage: FC<MainPageProps> = ({setAuthOpen}) => {
    return (
        <div className="main-container">
            <MoviePage random={true} setAuthOpen={setAuthOpen}/>
            <TopTen/>
        </div>
    )
}