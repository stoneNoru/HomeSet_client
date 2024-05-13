import React from "react";
import KakaoMap from "../components/KakaoMap";
import styled from "styled-components";

const HeadWrap = styled.div`
  position: relative;
`;
const Header = styled.div`
  color: black;
  font-size: 30px;
  width: 100%;
  height: 80px;
  /* background-color: bisque; */
  z-index: 100;
`;
const HeadBg = styled.div`
  position: absolute;
  top: 0;
  width: 100%;
  height: 80px;
  z-index: 2;
  background: rgba(255, 255, 255, 0.3);
  box-shadow: 0 8px 32px 0 rgba(31, 123, 135, 0.37);
  backdrop-filter: blur(5.5px);
  -webkit-backdrop-filter: blur(5.5px);
`;

const Home = () => {
  return (
    <div style={{ position: "relative" }}>
      <HeadWrap>
        <HeadBg>
          <Header>헤더헤더헤더</Header>
        </HeadBg>
      </HeadWrap>
      <KakaoMap />
    </div>
  );
};

export default Home;
