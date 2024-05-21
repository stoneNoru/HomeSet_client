import React, { useEffect, useState } from "react";
import { useNavigate, Outlet } from "react-router-dom";
import { GetMyInfo, DeleteAccount, GetAPTBookmark, GetSubBookmark } from "../services/api";
import styled from "styled-components";
import { useAsync } from "react-use";

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
`;

const Section = styled.section`
  margin-bottom: 40px;
`;

const Title = styled.h1`
  font-size: 30px;
  margin-bottom: 20px;
`;

const InfoContainer = styled.div`
  background-color: darkgray;
  padding: 20px;
  border-radius: 10px;
`;

const InfoItem = styled.p`
  font-size: 18px;
  margin-bottom: 10px;
`;

const ListContainer = styled.div`
  background-color: darkgray;
  padding: 20px;
  border-radius: 10px;
`;

const ListItem = styled.div`
  padding: 10px;
  border-bottom: 1px solid #ddd;
  display: flex;
  align-items: center;
  &:last-child {
    border-bottom: none;
  }
`;

const Thumbnail = styled.img`
  width: 80px;
  height: 80px;
  margin-right: 20px;
  border-radius: 10px;
  object-fit: cover;
`;

const ListTitle = styled.h2`
  font-size: 22px;
  margin-bottom: 20px;
`;

const Button = styled.button`
  background-color: #e50914;
  color: white;
  border: none;
  padding: 10px 20px;
  font-size: 18px;
  cursor: pointer;
  border-radius: 5px;
  margin-right: 10px;
  &:hover {
    background-color: #d40813;
  }
`;

const fetchMetaData = async (url) => {
  const response = await fetch(`https://api.urlmeta.org/?url=${url}`, {
    headers: {
      Authorization: "YOUR_API_KEY", // URL Meta API 키 필요
    },
  });
  const data = await response.json();
  return data;
};

const MyPage = () => {
  const [myData, setMyData] = useState({});
  const [aptList, setAptList] = useState([]);
  const [subList, setSubList] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchMyInfo = async () => {
      try {
        const response = await GetMyInfo();
        setMyData(response);
        console.log("myData", response);
      } catch (error) {
        console.error("Failed to fetch my info:", error);
      }
    };

    const fetchAptLists = async () => {
      try {
        const response = await GetAPTBookmark();
        setAptList(response);
        console.log("찜 아파트 리스트", response);
      } catch (error) {
        console.log(error);
      }
    };

    const fetchSubLists = async () => {
      try {
        const response = await GetSubBookmark();
        setSubList(response);
        console.log("찜 청약 리스트 ", response);
      } catch (error) {
        console.log(error);
      }
    };

    fetchMyInfo();
    fetchAptLists();
    fetchSubLists();
  }, []);

  return (
    <Container>
      <Section>
        <Title>내 정보</Title>
        <InfoContainer>
          <InfoItem>ID: {myData.id}</InfoItem>
          <InfoItem>Email: {myData.email}</InfoItem>
          <InfoItem>Nickname: {myData.nickname}</InfoItem>
        </InfoContainer>
        <div>
          <Button
            onClick={() => {
              navigate("/fix", { state: { myData } });
            }}
          >
            내 정보 수정
          </Button>
          <Button
            onClick={() => {
              DeleteAccount();
            }}
          >
            회원 탈퇴
          </Button>
        </div>
      </Section>

      <Section>
        <Title>찜 아파트 목록</Title>
        <ListContainer>
          {aptList.map((apt) => (
            <ListItem key={apt.aptCode}>
              <div>
                <p>아파트 이름: {apt.apartmentName}</p>
                <p>거래 금액: {apt.dealAmount}</p>
                <p>거래 날짜: {apt.dealDate}</p>
                <p>도로명: {apt.road}</p>
              </div>
            </ListItem>
          ))}
        </ListContainer>
      </Section>

      <Section>
        <Title>찜 청약 목록</Title>
        <ListContainer>
          {subList.map((sub) => (
            <ListItem key={sub.houseManageNo}>
              <div>
                <p>아파트 이름: {sub.houseNm}</p>
                <p>공급 주소: {sub.hssplyAdres}</p>
                <p>접수 시작일: {sub.rceptBgnde}</p>
                <p>접수 종료일: {sub.rceptEndde}</p>
                <p>
                  <a href={sub.hmpgAdres} target="_blank" rel="noopener noreferrer">
                    자세히 보기
                  </a>
                </p>
              </div>
            </ListItem>
          ))}
        </ListContainer>
      </Section>

      <Outlet />
    </Container>
  );
};

export default MyPage;
