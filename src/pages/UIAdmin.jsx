import React, { useEffect, useState, useRef } from "react";

import { useNavigate, useParams } from "react-router-dom";
import LayoutHOC from "layout/Layout";
import { Button, Checkbox, Form, Layout, PageHeader } from "antd";
import { Content } from "antd/lib/layout/layout";
import projectService from "services/project.service";
import useLoginCheck from "hooks/useLoginCheck";
import toast from "react-hot-toast";
import "video.js/dist/video-js.css";
import { AppUI } from "components/ProjectView/Components/ProjectUI/AppUI";
import { ChromePicker } from "react-color";

const UIAdmin = (props) => {
  const { id } = useParams();
  const [uiData, setUiData] = useState({});
  const [loaded, setLoaded] = useState(false);

  const navigate = useNavigate();
  const [project, setProject] = useState(null);
  useLoginCheck();

  useEffect(() => {
    projectService.getProject(id).then((response) => {
      setProject(response.data);
      setLoaded(true);
    });
  }, []);

  const onFinish = async () => {
    const response = await projectService.saveProject(id, { uiData });
    if (response.data) {
      toast.success("Saved");
      setProject(response.data);
    }
  };

  useEffect(() => {
    setUiData({ ...(project?.uiData || {}), ...uiData });
  }, [project?.uiData]);

  const [hideHidden, setHideHidden] = useState(false);
  const [hideControls, setHideControls] = useState(false);

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
          title={`UI of project id: ${id}`}
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
            paddingBottom: "100px",
            maxWidth: "1200px",
            width: "100%",
            margin: "auto",
          }}
        >
          {loaded && (
            <Form
              labelCol={{ span: 8 }}
              wrapperCol={{ span: 16 }}
              onFinish={onFinish}
              onValuesChange={(values) => {
                setUiData((prevState) => ({ ...prevState, ...values }));
              }}
              initialValues={{
                background: uiData?.background?.hex,
                onlyInterior: uiData?.onlyInterior,
              }}
            >
              <Form.Item
                label="Only interior"
                name="onlyInterior"
                valuePropName="checked"
              >
                <Checkbox />
              </Form.Item>
              <Form.Item label="Hide hidden elements">
                <Checkbox onChange={(e) => setHideHidden(e.target.checked)} />
              </Form.Item>
              <Form.Item label="Hide controls">
                <Checkbox onChange={(e) => setHideControls(e.target.checked)} />
              </Form.Item>
              <Form.Item
                label="Background"
                name="background"
                valuePropName="color"
              >
                <ChromePicker disableAlpha />
              </Form.Item>
              <Form.Item label="Text" name="textColor" valuePropName="color">
                <ChromePicker disableAlpha />
              </Form.Item>
              <Form.Item
                label="Buttons text"
                name="buttonColor"
                valuePropName="color"
              >
                <ChromePicker disableAlpha />
              </Form.Item>
              <Form.Item
                label="Buttons hover text"
                name="buttonHoverColor"
                valuePropName="color"
              >
                <ChromePicker disableAlpha />
              </Form.Item>
              <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                <Button type="primary" htmlType="submit">
                  Save
                </Button>
              </Form.Item>
            </Form>
          )}
          <AppUI
            project={project}
            admin
            uiData={uiData}
            setUiData={setUiData}
            hideHidden={hideHidden}
            hideControls={hideControls}
          />
        </Content>
      </Layout>
    </LayoutHOC>
  );
};

export default UIAdmin;
