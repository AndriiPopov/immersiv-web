import { Button, Checkbox, Form, Input, Switch } from "antd";
import React from "react";

const ProjectFormFields = () => {
    return (
        <>
            <Form.Item
                name="name"
                label="Name"
                rules={[
                    {
                        required: true,
                        message: "Please set name!",
                    },
                ]}
            >
                <Input placeholder="Name" />
            </Form.Item>
            <Form.Item
                name="url"
                label="Url"
                rules={[
                    {
                        required: true,
                        message: "Please add url!",
                    },
                ]}
                extra="This is only what should appear at the end of url, for example 'best-hotel', 'sky_mall'... Do not put https://tour.immersiv.com.au/ here!"
            >
                <Input placeholder="Url" />
            </Form.Item>

            <Form.Item
                name="projectId"
                label="Project id"
                rules={[
                    {
                        required: true,
                        message: "Please add project id!",
                    },
                ]}
            >
                <Input placeholder="Project id" />
            </Form.Item>

            <Form.Item
                name="modelId"
                label="Model id"
                rules={[
                    {
                        required: true,
                        message: "Please add model id!",
                    },
                ]}
            >
                <Input placeholder="Model id" />
            </Form.Item>

            <Form.Item name="adminEmail" label="Client login">
                <Input placeholder="Admin email" />
            </Form.Item>

            <Form.Item
                name="adminPassword"
                label="Client password"
                rules={[
                    {
                        min: 6,
                        message: "Must have length at least 6!",
                    },
                ]}
            >
                <Input placeholder="Admin password" />
            </Form.Item>

            <Form.Item name="analytic" label="Analytics property">
                <Input placeholder="Google analytics property id" />
            </Form.Item>

            <Form.Item
                name="mobileNativeEvents"
                label="Mobile native events"
                valuePropName="checked"
            >
                <Switch>Mobile native events</Switch>
            </Form.Item>
            <Form.Item
                name="desktopNativeEvents"
                label="Desktop native events"
                valuePropName="checked"
            >
                <Switch />
            </Form.Item>

            <Form.Item
                name="published"
                valuePropName="checked"
                label="Published"
            >
                <Checkbox />
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
        </>
    );
};

export default ProjectFormFields;
