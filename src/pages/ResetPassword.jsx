import useQuery from "helpers/useQuery";
import Layout from "layout/Layout";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import authService from "services/auth.service";
import { Button, Form, Input, Spin, Typography } from "antd";

const ResetPassword = () => {
    const [msg, setMsg] = useState("");
    const [isResetting, setIsResetting] = useState(false);

    const query = useQuery();
    const token = query.get("token");
    const email = query.get("email");
    const { navigate } = useNavigate();
    useEffect(() => {
        authService
            .checkToken(token, email)
            .then(({ data }) => setMsg(data))
            .catch((e) => console.error(e.response));
    }, [token, email]);

    const onFinish = (data) => {
        setIsResetting(true);
        authService
            .resetPassword(token, email, data.password, data.password2)
            .then(({ data }) => {
                if (data.status === "error") {
                    setIsResetting(false);
                    return;
                }
                toast.success(data.message);
                setTimeout(() => {
                    navigate("/login");
                }, 2000);
            })
            .catch((err) => {
                setIsResetting(false);
            });
    };
    return (
        <Layout title="Reset Password">
            {msg.showForm ? (
                <Form
                    labelCol={{
                        xs: {
                            span: 24,
                        },
                        sm: {
                            span: 8,
                        },
                    }}
                    wrapperCol={{
                        xs: {
                            span: 24,
                        },
                        sm: {
                            span: 16,
                        },
                    }}
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
                        Reset password
                    </Typography.Title>
                    <Form.Item
                        name="password"
                        label="Password"
                        rules={[
                            {
                                required: true,
                                message:
                                    "Please input your password at least 6 symbols long!",
                                min: 6,
                            },
                        ]}
                        hasFeedback
                    >
                        <Input.Password />
                    </Form.Item>

                    <Form.Item
                        name="confirm"
                        label="Confirm Password"
                        dependencies={["password"]}
                        hasFeedback
                        rules={[
                            {
                                required: true,
                                message: "Please confirm your password!",
                            },
                            ({ getFieldValue }) => ({
                                validator(_, value) {
                                    if (
                                        !value ||
                                        getFieldValue("password") === value
                                    ) {
                                        return Promise.resolve();
                                    }

                                    return Promise.reject(
                                        new Error(
                                            "The two passwords that you entered do not match!"
                                        )
                                    );
                                },
                            }),
                        ]}
                    >
                        <Input.Password />
                    </Form.Item>

                    <Form.Item
                        wrapperCol={{
                            xs: {
                                span: 24,
                                offset: 0,
                            },
                            sm: {
                                span: 16,
                                offset: 8,
                            },
                        }}
                    >
                        {isResetting ? (
                            <Spin />
                        ) : (
                            <Button
                                type="primary"
                                htmlType="submit"
                                style={{ width: "100%" }}
                            >
                                Reset password
                            </Button>
                        )}
                    </Form.Item>
                </Form>
            ) : (
                <div>{msg.message}</div>
            )}
        </Layout>
    );
};

export default ResetPassword;
