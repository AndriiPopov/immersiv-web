import { Button, ConfigProvider, Form, Slider, Tag } from "antd";
import React, { useState } from "react";
import { BiCloset, BiReset } from "react-icons/bi";
import { IoClose } from "react-icons/io5";
import styled from "styled-components";
import { AdminButton } from "../AdminButton";

const Container = styled.div`
  top: 20px;
  bottom: 60px;
  left: 0;
  right: 0;
  position: absolute;
  display: flex;
  align-items: flex-end;
  justify-content: center;
  visibility: ${({ open }) => (open ? "visible" : "hidden")};
  pointer-events: none;
`;

const Inner = styled.div`
  width: 100%;
  padding: 70px 30px 20px;
  max-height: 100%;
  max-width: 600px;
  overflow: auto;
  overflow-x: hidden;
  pointer-events: all;
  position: relative;
`;

const ButtonsContainer = styled.div`
  position: absolute;
  right: 0px;
  top: 20px;
`;

const SelectMulti = ({
  options,
  value: propValue,
  onChange,
  emitUIInteraction,
}) =>
  options.map(({ value, label }) => (
    <Tag.CheckableTag
      key={value}
      onClick={() => {
        if (propValue?.includes(value))
          onChange(propValue.filter((i) => i !== value));
        else onChange([...(propValue || []), value]);
        emitUIInteraction(value);
      }}
      checked={propValue?.includes(value)}
      style={{ color: "white" }}
    >
      {label || value}
    </Tag.CheckableTag>
  ));

const FilterControls = (props) => {
  const {
    activeUI,
    emitUIInteraction,
    admin,
    uiData,
    setUiData,
    hideHidden,
    hideControls,
  } = props;
  const isVisible = activeUI?.includes("filter");
  const [form] = Form.useForm();

  const items = [
    {
      name: "Budget",
      label: "Budget",
      type: "range",
      min: 0,
      max: 5000000,
      step: 10000,
    },
    {
      name: "Size",
      label: "Size",
      type: "range",
      min: 0,
      max: 100,
      step: 1,
    },
    {
      name: "Bedrooms",
      label: "Bedrooms",
      type: "range",
      min: 0,
      max: 5,
      step: 0.5,
    },
    {
      name: "Bathrooms",
      label: "Bathrooms",
      type: "range",
      min: 0,
      max: 3,
      step: 0.5,
    },
    {
      name: "Availability",
      label: "Availability",
      type: "selectMulti",
      options: [
        { value: "Available" },
        { value: "Reserved" },
        { value: "Sold" },
      ],
    },
    {
      name: "Orientation",
      label: "Orientation",
      type: "selectMulti",
      options: [{ value: "N" }, { value: "E" }, { value: "S" }, { value: "W" }],
    },
    {
      name: "Depth",
      label: "Depth",
      type: "range",
      min: 0,
      max: 100,
      step: 0.5,
    },
    {
      name: "Frontage",
      label: "Frontage",
      type: "range",
      min: 0,
      max: 100,
      step: 0.5,
    },
  ];

  const [valuesState, setValuesState] = useState({});
  return (
    <Container open={isVisible}>
      <Inner
        style={{
          backgroundColor: (props.uiData?.background?.hex || "#000000") + "CC",
        }}
      >
        {/* <ConfigProvider
          getPopupContainer={(triggerNode) => triggerNode.parentNode}
        > */}
        {isVisible && (
          <ButtonsContainer>
            <Button
              htmlType="button"
              style={{ margin: "0 8px" }}
              type="link"
              onClick={() => {
                form.resetFields();
                emitUIInteraction?.({ ResetFilters: true });
              }}
            >
              <BiReset size={30} color="white" />
            </Button>
            <Button onClick={() => props.setActiveUI(["exterior"])} type="link">
              <IoClose size={30} color="white" />
            </Button>
          </ButtonsContainer>
        )}
        <Form
          layout="vertical"
          form={form}
          initialValues={{
            Orientation: ["N", "E", "S", "W"],
            Availability: ["Available", "Reserved", "Sold"],
          }}
          onValuesChange={setValuesState}
        >
          {items.map(
            ({ name, label, type, defaultValue, min, max, step, options }) => {
              let refinedTitle = uiData?.[name]?.label || label;
              if (type === "range")
                refinedTitle = `${refinedTitle}: more than ${
                  valuesState[name] || 0
                }`;
              return uiData?.[name]?.hide && (hideHidden || !admin) ? null : (
                <div style={{ position: "relative" }}>
                  <Form.Item
                    name={name}
                    label={
                      <label style={{ color: "white" }}>{refinedTitle}</label>
                    }
                  >
                    {!isVisible ? null : type === "range" ? (
                      <Slider
                        defaultValue={defaultValue || [min, max]}
                        min={uiData?.[name]?.min || min}
                        max={uiData?.[name]?.max || max}
                        step={uiData?.[name]?.step || step}
                        onChange={(v) => {
                          emitUIInteraction?.({ [name]: v });
                        }}
                      />
                    ) : (
                      <SelectMulti
                        options={options}
                        defaultValue={defaultValue}
                        emitUIInteraction={(v) =>
                          emitUIInteraction?.({ [v]: true })
                        }
                      />
                    )}
                  </Form.Item>
                  {admin && (
                    <AdminButton
                      uiData={uiData}
                      setUiData={setUiData}
                      name={name}
                      button={type !== "range"}
                      hideControls={hideControls}
                    />
                  )}
                </div>
              );
            }
          )}
        </Form>
        {/* </ConfigProvider> */}
      </Inner>
    </Container>
  );
};

export { FilterControls };
