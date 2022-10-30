import { EyeOutlined, PlayCircleOutlined } from "@ant-design/icons";
import React from "react";
import styled from "styled-components";
import { AdminButton } from "../AdminButton";
import { FaBed, FaBath } from "react-icons/fa";
import { IoResize } from "react-icons/io5";
import { getCustomColorsStyles } from "../../AppUI";

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
  border-radius: 5px;
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
  ${(props) => getCustomColorsStyles?.(props)}
`;

const ButtonText = styled.div`
  margin-top: 5px;
`;

const Stat = ({ icon, children }) => (
  <StatContainer>
    {icon}
    <StatText>{children}</StatText>
  </StatContainer>
);

const Button = ({
  icon,
  onClick,
  admin,
  uiData,
  setUiData,
  name,
  label,
  hideHidden,
  hideControls,
}) =>
  uiData?.[name]?.hide && (hideHidden || !admin) ? null : (
    <div style={{ position: "relative" }}>
      <ButtonContainer onClick={onClick} uiData={uiData}>
        <PlayCircleOutlined style={{ fontSize: "30px" }} />
        <ButtonText>{uiData?.[name]?.label || label}</ButtonText>
      </ButtonContainer>
      {admin && (
        <AdminButton
          uiData={uiData}
          setUiData={setUiData}
          name={name}
          button
          hideControls={hideControls}
        />
      )}
    </div>
  );

const ApartmentControls = (props) => {
  const isVisible = props.activeUI?.includes("apartment");
  const { emitUIInteraction } = props;
  return (
    <Container open={isVisible}>
      <Inner>
        <Inner2>
          <Top
            style={{
              backgroundColor: props.uiData?.background?.hex || "black",
            }}
          >
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
              <Stat icon={<FaBed size={30} />}>4 bed</Stat>
              <Stat icon={<FaBath size={30} />}>2 bath</Stat>
              <Stat icon={<IoResize size={30} />}>180 m2</Stat>
            </Stats>
          </Top>
          <Bottom
            style={{
              backgroundColor: props.uiData?.background?.hex || "black",
            }}
          >
            <Button
              {...props}
              icon={<EyeOutlined />}
              onClick={() => emitUIInteraction?.({ TDTour: true })}
              label="3D Tour"
              name="TDTour"
            ></Button>
            <Button
              {...props}
              icon={<EyeOutlined />}
              onClick={() => emitUIInteraction?.({ VTour: true })}
              label="Virtual tour"
              name="VTour"
            ></Button>
            <Button
              {...props}
              icon={<EyeOutlined />}
              onClick={() => emitUIInteraction?.({ FloorPlan: true })}
              label="Floor plan"
              name="FloorPlan"
            ></Button>
          </Bottom>
        </Inner2>
      </Inner>
    </Container>
  );
};

export { ApartmentControls };
