import { QuestionCircleOutlined } from "@ant-design/icons";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { ApartmentControls } from "../Bottom/ApartmentContols";
import { ButtonUI } from "../Bottom/ButtonUI";
import { FilterControls } from "../Bottom/FilterControls";
import Gallery from "../Bottom/Gallery";
import { LocationControls } from "../Bottom/LocationControls";
import { SunControls } from "../Bottom/SunControls";
import { UIButtons } from "../Bottom/UIButtons";
import { QuestionOutlined } from "@ant-design/icons";
import { BsQuestionLg } from "react-icons/bs";
import { InfoButton } from "../Bottom/InfoButton";
import { RoomsControls } from "../Bottom/RoomsControls";
import FloorPlan from "../Bottom/FloorPlan";

const Container = styled.div`
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  height: 50px;
  display: flex;
  overflow-x: auto;
`;

const ButtonsContainer = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: row;
`;

const InfoContainer = styled.div`
  background: black;
  margin-left: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0px 16px;
`;

const AppUI = (props) => {
  const [activeUI, setActiveUI] = useState(["exterior"]);
  const propsC = {
    ...props,
    activeUI,
    setActiveUI: (v) => {
      if (props.uiData?.onlyInterior && v.includes("exterior"))
        setActiveUI(["interior"]);
      else setActiveUI(v);
    },
  };
  useEffect(() => {
    if (props.uiData?.onlyInterior) setActiveUI(["interior"]);
  }, [props.uiData?.onlyInterior]);
  return (
    <div style={{ zIndex: 1, color: props.uiData?.textColor?.hex || "white" }}>
      <Container>
        <ButtonsContainer
          style={{ backgroundColor: props.uiData?.background?.hex || "black" }}
        >
          <UIButtons {...propsC} />
        </ButtonsContainer>
        <InfoContainer
          style={{ backgroundColor: props.uiData?.background?.hex || "black" }}
        >
          <InfoButton {...propsC} />
        </InfoContainer>
      </Container>
      <FilterControls {...propsC} />
      <Gallery {...propsC} />
      <FloorPlan {...propsC} />
      <SunControls {...propsC} />
      <LocationControls {...propsC} />
      <RoomsControls {...propsC} />
      <ApartmentControls {...propsC} />
    </div>
  );
};

const getCustomColorsStyles = (props) => {
  let color = props.uiData?.buttonColor?.hex || "white";
  if (props.isActive)
    color = props.uiData?.buttonHoverColor?.hex || "lightblue";

  const hover =
    props.uiData?.buttonHoverColor?.hex ||
    props.uiData?.buttonColor?.hex ||
    "lightblue";
  return `color: ${color};
  &:hover {
    color: ${hover};
  }`;
};
export { AppUI, getCustomColorsStyles };
