import LayoutHOC from "layout/Layout";
import React, { useEffect, useRef, useState } from "react";

import { Button, Layout, PageHeader, Form, Input } from "antd";
import { Content } from "antd/lib/layout/layout";

import { useUser } from "context/UserContext";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import constantService from "services/constant.service";

const Constants = (props) => {
    const { isLoggedIn, authData, logout } = useUser();
    const [constants, setConstants] = useState(null);
    const formRef = useRef(null);

    const navigate = useNavigate();

    useEffect(() => {
        constantService
            .getConstant()
            .then((response) => {
                if (response.data) {
                    setConstants(response.data);
                    formRef.current &&
                        formRef.current.setFieldsValue(response.data);
                } else setConstants({});
            })
            .catch(() => {
                setConstants({});
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
    const onFinish = async (values) => {
        const response = await constantService.saveConstant(values);
        if (response.data) {
            setConstants(response.data);
            toast.success("Saved");
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
                    title="Constants"
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
                    <Form
                        ref={formRef}
                        name="normal_login"
                        onFinish={onFinish}
                        style={{
                            padding: " 16px",
                            maxWidth: "500px",
                            margin: "auto",
                        }}
                        initialValues={constants}
                    >
                        <Form.Item name="email">
                            <Input placeholder="Email" />
                        </Form.Item>

                        <Form.Item name="phone">
                            <Input placeholder="Phone" />
                        </Form.Item>

                        <Form.Item name="call">
                            <Input placeholder="Phone in international format" />
                        </Form.Item>

                        <Form.Item>
                            <Button
                                type="primary"
                                htmlType="submit"
                                style={{ width: "100%" }}
                            >
                                Save
                            </Button>
                        </Form.Item>
                        <Form.Item>
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

export default Constants;
