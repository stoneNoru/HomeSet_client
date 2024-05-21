import React, { useEffect, useState } from "react";
import KakaoMap from "../components/KakaoMap";
import styled from "styled-components";
import { Link, Navigate, Outlet, useMatch, useNavigate } from "react-router-dom";
import cityLogo from "../assets/icons/cityLogo.png";
import Notice from "../components/Notice";
import { LogOutAPI, GetNotice } from "../services/api";
import { isAuthenticated } from "../utils/checkToken";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faRightToBracket, faUser } from "@fortawesome/free-solid-svg-icons";

const Page = styled.div`
  display: flex;
  height: 100vh;
  overflow: hidden;
`;

const Sidebar = styled.div`
  width: 360px;
  background-color: black; // 다크모드
  z-index: 2;
  box-shadow: 0 8px 32px 0 rgba(0, 0, 0, 0.5);
  padding: 30px 20px;
  box-sizing: border-box;
  overflow: auto;
`;

const Content = styled.div`
  flex-grow: 1;
  position: relative;
`;

const Tabs = styled.div`
  display: grid;
  grid-template-columns: ${(props) => (props.isAuthenticated ? "repeat(2, 1fr)" : "1fr")};
  margin: 25px 0px 16px 0px;
  gap: 20px;
`;

const HomeItems = styled.div``;

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

const NoticesWrap = styled.div`
  width: 100%;
  overflow: hidden;
`;

const NoticeList = styled.div`
  width: 100%;
  display: flex;
  transition: transform 1s;
  transform: translateX(${(props) => props.translateX}%);
`;

const Title = styled.h1`
  @font-face {
    font-family: "TTLaundryGothicB";
    src: url("https://fastly.jsdelivr.net/gh/projectnoonnu/2403-2@1.0/TTLaundryGothicB.woff2") format("woff2");
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
  cursor: pointer;
`;

const Tab = styled.span`
  text-align: center;
  text-transform: uppercase;
  font-size: 14px;
  font-weight: 400;
  background-color: ${(props) => (props.active ? "#e50914" : "#333344")}; // 다크모드
  padding: 10px 0px;
  border-radius: 10px;
  transition: all 0.3s;
  cursor: pointer;

  a {
    display: block;
    color: inherit;
    text-decoration: none;
  }
`;

const News = styled.div`
  margin-bottom: 20px;
`;

const Menu = styled.div`
  font-size: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  /* padding: 10px; */
  border-radius: 10px;
  background-color: #e8362c;
  position: fixed;
  right: 50px;
  top: 50px;
  padding: 10px;
  z-index: 10;
  color: white;
  cursor: pointer;

  transition: all 0.3s;
`;

const MenuItem = styled.div`
  justify-self: flex-start;
  font-size: 16px;
  margin-bottom: 12px;
`;

const Home = () => {
  const navigate = useNavigate();
  const exactHomeMatch = useMatch("/home");
  const transactionsMatch = useMatch("/home/transactions");
  const subscriptionMatch = useMatch("/home/subscription");

  const [translateX, setTranslateX] = useState(0);
  const [noticeList, setNoticeList] = useState([]);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setTranslateX((prev) => (prev - 100) % 300);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const handleLogout = async () => {
    await LogOutAPI();
    navigate("/home");
    alert("로그아웃 완료");
  };

  useEffect(() => {
    const getNotice = async () => {
      const response = await GetNotice();
      setNoticeList(response);
    };
    getNotice();
  }, []);

  return (
    <Page>
      {isAuthenticated() ? (
        <Menu
          onClick={() => {
            setMenuOpen(!menuOpen);
          }}
        >
          <div>
            {/* <FontAwesomeIcon icon={faBars} /> */}
            Menu
          </div>

          {menuOpen ? (
            <div>
              <MenuItem
                onClick={() => {
                  handleLogout();
                }}
              >
                <FontAwesomeIcon icon={faRightToBracket} /> Log out
              </MenuItem>
              <MenuItem
                onClick={() => {
                  navigate("/mypage");
                }}
              >
                <FontAwesomeIcon icon={faUser} />
                myPage
              </MenuItem>
            </div>
          ) : null}
        </Menu>
      ) : null}
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
            홈셋
          </Title>
        </HeadWrap>
        <Tabs isAuthenticated={isAuthenticated()}>
          {isAuthenticated() ? (
            <>
              <Tab active={!!transactionsMatch}>
                <Link to="transactions" style={{ color: "white" }}>
                  실거래
                </Link>
              </Tab>
              <Tab active={!!subscriptionMatch}>
                <Link to="subscription" style={{ color: "white" }}>
                  청약
                </Link>
              </Tab>
            </>
          ) : (
            <Tab>
              <Link to="/login" style={{ color: "white" }}>
                로그인
              </Link>
            </Tab>
          )}
        </Tabs>
        {exactHomeMatch !== null ? (
          <HomeItems>
            <h2
              style={{
                marginBottom: "20px",
                fontSize: "24px",
                marginTop: "20px",
              }}
            >
              📌 공지사항
            </h2>
            <NoticesWrap>
              <NoticeList translateX={translateX}>
                {noticeList.map((notice, index) => (
                  <Notice key={index} version={notice.title} content={notice.content} />
                ))}
              </NoticeList>
            </NoticesWrap>
            <News>
              <h2 style={{ marginBottom: "20px", fontSize: "24px" }}>📰 부동산 뉴스</h2>
              <p>여기에 최신 부동산 뉴스들 표시</p>
            </News>
          </HomeItems>
        ) : null}
        <Outlet />
      </Sidebar>
      <Content>
        <KakaoMap />
      </Content>
    </Page>
  );
};

export default Home;
