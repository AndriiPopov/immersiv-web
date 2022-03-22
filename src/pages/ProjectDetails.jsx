import LayoutHOC from "layout/Layout";
import React, { useEffect, useRef, useState } from "react";
import projectService from "services/project.service";

import { Button, Layout, PageHeader, Form, Typography } from "antd";
import { Content } from "antd/lib/layout/layout";

import { useUser } from "context/UserContext";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import toast from "react-hot-toast";
import ProjectFormFields from "components/ProjectFormFields";

const ProjectDetails = (props) => {
    const [project, setProject] = useState(null);
    const { isLoggedIn, authData, logout } = useUser();
    const formRef = useRef(null);

    const { id } = useParams();

    useEffect(() => {
        projectService.getProject(id).then((response) => {
            setProject(response.data);
        });
    }, [id]);

    const navigate = useNavigate();
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

    const onFinish = async (values) => {
        const response = await projectService.saveProject(project.id, values);
        if (response.data) toast.success("Saved");
    };

    return (
        <LayoutHOC loading={!project}>
            <Layout
                style={{
                    height: "100%",
                    display: "flex",
                    flex: 1,
                    background: "white",
                }}
            >
                <PageHeader
                    onBack={() => navigate("/admin")}
                    title={`Project - ${project?.name}`}
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
                    {project && (
                        <>
                            <Typography.Title>
                                Project id: {project.id}
                            </Typography.Title>
                            <Button
                                onClick={() => navigate(`/p-admin/${id}`)}
                                style={{ margin: "16px" }}
                            >
                                See client admin panel
                            </Button>
                            <Button
                                onClick={() =>
                                    navigate(
                                        `/admin/projects/${project.id}/properties`
                                    )
                                }
                                style={{ margin: "16px" }}
                            >
                                Manage properties
                            </Button>
                            <Form
                                ref={formRef}
                                name="normal_login"
                                onFinish={onFinish}
                                style={{
                                    padding: " 16px",
                                    maxWidth: "500px",
                                    margin: "auto",
                                }}
                                initialValues={project}
                                labelCol={{ span: 8 }}
                                wrapperCol={{ span: 16 }}
                            >
                                <ProjectFormFields />
                                <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                                    <Button
                                        onClick={() => {
                                            if (formRef.current)
                                                formRef.current.resetFields();
                                        }}
                                        style={{ width: "100%" }}
                                    >
                                        Reset
                                    </Button>
                                </Form.Item>
                            </Form>
                        </>
                    )}
                </Content>
            </Layout>
        </LayoutHOC>
    );
};

export default ProjectDetails;
