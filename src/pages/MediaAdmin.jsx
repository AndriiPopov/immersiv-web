import React, { useEffect, useState, useRef } from "react";

import { useNavigate, useParams } from "react-router-dom";
import LayoutHOC from "layout/Layout";
import {
    Button,
    Form,
    Input,
    Layout,
    List,
    PageHeader,
    Popconfirm,
    Select,
    Space,
    Typography,
    Upload,
} from "antd";
import { Content } from "antd/lib/layout/layout";
import projectService from "services/project.service";
import useLoginCheck from "hooks/useLoginCheck";
import toast from "react-hot-toast";
import YouTube from "react-youtube";
import { UploadOutlined } from "@ant-design/icons";
import axios from "axios";
import utilsService from "services/utils.service";

const MediaAdmin = (props) => {
    const { id } = useParams();
    const formRef = useRef(null);

    const navigate = useNavigate();
    const [project, setProject] = useState(null);
    useLoginCheck();

    useEffect(() => {
        projectService.getProject(id).then((response) => {
            setProject(response.data);
        });
    }, []);

    const onFinish = async (values) => {
        const response = await projectService.addMedia(id, values);
        if (response.data) {
            toast.success("Saved");
            setProject(response.data);
            if (formRef.current) formRef.current.resetFields();
        }
    };
    const handleMove = async (mediaId, down) => {
        const response = await projectService.moveMedia(id, mediaId, down);
        if (response.data) {
            toast.success("Moved");
            setProject(response.data);
        }
    };
    const handleDelete = async (mediaId) => {
        const response = await projectService.deleteMedia(id, mediaId);
        if (response.data) {
            toast.success("Deleted");
            setProject(response.data);
        }
    };

    const customUpload = async ({
        action,
        data,
        file,
        filename,
        headers,
        onError,
        onProgress,
        onSuccess,
        withCredentials,
    }) => {
        try {
            const res = await utilsService.signUrl();

            axios
                .put(res.data.signedRequest, file, {
                    headers: {
                        "Content-Type": file.type,
                    },
                })
                .then((s3res) => {
                    if (formRef.current) {
                        formRef.current.setFieldsValue({
                            ...formRef.current.values,
                            url: res.data.url,
                            thumbnail: res.data.thumbnail,
                        });
                        onSuccess(data.response, file);
                    }
                })
                .catch((err) => {
                    console.log(err.message);
                    onError();
                });
        } catch (error) {
            onError();
            toast.error(error.message);
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
                    onBack={() => navigate(`/admin/projects/${id}`)}
                    title={`Media of project id: ${id}`}
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
                        maxWidth: "1200px",
                        width: "100%",
                        margin: "auto",
                    }}
                >
                    {project && project.media && (
                        <div>
                            <List
                                itemLayout="vertical"
                                size="large"
                                dataSource={project.media}
                                renderItem={(item, index) => (
                                    <List.Item
                                        key={item.id}
                                        actions={[
                                            <Button
                                                size="small"
                                                key="up"
                                                onClick={() =>
                                                    handleMove(item.id, false)
                                                }
                                            >
                                                Move up
                                            </Button>,
                                            <Button
                                                size="small"
                                                key="down"
                                                onClick={() =>
                                                    handleMove(item.id, true)
                                                }
                                            >
                                                Move down
                                            </Button>,
                                            <Popconfirm
                                                title="Are you sure to delete this media?"
                                                onConfirm={() =>
                                                    handleDelete(item.id)
                                                }
                                                okText="Yes"
                                                cancelText="No"
                                                key="delete"
                                            >
                                                <Button size="small" danger>
                                                    Delete
                                                </Button>
                                            </Popconfirm>,
                                        ]}
                                        extra={
                                            item.type === "video" ? (
                                                <YouTube
                                                    videoId={item.url}
                                                    className="youtubeContainer"
                                                />
                                            ) : (
                                                <img
                                                    width="100%"
                                                    style={{
                                                        maxWidth: "300px",
                                                    }}
                                                    alt="logo"
                                                    src={item.url}
                                                />
                                            )
                                        }
                                    >
                                        <List.Item.Meta
                                            description={item.type}
                                            title={`${index + 1}. ${
                                                item.name || "no name"
                                            }`}
                                        />
                                        {item.url}
                                    </List.Item>
                                )}
                            />
                            <Form
                                onFinish={onFinish}
                                style={{
                                    padding: " 16px",
                                    maxWidth: "500px",
                                    margin: "auto",
                                    backgroundColor: "#eee",
                                }}
                                ref={formRef}
                            >
                                <Typography.Title level={4}>
                                    Add new media
                                </Typography.Title>
                                <Form.Item
                                    name="type"
                                    rules={[{ required: true }]}
                                >
                                    <Select placeholder="Choose type">
                                        <Select.Option value="photo">
                                            Photo
                                        </Select.Option>
                                        <Select.Option value="plan">
                                            Plan
                                        </Select.Option>
                                        <Select.Option value="video">
                                            Video
                                        </Select.Option>
                                    </Select>
                                </Form.Item>
                                <Form.Item
                                    name="name"
                                    rules={[{ required: true }]}
                                >
                                    <Input placeholder="Name" />
                                </Form.Item>
                                <Form.Item
                                    name="url"
                                    rules={[{ required: true }]}
                                >
                                    <Input placeholder="Url/Video id" />
                                </Form.Item>
                                <Form.Item name="thumbnail" hidden>
                                    <Input placeholder="Thumbnail" />
                                </Form.Item>
                                <Form.Item>
                                    <Upload
                                        accept="image/*"
                                        listType="picture"
                                        maxCount={1}
                                        customRequest={customUpload}
                                    >
                                        <Button icon={<UploadOutlined />}>
                                            Upload (Max: 1)
                                        </Button>
                                    </Upload>
                                </Form.Item>

                                <Form.Item>
                                    <Button
                                        type="primary"
                                        htmlType="submit"
                                        style={{ width: "100%" }}
                                    >
                                        Add media
                                    </Button>
                                </Form.Item>
                            </Form>
                        </div>
                    )}
                </Content>
            </Layout>
        </LayoutHOC>
    );
};

export default MediaAdmin;
