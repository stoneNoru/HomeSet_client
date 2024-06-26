import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronUp } from "@fortawesome/free-solid-svg-icons";
import { faGithub } from "@fortawesome/free-brands-svg-icons";
import bridge from "../assets/bridge.jpg";
import chart from "../assets/chart.png";
import subInfo from "../assets/subInfo.png";
import bookmark3 from "../assets/bookmark3.png";

const Wrap = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  color: #ffffff;
`;

const HeadContainer = styled.div`
  box-sizing: border-box;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 100%;
  height: 720px;
  background-image: linear-gradient(rgba(255, 255, 255, 0) 10%, rgba(0, 0, 0, 1) 100%), url(${bridge});
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
  position: relative;
  padding: 0px 50px 0px 50px;
  color: whitesmoke;
`;

const Title = styled.h1`
  font-size: 48px;
  font-weight: 800;
  padding: 24px;
  color: whitesmoke;
  letter-spacing: 0.2px;
`;

const HeaderDesc = styled.p`
  font-size: 22px;
  margin-top: 16px;
  color: whitesmoke;
`;

const Button = styled.button`
  padding: 16px 24px 16px 24px;
  border-radius: 10px;
  border: none;
  color: whitesmoke;
  font-size: 24px;
  margin-top: 50px;
  background-color: #9c2929;
  transition: all 0.3s ease-in-out;
  &:hover {
    background-color: #ff3838;
    box-shadow: -5px -5px 30px 5px cornflowerblue, 5px 5px 30px 5px red;
  }
`;

const Break = styled.div`
  width: 100%;
  height: 4px;
  background-color: #1d1612;
`;

const InfoWrap = styled.div`
  gap: 40px;
  display: flex;
  justify-content: center;
  padding: 50px 0px 50px 0px;
  width: 80%;
  min-height: 500px;
  box-sizing: border-box;
  @media (max-width: 850px) {
    flex-direction: column;
  }
`;

const TextContainer = styled.div`
  width: 50%;
  box-sizing: border-box;
  @media (max-width: 850px) {
    width: 100%;
  }
`;

const InfoTitle = styled.h1`
  color: whitesmoke;
  font-size: 50px;
  margin-bottom: 16px;
`;

const InfoDesc = styled.p`
  color: #b8b6b6;
  font-size: 30px;
  line-height: 36px;
`;

const InfoPic = styled.div`
  background-image: url(${(props) => props.bgimage});
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;
  box-sizing: border-box;
  background-color: gray;
  width: 400px;
  height: 400px;
  @media (max-width: 850px) {
    width: 300px;
    height: 300px;
  }
