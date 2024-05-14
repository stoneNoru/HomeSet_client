import React from "react";
import Tab from "../components/Tab";
import styled from "styled-components";
import city from "../assets/city.jpg";
import bridge from "../assets/bridge.jpg";
import { Link } from "react-router-dom";

const Wrap = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  color: white;
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
  /* background: linear-gradient(to right top, #7885f5, #7d0b94);
  color: transparent;
  -webkit-background-clip: text; */
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
  background-color: #b83131;

  transition: all 0.3s ease-in-out;

  &:hover {
    background-color: #ff3838;
    box-shadow: -5px -5px 30px 5px red, 5px 5px 30px 5px blue;
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

const TextContiaer = styled.div`
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
  color: whitesmoke;
  font-size: 30px;
  line-height: 36px;
`;

const InfoPic = styled.div`
  box-sizing: border-box;
  background-color: gray;
  width: 450px;
  height: 450px;
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
  /* align-self: flex-start; */
  /* margin-left: 10%; */
`;

const Footer = styled.div`
  color: whitesmoke;

  width: 100%;
  height: 300px;
  background-color: #242424;
`;

const Onboarding = () => {
  return (
    <Wrap>
      <HeadContainer>
        <Title>부동산 정보를 한눈에</Title>
        <HeaderDesc>청약에서 실거래 내역까지, 서울시 부동산의 모든 것을 편하게 확인하세요.</HeaderDesc>
        <HeaderDesc>당신의 부동산 투자, 우리의 데이터로 한층 더 명확하게</HeaderDesc>

        <Link to={"/home"}>
          <Button>서비스 사용하기</Button>
        </Link>
      </HeadContainer>
      <Offer>What we offer</Offer>
      <InfoWrap>
        <TextContiaer>
          <InfoTitle>어쩌구 저쩌구</InfoTitle>
          <InfoDesc>Lorem ipsum dolor sit amet consectetur adipisicing elit. Iure perferendis saepe unde eum e</InfoDesc>
        </TextContiaer>
        <InfoPic>사진</InfoPic>
      </InfoWrap>
      <Break />
      <InfoWrap>
        <InfoPic>사진</InfoPic>
        <TextContiaer>
          <InfoTitle>어쩌구 저쩌구</InfoTitle>
          <InfoDesc>Lorem ipsum dolor sit amet consectetur adipisicing elit. Iure perferendis saepe unde eum e</InfoDesc>
        </TextContiaer>
      </InfoWrap>
      <Break />
      <InfoWrap>
        <TextContiaer>
          <InfoTitle>어쩌구 저쩌구</InfoTitle>
          <InfoDesc>Lorem ipsum dolor sit amet consectetur adipisicing elit. Iure perferendis saepe unde eum e</InfoDesc>
        </TextContiaer>
        <InfoPic>사진</InfoPic>
      </InfoWrap>
      <Footer>Footer</Footer>
    </Wrap>
  );
};

export default Onboarding;
