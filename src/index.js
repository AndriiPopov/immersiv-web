import { UserProvider } from "context/UserContext";
import React from "react";
import ReactDOM from "react-dom";
import { HelmetProvider } from "react-helmet-async";
import App from "./App";
import reportWebVitals from "./reportWebVitals";

import "antd/dist/antd.css";
import { ThemeProvider } from "@mui/material/styles";
import { createTheme } from "@mui/material/styles";
const mdTheme = createTheme();
ReactDOM.render(
    <ThemeProvider theme={mdTheme}>
        <HelmetProvider>
            <UserProvider>
                <App />
            </UserProvider>
        </HelmetProvider>
    </ThemeProvider>,

    document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
