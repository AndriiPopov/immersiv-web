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
  const { activeUI, setActiveUI } = props;

  return (
    <>
      <Container>
        <ButtonUI
          {...props}
          title="home"
          icon={<HomeOutlined />}
          onClick={() => setActiveUI(["exterior"])}
          visible={["exterior"]}
        />
        <ButtonUI
          {...props}
          title="gallery"
          icon={<PictureOutlined />}
          onClick={() => setActiveUI([activeUI[0], "gallery"])}
          onUnclick={() => setActiveUI([activeUI[0]])}
          visible={["exterior", "interior"]}
        />
        <ButtonUI
          {...props}
          title="nearby"
          icon={<PushpinOutlined />}
          onClick={() => setActiveUI([activeUI[0], "nearby"])}
          onUnclick={() => setActiveUI([activeUI[0]])}
          visible={["exterior"]}
        />
        <ButtonUI
          {...props}
          title="filter"
          icon={<SearchOutlined />}
          onClick={() => setActiveUI([activeUI[0], "filter"])}
          onUnclick={() => setActiveUI([activeUI[0]])}
          visible={["exterior"]}
        />
        <ButtonUI
          {...props}
          title="materials"
          icon={<SearchOutlined />}
          onClick={() => setActiveUI([activeUI[0], "materials"])}
          onUnclick={() => setActiveUI([activeUI[0]])}
          visible={["interior"]}
        />
        <ButtonUI
          {...props}
          title="teleport"
          icon={<SearchOutlined />}
          onClick={() => setActiveUI([activeUI[0], "teleport"])}
          onUnclick={() => setActiveUI([activeUI[0]])}
          visible={["interior"]}
        />
        <ButtonUI
          {...props}
          title="info"
          icon={<SearchOutlined />}
          onClick={() => setActiveUI([activeUI[0], "info"])}
          onUnclick={() => setActiveUI([activeUI[0]])}
          visible={["interior"]}
        />
        <ButtonUI
          {...props}
          title="location"
          icon={<ShopOutlined />}
          onClick={() => setActiveUI([activeUI[0], "location"])}
          onUnclick={() => setActiveUI([activeUI[0]])}
          visible={["exterior", "interior"]}
        />
        <ButtonUI
          {...props}
          title="sun"
          icon={<ClockCircleOutlined />}
          onClick={() => setActiveUI([activeUI[0], "sun"])}
          onUnclick={() => setActiveUI([activeUI[0]])}
          visible={["exterior", "interior"]}
        />
        <ButtonUI
          {...props}
          title="interior"
          icon={<ClockCircleOutlined />}
          onClick={() => setActiveUI(["interior"])}
          onUnclick={() => setActiveUI(["exterior"])}
          visible={["exterior", "interior"]}
        />
        <ButtonUI
          {...props}
          title="apartment"
          icon={<ClockCircleOutlined />}
          onClick={() => setActiveUI(["exterior", "apartment"])}
          onUnclick={() => setActiveUI(["exterior"])}
          visible={["exterior"]}
        />
      </Container>
    </>
  );
};

export { UIButtons };
