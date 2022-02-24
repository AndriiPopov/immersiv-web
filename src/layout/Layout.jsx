import Spinner from "components/Spinner";
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
                        "Ecommerce store built with React, Node, Express and Postgres"
                    }
                />

                {/* <meta property="og:locale" content="en_US" />
                <meta property="og:type" content="website" />
                <meta property="og:title" content="PERN Store" />
                <meta
                    property="og:description"
                    content="Ecommerce store built with React, Node, Express and Postgres"
                />
                <meta
                    property="og:url"
                    content="https://pern-store.netlify.app/"
                />
                <meta property="og:site_name" content="PERN Store" />
                <meta
                    property="og:image"
                    content="android-chrome-512x512.png"
                />
                <meta
                    property="og:image:secure_url"
                    content="android-chrome-512x512.png"
                />
                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:site" content="@_odunsi_" />
                <meta name="twitter:creator" content="@_odunsi_" />
                <meta
                    name="twitter:description"
                    content="Ecommerce store built with React, Node, Express and Postgres"
                />
                <meta name="twitter:title" content="PERN Store" />
                <meta
                    name="twitter:image"
                    content="android-chrome-512x512.png"
                /> */}
            </Helmet>

            {loading ? (
                <>
                    <Spinner size={100} loading />
                </>
            ) : (
                <div style={{ flex: 1, display: isProject ? "flex" : "block" }}>
                    {children}
                </div>
            )}
        </>
    );
};

export default Layout;
