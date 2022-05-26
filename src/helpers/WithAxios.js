import { useEffect } from "react";
import API from "api/axios.config";
import { useUser } from "context/UserContext";
import history from "helpers/history";

const WithAxios = ({ children }) => {
    const { isInitiated, logout } = useUser();

    useEffect(() => {
        API.interceptors.response.use(
            (response) => response,
            async (error) => {
                const originalRequest = error.config;
                if (
                    error.response.status === 401 &&
                    originalRequest.url === "/auth/refresh-token"
                ) {
                    return new Promise((resolve, reject) => {
                        logout();
                        history.push("/login");
                        reject(error);
                    });
                }

                if (error.response.status === 401 && !originalRequest._retry) {
                    try {
                        originalRequest._retry = true;
                        const res = await API.post("/auth/refresh-token");
                        localStorage.setItem("token", res.data.token);
                        return API(originalRequest);
                    } catch (error) {
                        logout();
                        history.push("/login");
                    }
                }
                return Promise.reject(error);
            }
        );
    }, []);

    return isInitiated ? children : null;
};

export default WithAxios;
