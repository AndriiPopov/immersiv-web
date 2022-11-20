import React from "react";
import { ButtonUI } from "../ButtonUI";
import {
  ClockCircleOutlined,
  HomeOutlined,
  PictureOutlined,
  SearchOutlined,
} from "@ant-design/icons";

import {
  BsChevronExpand,
  BsFillSunFill,
  BsPinMap,
  BsArrowLeftRight,
  BsEye,
  BsInfoCircle,
  BsLayoutWtf,
} from "react-icons/bs";

import { MdOutlineMeetingRoom } from "react-icons/md";

import { BiCompass } from "react-icons/bi";

import { FaLevelUpAlt } from "react-icons/fa";

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
          icon={<BsPinMap />}
          onClick={() => {
            setActiveUI([activeUI[0], "nearby"]);
            emitUIInteraction?.({ Nearby: true });
          }}
          onUnclick={() => {
            setActiveUI([activeUI[0]]);
            emitUIInteraction?.({ Nearby: true });
          }}
          visible={["exterior"]}
          name="nearby"
        />
        <ButtonUI
          {...props}
          title="filter"
          icon={<SearchOutlined />}
          onClick={() => {
            setActiveUI([activeUI[0], "filter"]);
            emitUIInteraction?.({ Filter: true });
          }}
          onUnclick={() => {
            setActiveUI([activeUI[0]]);
            emitUIInteraction?.({ Filter: true });
          }}
          visible={["exterior"]}
          name="filter"
        />
        <ButtonUI
          {...props}
          title="materials"
          icon={<BsArrowLeftRight />}
          onClick={() => {
            setActiveUI([activeUI[0], "materials"]);
            emitUIInteraction?.({ Materials: true });
          }}
          onUnclick={() => {
            setActiveUI([activeUI[0]]);
            emitUIInteraction?.({ Materials: true });
          }}
          visible={["interior"]}
          name="materials"
        />
        <ButtonUI
          {...props}
          title="teleport"
          icon={<BsEye />}
          onClick={() => {
            setActiveUI([activeUI[0], "teleport"]);
            emitUIInteraction?.({ Teleport: true });
          }}
          onUnclick={() => {
            setActiveUI([activeUI[0]]);
            emitUIInteraction?.({ Teleport: true });
          }}
          visible={["interior"]}
          name="teleport"
        />
        <ButtonUI
          {...props}
          title="info"
          icon={<BsInfoCircle />}
          onClick={() => {
            setActiveUI([activeUI[0], "info"]);
            emitUIInteraction?.({ InteriorInfo: true });
          }}
          onUnclick={() => {
            setActiveUI([activeUI[0]]);
            emitUIInteraction?.({ InteriorInfo: true });
          }}
          visible={["interior"]}
          name="info"
        />
        <ButtonUI
          {...props}
          title="discover"
          icon={<BiCompass />}
          onClick={() => {
            setActiveUI([activeUI[0], "discover"]);
            emitUIInteraction?.({ Discover: true });
          }}
          onUnclick={() => {
            setActiveUI([activeUI[0]]);
            emitUIInteraction?.({ Discover: true });
          }}
          visible={["exterior"]}
          name="info"
        />
        <ButtonUI
          {...props}
          title="level"
          icon={<BsChevronExpand />}
          onClick={() => {
            setActiveUI([activeUI[0], "location"]);
          }}
          onUnclick={() => setActiveUI([activeUI[0]])}
          visible={["exterior", "interior"]}
          name="location"
        />

        <ButtonUI
          {...props}
          title="rooms"
          icon={<MdOutlineMeetingRoom />}
          onClick={() => {
            setActiveUI([activeUI[0], "rooms"]);
          }}
          onUnclick={() => setActiveUI([activeUI[0]])}
          visible={["exterior", "interior"]}
          name="location"
        />

        <ButtonUI
          {...props}
          title="sun"
          icon={<BsFillSunFill />}
          onClick={() => setActiveUI([activeUI[0], "sun"])}
          onUnclick={() => setActiveUI([activeUI[0]])}
          visible={["exterior", "interior"]}
          name="sun"
        />
        <ButtonUI
          {...props}
          title="Floor plan"
          icon={<BsLayoutWtf />}
          onClick={() => {
            setActiveUI([activeUI[0], "floorPlan"]);
            emitUIInteraction?.({ FloorPlan: true });
          }}
          onUnclick={() => {
            setActiveUI([activeUI[0]]);
            emitUIInteraction?.({ FloorPlan: true });
          }}
          visible={["interior"]}
          name="floorPlan"
        />
        <ButtonUI
          {...props}
          title="Level view"
          icon={<FaLevelUpAlt />}
          onClick={() => {
            setActiveUI([activeUI[0], "levelView"]);
            emitUIInteraction?.({ LevelView: true });
          }}
          onUnclick={() => {
            setActiveUI([activeUI[0]]);
            emitUIInteraction?.({ LevelView: true });
          }}
          visible={["interior"]}
          name="levelView"
        />
        {!props.uiData.onlyInterior && (
          <ButtonUI
            {...props}
            title="interior"
            icon={<ClockCircleOutlined />}
            onClick={() => setActiveUI(["interior"])}
            onUnclick={() => setActiveUI(["exterior"])}
            visible={["exterior", "interior"]}
            admin={false}
          />
        )}
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
