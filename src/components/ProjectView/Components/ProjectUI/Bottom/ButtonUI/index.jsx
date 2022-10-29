import React from "react";
import styled from "styled-components";
import { AdminButton } from "../AdminButton";

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
    font-size: 11px;
    margin: 0;
    margin-top: 5px;
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
  admin,
  uiData,
  setUiData,
  name,
  hideControls,
  hideHidden,
}) => {
  const isActive = activeUI?.includes(value || title);
  let isVisible = activeUI?.filter((v) => visible.includes(v)).length || admin;

  if (uiData?.[name]?.hide && (hideHidden || !admin)) isVisible = false;

  const refinedTitle = uiData?.[name]?.label || title;
  return isVisible ? (
    <div style={{ position: "relative" }}>
      <Button onClick={isActive ? onUnclick : onClick} isActive={isActive}>
        {icon}
        {refinedTitle && <p>{refinedTitle}</p>}
      </Button>
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
  ) : null;
};

export { ButtonUI };
