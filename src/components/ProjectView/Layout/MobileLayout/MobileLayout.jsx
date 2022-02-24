import React from "react";

import StreamViewWrapper from "../../Components/StreamView/StreamView";
import { Button } from "./Button";
import styles from "./MobileLayout.module.css";

export const MobileLayout = (props) => {
    const { project, constant } = props;
    return (
        <div style={{ flex: 1, display: "flex" }}>
            <StreamViewWrapper setLoaded={props.setLoaded} project={project} />
            {props.loaded && (
                <img
                    src="/images/logo-white.png"
                    alt="logo"
                    className={styles.logo}
                />
            )}
            <div className={styles.center}>
                <Button link={`tel:${constant.call}`} name="phone"></Button>
                <Button link={`mailto:${constant.email}`} name="mail"></Button>
            </div>
        </div>
    );
};
