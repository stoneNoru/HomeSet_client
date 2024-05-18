import React, { useEffect, useState } from "react";
import KakaoMap from "../components/KakaoMap";
import styled from "styled-components";
import {
  Link,
  Outlet,
  Route,
  Routes,
  useMatch,
  useNavigate,
} from "react-router-dom";
import LoginModal from "../components/LoginModal";
import Transactions from "./Transactions";
import Subscription from "./Subscription";
import { fontAwesome } from "fontawesome";
import { faBell, faNewspaper } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import NewsList from "../components/NewsList";
import axios from "axios";
import cityLogo from "../assets/icons/cityLogo.png";

const Page = styled.div`
  position: relative;
  height: 100vh;
  overflow: hidden;
`;

const BlackBg = styled.div`
  z-index: 10;
  position: fixed;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
`;
const Sidebar = styled.div`
  position: absolute;
  top: 5%;
  left: 20px;
  height: 100%;
  top: 0%;
  left: 0px;
  width: 360px;
  /* border-radius: 14px; */
  background-color: white;
  background-color: black; //다크모드
  z-index: 2;
  box-shadow: 0 8px 32px 0 rgba(0, 0, 0, 0.5);
  padding: 30px 20px;
  box-sizing: border-box;
  overflow: auto;
`;

const Tabs = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  margin: 25px 0px 16px 0px;
  gap: 20px;
`;

const HomeItems = styled.div`
  /* color: black; */
`;
const Logo = styled.div`
  background-size: cover;
  width: 75px;
  height: 75px;
  background-image: url(${cityLogo});
  background-repeat: no-repeat;
  background-position: center;
`;

const HeadWrap = styled.div`
  display: flex;
  align-items: center;
`;

const Notice = styled.div`
  margin-bottom: 20px;
  margin-top: 30px;
`;

const NoticeList = styled.div`
  width: 100%;
  height: 50px;
  padding: 10px;
  border-radius: 10px;
  background-color: #333344;
  box-sizing: border-box;
`;

const Title = styled.h1`
  @font-face {
    font-family: "TTLaundryGothicB";
    src: url("https://fastly.jsdelivr.net/gh/projectnoonnu/2403-2@1.0/TTLaundryGothicB.woff2")
      format("woff2");
    font-weight: 700;
    font-style: normal;
  }
  font-family: TTLaundryGothicB;
  background: linear-gradient(to right top, #7885f5, #db591d);
  color: transparent;
  -webkit-background-clip: text;
  font-size: 30px;
  margin-left: 15px;
  font-weight: 600;
`;

const Tab = styled.span`
  text-align: center;
  text-transform: uppercase;
  font-size: 14px;
  font-weight: 400;
  /* background-color: ${(props) => (props.active ? "#e50914" : "#949494")}; */
  background-color: ${(props) =>
    props.active ? "#e50914" : "#333344"}; //다크모드
  padding: 10px 0px;
  border-radius: 10px;
  transition: all 0.3s;
  cursor: pointer;

  a {
    display: block;
    color: inherit;
    text-decoration: none;
  }

  /* &:hover {
    background-color: #e95656;
  } */
`;
const News = styled.div`
  margin-bottom: 20px;
`;

const Home = () => {
  const navigate = useNavigate();
  const exactHomeMatch = useMatch("/home");
  const transactionsMatch = useMatch("/home/transactions");
  const subscriptionMatch = useMatch("/home/subscription");

  return (
    <Page>
      {/* <BlackBg>
        <LoginModal />
      </BlackBg> */}
      <Sidebar>
        <HeadWrap>
          <Logo
            onClick={() => {
              navigate("/");
            }}
          />
          <Title
            onClick={() => {
              navigate("/home");
            }}
          >
            서비스이름
          </Title>
        </HeadWrap>
        <Tabs>
          <Tab active={!!transactionsMatch}>
            {/* <Link to="transactions" style={{ color: "black" }}> */}
            <Link to="transactions" style={{ color: "white" }}>
              실거래
            </Link>
          </Tab>
          <Tab active={!!subscriptionMatch}>
            <Link to="subscription" style={{ color: "white" }}>
              청약
            </Link>
          </Tab>
        </Tabs>
        {exactHomeMatch !== null ? (
          <HomeItems>
            <Notice>
              <h2 style={{ marginBottom: "10px" }}>📌 공지사항</h2>

              <NoticeList>axios 코드 작성 완</NoticeList>
            </Notice>
            <News>
              <h2>✨ 부동산 뉴스</h2>
              <p>여기에 최신 부동산 뉴스들 표시</p>
            </News>
          </HomeItems>
        ) : null}
        <Outlet></Outlet>
      </Sidebar>
      <KakaoMap />
    </Page>
  );
};

export default Home;
