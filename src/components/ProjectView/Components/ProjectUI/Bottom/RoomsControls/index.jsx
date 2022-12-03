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
  display: flexbox;
  overflow-x: auto;
  justify-content: center;
`;

const Item = styled.div`
  border-radius: 5px;
  color: white;
  margin: 0 6px;
  padding: 5px 10px;
  white-space: nowrap;
  cursor: pointer;
`;

const RoomsControls = (props) => {
  const { emitUIInteraction, activeUI, uiData } = props;
  const isVisible = activeUI?.includes("rooms");
  return uiData?.rooms ? (
    <Container open={isVisible}>
      <Inner>
        {uiData.rooms.split("\n").map((room, index) => (
          <Item
            onClick={() => {
              emitUIInteraction?.({ Room: index + 1 });
            }}
            style={{
              backgroundColor: props.uiData?.background?.hex || "#000000",
            }}
          >
            {room}
          </Item>
        ))}
      </Inner>
    </Container>
  ) : null;
};

export { RoomsControls };
