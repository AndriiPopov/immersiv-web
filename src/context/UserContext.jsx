import WithAxios from "helpers/WithAxios";
import React, { createContext, useContext, useEffect, useState } from "react";
import authService from "services/auth.service";

const UserContext = createContext();

const UserProvider = ({ children }) => {
    const [authData, setAuthData] = useState({
        token: "",
    });
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        if (localStorage.getItem("token")) {
            setIsLoggedIn(true);
            setAuthData(JSON.parse(localStorage.getItem("token")));
        }
    }, []);

    const setUserInfo = (data) => {
        const { token } = data;
        setIsLoggedIn(true);

        setAuthData({
            token,
        });
        localStorage.setItem("token", JSON.stringify(token));
    };

    const logout = () => {
        setAuthData(null);
        setIsLoggedIn(false);
        authService.logout();
    };

    return (
        <UserContext.Provider
            value={{
                setUserState: (data) => setUserInfo(data),
                logout,
                isLoggedIn,
                setIsLoggedIn,
                authData,
                setAuthData,
            }}
        >
            <WithAxios>{children}</WithAxios>
        </UserContext.Provider>
    );
};

const useUser = () => {
    const context = useContext(UserContext);

    if (context === undefined) {
        throw new Error("useUser must be used within UserProvider");
    }
    return context;
};

export { UserProvider, useUser };
