import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { ModifyUserData } from "../services/api";

const BlackBg = styled.div`
  z-index: 2;
  position: fixed;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Container = styled.div`
  padding: 20px 30px;
  border-radius: 15px;
  background-color: white;
  height: 600px;
  width: 500px;
`;

const Header = styled.header`
  margin-bottom: 20px;
  margin-top: 50px;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  h1 {
    color: black;
    margin-bottom: 20px;
    font-size: 30px;
    font-weight: 600;
  }
  p {
    font-size: 16px;
    color: black;
    width: 60%;
    opacity: 0.5;
  }
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  margin: 0px 30px;
  a {
    font-size: 18px;
    display: block;
    text-align: center;
    text-decoration: none;
    padding: 10px 0px;
    background-color: #9b75f3;
    color: white;
    border-radius: 5px;
  }
`;

const Input = styled.input`
  border: none;
  padding: 15px 0px;
  font-size: 18px;
  margin-bottom: 25px;
  border-bottom: 2px solid rgba(0, 0, 0, 0.2);
  color: rgba(0, 0, 0, 0.4);
  transition: border-color 0.3s ease-in-out;

  &:hover {
    border-color: ${(props) => props.theme.accentColor};
  }

  &[type="submit"] {
    background-color: ${(props) => props.theme.accentColor};
    cursor: pointer;
    padding: 20px 0px;
    border-radius: 5px;
    color: white;
  }
`;

const FixUserData = () => {
  const location = useLocation();
  const { myData } = location.state || {}; //이전 페이지에서 전달받은 state
  const navigate = useNavigate();
  const [id, setId] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [nickname, setNickname] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    setId(myData.id);
    setEmail(myData.email);
    setNickname(myData.nickname);
  }, []);

  const isEmailValid = (userEmail) => {
    // 이메일 형식을 검증하는 정규 표현식
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    return emailRegex.test(userEmail);
  };

  const handleSignup = async (e) => {
    e.preventDefault();

    if (!isEmailValid(email)) {
      setError("이메일 형식이 아닙니다.");
      return;
    }

    try {
      const response = await ModifyUserData(id, password, email, nickname);
      console.log(response.data);
      navigate("/mypage");
    } catch (error) {
      console.error(error);
      console.log(error.response);
      setError(
        error?.response?.data?.message ||
          "정보 수정 중 오류가 발생했습니다. 다시 시도해주세요."
      );
    }
  };

  return (
    <div>
      <h1>내 정보 수정</h1>
      {myData ? (
        <div>
          <p>ID: {myData.id}</p>
          <p>Email: {myData.email}</p>
          <p>Nickname: {myData.nickname}</p>
          {/* 여기서 myData를 사용하여 폼을 작성하거나 수정할 수 있습니다 */}
        </div>
      ) : (
        <p>정보를 불러오는 중입니다...</p>
      )}

      <BlackBg>
        <Container>
          <Header>
            <h1>정보 수정</h1>
            <p>Use Email or Google ID to make Account</p>
          </Header>
          <Form onSubmit={handleSignup}>
            <Input
              type="text"
              placeholder="ID"
              value={id}
              onChange={(e) => setId(e.target.value)}
            />
            <Input
              type="text"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <Input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <Input
              type="text"
              placeholder="Nickname"
              value={nickname}
              onChange={(e) => setNickname(e.target.value)}
            />
            <Input type="submit" value="수정 완료" />
            <div>
              {error && (
                <p style={{ color: "red", marginLeft: "1rem" }}>{error}</p>
              )}
            </div>
          </Form>
        </Container>
      </BlackBg>
    </div>
  );
};

export default FixUserData;
