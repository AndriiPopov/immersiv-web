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
    margin: 0px 10px;
  }
`;

const UIButtons = (props) => {
  const { activeUI, setActiveUI, emitUIInteraction } = props;

  return (
    <>
      <Container>
        <ButtonUI
          {...props}
          title="home"
          icon={<HomeOutlined />}
          onClick={() => {
            setActiveUI(["exterior"]);
            emitUIInteraction?.({ Home: true });
          }}
          visible={["exterior"]}
          name="home"
        />
        <ButtonUI
          {...props}
          title="gallery"
          icon={<PictureOutlined />}
          onClick={() => setActiveUI([activeUI[0], "gallery"])}
          onUnclick={() => setActiveUI([activeUI[0]])}
          visible={["exterior", "interior"]}
          name="gallery"
        />
        <ButtonUI
          {...props}
          title="nearby"
          icon={<PushpinOutlined />}
          onClick={() => {
            setActiveUI([activeUI[0], "nearby"]);
            emitUIInteraction?.({ Nearby: true });
          }}
          onUnclick={() => setActiveUI([activeUI[0]])}
          visible={["exterior"]}
          name="nearby"
        />
        <ButtonUI
          {...props}
          title="filter"
          icon={<SearchOutlined />}
          onClick={() => setActiveUI([activeUI[0], "filter"])}
          onUnclick={() => setActiveUI([activeUI[0]])}
          visible={["exterior"]}
          name="filter"
        />
        <ButtonUI
          {...props}
          title="materials"
          icon={<SearchOutlined />}
          onClick={() => {
            setActiveUI([activeUI[0], "materials"]);
            emitUIInteraction?.({ Materials: true });
          }}
          onUnclick={() => setActiveUI([activeUI[0]])}
          visible={["interior"]}
          name="materials"
        />
        <ButtonUI
          {...props}
          title="teleport"
          icon={<SearchOutlined />}
          onClick={() => {
            setActiveUI([activeUI[0], "teleport"]);
            emitUIInteraction?.({ Teleport: true });
          }}
          onUnclick={() => setActiveUI([activeUI[0]])}
          visible={["interior"]}
          name="teleport"
        />
        <ButtonUI
          {...props}
          title="info"
          icon={<SearchOutlined />}
          onClick={() => setActiveUI([activeUI[0], "info"])}
          onUnclick={() => setActiveUI([activeUI[0]])}
          visible={["interior"]}
          name="info"
        />
        <ButtonUI
          {...props}
          title="location"
          icon={<ShopOutlined />}
          onClick={() => {
            setActiveUI([activeUI[0], "location"]);
          }}
          onUnclick={() => setActiveUI([activeUI[0]])}
          visible={["exterior", "interior"]}
          name="location"
        />
        <ButtonUI
          {...props}
          title="sun"
          icon={<ClockCircleOutlined />}
          onClick={() => setActiveUI([activeUI[0], "sun"])}
          onUnclick={() => setActiveUI([activeUI[0]])}
          visible={["exterior", "interior"]}
          name="sun"
        />
        <ButtonUI
          {...props}
          title="Floor plan"
          icon={<SearchOutlined />}
          onClick={() => {
            setActiveUI([activeUI[0], "floorPlan"]);
            emitUIInteraction?.({ FloorPlan: true });
          }}
          onUnclick={() => setActiveUI([activeUI[0]])}
          visible={["interior"]}
          name="floorPlan"
        />
        <ButtonUI
          {...props}
          title="Level view"
          icon={<SearchOutlined />}
          onClick={() => {
            setActiveUI([activeUI[0], "levelView"]);
            emitUIInteraction?.({ LevelView: true });
          }}
          onUnclick={() => setActiveUI([activeUI[0]])}
          visible={["interior"]}
          name="levelView"
        />
        <ButtonUI
          {...props}
          title="interior"
          icon={<ClockCircleOutlined />}
          onClick={() => setActiveUI(["interior"])}
          onUnclick={() => setActiveUI(["exterior"])}
          visible={["exterior", "interior"]}
          admin={false}
        />
        <ButtonUI
          {...props}
          title="apartment"
          icon={<ClockCircleOutlined />}
          onClick={() => setActiveUI(["exterior", "apartment"])}
          onUnclick={() => setActiveUI(["exterior"])}
          visible={["exterior"]}
          admin={false}
        />
      </Container>
    </>
  );
};

export { UIButtons };
