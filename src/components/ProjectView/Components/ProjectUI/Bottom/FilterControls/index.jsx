import { Button, Form, Slider, Tag } from "antd";
import React from "react";
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
`;

const Inner = styled.div`
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
      max: 100,
      step: 1,
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
        <Form layout="vertical" form={form}>
          {items.map(
            ({ name, label, type, defaultValue, min, max, step, options }) => {
              const refinedTitle = uiData?.[name]?.label || label;

              return uiData?.[name]?.hide && (hideHidden || !admin) ? null : (
                <div style={{ position: "relative" }}>
                  <Form.Item
                    name={name}
                    label={
                      <label style={{ color: "white" }}>{refinedTitle}</label>
                    }
                    style={{ margin: "50px 0" }}
                  >
                    {!isVisible ? null : type === "range" ? (
                      <Slider
                        defaultValue={defaultValue || [min, max]}
                        min={uiData?.[name]?.min || min}
                        max={uiData?.[name]?.max || max}
                        step={uiData?.[name]?.step || step}
                        range={{ draggableTrack: true }}
                        tooltipVisible={true}
                        tooltipPlacement="bottom"
                        onChange={(v) => {
                          emitUIInteraction?.({ [name]: v });
                        }}
                      />
                    ) : (
                      <SelectMulti
                        options={options}
                        defaultValue={defaultValue}
                        onChange={(v) => {
                          emitUIInteraction?.({ [name]: v });
                        }}
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
          {isVisible && (
            <Form.Item {...tailLayout}>
              <Button
                htmlType="button"
                style={{ margin: "0 8px" }}
                type="link"
                onClick={() => {
                  form.resetFields();
                  emitUIInteraction?.({ ResetFilters: true });
                }}
              >
                Reset
              </Button>
              <Button
                type="primary"
                onClick={() => props.setActiveUI(["exterior"])}
              >
                Apply
              </Button>
            </Form.Item>
          )}
        </Form>
        {/* </ConfigProvider> */}
      </Inner>
    </Container>
  );
};

export { FilterControls };
