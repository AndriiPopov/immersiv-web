import { QuestionCircleOutlined } from "@ant-design/icons";
import React, { useState } from "react";
import styled from "styled-components";
import { ButtonUI } from "../Bottom/ButtonUI";
import { FilterControls } from "../Bottom/FilterControls";
import Gallery from "../Bottom/Gallery";
import { InfoButton } from "../Bottom/InfoButton";
import { LocationControls } from "../Bottom/LocationControls";
import { SunControls } from "../Bottom/SunControls";
import { UIButtons } from "../Bottom/UIButtons";

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
  background: black;
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
  const [activeUI, setActiveUI] = useState([]);
  return (
    <div style={{ zIndex: 1 }}>
      <Container>
        <ButtonsContainer>
          <UIButtons {...props} setActiveUI={setActiveUI} activeUI={activeUI} />
        </ButtonsContainer>
        <InfoContainer>
          <ButtonUI icon={<QuestionCircleOutlined />} />
        </InfoContainer>
      </Container>
      <FilterControls
        {...props}
        setActiveUI={setActiveUI}
        activeUI={activeUI}
      />
      <Gallery {...props} setActiveUI={setActiveUI} activeUI={activeUI} />
      <SunControls {...props} setActiveUI={setActiveUI} activeUI={activeUI} />
      <LocationControls
        {...props}
        setActiveUI={setActiveUI}
        activeUI={activeUI}
      />
    </div>
  );
};

export { AppUI };
