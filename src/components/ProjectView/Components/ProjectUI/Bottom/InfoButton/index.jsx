import { Button, Drawer, Image, Modal } from "antd";
import React, { useState } from "react";
import { BsQuestionLg } from "react-icons/bs";
import { IoClose } from "react-icons/io5";
import styled from "styled-components";
import { ButtonUI } from "../ButtonUI";

const Container = styled.div`
  position: absolute;
  inset: 0;
  background-color: black;
  z-index: 99999999;
  background-image: url("/images/how-to.png");
  background-position: center;
  background-repeat: no-repeat;
  background-size: contain;
`;

const CloseButton = styled(Button)`
  position: absolute;
  left: 16px;
  top: 16px;
  z-index: 1;
`;

const InfoButton = (props) => {
  const [isOpen, setIsOpen] = useState();
  return (
    <>
      <ButtonUI
        icon={<BsQuestionLg />}
        visible={["exterior", "interior"]}
        {...props}
        adminSide="left"
        onClick={() => setIsOpen(true)}
        onUnclick={() => setIsOpen(false)}
      />
      {/* <Modal
        open={isOpen}
        onCancel={() => setIsOpen(false)}
        footer={null}
        getContainer={false}
      >
        <Image src="/images/logo-black.png" preview={false}></Image>
      </Modal> */}
      <Drawer
        visible={isOpen}
        onClose={() => setIsOpen(false)}
        width="100VW"
        title="How to use IMMERSIV"
        forceRender
      >
        <Container>
          <CloseButton onClick={() => setIsOpen(false)} type="link">
            <IoClose size={30} color="white" />
          </CloseButton>
        </Container>
      </Drawer>
    </>
  );
};

export { InfoButton };
