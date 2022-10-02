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

const ButtonUI = ({
  activeUI,
  value,
  title,
  icon,
  onUnclick,
  onClick,
  visible,
}) => {
  const isActive = activeUI?.includes(value || title);
  return activeUI?.filter((v) => visible.includes(v)).length ? (
    <Button onClick={isActive ? onUnclick : onClick} isActive={isActive}>
      {icon}
      {title && <p>{title}</p>}
    </Button>
  ) : null;
};

export { ButtonUI };
