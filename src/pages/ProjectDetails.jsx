import LayoutHOC from "layout/Layout";
import React, { useEffect, useRef, useState } from "react";
import projectService from "services/project.service";

import { Button, Layout, PageHeader, Form, Typography } from "antd";
import { Content } from "antd/lib/layout/layout";

import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import toast from "react-hot-toast";
import ProjectFormFields from "components/ProjectFormFields";
import useLoginCheck from "hooks/useLoginCheck";
import copy from "copy-to-clipboard";

const ProjectDetails = (props) => {
    const [project, setProject] = useState(null);

    const formRef = useRef(null);

    const { id } = useParams();

    useEffect(() => {
        projectService.getProject(id).then((response) => {
            setProject(response.data);
        });
    }, [id]);

    const navigate = useNavigate();
    useLoginCheck();

    const onFinish = async (values) => {
        const response = await projectService.saveProject(project.id, values);
        if (response.data) toast.success("Saved");
    };

    const projectAddress = project?.url
        ? `https://tour.immersiv.com.au/p/${project.url}`
        : "not set yet";
    const galleryAddress = project?.url
        ? `https://tour.immersiv.com.au/gallery?project=${project.url}`
        : "not set yet";
    const propertiesAddress = project?.url
        ? `https://tour.immersiv.com.au/api/properties/properties-ue/${project.url}`
        : "not set yet";

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
                        maxWidth: "800px",
                        width: "100%",
                        margin: "auto",
                    }}
                >
                    {project && (
                        <>
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
                            <Button
                                onClick={() =>
                                    navigate(
                                        `/admin/projects/${project.id}/media`
                                    )
                                }
                                style={{ margin: "16px" }}
                            >
                                Manage media
                            </Button>
                            <Typography.Paragraph>
                                {`The project full url is ${projectAddress}`}
                                <Button
                                    onClick={() => copy(projectAddress)}
                                    type="link"
                                >
                                    Copy
                                </Button>
                            </Typography.Paragraph>

                            <Typography.Paragraph>
                                {`The project gallery url is ${galleryAddress}`}{" "}
                                <Button
                                    onClick={() => copy(galleryAddress)}
                                    type="link"
                                >
                                    Copy
                                </Button>
                            </Typography.Paragraph>

                            <Typography.Paragraph>
                                {`The project properties api link ${propertiesAddress}`}{" "}
                                <Button
                                    onClick={() => copy(propertiesAddress)}
                                    type="link"
                                >
                                    Copy
                                </Button>
                            </Typography.Paragraph>

                            <Form
                                ref={formRef}
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