`;

const Offer = styled.h1`
  font-size: 42px;
  margin-bottom: 16px;
  margin-top: 40px;
  background: linear-gradient(to right top, #7885f5, #db591d);
  color: transparent;
  -webkit-background-clip: text;
`;

const ToTop = styled.i`
  padding: 10px;
  border-radius: 50%;
  background-color: #e8362c;
  position: fixed;
  right: 50px;
  top: 50px;
  z-index: 10;
  color: white;
  cursor: pointer;
`;

const StacksContainer = styled.div`
  display: flex;
  width: 80%;
  justify-content: space-evenly;
  align-items: center;
  margin-bottom: 50px;
  @media (max-width: 850px) {
    flex-direction: column;
  }
`;

const Stack = styled.div`
  position: relative;
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #212121;
  width: 300px;
  height: 300px;
  border-radius: 10px;
  z-index: 2;
  &:hover div {
    right: 0px;
  }
  &:hover h1 {
    margin-right: 50px;
  }
`;

const HoveredStack = styled.div`
  position: absolute;
  right: 290px;
  width: 300px;
  height: 300px;
  border-radius: 10px;
  z-index: 3;
  transition: all 0.3s ease-in-out;
  box-sizing: border-box;
  padding: 30px;
`;

const HoveredTitle = styled.a`
  font-size: 28px;
  margin-bottom: 10px;
  cursor: pointer;
`;

const HoveredContent = styled.li`
  font-size: 20px;
  margin-top: 10px;
  margin-bottom: 10px;
`;

const StackTitle = styled.h1`
  font-size: 30px;
  transition: all 0.3s ease-in-out;
`;

const Footer = styled.footer`
  color: whitesmoke;
  margin-top: 30px;
  width: 100%;
  background-color: #131313;
  padding: 20px 0;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Copyright = styled.div`
  text-align: center;
  font-size: 14px;
  color: #b8b6b6;
`;

const Onboarding = () => {
  return (
    <Wrap>
      <ToTop
        onClick={() => {
          window.scrollTo({ top: 0, behavior: "smooth" });
        }}
      >
        <FontAwesomeIcon icon={faChevronUp} />
      </ToTop>
      <HeadContainer>
        <Title>부동산 정보를 한눈에</Title>
        <HeaderDesc>청약에서 실거래 내역까지, 전국 부동산의 모든 것을 편하게 확인하세요.</HeaderDesc>
        <HeaderDesc>당신의 부동산 투자, 우리의 데이터로 한층 더 명확하게</HeaderDesc>

        <Link to={"/home"}>
          <Button>서비스 사용하기</Button>
        </Link>
      </HeadContainer>
      <Offer>What we offer</Offer>
      <InfoWrap>
        <TextContainer>
          <InfoTitle>아파트 실거래가를 확인하세요</InfoTitle>
          <InfoDesc>원하는 지역을 검색하여 해당 지역의 아파트 실거래가를 확인할 수 있어요.</InfoDesc>
        </TextContainer>
        <InfoPic bgimage={chart} />
      </InfoWrap>
      <Break />
      <InfoWrap>
        <InfoPic bgimage={subInfo} />
        <TextContainer>
          <InfoTitle>청약 정보를 확인하세요</InfoTitle>
          <InfoDesc>오늘 날짜를 기준으로 종료된 청약, 진행 중인 청약, 그리고 진행 예정인 청약 정보를 확인할 수 있어요.</InfoDesc>
        </TextContainer>
      </InfoWrap>
      <Break />
      <InfoWrap>
        <TextContainer>
          <InfoTitle>원하는 매물을 북마크할 수 있어요</InfoTitle>
          <InfoDesc>관심 있는 아파트나 청약 정보를 북마크 기능을 통해 손쉽게 저장할 수 있어요.</InfoDesc>
        </TextContainer>
        <InfoPic bgimage={bookmark3} />
      </InfoWrap>
      <Break />
      <Offer style={{ marginBottom: "50px" }}>What we used</Offer>
      <StacksContainer>
        <Stack>
          <StackTitle
            style={{
              background: "linear-gradient(-45deg, #f89b29 0%, #ff0f7b 100% )",
              color: "transparent",
              WebkitBackgroundClip: "text",
            }}
          >
            Frontend
          </StackTitle>
          <HoveredStack
            style={{
              background: "linear-gradient(-45deg, #f89b29 0%, #ff0f7b 100% )",
            }}
          >
            <HoveredTitle href="https://github.com/norunaru" target="blank">
              <FontAwesomeIcon icon={faGithub} style={{ marginRight: "10px" }} />
              nwy98
            </HoveredTitle>
            <ul>
              <HoveredContent>React.js</HoveredContent>
              <HoveredContent>Recoil</HoveredContent>
              <HoveredContent>Styled components</HoveredContent>
              <HoveredContent>ApexCharts</HoveredContent>
              <HoveredContent>Kakao maps SDK</HoveredContent>
            </ul>
          </HoveredStack>
        </Stack>
        <Stack>
          <StackTitle
            style={{
              background: "linear-gradient(-45deg, #35ac8e, #1a01a3)",
              color: "transparent",
              WebkitBackgroundClip: "text",
            }}
          >
            Backend
          </StackTitle>
          <HoveredStack
            style={{
              background: "linear-gradient(-45deg, #35ac8e, #1a01a3)",
            }}
          >
            <HoveredTitle href="https://github.com/stoneTiger0912" target="blank">
              <FontAwesomeIcon icon={faGithub} style={{ marginRight: "10px" }} />
              SeokBeom Lee
            </HoveredTitle>
            <ul>
              <HoveredContent>Spring Boot</HoveredContent>
              <HoveredContent>Spring Boot Mail</HoveredContent>
              <HoveredContent>Spring Boot Security</HoveredContent>
              <HoveredContent>Naver Open API</HoveredContent>
              <HoveredContent>MyBatis</HoveredContent>
              <HoveredContent>MySQL</HoveredContent>
            </ul>
          </HoveredStack>
        </Stack>
      </StacksContainer>

      <Footer>
        <Copyright>© 2024 SSAFY team StoneNoru. All rights reserved.</Copyright>
      </Footer>
    </Wrap>
  );
};

export default Onboarding;
