import { IdleTimeout, VideoStream } from "@pureweb/platform-sdk-react";
import React, { useEffect, useRef } from "react";
import { LoadingView } from "../LoadingView/LoadingView";

export const EmbeddedView = (props) => {
    const videoRef = useRef(null);
    // const handle = useFullScreenHandle();
    // Fullscreen API presently supported on iPad, but not iPhone or iPod
    // const isIPhone =
    //     System.Browser().os === "iOS" &&
    //     !window.navigator.userAgent.includes("iPad");

    useEffect(() => {
        const updateVideoScale = () => {
            const box = videoRef.current;
            if (box) {
                const width = box.offsetWidth;
                const height = box?.offsetHeight;
                const presetRatio = 4 / 3;
                const actualRatio = width / height;
                if (actualRatio > presetRatio) {
                    box.style.transform = `scale(${
                        actualRatio / presetRatio
                    }, 1)`;
                } else {
                    box.style.transform = `scale(1, ${
                        presetRatio / actualRatio
                    })`;
                }
            }
        };

        updateVideoScale();

        window.addEventListener("resize", updateVideoScale);
        return () => window.removeEventListener("resize", updateVideoScale);
    }, []);
    return (
        <div style={{ flex: 1, position: "relative" }}>
            {/* <FullScreen handle={handle}> */}
            <IdleTimeout
                Status={props.StreamerStatus}
                WarningThreshold={300}
                ExitThreshold={120}
                // WarningCallback={handle.exit}
                ExitCallback={() => window.location.reload()} // TODO: How to 'close' a contribution?
            />

            <LoadingView
                LaunchRequestStatus={props.LaunchRequestStatus}
                StreamerStatus={props.StreamerStatus}
                setLoaded={props.setLoaded}
            />
            <VideoStream
                VideoRef={videoRef}
                Emitter={props.InputEmitter}
                Stream={props.VideoStream}
                UseNativeTouchEvents={true}
                UsePointerLock={props.UsePointerLock}
                PointerLockRelease={props.PointerLockRelease}
            />

            {/* <Button
                    onClick={handle.enter}
                    style={{ position: "absolute", top: 10, right: 10 }}
                    className={
                        isIPhone ||
                        handle.active ||
                        props.StreamerStatus !== StreamerStatus.Connected
                            ? "hidden"
                            : ""
                    }
                >
                    <Icon name="expand" />
                </Button> */}

            {/* {props.StreamerStatus !== StreamerStatus.Connected && (
                    <img
                        alt="PureWeb Logo"
                        src="/pureweb.svg"
                        style={{
                            width: 100,
                            position: "absolute",
                            bottom: 50,
                            right: 10,
                        }}
                    />
                )} */}
            {/* </FullScreen> */}
        </div>
    );
};
