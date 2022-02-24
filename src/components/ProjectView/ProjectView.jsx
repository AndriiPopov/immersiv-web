import React, { useState } from "react";

import "./ProjectView.css";

import { isMobile as isMobileAgent } from "react-device-detect";

import { useWindowSize } from "@react-hook/window-size";

import { DesktopLayout } from "./Layout/DesktopLayout/DesktopLayout";
import { MobileLayout } from "./Layout/MobileLayout/MobileLayout";
import { Loading } from "./Components/Loading/Loading";
// import ReactGA from "react-ga";

const ProjectView = (props) => {
    const { project, constant } = props;
    const [width, height] = useWindowSize();
    const isMobile = isMobileAgent || width < 1200 || height < 700;
    const [loaded, setLoaded] = useState(false);

    //Add google analytic
    // useEffect(() => {
    //     if (client.GA) {
    //         ReactGA.initialize(client.GA);
    //         ReactGA.pageview(window.location.pathname + window.location.search);
    //     }
    // }, []);

    return (
        <>
            {isMobile ? (
                <MobileLayout
                    setLoaded={setLoaded}
                    loaded={loaded}
                    project={project}
                    constant={constant}
                />
            ) : (
                <DesktopLayout
                    setLoaded={setLoaded}
                    project={project}
                    constant={constant}
                />
            )}
            <Loading loaded={loaded} />
        </>
    );
};

export default ProjectView;
