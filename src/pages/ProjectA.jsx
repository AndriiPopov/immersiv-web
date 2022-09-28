import React, { useEffect, useRef, useState } from "react";
import { WebRTCClient } from "@arcware/webrtc-plugin";
import { AppUI } from "components/ProjectView/Components/ProjectUI/AppUI";

const descriptors = {
  color: {
    black: {
      Change_Attribute_Event: true,
      Attribute_Key: "Color",
      Attribute_Value: "Black",
    },
    white: {
      Change_Attribute_Event: true,
      Attribute_Key: "Color",
      Attribute_Value: "White",
    },
    yellow: {
      Change_Attribute_Event: true,
      Attribute_Key: "Color",
      Attribute_Value: "Metro_Exodus",
    },
  },
};

function Responses(props) {
  const { responses } = props;

  return (
    <div className="responses-block">
      <h4>Response log from UE app:</h4>
      <div className="responses-list">
        {responses.map((v) => (
          <p>{v}</p>
        ))}
      </div>
    </div>
  );
}

const ProjectA = (props) => {
  const { project, setVideoInitialized } = props;

  const sizeContainerRef = useRef(null);
  const containerRef = useRef(null);
  const videoRef = useRef(null);
  const [webrtcClient, setWebrtcClient] = useState();
  const [responses, setResponses] = useState([]);
  const webrtcClientInit = useRef();

  const responseCallback = (message) => {
    setResponses([message, ...responses]);
  };

  const videoInitialized = () => {
    if (webrtcClient) {
      webrtcClient.emitUIInteraction({ time: 30 });
    }
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
          emitUIInteraction={webrtcClient.emitUIInteraction}
          project={project}
        />
      )}
    </>
  );
};

export default ProjectA;
