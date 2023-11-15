import { GalleryStyle } from "../components/GalleryStyle";
import { ListStyle } from "../components/ListStyle";
import { useState } from "react";
import styled from "styled-components";
import Carousel from "../components/Carousel";
import G from "../assets/gallery-icon.png";
import L from "../assets/list-icon.png";

const _BoardHeader = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
`;

const _innerBoardHeader = styled.div`
  width: 75%;
  display: flex;
  justify-content: space-between;
`;

const _BoardSlide = styled.div`
  width: 90vw;
`;

const _switchButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: transparent;
  border: none;
  cursor: pointer;
`;

const _switchButtonImg = styled.img`
  width: 20px;
`;

const _switchButtonImg2 = styled.img`
  width: 22px;
`;

const _galleryContainer = styled.div`
  display: flex;
  justify-content: center;
`;

const Board = () => {
  const [styleSwitch, setStyleSwitch] = useState(true);

  return (
    <>
      <_BoardHeader>
        <_innerBoardHeader>
          <h1>라면 게시판</h1>
          <div style={{ display: "flex", flexDirection: "row" }}>
            <_switchButton
              onClick={() => {
                setStyleSwitch(true);
              }}
            >
              <_switchButtonImg2 src={G}></_switchButtonImg2>
            </_switchButton>
            <_switchButton
              onClick={() => {
                setStyleSwitch(false);
              }}
            >
              <_switchButtonImg src={L}></_switchButtonImg>
            </_switchButton>
          </div>
        </_innerBoardHeader>
      </_BoardHeader>
      <Carousel />
      <_galleryContainer>
        {styleSwitch ? <GalleryStyle></GalleryStyle> : <ListStyle></ListStyle>}
      </_galleryContainer>
    </>
  );
};

export { Board };
