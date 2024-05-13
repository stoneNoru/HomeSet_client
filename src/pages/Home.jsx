import React, { useEffect, useState } from "react";
import KakaoMap from "../components/KakaoMap";
import styled from "styled-components";
import { Link, useNavigate } from "react-router-dom";
import LoginModal from "../components/LoginModal";

const Page = styled.div`
  position: relative;
`;

const Header = styled.div`
  color: black;
  font-size: 30px;
  width: 100%;
  height: 80px;
  z-index: 10;
  background-color: bisque;
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
    <Page>
      {/* 로그인 모달 */}
      {/* <BlackBg>
        <LoginModal />
      </BlackBg> */}

      <Header>헤더</Header>
      <KakaoMap />
    </Page>
  );
};

export default Home;
