// import { Button, HelperText, Input, Label } from "@windmill/react-ui";
import ForgotPasswordModal from "components/ForgotPasswordModal";
import { useUser } from "context/UserContext";
import Layout from "layout/Layout";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { Redirect } from "react-router-dom";
import authService from "services/auth.service";
import { Form, Input, Button, Typography } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";

const Login = () => {
    const { isLoggedIn, setUserState } = useUser();
    const [isLoading, setIsLoading] = useState(false);
    const [redirectToReferrer, setRedirectToReferrer] = useState(false);

    const onFinish = async (data) => {
        const { email, password } = data;

        try {
            setIsLoading(true);
            const data = await authService.login(email, password);
            toast.success("Login successful 🔓");

            setTimeout(() => {
                setUserState(data);
                setRedirectToReferrer(true);
                setIsLoading(false);
            }, 1500);
        } catch (error) {
            setIsLoading(false);
        }
    };

    if (redirectToReferrer) {
        return <Redirect to="/admin" />;
    }
    if (isLoggedIn) {
        return <Redirect to="/admin" />;
    }

    return (
        <Layout title="Login" loading={isLoading}>
            <Form
                name="normal_login"
                onFinish={onFinish}
                style={{
                    padding: "100px 16px",
                    maxWidth: "500px",
                    margin: "auto",
                }}
            >
                <Typography.Title
                    style={{ textAlign: "center", marginBottom: "50px" }}
                >
                    Manage IMMERSIVE
                </Typography.Title>
                <Form.Item
                    name="email"
                    rules={[
                        {
                            type: "email",
                            message: "The input is not valid E-mail!",
                        },
                        {
                            required: true,
                            message: "Please input your E-mail!",
                        },
                    ]}
                >
                    <Input
                        prefix={
                            <UserOutlined className="site-form-item-icon" />
                        }
                        placeholder="Email"
                    />
                </Form.Item>
                <Form.Item
                    name="password"
                    rules={[
                        {
                            required: true,
                            message: "Please input your Password!",
                        },
                    ]}
                >
                    <Input.Password
                        prefix={
                            <LockOutlined className="site-form-item-icon" />
                        }
                        type="password"
                        placeholder="Password"
                    />
                </Form.Item>
                <Form.Item>
                    <a>
                        <ForgotPasswordModal />
                    </a>
                </Form.Item>

                <Form.Item>
                    <Button
                        type="primary"
                        htmlType="submit"
                        style={{ width: "100%" }}
                    >
                        Log in
                    </Button>
                </Form.Item>
            </Form>
        </Layout>
    );
};

export default Login;
