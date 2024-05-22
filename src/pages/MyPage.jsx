import React, { useEffect, useState } from "react";
import { useNavigate, Outlet } from "react-router-dom";
import {
  GetMyInfo,
  DeleteAccount,
  GetAPTBookmark,
  GetSubBookmark,
  LogOutAPI,
} from "../services/api";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBars,
  faHouse,
  faRightToBracket,
  faUser,
} from "@fortawesome/free-solid-svg-icons";

const Page = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

const Container = styled.div`
  width: 1500px;
  height: 800px;
  margin: 0 auto;
  padding: 30px;
  background-color: #121212;
  color: #ffffff;
  box-sizing: border-box;
  border-radius: 20px;
  overflow: hidden;
`;

const Section = styled.section`
  margin-bottom: 40px;
`;

const Bookmark = styled.section`
  margin-bottom: 40px;
  width: 50%;
`;

const Title = styled.h1`
  font-size: 26px;
  margin-bottom: 20px;
  color: #dd4950;
  border-bottom: 2px solid #2b2121;
  padding-bottom: 10px;
`;

const InfoContainer = styled.div`
  background-color: #1e1e1e;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.5);
  margin-bottom: 20px;
`;

const InfoItem = styled.p`
  font-size: 18px;
  margin-bottom: 10px;
  color: #c2c2c2;
`;

const TableContainer = styled.div`
  background-color: #1e1e1e;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.5);
  overflow-x: auto;
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
`;

const TableRow = styled.tr`
  border-bottom: 1px solid #333;
  &:last-child {
    border-bottom: none;
  }
`;

const TableHeader = styled.th`
  padding: 10px;
  background-color: #333;
  color: #ffffff;
  font-weight: bold;
`;

const TableCell = styled.td`
  padding: 10px;
  color: #ffffff;
  text-align: center;
  min-width: 100px; /* Added minimum width */
`;

const ListTitle = styled.h2`
  font-size: 22px;
  margin-bottom: 20px;
  color: #dd4950;
`;

const Button = styled.button`
  background-color: #333;
  color: white;
  border: none;
  padding: 10px 20px;
  font-size: 18px;
  cursor: pointer;
  border-radius: 5px;
  margin-right: 10px;
  transition: background-color 0.3s;
  &:hover {
    background-color: #b1252c;
  }
`;

const LinkButton = styled.a`
  background-color: #333;
  color: white;
  text-decoration: none;
  padding: 10px;
  font-size: 14px;
  cursor: pointer;
  border-radius: 5px;
  margin-top: 10px;
  display: inline-block;
  transition: background-color 0.3s;
  white-space: nowrap; /* Prevent text wrapping */
  &:hover {
    background-color: #b1252c;
  }
`;
const SectionsWrap = styled.div`
  display: flex;
  gap: 30px;
`;

const Menu = styled.div`
  padding: 10px 20px;
  font-size: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border-radius: 15px;
  background-color: #e8362c;
  position: fixed;
  left: 50px;
  top: 50px;
  width: ${(props) => (props.menuOpen ? "150px" : "50px")};
  height: ${(props) => (props.menuOpen ? "150px" : "50px")};
  transition: all 0.3s;
  z-index: 2;
  color: white;
  cursor: pointer;

  &:hover {
    background-color: #bf2d23;
  }
`;

const MenuItems = styled.div`
  position: absolute;
  left: 50px;
  top: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;

  transition: all 0.3s;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 20px;
`;

const MenuItem = styled.div`
  cursor: pointer;
  width: 100px;
  border-radius: 10px;
  padding: 10px 20px;
  background-color: #333;
  font-size: 16px;
  margin-bottom: 12px;
  transition: all 0.3s;

  &:hover {
    background-color: #bf2d23;
  }
`;

