import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import App from "./App";
import { createContext } from "react";

const queryClient = new QueryClient();

type AuthContextType = {
    authorized: string
}
export const AuthContext = createContext<AuthContextType>({ authorized: "no" });

type FavsContextType = {
    favourites: string[]
}
const FavsContextMock: string[] = [];
export const FavsContext = createContext<FavsContextType>({ favourites: FavsContextMock });

export const AppWrapper = () => {
    return (
        <QueryClientProvider client={queryClient}>
            <AuthContext.Provider value={{ authorized: "no" }}>
                <FavsContext.Provider value={{ favourites: [] }}>
                    <App />
                </FavsContext.Provider>
            </AuthContext.Provider>
        </QueryClientProvider>
    )
}