import {
    ModelDefinition,
    PlatformNext,
    UndefinedModelDefinition,
    DefaultStreamerOptions,
    StreamerStatus,
} from "@pureweb/platform-sdk";

import {
    useStreamer,
    useLaunchRequest,
    System,
} from "@pureweb/platform-sdk-react";

import React, { useEffect, useState } from "react";
import useAsyncEffect from "use-async-effect";
import "./StreamView.css";

import { EmbeddedView } from "../EmbededView/EmbededView";

import logger from "../../Log";
import { isMobile as isMobileAgent } from "react-device-detect";

const audio = new Audio();
audio.autoplay = true;
audio.volume = 0.5;

// Initialize platform reference
const platform = new PlatformNext();
platform.initialize({
    endpoint: "https://api.pureweb.io",
});

const StreamView = (props) => {
    const { project } = props;

    const [modelDefinitionUnavailable, setModelDefinitionUnavailable] =
        useState(false);
    const [modelDefinition, setModelDefinition] = useState(
        new UndefinedModelDefinition()
    );
    const [availableModels, setAvailableModels] = useState();
    const [launchRequestError, setLaunchRequestError] = useState();
    const streamerOptions = DefaultStreamerOptions;

    const [status, launchRequest, queueLaunchRequest] = useLaunchRequest(
        platform,
        modelDefinition,
        {}
    );
    const [streamerStatus, emitter, videoStream, audioStream] = useStreamer(
        platform,
        launchRequest,
        streamerOptions
    );
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (streamerStatus === StreamerStatus.Failed) {
            platform.disconnect();
        }
    }, [streamerStatus]);

    if (audioStream) {
        audio.srcObject = audioStream;
    }

    const launch = async () => {
        setLoading(true);
        audio.load();

        if (project.LaunchType !== "local") {
            try {
                await queueLaunchRequest();
            } catch (err) {
                setLaunchRequestError(err);
            }
        }
    };
    useAsyncEffect(async () => {
        if (project.projectId) {
            logger.info("Initializing available models: " + project.projectId);
            try {
                await platform.useAnonymousCredentials(project.projectId);
                await platform.connect();
                logger.info("Agent Connected: " + platform.agent.id);
                streamerOptions.iceServers =
                    platform.agent.serviceCredentials.iceServers;
                streamerOptions.forceRelay = project.ForceRelay;
                const models = await platform.getModels();
                setAvailableModels(models);
                logger.debug("Available models", models);
            } catch (err) {
                logger.error(err);
            }
        }
    }, [project]);
    useEffect(() => {
        if (availableModels?.length) {
            const selectedModels = availableModels.filter(function (
                model: ModelDefinition
            ): boolean {
                if (project.modelId === model.id) {
                    // If there is a version specified and we encounter it
                    if (project.Version && project.Version === model.version) {
                        return true;
                    }
                    // If there is no version specified and we find the primary version
                    if (!project.Version && model.active) {
                        return true;
                    }
                }
                return false;
            });
            if (selectedModels?.length) {
                setModelDefinition(selectedModels[0]);
            } else {
                setModelDefinitionUnavailable(true);
            }
        }
    }, [availableModels]);

    useEffect(() => {
        if (modelDefinition.type === 0) return;

        launch();
    }, [modelDefinition]);

    // Log status messages
    useEffect(() => {
        logger.info("Status", status, streamerStatus);
        props.setStatus(status);
    }, [status, streamerStatus]);
    // Notify user of missing or errors in configuration
    if (!project.modelId || !project.projectId) {
        props.setLoaded(true);
        return (
            <div
                style={{
                    display: "flex",
                    height: "100%",
                    overflow: "none",
                    textAlign: "center",
                    alignItems: "center",
                    justifyContent: "center",
                    flex: 1,
                }}
            >
                <p>
                    Your client has one or more configuration errors. Please
                    consult the{" "}
                    <a href="https://www.npmjs.com/package/@pureweb/cra-template-pureweb-client">
                        {" "}
                        README{" "}
                    </a>{" "}
                    for details on how to configure the client template.
                </p>
            </div>
        );
    }

    if (modelDefinitionUnavailable) {
        props.setLoaded(true);
        return (
            <div
                style={{
                    display: "flex",
                    height: "100%",
                    overflow: "none",
                    textAlign: "center",
                    alignItems: "center",
                    justifyContent: "center",
                    flex: 1,
                }}
            >
                <span>The model that you have requested does not exist</span>
            </div>
        );
    }

    if (launchRequestError) {
        props.setLoaded(true);
        return (
            <div
                style={{
                    display: "flex",
                    height: "100%",
                    overflow: "none",
                    textAlign: "center",
                    alignItems: "center",
                    justifyContent: "center",
                    flex: 1,
                }}
            >
                <span>
                    {process.env.NODE_ENV === "development"
                        ? `There was an error with the launch request: ${launchRequestError}`
                        : "It appears the requested model is currently not online as per your set schedule. Please contact support if it should be available."}
                </span>
            </div>
        );
    }

    // Begin connection
    if (streamerStatus === StreamerStatus.Disconnected) {
        props.setLoaded(true);
        return (
            <div
                style={{
                    display: "flex",
                    height: "100%",
                    overflow: "none",
                    textAlign: "center",
                    alignItems: "center",
                    justifyContent: "center",
                    flex: 1,
                }}
            >
                <h2>Disconnected from stream</h2>
            </div>
        );
    }

    if (streamerStatus === StreamerStatus.Failed) {
        props.setLoaded(true);
        return (
            <div
                style={{
                    display: "flex",
                    height: "100%",
                    overflow: "none",
                    textAlign: "center",
                    alignItems: "center",
                    justifyContent: "center",
                    flex: 1,
                }}
            >
                <h2>Failure during stream</h2>
                <h2>Please refresh to request a new session</h2>
            </div>
        );
    }

    if (streamerStatus === StreamerStatus.Withdrawn) {
        props.setLoaded(true);
        return (
            <div
                style={{
                    display: "flex",
                    height: "100%",
                    overflow: "none",
                    textAlign: "center",
                    alignItems: "center",
                    justifyContent: "center",
                    flex: 1,
                }}
            >
                <h2>Streamer contribution withdrawn</h2>
            </div>
        );
    }

    if (loading) {
        const useNativeTouchEvents =
            !!project[
                isMobileAgent ? "mobileNativeEvents" : "desktopNativeEvents"
            ];
        return (
            <EmbeddedView
                VideoStream={videoStream}
                StreamerStatus={streamerStatus}
                LaunchRequestStatus={status}
                InputEmitter={emitter}
                UseNativeTouchEvents={useNativeTouchEvents}
                UsePointerLock={project.UsePointerLock}
                PointerLockRelease={project.PointerLockRelease}
                setLoaded={props.setLoaded}
            />
        );
    } else if (project.LaunchType !== "local" && !availableModels) {
        return (
            <div
                style={{
                    display: "flex",
                    height: "100%",
                    overflow: "none",
                    textAlign: "center",
                    alignItems: "center",
                    justifyContent: "center",
                    flex: 1,
                }}
            >
                <h2>Initializing...</h2>
            </div>
        );
    } else if (project.LaunchType !== "local" && !availableModels?.length) {
        props.setLoaded(true);
        return (
            <div
                style={{
                    display: "flex",
                    height: "100%",
                    overflow: "none",
                    textAlign: "center",
                    alignItems: "center",
                    justifyContent: "center",
                    flex: 1,
                }}
            >
                <h2>No models are currently available in this environment.</h2>
            </div>
        );
    } else {
        return null;
    }
};

const StreamViewWrapper = (props) => {
    return System.IsBrowserSupported() ? (
        <div
            style={{
                backgroundColor: "black",
                height: "100%",
                flex: 1,
                display: "flex",
                color: "white",
            }}
        >
            <StreamView
                setLoaded={props.setLoaded}
                setStatus={props.setStatus}
                project={props.project}
            />
        </div>
    ) : (
        <div className="ui red segment center aligned basic">
            <h2 className="header">Your browser is currently unsupported</h2>
        </div>
    );
};

export default StreamViewWrapper;
