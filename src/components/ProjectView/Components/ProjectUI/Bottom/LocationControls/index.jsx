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
  flex: 1;
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

const LocationControls = (props) => {
  const { emitUIInteraction, activeUI, project } = props;
  const isVisible = activeUI?.includes("location");
  return (
    <Container open={isVisible}>
      <Inner>
        {[...Array(project?.levelsCount || 0)].map((_level, index) => (
          <Item
            onClick={() => {
              emitUIInteraction?.({ Location: index });
            }}
            style={{
              backgroundColor: props.uiData?.background?.hex || "#000000",
            }}
          >
            {`Level ${index}`}
          </Item>
        ))}
      </Inner>
    </Container>
  );
};

export { LocationControls };
