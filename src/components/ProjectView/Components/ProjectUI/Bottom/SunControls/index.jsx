import { Slider } from "antd";
import React from "react";
import styled from "styled-components";
import { AdminButton } from "../AdminButton";

const Container = styled.div`
  bottom: 60px;
  left: 0;
  right: 0;
  position: absolute;
  display: flex;
  align-items: flex-end;
  justify-content: center;
  visibility: ${({ open }) => (open ? "visible" : "hidden")};
`;

const Inner = styled.table`
  width: 100%;
  border-collapse: separate;
  border-spacing: 0 3px;
  color: white;
  max-width: 300px;
`;

const TR = styled.tr`
  margin: 5px 0;
  border-radius: 5px;
  position: relative;
  td {
    padding: 5px;
  }
  td:first-child {
    border-top-left-radius: 5px;
  }
  td:last-child {
    border-top-right-radius: 5px;
  }

  td:first-child {
    border-bottom-left-radius: 5px;
  }
  td:last-child {
    border-bottom-right-radius: 5px;
  }
`;

const TD0 = styled.td`
  text-align: right;
`;

const TD1 = styled.td`
  width: 100%;
`;

const TD2 = styled.td`
  text-align: left;
`;

const SunControls = ({
  emitUIInteraction,
  activeUI,
  admin,
  uiData,
  setUiData,
  hideHidden,
  hideControls,
}) => {
  const isVisible = activeUI?.includes("sun");
  return (
    <Container open={isVisible}>
      <Inner>
        <tbody>
          {uiData?.time?.hide && (hideHidden || !admin) ? null : (
            <TR
              style={{
                backgroundColor: (uiData?.background?.hex || "#000000") + "CC",
              }}
            >
              <TD0>{`${uiData?.time?.min || 0}:00`}</TD0>
              <TD1>
                <Slider
                  onChange={(v) => {
                    emitUIInteraction?.({ Time: v });
                  }}
                  min={uiData?.time?.min || 0}
                  max={uiData?.time?.max || 23}
                  step={uiData?.time?.step || 1}
                  tooltip={{ formatter: (v) => `${v}:00` }}
                />
              </TD1>
              <TD2>{`${uiData?.time?.max || 23}:00`}</TD2>
              {admin && (
                <AdminButton
                  uiData={uiData}
                  setUiData={setUiData}
                  name="time"
                  hideControls={hideControls}
                />
              )}
            </TR>
          )}
          {uiData?.position?.hide && (hideHidden || !admin) ? null : (
            <TR
              style={{
                backgroundColor: (uiData?.background?.hex || "#000000") + "CC",
              }}
            >
              <TD0>S</TD0>
              <TD1>
                <Slider
                  tooltip={{ open: false }}
                  onChange={(v) => {
                    emitUIInteraction?.({ SunPosition: v });
                  }}
                  min={uiData?.position?.min || 0}
                  max={uiData?.position?.max || 360}
                  step={uiData?.position?.step || 1}
                />
              </TD1>
              <TD2>N</TD2>
              {admin && (
                <AdminButton
                  uiData={uiData}
                  setUiData={setUiData}
                  name="position"
                  hideControls={hideControls}
                />
              )}
            </TR>
          )}
        </tbody>
      </Inner>
    </Container>
  );
};

export { SunControls };
