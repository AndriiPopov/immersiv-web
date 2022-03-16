import LayoutHOC from "layout/Layout";
import React, { useEffect, useRef, useState } from "react";

import {
    Button,
    Dropdown,
    Form,
    Input,
    Layout,
    List,
    Menu,
    Modal,
    PageHeader,
    Popconfirm,
} from "antd";
import { Content } from "antd/lib/layout/layout";
import { MoreOutlined } from "@ant-design/icons";
import { useUser } from "context/UserContext";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import adminService from "services/admin.service";

const Admins = (props) => {
    const formRef = useRef(null);
    const [admins, setAdmins] = useState(null);
    const [editModalOpen, setEditModalOpen] = useState(null);
    const { isLoggedIn, authData, logout } = useUser();
    const navigate = useNavigate();

    useEffect(() => {
        adminService.getAdmin().then((response) => {
            setAdmins(response.data);
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
        const response = await adminService.createAdmin(values);
        if (response.data) {
            toast.success("Saved");
            setAdmins(response.data);
            setEditModalOpen(null);
            if (formRef.current) formRef.current.resetFields();
        }
    };

    const deleteAdmin = async (id) => {
        const response = await adminService.deleteAdmin(id);
        if (response.data) setAdmins(response.data);
    };

    return (
        <LayoutHOC loading={!admins}>
            <Layout
                style={{
                    height: "100%",
                    display: "flex",
                    flex: 1,
                    background: "white",
                }}
            >
                <PageHeader
                    onBack={() => navigate(`/admin`)}
                    title={`Admins`}
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
                        onClick={() => setEditModalOpen({})}
                        style={{ margin: "16px" }}
                    >
                        Add admin
                    </Button>
                    <Modal
                        visible={!!editModalOpen}
                        onCancel={() => setEditModalOpen(null)}
                        footer={null}
                    >
                        <Form
                            name="normal_login"
                            onFinish={onFinish}
                            style={{
                                padding: " 16px",
                                maxWidth: "500px",
                                margin: "auto",
                            }}
                            ref={formRef}
                        >
                            <Form.Item
                                name="email"
                                rules={[
                                    {
                                        required: true,
                                        message: "Please add name!",
                                        type: "email",
                                    },
                                ]}
                            >
                                <Input placeholder="Email" />
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
                        </Form>
                    </Modal>
                    {admins && (
                        <List
                            itemLayout="horizontal"
                            dataSource={admins.sort((a, b) =>
                                a.name > b.name ? 1 : -1
                            )}
                            renderItem={(admin) => (
                                <List.Item
                                    actions={[
                                        <Dropdown
                                            overlay={
                                                <Menu>
                                                    <Popconfirm
                                                        title="Are you sure to delete this admin?"
                                                        onConfirm={() =>
                                                            deleteAdmin(
                                                                admin.email
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
                                    style={{
                                        borderBottom: "3px solid #ccc",
                                        paddingLeft: "16px",
                                    }}
                                >
                                    <List.Item.Meta
                                        title={admin.email}
                                        description={
                                            admin.locked
                                                ? "Locked"
                                                : "Not locked"
                                        }
                                    />
                                </List.Item>
                            )}
                        />
                    )}
                </Content>
            </Layout>
        </LayoutHOC>
    );
};

export default Admins;
