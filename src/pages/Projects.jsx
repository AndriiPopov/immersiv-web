import LayoutHOC from "layout/Layout";
import React, { useEffect, useState } from "react";
import projectService from "services/project.service";

import {
    Button,
    Drawer,
    Dropdown,
    Layout,
    List,
    Menu,
    PageHeader,
    Popconfirm,
} from "antd";
import { Content } from "antd/lib/layout/layout";
import {
    EyeFilled,
    EyeInvisibleFilled,
    MenuOutlined,
    MoreOutlined,
    StarFilled,
} from "@ant-design/icons";
import { useUser } from "context/UserContext";
import { useNavigate } from "react-router-dom";

const Projects = (props) => {
    const [projects, setProjects] = useState(null);
    const { logout, isLoggedIn, authData } = useUser();
    const navigate = useNavigate();

    const [openDrawer, setOpenDrawer] = useState(false);
    useEffect(() => {
        projectService.getProject().then((response) => {
            setProjects(response.data);
        });
    }, []);

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

    const deleteProject = async (id) => {
        const response = await projectService.deleteProject(id);
        if (response.data) setProjects(response.data);
    };

    const setFeatured = async (id) => {
        const response = await projectService.saveProject(id, {
            featured: true,
        });

        if (response.data) setProjects(response.data);
    };

    return (
        <LayoutHOC loading={!projects}>
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
                    title={"Projects"}
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
                    <Button
                        onClick={() => navigate("/admin/projects/create")}
                        style={{ margin: "16px" }}
                    >
                        Add project
                    </Button>
                    {projects && (
                        <List
                            itemLayout="horizontal"
                            dataSource={projects.sort((a, b) =>
                                a.url > b.url ? 1 : -1
                            )}
                            renderItem={(project) => (
                                <List.Item
                                    actions={[
                                        <Dropdown
                                            overlay={
                                                <Menu>
                                                    <Menu.Item
                                                        key="1"
                                                        onClick={() =>
                                                            setFeatured(
                                                                project.id
                                                            )
                                                        }
                                                    >
                                                        Set as featured
                                                    </Menu.Item>
                                                    <Menu.Divider />
                                                    <Popconfirm
                                                        title="Are you sure to delete this project?"
                                                        onConfirm={() =>
                                                            deleteProject(
                                                                project.id
                                                            )
                                                        }
                                                        okText="Yes"
                                                        cancelText="No"
                                                    >
                                                        <Menu.Item
                                                            key="3"
                                                            danger
                                                        >
                                                            Delete
                                                        </Menu.Item>
                                                    </Popconfirm>
                                                </Menu>
                                            }
                                            trigger={["click"]}
                                        >
                                            <MoreOutlined
                                                style={{ fontSize: "30px" }}
                                            />
                                        </Dropdown>,
                                    ]}
                                >
                                    <List.Item.Meta
                                        avatar={
                                            project.featured ? (
                                                <StarFilled
                                                    style={{ fontSize: "24px" }}
                                                />
                                            ) : project.published ? (
                                                <EyeFilled
                                                    style={{ fontSize: "24px" }}
                                                />
                                            ) : (
                                                <EyeInvisibleFilled
                                                    style={{ fontSize: "24px" }}
                                                />
                                            )
                                        }
                                        title={project.name}
                                        description={project.url}
                                        onClick={() => {
                                            navigate(
                                                `/admin/projects/${project.id}`
                                            );
                                        }}
                                    />
                                </List.Item>
                            )}
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
                            case "info":
                                navigate("/admin/contant");
                                break;
                            case "admins":
                                navigate("/admin/admins");
                                break;
                            default:
                                return;
                        }
                    }}
                    activeKey="projects"
                    selectedKeys={["projects"]}
                >
                    <Menu.Item key="projects">Projects</Menu.Item>
                    <Menu.Item key="info">Constant</Menu.Item>
                    <Menu.Item key="admins">Admins</Menu.Item>
                    <Menu.Item key="logout">Logout</Menu.Item>
                </Menu>
            </Drawer>
        </LayoutHOC>
    );
};

export default Projects;
