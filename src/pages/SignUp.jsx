import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { SignUpAPI } from "../services/api";

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
  margin-bottom: 30px;
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
  gap: 20px;
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
    margin-top: 60px;
    &:hover {
      background-color: #ac373d;
    }
  }
`;

const SignUp = () => {
  const navigate = useNavigate();
  const [id, setId] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [nickname, setNickname] = useState("");
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
      const response = await SignUpAPI(id, password, email, nickname);
      // console.log(response.data);
      navigate("/login");
    } catch (error) {
      console.error(error);

      if (error) {
        setError(error?.response?.data?.message || "회원가입 중 오류가 발생했습니다. 다시 시도해주세요.");
      }
    }
  };

  return (
    <BlackBg>
      <Container>
        <Header>
          <h1>Sign up</h1>
        </Header>
        <Form onSubmit={handleSignup}>
          <InputContainer>
            <Input type="text" placeholder="ID" value={id} onChange={(e) => setId(e.target.value)} />
          </InputContainer>
          <InputContainer>
            <Input type="text" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
          </InputContainer>
          <InputContainer>
            <Input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
          </InputContainer>
          <InputContainer>
            <Input type="text" placeholder="Nickname" value={nickname} onChange={(e) => setNickname(e.target.value)} />
          </InputContainer>
          <Input type="submit" value="Sign up" />
          <div>{error && <p style={{ color: "red", marginLeft: "1rem" }}>{error}</p>}</div>
        </Form>
      </Container>
    </BlackBg>
  );
};

export default SignUp;
