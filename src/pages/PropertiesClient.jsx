import LayoutHOC from "layout/Layout";
import React, { useEffect, useState } from "react";

import { Drawer, Layout, Menu, PageHeader } from "antd";
import { Content } from "antd/lib/layout/layout";
import { MenuOutlined } from "@ant-design/icons";
import { useUser } from "context/UserContext";
import { useNavigate, useParams } from "react-router-dom";
import Properties from "./Properties";
import projectService from "services/project.service";
import propertyService from "services/property.service";

const PropertiesClient = (props) => {
    const { id } = useParams();
    const { logout, isLoggedIn, authData } = useUser();
    const navigate = useNavigate();
    const [project, setProject] = useState(null);
    const [properties, setProperties] = useState(null);

    const [openDrawer, setOpenDrawer] = useState(false);

    useEffect(() => {
        propertyService.getProperty(id).then((response) => {
            setProperties(response.data);
        });

        projectService.getProject(id).then((response) => {
            setProject(response.data);
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
        <LayoutHOC loading={!properties || !project}>
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
                    title={"Appartments"}
                    style={{
                        boxShadow: "1px 1px 10px 1px #ccc",
                        position: "fixed",
                        zIndex: 100,
                        width: "100%",
                    }}
                />

                <Content
                    style={{
                        flex: 1,
                        overflow: "auto",
                        padding: "16px",
                        paddingTop: "100px",
                        maxWidth: "1200px",
                        width: "100%",
                        margin: "auto",
                    }}
                >
                    <Properties
                        id={id}
                        setProject={setProject}
                        setProperties={setProperties}
                        project={project}
                        properties={properties}
                    />
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
                                navigate(`/p-admin/${project.id}/analytics`);
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
