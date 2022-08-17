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

    const [form] = Form.useForm();

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

    const setFieldsValue = (val) => {
        if (form) {
            form.setFieldsValue({
                ...form.getFieldsValue(),
                ...val,
            });
        }
    };

    const description = Form.useWatch("description", form);
    const projectName = Form.useWatch("projectName", form);
    const clientLogo = Form.useWatch("clientLogo", form);
    const clientLogoMaxWidth = Form.useWatch("clientLogoMaxWidth", form);
    const clientLogoMaxHeight = Form.useWatch("clientLogoMaxHeight", form);
    const projectLogo = Form.useWatch("projectLogo", form);
    const projectLogoMaxWidth = Form.useWatch("projectLogoMaxWidth", form);
    const projectLogoMaxHeight = Form.useWatch("projectLogoMaxHeight", form);
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
                                form={form}
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
                                <ProjectFormFields
                                    setFieldsValue={setFieldsValue}
                                />

                                <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                                    <Button
                                        onClick={() => {
                                            if (form.current)
                                                form.current.resetFields();
                                        }}
                                        style={{ width: "100%" }}
                                    >
                                        Reset
                                    </Button>
                                </Form.Item>
                            </Form>
                            <div>
                                <div>Project details preview</div>
                                <div
                                    style={{
                                        display: "flex",
                                        flexDirection: "column",
                                        flex: 1,
                                        alignItems: "center",
                                    }}
                                >
                                    <img
                                        src={clientLogo}
                                        alt="logo"
                                        style={{
                                            maxHeight:
                                                clientLogoMaxHeight + "px",
                                            maxWidth: clientLogoMaxWidth + "px",
                                            marginBottom: "36px",
                                        }}
                                    />
                                    {projectLogo ? (
                                        <img
                                            src={projectLogo}
                                            alt="logo"
                                            style={{
                                                maxHeight:
                                                    projectLogoMaxHeight + "px",
                                                maxWidth:
                                                    projectLogoMaxWidth + "px",
                                                marginBottom: "36px",
                                            }}
                                        />
                                    ) : (
                                        <h6 style={{ textAlign: "center" }}>
                                            {projectName}
                                        </h6>
                                    )}
                                    <p style={{ textAlign: "center" }}>
                                        {description}
                                    </p>
                                </div>
                            </div>
                        </>
                    )}
                </Content>
            </Layout>
        </LayoutHOC>
    );
};

export default ProjectDetails;
