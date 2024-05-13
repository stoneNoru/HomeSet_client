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

const Page = styled.div`
  position: relative;
  height: 100vh;
  overflow: hidden;
`;

const Header = styled.div`
  position: absolute;
  color: black;
  font-size: 30px;
  width: 100%;
  height: 80px;
  z-index: 2;
  background-color: white;
  box-shadow: 0 8px 32px 0 rgba(241, 48, 0, 0.37);
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
const Sidebar = styled.div`
  position: absolute;
  height: 90%;
  top: 5%;
  left: 20px;
  width: 320px;
  border-radius: 14px;
  background-color: whitesmoke;
  z-index: 2;
  box-shadow: 0 8px 32px 0 rgba(241, 48, 0, 0.37);
  padding: 30px 20px;
  box-sizing: border-box;
  border: 3px solid lightgray;
`;

const Tabs = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  margin: 25px 0px;
  gap: 10px;
`;

const HomeItems = styled.div`
  color: black;
`;

const Tab = styled.span`
  text-align: center;
  text-transform: uppercase;
  font-size: 14px;
  font-weight: 400;
  background-color: ${(props) => (props.active ? "#e95656" : "#949494")};
  padding: 7px 0px;
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

const Home = () => {
  const navigate = useNavigate();
  const homeMatch = useMatch("/home/*");
  const exactHomeMatch = useMatch("/home");
  console.log(homeMatch);
  const transactionsMatch = useMatch("/home/transactions");
  const subscriptionMatch = useMatch("/home/subscription");
  console.log(transactionsMatch);

  return (
    <Page>
      {/* <BlackBg>
        <LoginModal />
      </BlackBg> */}

      {/* <Header>헤더</Header> */}
      <Sidebar>
        <h1
          style={{ color: "black" }}
          onClick={() => {
            navigate("/home");
          }}
        >
          서비스이름 & 로고
        </h1>
        <Tabs>
          <Tab active={!!transactionsMatch}>
            <Link to="transactions">실거래</Link>
          </Tab>
          <Tab active={!!subscriptionMatch}>
            <Link to="subscription">청약</Link>
          </Tab>
        </Tabs>
        {exactHomeMatch !== null ? <HomeItems>홈</HomeItems> : null}
        <Outlet></Outlet>
      </Sidebar>
      <KakaoMap />
    </Page>
  );
};

export default Home;
