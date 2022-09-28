import { Button, ConfigProvider, Form, Slider, Tag } from "antd";
import React from "react";
import styled from "styled-components";

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
`;

const Inner = styled.div`
  background-color: rgba(0, 0, 0, 0.8);
  width: 100%;
  padding: 0px 30px 20px;
  max-height: 100%;
  max-width: 600px;
  overflow: auto;
`;

const tailLayout = {
  wrapperCol: { offset: 8, span: 16 },
};

const SelectMulti = ({ options, value: propValue, onChange }) => {
  return (
    <>
      <Tag.CheckableTag
        onClick={() => onChange([])}
        checked={!propValue?.length}
        style={{ color: "white" }}
      >
        All
      </Tag.CheckableTag>
      {options.map(({ value, label }) => (
        <Tag.CheckableTag
          key={value}
          onClick={() => {
            if (propValue?.includes(value))
              onChange(propValue.filter((i) => i !== value));
            else onChange([...(propValue || []), value]);
          }}
          checked={propValue?.includes(value)}
          style={{ color: "white" }}
        >
          {label || value}
        </Tag.CheckableTag>
      ))}
    </>
  );
};
const FilterControls = (props) => {
  const isVisible = props.activeUI?.includes("filter");
  const [form] = Form.useForm();

  const items = [
    {
      name: "budget",
      label: "Budget",
      type: "range",
      min: 0,
      max: 100,
      step: 1,
    },
    {
      name: "size",
      label: "Size",
      type: "range",
      min: 0,
      max: 100,
      step: 1,
    },
    {
      name: "bedrooms",
      label: "Bedrooms",
      type: "range",
      min: 0,
      max: 5,
      step: 0.5,
    },
    {
      name: "bathrooms",
      label: "Bathrooms",
      type: "range",
      min: 0,
      max: 3,
      step: 0.5,
    },
    {
      name: "availability",
      label: "Availability",
      type: "selectMulti",
      options: [
        { value: "Available" },
        { value: "Reserved" },
        { value: "Sold" },
      ],
    },
    {
      name: "orientation",
      label: "Orientation",
      type: "selectMulti",
      options: [
        { value: "N" },
        { value: "NE" },
        { value: "E" },
        { value: "SE" },
        { value: "S" },
        { value: "SW" },
        { value: "W" },
        { value: "NW" },
      ],
    },
    {
      name: "depth",
      label: "Depth",
      type: "range",
      min: 0,
      max: 100,
      step: 0.5,
    },
    {
      name: "frontage",
      label: "Frontage",
      type: "range",
      min: 0,
      max: 100,
      step: 0.5,
    },
  ];

  return (
    <Container open={isVisible}>
      <Inner>
        <ConfigProvider
          getPopupContainer={(triggerNode) => triggerNode.parentNode}
        >
          <Form layout="vertical" form={form}>
            {items.map(
              ({
                name,
                label,
                type,
                defaultValue,
                min,
                max,
                step,
                options,
              }) => {
                return (
                  <Form.Item
                    name={name}
                    label={<label style={{ color: "white" }}>{label}</label>}
                    style={{ margin: "50px 0" }}
                  >
                    {!isVisible ? null : type === "range" ? (
                      <Slider
                        defaultValue={defaultValue || [min, max]}
                        min={min}
                        max={max}
                        step={step}
                        range={{ draggableTrack: true }}
                        tooltipVisible={true}
                        tooltipPlacement="bottom"
                      />
                    ) : (
                      <SelectMulti
                        options={options}
                        defaultValue={defaultValue}
                      />
                    )}
                  </Form.Item>
                );
              }
            )}
            {isVisible && (
              <Form.Item {...tailLayout}>
                <Button
                  htmlType="button"
                  style={{ margin: "0 8px" }}
                  type="link"
                  onClick={() => form.resetFields()}
                >
                  Reset
                </Button>
                <Button type="primary" onClick={() => props.setActiveUI([])}>
                  Apply
                </Button>
              </Form.Item>
            )}
          </Form>
        </ConfigProvider>
      </Inner>
    </Container>
  );
};

export { FilterControls };
