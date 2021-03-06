import { Progress } from "antd";
import React, { useEffect, useState } from "react";

import styles from "./Loading.module.css";

const statusMessage = {
    unknown: { text: "Initializing your connection", value: 8, from: 0 },
    accepted: { text: "Accepted, requesting model", value: 40, from: 8 },
    queued: { text: "In queue", value: 40, from: 8 },
    requested: { text: "Model requested", value: 50, from: 40 },
    ready: { text: "Ready, 3D session launching", value: 100, from: 50 },
    serviced: { text: "Viewing model" },
    cancelled: { text: "Cancelled" },
    modelerror: { text: "An issue with the model has occurred" },
    unavailable: { text: "The requested model does not exist" },
};

let interval = null;

export const Loading = (props) => {
    const { loaded, status } = props;
    const [message, setMessage] = useState(null);
    const [nextPercentage, setNextPercentage] = useState(0);
    const [percentage, setPercentage] = useState(0);
    useEffect(() => {
        if (status?.status && statusMessage[status.status])
            setMessage(statusMessage[status.status]);
    }, [status?.status]);

    useEffect(() => {
        if (message?.text)
            setNextPercentage(
                message.value ? Math.max(nextPercentage, message.value) : 0
            );
    }, [message?.text]);

    useEffect(() => {
        if (nextPercentage) {
            setPercentage(message?.from || 0);
            if (interval) clearTimeout(interval);
            interval = setTimeout(
                () => startPercentage(message?.from || 0, nextPercentage),
                Math.random() * 870
            );
        }

        const startPercentage = (p, nP) => {
            if (p < nP) {
                if (interval) clearTimeout(interval);
                setPercentage(p + 1);
                interval = setTimeout(
                    () => startPercentage(p + 1, nP),
                    Math.random() * 870
                );
            }
        };
    }, [nextPercentage]);

    return loaded ? null : (
        <div className={styles.wrap}>
            <img
                src="/images/logo-white.png"
                alt="logo"
                className={styles.logo}
            />
            <div className={styles.center}>
                <div className={styles.video}>
                    <video
                        autoPlay
                        loop
                        muted
                        style={{ objectFit: "contain" }}
                        playsinline
                    >
                        <source
                            src="https://immersivmedia.s3.ap-southeast-2.amazonaws.com/website-media/navigation.mp4"
                            type="video/mp4"
                        />
                    </video>
                </div>
            </div>
            {!!nextPercentage && (
                <Progress
                    type="circle"
                    percent={percentage}
                    style={{ marginBottom: 20 }}
                    trailColor="black"
                    strokeColor={{
                        "0%": "#108ee9",
                        "100%": "#87d068",
                    }}
                    format={
                        percentage !== 100
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
                {message?.text || "Initializing..."}
            </div>
        </div>
    );
};
