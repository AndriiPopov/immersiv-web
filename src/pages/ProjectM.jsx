import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { StreamingService } from "@monkeyway/streaming-lib/dist/streaming/streaming";
import { StreamingControlService } from "@monkeyway/streaming-control-lib/dist/control";

const AspectRatioBox = styled.div`
  display: block;
  position: relative;
  overflow: hidden;
  height: 0;
  padding-top: 56.25%;
  background-color: #191919;
  min-width: 800;
`;

const Video = styled.video`
  object-fit: cover;
`;

const streamingControlService = new StreamingControlService();

const ProjectM = (props) => {
  const { project, setVideoInitialized, setLoaded } = props;
  const [streamSubscription, setStreamSubscription] = useState(null);
  const [streamInfo, setStreamInfo] = useState(null);
  const [streamingService, setStreamingService] = useState(null);
  const streamRef = useRef();

  useEffect(() => {
    if (project) {
      const streamingOptions = {
        baseUrl:
          project.monkeywayBaseUrl || "https://general.gorillastreaming.com",
        appEnvId:
          project.monkeywayAppEnvId || "97772d8a-9d5d-4f48-aeca-bb8de8f2cb63",
        apiKey:
          project.monkeywayApiKey || "9e5e7d64-ef3d-42c2-8a56-7099d8cf9cfe",
      };
      console.log(streamingOptions);
      const _streamingService = new StreamingService(streamingOptions);
      setStreamingService(_streamingService);
    }
  }, [project]);

  useEffect(() => {
    setVideoInitialized(true);
    setLoaded(true);
  }, []);

  const startSession = () => {
    if (streamSubscription) {
      return;
    }
    console.log("connecting");

    const streamInfo$ = streamingService.start({});

    setStreamSubscription(
      streamInfo$.subscribe(
        (info) => {
          if (!info) {
            // session ended
            console.log("disconnected");

            if (streamSubscription) {
              streamSubscription.unsubscribe();
              setStreamSubscription(null);
            }
          } else if (!streamInfo || streamInfo.stream !== info.stream) {
            // session established

            const options = streamingControlService.createOptions(info);
            streamingControlService
              .connect(streamRef.current, options)
              .subscribe(
                (_) => {
                  setStreamInfo(info);
                },
                async (err) => {}
              );
          }
        },
        async (error) => {
          // TODO: handle no available session gracefully (will follow with an updated streaming library)
          if (error instanceof Error) {
            console.error(error);
          } else {
            console.error("connection to stream failed");
          }

          // onDisconnected();

          setStreamSubscription(null);
        }
      )
    );
  };
  useEffect(() => {
    if (!!streamInfo) {
      streamRef.current.srcObject = streamInfo?.stream;
      streamRef.current.play();
    }
  }, [!!streamInfo]);

  return (
    <>
      <div style={{ display: "flex", flex: 1 }}>
        <Video
          ref={streamRef}
          tabindex="0"
          playsinline
          oncontextmenu="return false;"
        />

        <div
          style={{
            position: "absolute",
            inset: 0,
            display: !!streamInfo ? "none" : "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <button id="session" onClick={startSession}>
            Start
          </button>
        </div>
      </div>
      {/* {webrtcClient != null && project?.newUI && (
        <AppUI
          emitUIInteraction={(v) => {
            webrtcClient.emitUIInteraction(v);
            console.log("emitUIInteraction() with: ", v);
          }}
          project={project}
          uiData={project.uiData}
        />
      )} */}
    </>
  );
};

export default ProjectM;
