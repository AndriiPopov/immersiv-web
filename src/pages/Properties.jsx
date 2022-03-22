import React, { useEffect, useRef, useState } from "react";

import { Button, Form, Input, Modal, Select } from "antd";

import { useUser } from "context/UserContext";
import { useNavigate } from "react-router-dom";
import propertyService from "services/property.service";
import toast from "react-hot-toast";
import PropertiesTable from "components/ProjectView/Components/PropertiesTable";
import projectService from "services/project.service";

const Properties = (props) => {
    const { admin, id, project, properties, setProject, setProperties } = props;
    const formRef = useRef(null);

    const [editModalOpen, setEditModalOpen] = useState(null);
    const { isLoggedIn, authData, logout } = useUser();
    const navigate = useNavigate();

    useEffect(() => {
        propertyService.getProperty(id).then((response) => {
            setProperties(response.data);
        });

        projectService.getProject(id).then((response) => {
            setProject(response.data);
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

    useEffect(() => {
        if (formRef.current) {
            if (editModalOpen)
                formRef.current.setFieldsValue(
                    editModalOpen.id
                        ? transferOrientationToString(editModalOpen)
                        : editModalOpen
                );
        }
    }, [editModalOpen?.id]);

    const onFinish = async (values) => {
        const response = editModalOpen?.id
            ? await propertyService.saveProperty(
                  id,
                  editModalOpen.id,
                  transferOrientationToObject(values)
              )
            : await propertyService.createProperty(
                  id,
                  transferOrientationToObject(values)
              );
        if (response.data) {
            toast.success("Saved");
            setProperties(response.data);
            setEditModalOpen(null);
            if (formRef.current) formRef.current.resetFields();
        }
    };

    const transferOrientationToObject = (data) => {
        const o = {};
        if (data.Orientation.indexOf("N") !== -1) o.N = true;
        else if (data.Orientation.indexOf("S") !== -1) o.S = true;
        if (data.Orientation.indexOf("E") !== -1) o.E = true;
        else if (data.Orientation.indexOf("W") !== -1) o.W = true;
        return { ...data, Orientation: o };
    };

    const transferOrientationToString = (data) => {
        let o = "";
        if (data.Orientation.N) o = o + "N";
        else if (data.Orientation.S) o = o + "S";
        if (data.Orientation.E) o = o + "E";
        else if (data.Orientation.W) o = o + "W";
        return { ...data, Orientation: o };
    };
    const { Option } = Select;

    return (
        <>
            {admin && (
                <Button
                    onClick={() => setEditModalOpen({})}
                    style={{ margin: "16px" }}
                >
                    Add property
                </Button>
            )}
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
                    labelCol={{ span: 8 }}
                    wrapperCol={{ span: 16 }}
                >
                    <Form.Item
                        name="Name"
                        label="Name"
                        rules={[
                            {
                                required: true,
                                message: "Please add name!",
                            },
                        ]}
                    >
                        <Input placeholder="Name" readOnly={!admin} />
                    </Form.Item>

                    <Form.Item name="Surface" label="Surface">
                        <Input placeholder="Surface" type="number" />
                    </Form.Item>
                    <Form.Item name="Price" label="Price">
                        <Input placeholder="Price" type="number" />
                    </Form.Item>
                    <Form.Item name="BedroomsCount" label="Bedrooms">
                        <Input placeholder="Bedrooms" type="number" />
                    </Form.Item>
                    <Form.Item name="BathroomsCount" label="Bathrooms">
                        <Input placeholder="Bathrooms" type="number" />
                    </Form.Item>
                    <Form.Item name="Orientation" label="Orientation">
                        <Select>
                            <Option value="N">North</Option>
                            <Option value="NE">North-East</Option>
                            <Option value="E">East</Option>
                            <Option value="SE">South-East</Option>
                            <Option value="S">South</Option>
                            <Option value="SW">South-West</Option>
                            <Option value="W">West</Option>
                            <Option value="NW">North-West</Option>
                        </Select>
                    </Form.Item>
                    <Form.Item
                        name="Availability"
                        label="Availability"
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
                    <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
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
            {properties && project && (
                <PropertiesTable
                    properties={properties}
                    setProperties={setProperties}
                    project={project}
                    admin={admin}
                    setEditModalOpen={setEditModalOpen}
                    transferOrientationToString={transferOrientationToString}
                />
            )}
        </>
    );
};

export default Properties;
