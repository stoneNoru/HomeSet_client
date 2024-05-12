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
`;

const HeadContainer = styled.div`
  box-sizing: border-box;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 100%;
  height: 520px;
  background-image: linear-gradient(
      rgba(255, 255, 255, 0) 10%,
      rgba(0, 0, 0, 1) 100%
    ),
    url(${bridge});
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
  position: relative;
  padding: 0px 50px 0px 50px;
`;

const Title = styled.h1`
  font-size: 48px;
  font-weight: 800;
  padding: 24px;
  /* background: linear-gradient(to right top, #7885f5, #7d0b94);
  color: transparent;
  -webkit-background-clip: text; */
  letter-spacing: 0.2px;
`;

const HeaderDesc = styled.p`
  font-size: 22px;
  margin-top: 16px;
`;

const Button = styled.button`
  padding: 16px 24px 16px 24px;
  border-radius: 10px;
  border: none;
  color: white;
  font-size: 24px;
  margin-top: 24px;
  background-color: #d13737;

  transition: all 0.3s ease-in-out;

  &:hover {
    background-color: #ff3838;
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
  padding: 50px 0px 50px 0px;
  width: 80%;
  min-height: 500px;
  box-sizing: border-box;
`;

const TextContiaer = styled.div`
  width: 50%;
  box-sizing: border-box;
`;

const InfoTitle = styled.h1`
  font-size: 50px;
  margin-bottom: 16px;
`;

const InfoDesc = styled.p`
  font-size: 30px;
  line-height: 36px;
`;

const InfoPic = styled.div`
  box-sizing: border-box;
  background-color: gray;
  width: 50%;
`;

const Offer = styled.h1`
  font-size: 42px;
  margin-bottom: 16px;
  background: linear-gradient(to right top, #7885f5, #db591d);
  color: transparent;
  -webkit-background-clip: text;
  align-self: flex-start;
  margin-left: 10%;
`;

const Onboarding = () => {
  return (
    <Wrap>
      <HeadContainer>
        <Title>부동산 정보를 한눈에</Title>
        <HeaderDesc>
          청약에서 실거래 내역까지, 서울시 부동산의 모든 것을 편하게 확인하세요.
        </HeaderDesc>
        <HeaderDesc>
          당신의 부동산 투자, 우리의 데이터로 한층 더 명확하게
        </HeaderDesc>

        <Link to={"/home"}>
          <Button>서비스 사용하기</Button>
        </Link>
      </HeadContainer>
      <Offer>What we offer</Offer>
      <InfoWrap>
        <TextContiaer>
          <InfoTitle>어쩌구 저쩌구</InfoTitle>
          <InfoDesc>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Iure
            perferendis saepe unde eum e
          </InfoDesc>
        </TextContiaer>
        <InfoPic>사진</InfoPic>
      </InfoWrap>
      <Break />
      <InfoWrap>
        <InfoPic>사진</InfoPic>
        <TextContiaer>
          <InfoTitle>어쩌구 저쩌구</InfoTitle>
          <InfoDesc>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Iure
            perferendis saepe unde eum e
          </InfoDesc>
        </TextContiaer>
      </InfoWrap>
      <Break />
      <InfoWrap>
        <TextContiaer>
          <InfoTitle>어쩌구 저쩌구</InfoTitle>
          <InfoDesc>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Iure
            perferendis saepe unde eum e
          </InfoDesc>
        </TextContiaer>
        <InfoPic>사진</InfoPic>
      </InfoWrap>
    </Wrap>
  );
};

export default Onboarding;
