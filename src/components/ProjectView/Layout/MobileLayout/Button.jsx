import React from "react";

import styles from "./Button.module.css";
import { MailFilled, PhoneFilled } from "@ant-design/icons";

export const Button = (props) => {
    return (
        <a className={styles.wrap} href={props.link}>
            {props.name === "phone" ? (
                <PhoneFilled className={styles.button}></PhoneFilled>
            ) : (
                <MailFilled className={styles.button}></MailFilled>
            )}
        </a>
    );
};
