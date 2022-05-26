import WithAxios from "helpers/WithAxios";
import React, { createContext, useContext, useEffect, useState } from "react";
import authService from "services/auth.service";
import jwt_decode from "jwt-decode";

const UserContext = createContext();

const UserProvider = ({ children }) => {
    const [authData, setAuthData] = useState({
        token: "",
    });

    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [isInitiated, setIsInitiated] = useState(false);

    useEffect(() => {
        if (localStorage.getItem("token")) {
            setIsLoggedIn(true);
            setAuthData(() => getTokenData(localStorage.getItem("token")));
        }
        setIsInitiated(true);
    }, []);

    const getTokenData = (token) => {
        if (token) {
            const decoded = jwt_decode(token);
            return {
                ...decoded,
                token,
            };
        } else
            return {
                token: "",
            };
    };

    const setUserInfo = (data) => {
        const { token } = data;

        setIsLoggedIn(true);

        setAuthData(() => getTokenData(token));
        localStorage.setItem("token", token);
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
                isInitiated,
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
