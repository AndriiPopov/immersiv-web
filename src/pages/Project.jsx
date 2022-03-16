import ProjectView from "components/ProjectView/ProjectView";
import Layout from "layout/Layout";
import React, { useEffect, useState } from "react";
import projectService from "services/project.service";
import { useParams } from "react-router-dom";
import constantService from "services/constant.service";

const Project = (props) => {
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
    return (
        <Layout loading={!projectData} isProject>
            <ProjectView project={projectData} constant={constant} />
        </Layout>
    );
};

export default Project;
