import { FC, HTMLAttributes } from "react";
import { Loader } from "../../ui/Loader/Loader";

interface IButtonProps extends HTMLAttributes<HTMLButtonElement> {
    isError?: boolean;
    isLoading?: boolean;
    isDisabled?: boolean;
    kind?: "primary" | "secondary";
    type?: "submit" | "reset" | "button";
}

export const AuthButton: FC<IButtonProps> = ({
    isError,
    isLoading,
    isDisabled = isLoading,
    children,
    kind = "primary",
    type,
    ...props
}) => {
    return (
        <button
            disabled={isDisabled}
            type={type}
            className="primary-btn auth-button primary-btn-blue"
            data-kind={kind}
            {...props}
        >
            {isLoading ? <Loader /> : children}
            {isError && (<p>Ошибка!</p>)}
        </button>
    );
};