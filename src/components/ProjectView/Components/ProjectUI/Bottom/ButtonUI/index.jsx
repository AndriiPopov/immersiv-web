import React from "react";
import styled from "styled-components";

export const Button = styled.div`
  color: ${(props) => (props.isActive ? "lightblue" : "white")};
  cursor: pointer;
  padding: 0px 5px;
  font-size: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  user-select: none;
  > p {
    font-size: 13px;
    margin: 0;
    text-transform: uppercase;
  }
`;

const ButtonUI = (props) => {
  const isActive = props.activeUI?.includes(props.value || props.title);
  return (
    <Button
      onClick={isActive ? props.onUnclick : props.onClick}
      isActive={isActive}
    >
      {props.icon}
      {props.title && <p>{props.title}</p>}
    </Button>
  );
};

export { ButtonUI };
