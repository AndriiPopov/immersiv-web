import LayoutHOC from "layout/Layout";
import React, { useRef } from "react";
import projectService from "services/project.service";

import { Button, Layout, PageHeader, Form } from "antd";
import { Content } from "antd/lib/layout/layout";

import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import ProjectFormFields from "components/ProjectFormFields";
import useLoginCheck from "hooks/useLoginCheck";

const CreateProject = (props) => {
    const formRef = useRef(null);

    const navigate = useNavigate();

    useLoginCheck();

    const onFinish = async (values) => {
        const response = await projectService.createProject(values);
        if (response.data) {
            toast.success("Saved");
            navigate("/admin");
        }
    };

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
                    onBack={() => navigate("/admin")}
                    title="Create project"
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
                    <Form
                        ref={formRef}
                        name="normal_login"
                        onFinish={onFinish}
                        style={{
                            padding: " 16px",
                            maxWidth: "500px",
                            margin: "auto",
                        }}
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
                </Content>
            </Layout>
        </LayoutHOC>
    );
};

export default CreateProject;
