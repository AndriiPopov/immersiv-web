import LayoutHOC from "layout/Layout";
import React, { useEffect, useState } from "react";
import projectService from "services/project.service";

import { Drawer, Layout, Menu, PageHeader } from "antd";
import { Content } from "antd/lib/layout/layout";
import { MenuOutlined } from "@ant-design/icons";
import { useUser } from "context/UserContext";
import { useNavigate, useParams } from "react-router-dom";
import propertyService from "services/property.service";
import PropertiesTable from "components/ProjectView/Components/PropertiesTable";

const PropertiesClient = (props) => {
    const { id } = useParams();
    const [project, setProject] = useState(null);
    const [properties, setProperties] = useState(null);
    const { logout, isLoggedIn, authData } = useUser();
    const navigate = useNavigate();

    const [openDrawer, setOpenDrawer] = useState(false);
    useEffect(() => {
        projectService.getProject(id).then((response) => {
            setProject(response.data);
        });

        propertyService.getProperty(id).then((response) => {
            setProperties(response.data);
        });
    }, []);

    useEffect(() => {
        if (
            !isLoggedIn ||
            (!authData?.super &&
                id.toString() !== authData?.projectId.toString())
        ) {
            logout();
            navigate("/login");
            return null;
        }
    }, [isLoggedIn, authData?.super, authData?.projectId]);

    return (
        <LayoutHOC loading={!project || !properties}>
            <Layout
                style={{
                    height: "100%",
                    display: "flex",
                    flex: 1,
                    background: "white",
                }}
            >
                <PageHeader
                    onBack={() => setOpenDrawer(true)}
                    backIcon={<MenuOutlined />}
                    title={project?.name || "Project"}
                    style={{ boxShadow: "1px 1px 10px 1px #ccc" }}
                />

                <Content
                    style={{
                        flex: 1,
                        overflow: "auto",
                        padding: "16px",
                        maxWidth: "800px",
                        width: "100%",
                        margin: "auto",
                    }}
                >
                    {properties && project && (
                        <PropertiesTable
                            properties={properties}
                            setProperties={setProperties}
                            project={project}
                        />
                    )}
                </Content>
            </Layout>
            <Drawer
                title="Menu"
                placement="left"
                onClose={() => setOpenDrawer(false)}
                visible={openDrawer}
            >
                <Menu
                    mode="inline"
                    style={{ width: "100%" }}
                    onClick={({ item, key }) => {
                        setOpenDrawer(false);
                        switch (key) {
                            case "logout":
                                logout();
                                break;
                            case "visit":
                                navigate(`/p/${project.url}`);
                                break;
                            case "analytics":
                                navigate(`/p-admin/${project.url}/analytics`);
                                break;
                            default:
                                return;
                        }
                    }}
                    activeKey="properties"
                    selectedKeys={["properties"]}
                >
                    <Menu.Item key="properties">Properties</Menu.Item>
                    <Menu.Item key="analytics">Analytics</Menu.Item>
                    <Menu.Item key="visit">Visit project</Menu.Item>
                    <Menu.Item key="logout">Logout</Menu.Item>
                </Menu>
            </Drawer>
        </LayoutHOC>
    );
};

export default PropertiesClient;
