import React from "react";

import styles from "./Loading.module.css";

export const Loading = (props) => {
    return props.loaded ? null : (
        <div className={styles.wrap}>
            <img
                src="/images/logo-white.png"
                alt="logo"
                className={styles.logo}
            />
            <div className={styles.center}>
                <div className={styles.video}>
                    <video autoPlay loop muted style={{ objectFit: "contain" }}>
                        <source
                            src={"/videos/Immersiv-logo.mp4"}
                            type="video/mp4"
                        />
                    </video>
                </div>
            </div>
            <div style={{ paddingBottom: "100px" }}>Loading...</div>
        </div>
    );
};
