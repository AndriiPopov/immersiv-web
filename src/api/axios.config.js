import axios from "axios";

const baseURL =
    process.env.NODE_ENV === "production"
        ? "https://tour.immersiv.com.au/api"
        : "http://localhost:5000/api";

const API = axios.create({
    baseURL,
    withCredentials: true,
});

API.interceptors.request.use(
    function (req) {
        const token = localStorage.getItem("token");
        if (token) req.headers["auth-token"] = token;
        return req;
    },
    function (error) {
        return Promise.reject(error);
    }
);

export default API;
