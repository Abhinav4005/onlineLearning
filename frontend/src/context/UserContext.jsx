import {createContext, useContext, useState } from "react";

export const UserContext = createContext();

export const useUserContext = () =>{
    return useContext(UserContext);
}

export const UserContextProvider = ({children}) =>{
    const [authUser, setAuthUser] = useState(JSON.parse(localStorage.getItem('authToken'))|| null);

    return <UserContext.Provider value={{ authUser, setAuthUser }}>{children}</UserContext.Provider>
}