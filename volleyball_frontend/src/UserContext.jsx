import { createContext, useContext } from "react";
import { useNavigate } from "react-router-dom";


const UserContext = createContext();

export const UserProvider = ({children}) => {
    const loggedIn = sessionStorage.getItem('log') === 'true' ? true : false;
    const navigate = useNavigate();

    const handleLogOut = () => {
        sessionStorage.setItem('log', false);
        navigate('/');
    }

    return (
        <UserContext.Provider value={{loggedIn, handleLogOut}}>
            {children}
        </UserContext.Provider>
    )
}

export const useAuth = () => {
    return useContext(UserContext);
};