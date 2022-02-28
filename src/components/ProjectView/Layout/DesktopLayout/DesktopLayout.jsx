import React from "react";
import Phone from "@mui/icons-material/Phone";
import Mail from "@mui/icons-material/Mail";

import StreamViewWrapper from "../../Components/StreamView/StreamView";
import { PoweredLogo } from "./PoweredLogo";

import styles from "./DesktopLayout.module.css";

export const DesktopLayout = (props) => {
    const { project, constant } = props;
    return (
        <div className={styles.wrap}>
            <div className={styles.top}>{project.name}</div>
            <div className={styles.center}>
                <PoweredLogo invisible />
                <div className={styles.viewWrap}>
                    <div className={styles.viewInner}>
                        <StreamViewWrapper
                            setLoaded={props.setLoaded}
                            setStatus={props.setStatus}
                            project={project}
                        />
                    </div>
                </div>
                <PoweredLogo />
            </div>
            <div className={styles.bottomWrap}>
                <PoweredLogo invisible />

                <div className={styles.bottomCenter}>
                    <div className={styles.bottomCenterLeft}>
                        <img
                            src="/images/controls.png"
                            alt="logo"
                            style={{ width: "100%" }}
                        />
                    </div>
                    <div className={styles.bottomCenterCenter}>
                        {project.logo && (
                            <img
                                src="/images/imperial-logo.png"
                                alt="logo"
                                style={{ height: "120px" }}
                            />
                        )}
                    </div>
                    <div className={styles.bottomCenterRight}>
                        <a
                            href={`tel:${constant.call}`}
                            className={styles.contactWrap}
                        >
                            <div className={styles.contactIconWrap}>
                                <Phone
                                    name="phone"
                                    size="small"
                                    className={styles.contactIcon}
                                />
                            </div>
                            <div style={{ width: "10px" }}></div>
                            <div className={styles.contactText}>
                                {constant.phone}
                            </div>
                        </a>
                        {/* <div style={{ height: "20px" }}></div> */}
                        <a
                            href={`mailto:${constant.email}`}
                            className={styles.contactWrap}
                        >
                            <div className={styles.contactIconWrap}>
                                <Mail
                                    name="mail"
                                    size="small"
                                    className={styles.contactIcon}
                                />
                            </div>
                            <div style={{ width: "10px" }}></div>
                            <div className={styles.contactText}>
                                {constant.email}
                            </div>
                        </a>
                    </div>
                </div>
                <PoweredLogo invisible />
            </div>
        </div>
    );
};
