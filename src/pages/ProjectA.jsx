import React, { useEffect, useRef, useState } from "react";
import projectService from "services/project.service";
import { useParams } from "react-router-dom";
import constantService from "services/constant.service";
import { WebRTCClient } from "@arcware/webrtc-plugin";

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

function AppUI(props) {
    const { emitUIInteraction } = props;

    function colorChange(event) {
        emitUIInteraction(descriptors.color[event?.target?.value]);
    }

    return (
        <div className="buttons-block">
            <select onChange={colorChange}>
                {Object.keys(descriptors.color).map((v) => (
                    <option key={v}>{v}</option>
                ))}
            </select>
        </div>
    );
}

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
    const [projectData, setProjectData] = useState(null);
    const [constant, setConstant] = useState({});

    const { featured } = props;

    const { id } = useParams();

    useEffect(() => {
        setProjectData(null);
        if (featured)
            projectService.getFeaturedProject().then((response) => {
                setProjectData(response.data);
            });
        else
            projectService.getProjectByUrl(id).then((response) => {
                setProjectData(response.data);
            });

        constantService.getConstant().then((response) => {
            if (response.data) setConstant(response.data);
        });
    }, [id, featured]);

    const sizeContainerRef = useRef(null);
    const containerRef = useRef(null);
    const videoRef = useRef(null);
    const [webrtcClient, setWebrtcClient] = useState();
    const [responses, setResponses] = useState([]);
    let webrtcClientInit = false;

    const responseCallback = (message) => {
        setResponses([message, ...responses]);
    };

    const videoInitialized = () => {
        if (webrtcClient) {
            webrtcClient.emitUIInteraction(descriptors.color.black);
        }
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
        if (!webrtcClientInit) {
            webrtcClientInit = true;
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
            {/* {webrtcClient != null && (
                <AppUI emitUIInteraction={webrtcClient.emitUIInteraction} />
            )} */}
        </>
    );
};

export default ProjectA;
