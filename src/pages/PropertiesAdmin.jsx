import React, { useEffect, useState } from "react";

import { useUser } from "context/UserContext";
import { useNavigate, useParams } from "react-router-dom";
import Properties from "./Properties";
import LayoutHOC from "layout/Layout";
import { Layout, PageHeader } from "antd";
import { Content } from "antd/lib/layout/layout";
import propertyService from "services/property.service";
import projectService from "services/project.service";

const PropertiesAdmin = (props) => {
    const { id } = useParams();
    const { isLoggedIn, authData, logout } = useUser();
    const navigate = useNavigate();
    const [project, setProject] = useState(null);
    const [properties, setProperties] = useState(null);
    useEffect(() => {
        if (!isLoggedIn) {
            logout();
            navigate("/login");
            return null;
        }

        if (!authData?.super) {
            if (authData?.projectId) {
                navigate(`/p-admin/${authData.projectId}`);
                return null;
            } else {
                logout();
                navigate("/login");
                return null;
            }
        }
    }, [isLoggedIn, authData?.super, authData?.projectId]);

    useEffect(() => {
        propertyService.getProperty(id).then((response) => {
            setProperties(response.data);
        });

        projectService.getProject(id).then((response) => {
            setProject(response.data);
        });
    }, []);
    return (
        <LayoutHOC>
            <Layout
                style={{
                    height: "100%",
                    display: "flex",
                    flex: 1,
                    background: "white",
                }}
            >
                <PageHeader
                    onBack={() => navigate(`/admin/projects/${id}`)}
                    title={`Properties of project id: ${id}`}
                    style={{ boxShadow: "1px 1px 10px 1px #ccc" }}
                />

                <Content
                    style={{
                        flex: 1,
                        overflow: "auto",
                        padding: "16px",
                        maxWidth: "1200px",
                        width: "100%",
                        margin: "auto",
                    }}
                >
                    <Properties
                        admin
                        id={id}
                        setProject={setProject}
                        setProperties={setProperties}
                        project={project}
                        properties={properties}
                    />
                </Content>
            </Layout>
        </LayoutHOC>
    );
};

export default PropertiesAdmin;