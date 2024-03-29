import { UserProvider } from "context/UserContext";
import React from "react";
import ReactDOM from "react-dom";
import { HelmetProvider } from "react-helmet-async";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import "./index.css";

import "antd/dist/antd.css";

ReactDOM.render(
  <HelmetProvider>
    <UserProvider>
      <App />
    </UserProvider>
  </HelmetProvider>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
