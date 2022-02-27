import React, { useState } from "react";
import toast from "react-hot-toast";
import authService from "services/auth.service";
import Modal from "antd/lib/modal/Modal";
import { Button, Form, Input } from "antd";
import { UserOutlined } from "@ant-design/icons";

const ForgotPasswordModal = () => {
    const [isOpen, setIsOpen] = useState(false);

    const onFinish = (data) => {
        authService
            .forgotPassword(data.email)
            .then((data) => {
                if (data.data.status === "OK") {
                    toast.success("Email has been sent successfully.");
                    setIsOpen(false);
                }
            })
            .catch((error) => {});
    };
    return (
        <div>
            <>
                <span onClick={() => setIsOpen(!isOpen)}>Forgot password?</span>
                <Modal
                    title="Forgot Password"
                    visible={isOpen}
                    footer={[]}
                    onCancel={() => setIsOpen(false)}
                >
                    <Form
                        name="normal_login"
                        onFinish={onFinish}
                        style={{
                            padding: "100px 16px",
                            maxWidth: "500px",
                            margin: "auto",
                        }}
                    >
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

                        <Form.Item>
                            <Button
                                type="primary"
                                htmlType="submit"
                                style={{ width: "100%" }}
                            >
                                Reset password
                            </Button>
                        </Form.Item>
                    </Form>
                </Modal>
            </>
        </div>
    );
};

export default ForgotPasswordModal;
