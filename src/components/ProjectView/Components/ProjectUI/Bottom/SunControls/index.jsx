import { Slider } from "antd";
import React from "react";
import styled from "styled-components";
import { getTimeDescriptor } from "../../AppUI/descriptors";

const Container = styled.div`
  top: 20px;
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
  background-color: rgba(0, 0, 0, 0.8);
  margin: 5px 0;
  border-radius: 5px;
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

const SunControls = ({ emitUIInteraction, activeUI }) => {
  const isVisible = activeUI?.includes("sun");
  return (
    <Container open={isVisible}>
      <Inner>
        <tbody>
          <TR>
            <TD0>12:00</TD0>
            <TD1>
              <Slider
                onChange={(value) =>
                  emitUIInteraction(getTimeDescriptor(value))
                }
              />
            </TD1>
            <TD2>17:00</TD2>
          </TR>
          <TR>
            <TD0>S</TD0>
            <TD1>
              <Slider />
            </TD1>
            <TD2>N</TD2>
          </TR>
        </tbody>
      </Inner>
    </Container>
  );
};

export { SunControls };
