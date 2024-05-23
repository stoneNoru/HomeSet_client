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
  background-color: #212121;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Container = styled.div`
  padding: 20px 30px;
  border-radius: 25px;
  background-color: #171717;
  height: 600px;
  width: 500px;
  transition: 0.4s ease-in-out;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.5);
`;

const Header = styled.header`
  margin-bottom: 20px;
  margin-top: 50px;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;

  h1 {
    color: #dd4950;
    margin-bottom: 20px;
    font-size: 30px;
    font-weight: 600;
  }

  p {
    font-size: 16px;
    color: white;
    width: 60%;
    opacity: 0.5;
  }
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding-left: 2em;
  padding-right: 2em;
  padding-bottom: 0.4em;
  background-color: #171717;
  border-radius: 25px;
  transition: 0.4s ease-in-out;
  color: #9e9d9d;
`;

const InputContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5em;
  border-radius: 25px;
  padding: 0.6em;
  border: none;
  outline: none;
  color: white;
  background-color: #171717;
  box-shadow: inset 2px 5px 10px rgb(5, 5, 5);
  margin-bottom: 15px;
`;

const Input = styled.input`
  background: none;
  border: none;
  outline: none;
  width: 100%;
  color: #d3d3d3;
  font-size: 18px;

  &[type="submit"] {
    background-color: #252525;
    cursor: pointer;
    padding: 0.5em;
    border-radius: 5px;
    color: white;
    transition: 0.4s ease-in-out;

    &:hover {
      background-color: #ac373d;
    }
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: row;
  margin-top: 2.5em;
`;

const Button1 = styled.button`
  padding: 0.5em 1.1em;
  border-radius: 5px;
  margin-right: 0.5em;
  border: none;
  outline: none;
  transition: 0.4s ease-in-out;
  background-color: #252525;
  color: white;

  &:hover {
    background-color: black;
  }
`;

const Button2 = styled.button`
  padding: 0.5em 2.3em;
  border-radius: 5px;
  border: none;
  outline: none;
  transition: 0.4s ease-in-out;
  background-color: #252525;
  color: white;

  &:hover {
    background-color: black;
  }
`;

const Button3 = styled.button`
  margin-bottom: 3em;
  padding: 0.5em;
  border-radius: 5px;
  border: none;
  outline: none;
  transition: 0.4s ease-in-out;
  background-color: #252525;
  color: white;

  &:hover {
    background-color: red;
  }
`;

const FixUserData = () => {
  const location = useLocation();
  const { myData } = location.state || {}; //이전 페이지에서 전달받은 state
  const navigate = useNavigate();
  const [id, setId] = useState(myData?.id || "");
  const [email, setEmail] = useState(myData?.email || "");
  const [password, setPassword] = useState("");
  const [nickname, setNickname] = useState(myData?.nickname || "");
  const [error, setError] = useState("");

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
      const response = await ModifyUserData(id, email, nickname, password);
      // console.log(response.data);
      navigate("/mypage");
    } catch (error) {
      console.error(error);
      // console.log(error.response);
      setError(error?.response?.data?.message || "정보 수정 중 오류가 발생했습니다. 다시 시도해주세요.");
    }
  };

  return (
    <div>
      <BlackBg>
        <Container>
          <Header>
            <h1>정보 수정</h1>
            <p>ID는 변경할 수 없어요</p>
          </Header>
          <Form onSubmit={handleSignup}>
            {/* id는 수정불가 */}
            ID
            <InputContainer>
              <Input type="text" placeholder="ID" value={id} onChange={(e) => setId(e.target.value)} readOnly style={{ color: "#333" }} />
            </InputContainer>
            Email
            <InputContainer>
              <Input type="text" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
            </InputContainer>
            Nickname
            <InputContainer>
              <Input type="text" placeholder="Nickname" value={nickname} onChange={(e) => setNickname(e.target.value)} />
            </InputContainer>
            Password
            <InputContainer>
              <Input type="password" required placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
            </InputContainer>
            <Input type="submit" value="수정 완료" style={{ marginTop: "20px" }} />
            <div>{error && <p style={{ color: "red", marginLeft: "1rem" }}>{error}</p>}</div>
          </Form>
        </Container>
      </BlackBg>
    </div>
  );
};

export default FixUserData;
