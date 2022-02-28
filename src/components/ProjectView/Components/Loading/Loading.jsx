import { Progress } from "antd";
import React from "react";

import styles from "./Loading.module.css";

const statusMessage = {
    unknown: { text: "Initializing your connection", value: 10 },
    accepted: { text: "Accepted, requesting model", value: 30 },
    queued: { text: "In queue", value: 50 },
    requested: { text: "Model requested", value: 70 },
    ready: { text: "Ready, 3D session launching", value: 100 },
    serviced: { text: "Viewing model" },
    cancelled: { text: "Cancelled" },
    modelerror: { text: "An issue with the model has occurred" },
    unavailable: { text: "The requested model does not exist" },
};

export const Loading = (props) => {
    const { loaded, status } = props;
    return loaded ? null : (
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
            {status?.status && statusMessage[status.status]?.value && (
                <Progress
                    type="circle"
                    percent={statusMessage[status.status].value}
                    style={{ marginBottom: 20 }}
                    trailColor="black"
                    strokeColor={{
                        "0%": "#108ee9",
                        "100%": "#87d068",
                    }}
                    format={
                        statusMessage[status.status]?.value !== 100
                            ? (percent) => (
                                  <span style={{ color: "white" }}>
                                      {percent}%
                                  </span>
                              )
                            : undefined
                    }
                    strokeWidth={3}
                />
            )}
            <div style={{ paddingBottom: "100px" }}>
                {status?.status
                    ? statusMessage[status?.status]?.text ||
                      statusMessage[status?.status]
                    : "Initializing..."}
            </div>
        </div>
    );
};
