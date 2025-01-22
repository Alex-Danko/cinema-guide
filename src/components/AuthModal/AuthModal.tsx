import './AuthModal.css'
import { FC, MouseEventHandler, useState } from "react";
import ReactDom from "react-dom"
import { RegisterForm } from '../RegisterForm/RegisterForm';
import { LoginForm } from '../LoginForm/LoginForm';

export interface AuthModalProps {
    open: boolean,
    onClose: MouseEventHandler<HTMLButtonElement>
}

export const AuthModal: FC<AuthModalProps> = ({ open, onClose }) => {
    const [authType, setAuthType] = useState<string>("register");
    const [registered, setRegistered] = useState<boolean>(false);

    if (!open) return null;

    const handleClick = () => {
        registered && setRegistered(false);
        setAuthType((prevState) =>
            prevState === "register" ? "auth" : "register",
        );
    };

    return ReactDom.createPortal(
        <div className="auth-modal-wrapper">
            <div className="auth-modal">
                <div className="auth-modal-inner">
                    <img className="logo-black" src={require("../../assets/img/logo-black.png")} alt="Маруся" />
                    {registered
                        ? (<div className="auth-form register-success">
                            <h3 className="auth-title">Регистрация завершена</h3>
                            <p className="register-success-info">Используйте вашу электронную почту для входа</p>
                            <button className="primary-btn primary-btn-blue" onClick={handleClick}>Войти</button>
                        </div>)
                        : (<div className="auth-form">
                            <div className="auth-form-main">
                                {authType === "register" ? <LoginForm /> : <RegisterForm setRegistered={setRegistered} />}
                            </div>
                            <div className="auth-form__info">
                                <button className="auth-form-toggle" onClick={handleClick}>
                                    {authType === "register" ? "Регистрация" : "У меня есть пароль"}
                                </button>
                            </div>
                        </div>)}
                </div>
                <button className="auth-modal-close" onClick={onClose}>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M10.5859 12L2.79297 4.20706L4.20718 2.79285L12.0001 10.5857L19.793 2.79285L21.2072 4.20706L13.4143 12L21.2072 19.7928L19.793 21.2071L12.0001 13.4142L4.20718 21.2071L2.79297 19.7928L10.5859 12Z" fill="black" />
                    </svg>
                </button>
            </div>

        </div >,
        document.getElementById('modal')!
    )
}