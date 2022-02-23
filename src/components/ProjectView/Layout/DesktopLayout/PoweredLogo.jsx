import React from "react";
import styles from "./Contacts.module.css";

export const PoweredLogo = (props) => {
    return (
        <div
            className={styles.wrap}
            style={{
                visibility: props.invisible ? "hidden" : "visible",
            }}
        >
            Powered by
            <img
                src="/images/logo-black.png"
                alt="logo"
                style={{ width: "150px" }}
            />
        </div>
    );
};
