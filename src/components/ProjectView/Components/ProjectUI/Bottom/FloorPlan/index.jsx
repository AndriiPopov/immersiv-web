import React, { useEffect, useRef, useState } from "react";

import "react-image-gallery/styles/css/image-gallery.css";
import ImageGallery from "react-image-gallery";
import styled from "styled-components";
import { IoClose } from "react-icons/io5";
import { Button } from "../ButtonUI";

const Container = styled.div`
  top: 00px;
  bottom: 50px;
  left: 0px;
  right: 0px;
  padding: 50px 10px 10px;
  position: absolute;

  visibility: ${({ open }) => (open ? "visible" : "hidden")};
  z-index: 1;
`;

const Inner = styled.div`
  display: flex;
  flex-direction: column;
  overflow: hidden;
`;

const FloorPlan = ({ project, activeUI, uiData, setActiveUI }) => {
  const [slide, setSlide] = useState(0);
  const [dimensionsW, setDimensionsW] = useState({});
  const ref = useRef();

  const getContainerSize = () => {
    if (ref.current)
      setDimensionsW({
        width: ref.current.clientWidth,
        height: ref.current.clientHeight,
      });
  };

  useEffect(() => {
    window.addEventListener("resize", getContainerSize);
    getContainerSize();
  }, []);
  if (!project) return null;
  const { media } = project;

  const images =
    media
      ?.filter((i) => i.type === "plan")
      .map((i, index) => ({
        ...i,
        original: i.url,
        thumbnail: i.thumbnail,
        description: i.name,
        originalClass: "featured-slide",
        thumbnailClass: "featured-thumb",
      }))
      .filter((i) => i) || [];

  return (
    <Container
      ref={ref}
      open={activeUI.includes("floorPlan")}
      style={{
        backgroundColor: (uiData?.background?.hex || "#000000") + "CC",
      }}
    >
      <Inner>
        <div style={{ display: "flex" }}>
          <Button
            type="text"
            onClick={() =>
              setActiveUI(activeUI.filter((i) => i !== "floorPlan"))
            }
          >
            <IoClose size={30} />
          </Button>
        </div>
        <ImageGallery
          items={images}
          showBullets={false}
          showFullscreenButton={false}
          showPlayButton={false}
          // showNav={false}
          thumbnailPosition={
            dimensionsW.height > dimensionsW.width ? "bottom" : "right"
          }
          onSlide={setSlide}
          startIndex={slide}
        />
      </Inner>
    </Container>
  );
};

export default FloorPlan;
