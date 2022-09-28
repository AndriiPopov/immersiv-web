import React, { useEffect, useRef, useState } from "react";

import "react-image-gallery/styles/css/image-gallery.css";
import ImageGallery from "react-image-gallery";
import styled from "styled-components";

const Container = styled.div`
  top: 20px;
  bottom: 60px;
  left: 20px;
  right: 20px;
  padding: 10px;
  position: absolute;
  background-color: rgba(0, 0, 0, 0.8);
  visibility: ${({ open }) => (open ? "visible" : "hidden")};
`;

const Inner = styled.div`
  display: flex;
  flex-direction: column;
  overflow: hidden;
`;

const Gallery = ({ project, activeUI }) => {
  const [tab, setTab] = useState("");
  const [slide, setSlide] = useState(0);
  const [dimensionsW, setDimensionsW] = useState({});
  const ref = useRef();

  useEffect(() => {
    setSlide(0);
  }, [tab]);

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
      .filter((i) => (tab ? tab === i.type : true))
      .map((i, index) => {
        if (i.type !== "video") {
          return {
            ...i,
            original: i.url,
            thumbnail: i.thumbnail,
            description: i.name,
            originalClass: "featured-slide",
            thumbnailClass: "featured-thumb",
          };
        } else {
          return {
            ...i,
            index,
            thumbnail: i.url,
            renderItem: (k) => {
              return slide === k.index ? (
                <video
                  // id="my-player"
                  // class="video-js"
                  controls
                  preload="auto"
                  autoPlay
                  muted
                  // data-setup="{}"
                  style={{ width: "100%", height: "100%" }}
                >
                  <source src={i.url} type="video/mp4"></source>
                  <p class="vjs-no-js">
                    To view this video please enable JavaScript, and consider
                    upgrading to a web browser that
                    <a
                      href="https://videojs.com/html5-video-support/"
                      target="_blank"
                      rel="noreferrer"
                    >
                      supports HTML5 video
                    </a>
                  </p>
                </video>
              ) : null;
            },
            renderThumbInner: (k) => (
              <div style={{ position: "relative" }}>
                <video
                  id="my-player"
                  class="video-js"
                  controls
                  data-setup="{}"
                  style={{ width: "100%", height: "100%" }}
                >
                  <source src={i.url} type="video/mp4"></source>
                  <p class="vjs-no-js">
                    To view this video please enable JavaScript, and consider
                    upgrading to a web browser that
                    <a
                      href="https://videojs.com/html5-video-support/"
                      target="_blank"
                      rel="noreferrer"
                    >
                      supports HTML5 video
                    </a>
                  </p>
                </video>
                <div
                  style={{
                    position: "absolute",
                    left: 0,
                    right: 0,
                    top: 0,
                    bottom: 0,
                  }}
                />
              </div>
            ),
          };
        }
      })
      .filter((i) => i) || [];

  const handleTabClick = (newTab) => {
    setTab(newTab === tab ? "" : newTab);
  };

  return (
    <Container ref={ref} open={activeUI.includes("gallery")}>
      <Inner>
        <div className="buttons">
          <div
            onClick={() => handleTabClick("photo")}
            className={tab === "photo" ? "active" : undefined}
          >
            <img src="/gallery/photo.png" />
          </div>
          <div
            onClick={() => handleTabClick("plan")}
            className={tab === "plan" ? "active" : undefined}
          >
            <img src="/gallery/plan.png" />
          </div>
          <div
            onClick={() => handleTabClick("video")}
            className={tab === "video" ? "active" : undefined}
          >
            <img src="/gallery/video.png" />
          </div>
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

export default Gallery;
