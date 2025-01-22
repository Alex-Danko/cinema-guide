import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { FormField } from "../../ui/FormField/FormField";
import { registerUser } from "../../api/api";
import { Dispatch, FC, SetStateAction } from "react";

const RegisterScheme = z.object({
    email: z.string().max(30).email({ message: "Неверный формат электронной почты" }).toLowerCase().trim(),
    name: z.string().min(2, { message: "Не меньше 2-х символов" }).max(30, { message: "Не больше 2-х символов" }).trim(),
    surname: z.string().min(2, { message: "Не меньше 2-х символов" }).max(30, { message: "Не больше 2-х символов" }).trim(),
    password: z.string().min(2, { message: "Не меньше 2-х символов" }).max(30, { message: "Не больше 2-х символов" }),
    repeatPassword: z.string().min(2, { message: "Не меньше 2-х символов" }).max(30, { message: "Не больше 2-х символов" })
}).refine((data) => data.password === data.repeatPassword, {
    message: "Пароли не совпадают",
    path: ["repeatPassword"],
});

type RegisterFormType = z.infer<typeof RegisterScheme>

interface RegisterFormProps {
    setRegistered: Dispatch<SetStateAction<boolean>>;
}

export const RegisterForm: FC<RegisterFormProps> = ({ setRegistered }) => {
    const queryClient = useQueryClient();
    const { register, handleSubmit, formState: { errors } } = useForm<RegisterFormType>({
        resolver: zodResolver(RegisterScheme),
    })

    const registerMutation = useMutation({
        mutationFn: registerUser,
        onSuccess() {
            setRegistered(true);
        }
    }, queryClient);

    return (<div>
        <h3 className="auth-title">Регистрация</h3>
        <form className="register-form" onSubmit={handleSubmit((data) => registerMutation.mutate(data))}>
            <div className="form-fields">
                <FormField errorMessage={errors.email?.message}>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M21 3C21.5523 3 22 3.44772 22 4V20.0066C22 20.5552 21.5447 21 21.0082 21H2.9918C2.44405 21 2 20.5551 2 20.0066V19H20V7.3L12 14.5L2 5.5V4C2 3.44772 2.44772 3 3 3H21ZM8 15V17H0V15H8ZM5 10V12H0V10H5ZM19.5659 5H4.43414L12 11.8093L19.5659 5Z" fill="black" fill-opacity="0.4" />
                    </svg>
                    <input placeholder="Электронная почта"
                        {...register("email")}
                    />
                </FormField>
                <FormField errorMessage={errors.name?.message}>
                    <svg width="24" height="25" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M4 22.75C4 18.3317 7.58172 14.75 12 14.75C16.4183 14.75 20 18.3317 20 22.75H18C18 19.4363 15.3137 16.75 12 16.75C8.68629 16.75 6 19.4363 6 22.75H4ZM12 13.75C8.685 13.75 6 11.065 6 7.75C6 4.435 8.685 1.75 12 1.75C15.315 1.75 18 4.435 18 7.75C18 11.065 15.315 13.75 12 13.75ZM12 11.75C14.21 11.75 16 9.96 16 7.75C16 5.54 14.21 3.75 12 3.75C9.79 3.75 8 5.54 8 7.75C8 9.96 9.79 11.75 12 11.75Z" fill="black" fill-opacity="0.4" />
                    </svg>
                    <input
                        placeholder="Имя"
                        {...register("name")}
                    />
                </FormField>
                <FormField errorMessage={errors.surname?.message}>
                    <svg width="24" height="25" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M4 22.75C4 18.3317 7.58172 14.75 12 14.75C16.4183 14.75 20 18.3317 20 22.75H18C18 19.4363 15.3137 16.75 12 16.75C8.68629 16.75 6 19.4363 6 22.75H4ZM12 13.75C8.685 13.75 6 11.065 6 7.75C6 4.435 8.685 1.75 12 1.75C15.315 1.75 18 4.435 18 7.75C18 11.065 15.315 13.75 12 13.75ZM12 11.75C14.21 11.75 16 9.96 16 7.75C16 5.54 14.21 3.75 12 3.75C9.79 3.75 8 5.54 8 7.75C8 9.96 9.79 11.75 12 11.75Z" fill="black" fill-opacity="0.4" />
                    </svg>
                    <input
                        placeholder="Фамилия"
                        {...register("surname")}
                    />
                </FormField>
                <FormField errorMessage={errors.password?.message}>
                    <svg width="24" height="25" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M12.917 13.75C12.441 16.5877 9.973 18.75 7 18.75C3.68629 18.75 1 16.0637 1 12.75C1 9.43629 3.68629 6.75 7 6.75C9.973 6.75 12.441 8.91229 12.917 11.75H23V13.75H21V17.75H19V13.75H17V17.75H15V13.75H12.917ZM7 16.75C9.20914 16.75 11 14.9591 11 12.75C11 10.5409 9.20914 8.75 7 8.75C4.79086 8.75 3 10.5409 3 12.75C3 14.9591 4.79086 16.75 7 16.75Z" fill="black" fill-opacity="0.4" />
                    </svg>
                    <input placeholder="Пароль"
                        type="password"
                        {...register("password")} />
                </FormField>
                <FormField errorMessage={errors.repeatPassword?.message} >
                    <svg width="24" height="25" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M12.917 13.75C12.441 16.5877 9.973 18.75 7 18.75C3.68629 18.75 1 16.0637 1 12.75C1 9.43629 3.68629 6.75 7 6.75C9.973 6.75 12.441 8.91229 12.917 11.75H23V13.75H21V17.75H19V13.75H17V17.75H15V13.75H12.917ZM7 16.75C9.20914 16.75 11 14.9591 11 12.75C11 10.5409 9.20914 8.75 7 8.75C4.79086 8.75 3 10.5409 3 12.75C3 14.9591 4.79086 16.75 7 16.75Z" fill="black" fill-opacity="0.4" />
                    </svg>
                    <input placeholder="Повторите пароль"
                        type="password"
                        {...register("repeatPassword")} />
                </FormField >
            </div>

            {registerMutation.error && <span className="server-error">Ошибка сервера!</span>}

            <button className="primary-btn auth-button" type="submit" title="Зарегистрироваться">Создать аккаунт</button>
        </form >
    </div >
    )
}