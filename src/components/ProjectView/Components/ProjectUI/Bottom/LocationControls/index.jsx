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
`;

const Item = styled.div`
  background-color: rgba(0, 0, 0, 0.8);
  border-radius: 5px;
  color: white;
  margin: 0 6px;
  padding: 5px 10px;
  white-space: nowrap;
`;

const LocationControls = (props) => {
  const isVisible = props.activeUI?.includes("location");
  return (
    <Container open={isVisible}>
      <Inner>
        {["Level 1", "Level 2", "Level 3", "Level 4", "Level 5"].map(
          (level) => (
            <Item>{level}</Item>
          )
        )}
      </Inner>
    </Container>
  );
};

export { LocationControls };
