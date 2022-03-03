import React from "react";
import { Helmet } from "react-helmet-async";

const Layout = ({ children, title, loading, description, isProject }) => {
    return (
        <>
            <Helmet>
                <title>{title || "Home"} | IMMERSIV </title>
                <meta
                    name="description"
                    content={
                        description ||
                        "IMMERSIV is a digital interactive sales experience for unbuilt environments"
                    }
                />
            </Helmet>

            {loading ? null : (
                <div style={{ flex: 1, display: isProject ? "flex" : "block" }}>
                    {children}
                </div>
            )}
        </>
    );
};

export default Layout;
