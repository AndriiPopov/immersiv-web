import { MoreOutlined } from "@ant-design/icons";
import { Button, Checkbox, Form, Input, InputNumber, Modal } from "antd";
import React, { useState } from "react";
import styled from "styled-components";

const MoreButton = styled(Button)`
  position: absolute;
  top: 0px;

  ${(props) => (props.adminSide === "left" ? "left: -15px;" : "right: -15px;")}
  z-index: 1;
`;

const Overlay = styled.div`
  position: absolute;
  inset: 0;
  background-color: rgba(83, 72, 4, 0.6);
`;

const AdminButton = ({
  uiData,
  setUiData,
  name,
  button,
  hideControls,
  adminSide,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const onFinish = (values) => {
    setUiData((prevState) => ({
      ...prevState,
      [name]: { ...(prevState[name] || {}), ...values },
    }));

    setIsModalOpen(false);
  };

  return (
    <>
      {uiData[name]?.hide && <Overlay />}
      {!hideControls && (
        <MoreButton
          type="primary"
          shape="circle"
          icon={<MoreOutlined />}
          onClick={showModal}
          adminSide={adminSide}
        />
      )}

      <Modal
        title={name}
        open={isModalOpen}
        footer={null}
        destroyOnClose
        onCancel={() => setIsModalOpen(false)}
      >
        <Form
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          onFinish={onFinish}
          initialValues={uiData[name] || {}}
        >
          <Form.Item label="Hide" name="hide" valuePropName="checked">
            <Checkbox />
          </Form.Item>
          <Form.Item label="Label" name="label">
            <Input />
          </Form.Item>
          {!button && (
            <>
              <Form.Item label="Min" name="min">
                <InputNumber />
              </Form.Item>
              <Form.Item label="Max" name="max">
                <InputNumber />
              </Form.Item>
              <Form.Item label="Step" name="step">
                <InputNumber />
              </Form.Item>

              <Form.Item label="Default" name="default">
                <InputNumber />
              </Form.Item>
            </>
          )}
          <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export { AdminButton };
