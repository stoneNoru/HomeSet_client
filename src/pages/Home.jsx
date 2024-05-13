import React, { useEffect, useState } from "react";
import KakaoMap from "../components/KakaoMap";
import styled from "styled-components";
import { Link, useNavigate } from "react-router-dom";
import LoginModal from "../components/LoginModal";

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

const Tab = styled.div`
  width: 400px;
  height: 85vh;
  background-color: #242430;
  color: #f6f8fa;
  border-radius: 15px;
  padding: 20px;
  box-sizing: border-box;
  position: absolute;
  top: 100px;
  left: 20px;
`;

const TabTitle = styled.h1`
  font-size: 36px;
`;

const BlackBg = styled.div`
  position: fixed;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Home = () => {
  return (
    <div style={{ position: "relative", height: "100%" }}>
      <HeadWrap>
        <HeadBg>
          <Header>헤더헤더헤더</Header>
        </HeadBg>
      </HeadWrap>
      <KakaoMap />

      <BlackBg>
        <LoginModal />
      </BlackBg>
      {/* <Tab>
        <TabTitle>제목</TabTitle>
      </Tab> */}
    </div>
  );
};

export default Home;
