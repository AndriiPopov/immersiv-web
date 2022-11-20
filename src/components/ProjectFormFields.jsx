import { LoadingOutlined } from "@ant-design/icons";
import {
  Button,
  Checkbox,
  Form,
  Image,
  Input,
  InputNumber,
  Switch,
  Upload,
} from "antd";
import TextArea from "antd/lib/input/TextArea";
import uploadMedia from "helpers/uploadMedia";
import React, { useEffect, useState } from "react";

const Logo = (props) => {
  const customUploadClientLogo = uploadMedia(
    (values) => {
      props.setFieldsValue({ [props.id]: values.url });
    },
    props.isVideo,
    true
  );
  const [image, setImage] = useState("");
  useEffect(() => {
    setTimeout(() => setImage(props[props.id]), 5000);
  }, [props[props.id]]);
  return (
    <>
      {image === props[props.id] ? (
        props.isVideo ? (
          <video
            id="my-player"
            class="video-js"
            controls
            preload="auto"
            data-setup="{}"
          >
            <source src={image} type="video/mp4"></source>
            <p class="vjs-no-js">
              To view this video please enable JavaScript, and consider
              upgrading to a web browser that
              <a
                href="https://videojs.com/html5-video-support/"
                target="_blank"
                rel="noreferrer"
              >
                supports HTML5 video
              </a>
            </p>
          </video>
        ) : (
          <Image src={image} style={{ maxHeight: "50px" }} />
        )
      ) : (
        <LoadingOutlined />
      )}
      <div style={{ marginTop: "10px" }}>
        <Upload
          customRequest={customUploadClientLogo}
          showUploadList={false}
          maxCount={1}
          getValueFromEvent={() => {}}
        >
          <Button>Change</Button>
        </Upload>
      </div>
    </>
  );
};

const ProjectFormFields = ({ setFieldsValue }) => {
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

      <Form.Item label="New UI" name="newUI" valuePropName="checked">
        <Checkbox />
      </Form.Item>

      <Form.Item
        label="Arcware project"
        name="isArcware"
        valuePropName="checked"
      >
        <Checkbox />
      </Form.Item>

      <Form.Item
        label="Monkeyway project"
        name="isMonkeyway"
        valuePropName="checked"
      >
        <Checkbox />
      </Form.Item>

      <Form.Item name="monkeywayBaseUrl" label="Monkeyway base url">
        <Input placeholder="Leave empty for default." />
      </Form.Item>

      <Form.Item name="monkeywayAppEnvId" label="Monkeyway app env id">
        <Input placeholder="Monkeyway app env id" />
      </Form.Item>

      <Form.Item name="monkeywayApiKey" label="Monkeyway api key">
        <Input placeholder="Monkeyway api key" />
      </Form.Item>

      <Form.Item name="arcwareAddress" label="Arcware address">
        <Input placeholder="Arcware address" />
      </Form.Item>

      <Form.Item name="arcwarePackageId" label="Arcware project id">
        <Input placeholder="Arcware project id" />
      </Form.Item>

      <Form.Item name="projectId" label="Project id" hidden>
        <Input placeholder="Project id" />
      </Form.Item>

      <Form.Item name="modelId" label="Model id" hidden>
        <Input placeholder="Model id" />
      </Form.Item>

      <Form.Item name="levelsCount" label="Number of levels">
        <InputNumber placeholder="Number of levels" />
      </Form.Item>

      <Form.Item
        label="Custom background"
        name="backgroundOn"
        valuePropName="checked"
      >
        <Checkbox />
      </Form.Item>
      <Form.Item
        label="Background video"
        name="backgroundTypeVideo"
        valuePropName="checked"
      >
        <Checkbox />
      </Form.Item>
      <Form.Item
        label="Background video"
        valuePropName="backgroundVideo"
        name="backgroundVideo"
      >
        <Logo setFieldsValue={setFieldsValue} isVideo />
      </Form.Item>
      <Form.Item
        label="Background image"
        valuePropName="backgroundImage"
        name="backgroundImage"
      >
        <Logo setFieldsValue={setFieldsValue} />
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

      <Form.Item name="published" valuePropName="checked" label="Published">
        <Checkbox />
      </Form.Item>

      <Form.Item
        label="Project details on"
        name="projectDetailsOn"
        valuePropName="checked"
      >
        <Checkbox />
      </Form.Item>
      <Form.Item label="Project details duration" name="projectDetailsDuraton">
        <Input type="number" />
      </Form.Item>

      <Form.Item
        label="Client logo"
        valuePropName="clientLogo"
        name="clientLogo"
      >
        <Logo setFieldsValue={setFieldsValue} />
      </Form.Item>
      <Form.Item label="Client logo max width" name="clientLogoMaxWidth">
        <Input type="number" />
      </Form.Item>
      <Form.Item label="Client logo max height" name="clientLogoMaxHeight">
        <Input type="number" />
      </Form.Item>

      <Form.Item
        label="Project logo"
        valuePropName="projectLogo"
        name="projectLogo"
      >
        <Logo setFieldsValue={setFieldsValue} />
      </Form.Item>
      <Form.Item label="Project logo max width" name="projectLogoMaxWidth">
        <Input type="number" />
      </Form.Item>
      <Form.Item label="Project logo max height" name="projectLogoMaxHeight">
        <Input type="number" />
      </Form.Item>
      <Form.Item
        name="projectName"
        label="Project name"
        extra="This text will appear on the screen where the project is being loaded if there is no logo"
      >
        <Input placeholder="projectName" />
      </Form.Item>
      <Form.Item
        name="description"
        label="Description"
        extra="This text will appear on the screen where the project is being loaded"
      >
        <TextArea placeholder="Description" rows={4} />
      </Form.Item>

      <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
        <Button type="primary" htmlType="submit" style={{ width: "100%" }}>
          Save
        </Button>
      </Form.Item>
    </>
  );
};

export default ProjectFormFields;