const MyPage = () => {
  const [myData, setMyData] = useState({});
  const [aptList, setAptList] = useState([]);
  const [subList, setSubList] = useState([]);
  const [menuOpen, setMenuOpen] = useState(true);
  const navigate = useNavigate();

  const handleLogout = async () => {
    await LogOutAPI();
    navigate("/home");
    alert("로그아웃 완료");
  };

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
        console.log("관심 아파트 리스트", response);
      } catch (error) {
        console.log(error);
      }
    };

    const fetchSubLists = async () => {
      try {
        const response = await GetSubBookmark();
        setSubList(response);
        console.log("관심 청약 리스트 ", response);
      } catch (error) {
        console.log(error);
      }
    };

    fetchMyInfo();
    fetchAptLists();
    fetchSubLists();
  }, []);

  const handleDeleteAccount = async () => {
    const confirmDelete = window.confirm("정말 탈퇴하시겠습니까?");
    if (confirmDelete) {
      try {
        await DeleteAccount();
        navigate("/"); // 탈퇴 후 홈 페이지로 이동
      } catch (error) {
        console.error("Failed to delete account:", error);
      }
    }
  };

  return (
    <Page>
      {/* <Menu> */}
      <MenuItems>
        <MenuItem
          onClick={() => {
            handleLogout();
          }}
          style={{ marginBottom: "20px" }}
        >
          <FontAwesomeIcon
            icon={faRightToBracket}
            style={{ marginRight: "10px" }}
          />{" "}
          Log out
        </MenuItem>
        <MenuItem
          onClick={() => {
            navigate("/home");
          }}
        >
          <FontAwesomeIcon icon={faHouse} style={{ marginRight: "10px" }} />
          Home
        </MenuItem>
      </MenuItems>
      {/* </Menu> */}

      <Container>
        <Section>
          <Title>마이페이지</Title>
          <InfoContainer>
            {/* <InfoItem>ID: {myData.id}</InfoItem> */}
            <InfoItem>Email: {myData.email}</InfoItem>
            <InfoItem>닉네임 : {myData.nickname}</InfoItem>
          </InfoContainer>
          <div>
            <Button
              onClick={() => {
                navigate("/fix", { state: { myData } });
              }}
            >
              정보 수정
            </Button>
            <Button onClick={handleDeleteAccount}>회원 탈퇴</Button>
          </div>
        </Section>

        <SectionsWrap>
          <Bookmark>
            <ListTitle>관심 아파트 목록</ListTitle>
            <TableContainer>
              <Table>
                <thead>
                  <TableRow>
                    <TableHeader>아파트 이름</TableHeader>
                    <TableHeader>거래 금액</TableHeader>
                    <TableHeader>거래 날짜</TableHeader>
                    <TableHeader>도로명</TableHeader>
                  </TableRow>
                </thead>
                <tbody>
                  {aptList
                    ? aptList.map((apt) => (
                        <TableRow key={apt.aptCode}>
                          <TableCell>{apt.apartmentName}</TableCell>
                          <TableCell>
                            {Number(apt.dealAmount.replace(",", "") / 10000)}억
                          </TableCell>
                          <TableCell>
                            {apt.date.replace(/-/gi, ".").slice(2)}
                          </TableCell>
                          <TableCell>{apt.road}</TableCell>
                        </TableRow>
                      ))
                    : null}
                </tbody>
              </Table>
            </TableContainer>
          </Bookmark>

          <Bookmark>
            <ListTitle>관심 청약 목록</ListTitle>
            <TableContainer>
              <Table>
                <thead>
                  <TableRow>
                    <TableHeader>아파트 이름</TableHeader>
                    <TableHeader>공급 주소</TableHeader>
                    <TableHeader>접수 시작일</TableHeader>
                    <TableHeader>접수 종료일</TableHeader>
                    <TableHeader>링크</TableHeader>
                  </TableRow>
                </thead>
                <tbody>
                  {subList.map((sub) => (
                    <TableRow key={sub.houseManageNo}>
                      <TableCell>{sub.houseNm}</TableCell>
                      <TableCell>{sub.hssplyAdres}</TableCell>
                      <TableCell>
                        {sub.rceptBgnde.replace(/-/gi, ".").slice(2)}
                      </TableCell>
                      <TableCell>
                        {sub.rceptEndde.replace(/-/gi, ".").slice(2)}
                      </TableCell>
                      <TableCell>
                        <LinkButton
                          href={sub.hmpgAdres}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          상세 정보
                        </LinkButton>
                      </TableCell>
                    </TableRow>
                  ))}
                </tbody>
              </Table>
            </TableContainer>
          </Bookmark>
        </SectionsWrap>

        <Outlet />
      </Container>
    </Page>
  );
};

export default MyPage;
