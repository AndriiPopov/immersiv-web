import React, { useEffect, useRef, useState } from "react";
import { WebRTCClient } from "@arcware/webrtc-plugin";
import { AppUI } from "components/ProjectView/Components/ProjectUI/AppUI";

const ProjectA = (props) => {
  const { project, setVideoInitialized } = props;

  const sizeContainerRef = useRef(null);
  const containerRef = useRef(null);
  const videoRef = useRef(null);
  const [webrtcClient, setWebrtcClient] = useState();
  const webrtcClientInit = useRef();

  const responseCallback = (message) => {
    console.log(message);
  };

  const videoInitialized = () => {
    setVideoInitialized(true);
  };

  useEffect(() => {
    const args = {
      address:
        props.project.arcwareAddress ||
        "wss://signalling-client.ragnarok.arcware.cloud/",
      packageId:
        props.project.arcwarePackageId ||
        "ff41fd0c-cac9-4e4c-abe5-3ada402f57cc",
      settings: {},
      autoplay: { video: true, audio: true },
      sizeContainer: sizeContainerRef.current,
      container: containerRef.current,
      videoRef: videoRef.current,
      playOverlay: false,
      loader: () => {},
      applicationResponse: responseCallback,
      videoInitializeCallback: videoInitialized,
    };

    // double load protection
    if (!webrtcClientInit.current) {
      webrtcClientInit.current = true;
      setWebrtcClient(new WebRTCClient(args));
    }
  }, []);

  return (
    <>
      <div ref={sizeContainerRef} style={{ flex: 1 }}>
        <div ref={containerRef} style={{ zIndex: 1 }}>
          <video ref={videoRef} />
          {/* <Responses responses={responses} /> */}
        </div>
      </div>
      {webrtcClient != null && project?.newUI && (
        <AppUI
          emitUIInteraction={(v) => {
            webrtcClient.emitUIInteraction(v);
            console.log("emitUIInteraction() with: ", v);
          }}
          project={project}
          uiData={project.uiData}
        />
      )}
    </>
  );
};

export default ProjectA;
