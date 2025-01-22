import { useQueryClient } from "@tanstack/react-query"
import { FC } from "react"
import { logout } from "../../api/api"
import { useNavigate } from "react-router-dom";
import './AccountInfo.css'

interface AccountInfoProps {
    name: string,
    surname: string,
    email: string,
}

export const AccountInfo: FC<AccountInfoProps> = ({ name, surname, email }) => {
    const queryClient = useQueryClient();
    const navigate = useNavigate();
    const handleLogout = () => {
        logout().then(() => {
            queryClient.invalidateQueries({ queryKey: ["me"] });
            navigate("/");
        });
    }


    return (<div>
        <div className="user-info">
            <div className="user-segment">
                <div className="user-info-icon user-name-icon">{name[0]}{surname[0]}</div>
                <div>
                    <span className="user-segment-span">Имя Фамилия</span>
                    <p className="user-segment-value">{name} {surname}</p>
                </div>
            </div>
            <div className='user-segment'>
                <div className="user-info-icon user-email-icon">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M21 3C21.5523 3 22 3.44772 22 4V20.0066C22 20.5552 21.5447 21 21.0082 21H2.9918C2.44405 21 2 20.5551 2 20.0066V19H20V7.3L12 14.5L2 5.5V4C2 3.44772 2.44772 3 3 3H21ZM8 15V17H0V15H8ZM5 10V12H0V10H5ZM19.5659 5H4.43414L12 11.8093L19.5659 5Z" fill="white" />
                    </svg>
                </div>
                <div>
                    <span className="user-segment-span">Электронная почта</span>
                    <p className="user-segment-value">{email}</p>
                </div>
            </div>
        </div>
        <button className="primary-btn" onClick={handleLogout}>Выйти из аккаунта</button>
    </div>)
}