import React from "react";
import { ButtonUI } from "../ButtonUI";
import {
  ClockCircleOutlined,
  HomeOutlined,
  PictureOutlined,
  PushpinOutlined,
  SearchOutlined,
  ShopOutlined,
} from "@ant-design/icons";
import styled from "styled-components";
import { SunControls } from "../SunControls";
import { FilterControls } from "../FilterControls";

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: row;
  height: 100%;
  position: relative;
  > * {
    margin: 0px 16px;
  }
`;

const UIButtons = (props) => {
  return (
    <>
      <Container>
        <ButtonUI
          {...props}
          title="home"
          icon={<HomeOutlined />}
          onClick={() => props.setActiveUI(["home"])}
        />
        <ButtonUI
          {...props}
          title="gallery"
          icon={<PictureOutlined />}
          onClick={() => props.setActiveUI(["gallery"])}
          onUnclick={() => props.setActiveUI([])}
        />
        <ButtonUI
          {...props}
          title="nearby"
          icon={<PushpinOutlined />}
          onClick={() => props.setActiveUI(["nearby"])}
          onUnclick={() => props.setActiveUI([])}
        />
        <ButtonUI
          {...props}
          title="filter"
          icon={<SearchOutlined />}
          onClick={() => props.setActiveUI(["filter"])}
          onUnclick={() => props.setActiveUI([])}
        />
        <ButtonUI
          {...props}
          title="location"
          icon={<ShopOutlined />}
          onClick={() => props.setActiveUI(["location"])}
          onUnclick={() => props.setActiveUI([])}
        />
        <ButtonUI
          {...props}
          title="sun"
          icon={<ClockCircleOutlined />}
          onClick={() => props.setActiveUI(["sun"])}
          onUnclick={() => props.setActiveUI([])}
        />
      </Container>
    </>
  );
};

export { UIButtons };
