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
    Select,
} from "antd";
import { Content } from "antd/lib/layout/layout";
import { MoreOutlined } from "@ant-design/icons";
import { useUser } from "context/UserContext";
import { useNavigate, useParams } from "react-router-dom";
import propertyService from "services/property.service";
import toast from "react-hot-toast";

const Properties = (props) => {
    const formRef = useRef(null);
    const { id } = useParams();
    const [properties, setProperties] = useState(null);
    const [editModalOpen, setEditModalOpen] = useState(null);
    const { isLoggedIn, authData, logout } = useUser();
    const navigate = useNavigate();

    useEffect(() => {
        propertyService.getProperty(id).then((response) => {
            setProperties(response.data);
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
        const response = editModalOpen?.id
            ? await propertyService.saveProperty(id, editModalOpen.id, values)
            : await propertyService.createProperty(id, values);
        if (response.data) {
            toast.success("Saved");
            setProperties(response.data);
            setEditModalOpen(null);
            if (formRef.current) formRef.current.resetFields();
        }
    };

    const deleteProperty = async (propertyId) => {
        const response = await propertyService.deleteProperty(id, propertyId);
        if (response.data) setProperties(response.data);
    };

    const { Option } = Select;

    return (
        <LayoutHOC loading={!properties}>
            <Layout
                style={{
                    height: "100%",
                    display: "flex",
                    flex: 1,
                    background: "white",
                }}
            >
                <PageHeader
                    onBack={() => navigate(`/admin/projects/${id}`)}
                    title={`Properties of project id: ${id}`}
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
                        Add property
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
                                name="name"
                                rules={[
                                    {
                                        required: true,
                                        message: "Please add name!",
                                    },
                                ]}
                            >
                                <Input placeholder="Name" />
                            </Form.Item>
                            <Form.Item
                                name="propertyId"
                                rules={[
                                    {
                                        required: true,
                                        message: "Please add id!",
                                    },
                                ]}
                            >
                                <Input placeholder="Property id" />
                            </Form.Item>

                            <Form.Item
                                name="status"
                                rules={[
                                    {
                                        required: true,
                                        message: "Please set the status!",
                                    },
                                ]}
                            >
                                <Select>
                                    <Option value="available">Available</Option>
                                    <Option value="reserved">Reserved</Option>
                                    <Option value="sold">Sold</Option>
                                </Select>
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
                    {properties && (
                        <List
                            itemLayout="horizontal"
                            dataSource={properties.sort((a, b) =>
                                a.name > b.name ? 1 : -1
                            )}
                            renderItem={(property) => (
                                <List.Item
                                    actions={[
                                        <Dropdown
                                            overlay={
                                                <Menu>
                                                    <Menu.Item
                                                        onClick={() => {
                                                            setEditModalOpen(
                                                                property
                                                            );
                                                            formRef.current &&
                                                                formRef.current.setFieldsValue(
                                                                    property
                                                                );
                                                        }}
                                                    >
                                                        Edit
                                                    </Menu.Item>
                                                    <Menu.Divider />
                                                    <Popconfirm
                                                        title="Are you sure to delete this property?"
                                                        onConfirm={() =>
                                                            deleteProperty(
                                                                property.id
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
                                        title={`${property.name} (${property.status})`}
                                        description={`Property id: ${property.propertyId}`}
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

export default Properties;
