import { EyeOutlined, PlayCircleOutlined } from "@ant-design/icons";
import React from "react";
import styled from "styled-components";

const Container = styled.div`
  bottom: 60px;
  left: 0px;
  right: 0px;
  position: absolute;
  display: flex;
  align-items: flex-end;
  justify-content: center;
  visibility: ${({ open }) => (open ? "visible" : "hidden")};
`;

const Inner = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  overflow-x: auto;
  white-space: nowrap;
  justify-content: end;
  align-items: center;
`;

const Inner2 = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  overflow-x: auto;
  white-space: nowrap;
  justify-content: end;
  width: 100%;
  max-width: 600px;
`;

const Top = styled.div`
  background-color: black;
  border-radius: 5px;
  color: white !important;
  padding: 15px 20px;
  display: flex;
  flex-direction: column;
`;

const Details = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: space-between;
`;

const NameContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-width: 200px;
`;

const Name = styled.div`
  font-size: 40px;
`;

const Price = styled.div`
  font-size: 26px;
`;

const Availability = styled.div`
  font-size: 16px;
`;

const InfoContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const Frontage = styled.div`
  line-height: 40px;
`;

const Depth = styled.div``;

const Stats = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  margin-top: 20px;
`;

const StatContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin: 0 10px;
`;

const StatText = styled.div`
  margin-left: 10px;
`;

const Bottom = styled.div`
  background-color: black;
  border-radius: 5px;
  color: white;
  padding: 15px 20px;
  display: flex;
  margin-top: 5px;
  justify-content: center;
`;

const ButtonContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 5px;
  margin: 0 10px;
`;

const ButtonText = styled.div`
  margin-top: 5px;
`;

const Stat = ({ icon, children }) => (
  <StatContainer>
    <PlayCircleOutlined style={{ fontSize: "30px" }} />
    <StatText>{children}</StatText>
  </StatContainer>
);

const Button = ({ icon, children }) => (
  <ButtonContainer>
    <PlayCircleOutlined style={{ fontSize: "30px" }} />
    <ButtonText>{children}</ButtonText>
  </ButtonContainer>
);

const ApartmentControls = (props) => {
  const isVisible = props.activeUI?.includes("apartment");
  return (
    <Container open={isVisible}>
      <Inner>
        <Inner2>
          <Top>
            <Details>
              <NameContainer>
                <Name>Name</Name>
                <Price>Price</Price>
                <Availability>Available</Availability>
              </NameContainer>
              <InfoContainer>
                <Frontage>Lot frontage: 10m2</Frontage>
                <Depth>Lot depth: 10m2</Depth>
              </InfoContainer>
            </Details>
            <Stats>
              <Stat icon={<EyeOutlined />}>4 bed</Stat>
              <Stat icon={<EyeOutlined />}>2 bath</Stat>
              <Stat icon={<EyeOutlined />}>180 m2</Stat>
            </Stats>
          </Top>
          <Bottom>
            <Button icon={<EyeOutlined />}>3D Tour</Button>
            <Button icon={<EyeOutlined />}>Virtual tour</Button>
            <Button icon={<EyeOutlined />}>Floor plan</Button>
          </Bottom>
        </Inner2>
      </Inner>
    </Container>
  );
};

export { ApartmentControls };
