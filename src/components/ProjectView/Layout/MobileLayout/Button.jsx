import React from "react";

import styles from "./Button.module.css";
import Phone from "@mui/icons-material/Phone";
import Mail from "@mui/icons-material/Mail";

export const Button = (props) => {
    return (
        <a className={styles.wrap} href={props.link}>
            {props.name === "phone" ? (
                <Phone className={styles.button}></Phone>
            ) : (
                <Mail className={styles.button}></Mail>
            )}
        </a>
    );
};
