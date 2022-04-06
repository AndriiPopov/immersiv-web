import React, { useState } from "react";
import { Button } from "./Button";

import StreamViewWrapper from "../Components/StreamView/StreamView";
import { PoweredLogo } from "./PoweredLogo";

import styles from "./ProjectView.module.css";
import { MailFilled, PhoneFilled } from "@ant-design/icons";
import { isMobile as isMobileAgent } from "react-device-detect";

import { useWindowSize } from "@react-hook/window-size";
import { Loading } from "components/ProjectView/Components/Loading/Loading";
const ProjectView = (props) => {
    const { project, constant } = props;
    const [width, height] = useWindowSize();
    const isMobile = isMobileAgent || width < 1200 || height < 700;
    const [loaded, setLoaded] = useState(false);
    const [status, setStatus] = useState(false);

    return (
        <>
            <div className={isMobile ? styles.flex1 : styles.wrap}>
                {!isMobile && <div className={styles.top}>{project.name}</div>}
                <div className={isMobile ? styles.flex1 : styles.center}>
                    {!isMobile && <PoweredLogo invisible />}
                    <div className={isMobile ? styles.flex1 : styles.viewWrap}>
                        <div
                            className={
                                isMobile ? styles.flex1 : styles.viewInner
                            }
                        >
                            <StreamViewWrapper
                                setLoaded={setLoaded}
                                setStatus={setStatus}
                                project={project}
                            />
                            {isMobile && (
                                <>
                                    {loaded && (
                                        <img
                                            src="/images/logo-white.png"
                                            alt="logo"
                                            className={styles.mLogo}
                                        />
                                    )}
                                    <div className={styles.mCenter}>
                                        <Button
                                            link={`tel:${constant.call}`}
                                            name="phone"
                                        ></Button>
                                        <Button
                                            link={`mailto:${constant.email}`}
                                            name="mail"
                                        ></Button>
                                    </div>
                                </>
                            )}
                        </div>
                    </div>
                    {!isMobile && <PoweredLogo />}
                </div>
                {!isMobile && (
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
                                        <PhoneFilled
                                            name="phone"
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
                                        <MailFilled
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
                )}
            </div>
            <Loading loaded={loaded} status={status} />
        </>
    );
};

export default ProjectView;
