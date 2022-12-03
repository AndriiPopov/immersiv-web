import React from "react";
import styled from "styled-components";
import { getCustomColorsStyles } from "../../AppUI";
import { AdminButton } from "../AdminButton";

export const Button = styled.div`
  cursor: pointer;
  padding: 5px 5px 0px;
  font-size: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  user-select: none;
  ${(props) => getCustomColorsStyles?.(props)}
  > p {
    font-size: 11px;
    margin: 0;
    margin-top: 5px;
    text-transform: uppercase;
    white-space: nowrap;
  }
`;

const ButtonUI = ({
  activeUI,
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
  adminSide,
}) => {
  const isActive = activeUI?.includes(name || title);
  let isVisible = activeUI?.filter((v) => visible.includes(v)).length || admin;

  if (uiData?.[name]?.hide && (hideHidden || !admin)) isVisible = false;

  const refinedTitle = uiData?.[name]?.label || title;
  return isVisible ? (
    <div style={{ position: "relative" }}>
      <Button
        onClick={isActive ? onUnclick : onClick}
        isActive={isActive}
        uiData={uiData}
      >
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
          adminSide={adminSide}
        />
      )}
    </div>
  ) : null;
};

export { ButtonUI };
