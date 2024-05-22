import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import styled from "styled-components";
import * as api from "../services/api"; // api.js의 모든 함수를 임포트합니다.
import { isAuthenticated } from "../utils/checkToken";

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

const LoginForm = styled.form`
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
  margin-top: 50px;
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

const LinkButton = styled(Link)`
  font-size: 18px;
  display: block;
  text-align: center;
  text-decoration: none;
  padding: 10px 0px;
  background-color: #252525;
  color: white;
  border-radius: 5px;
  margin-bottom: 10px;
  transition: background-color 0.4s ease-in-out;

  &:hover {
    background-color: #ac373d;
  }
`;

const FindPwButton = styled.h1`
  color: white;
  cursor: pointer;
  text-align: center;
  /* margin-top: 20px; */

  &:hover {
    color: #ac373d;
  }
`;

const Login = () => {
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/home";

  useEffect(() => {
    if (isAuthenticated()) {
      navigate(from, { replace: true });
    }
  }, [navigate, from]);

  const handleLogin = async (event) => {
    event.preventDefault();
    setError("");
    try {
      const response = await api.LoginPost(id, password); // api 객체를 사용해 LoginPost 함수 호출
      if (response.data.status === 200) {
        console.log("Login successful");
        navigate("/home");
      } //else {
      //   setError(error.response.data.message);
      // }
    } catch (error) {
      console.error("Login error:", error);
      if (error) {
        setError(error?.response?.data?.message || "로그인 중 오류가 발생했습니다. 다시 시도해주세요.");
      }
    }
  };

  return (
    <BlackBg>
      <Container>
        <Header>
          <h1>Welcome</h1>
          <p>Log in or create Account</p>
        </Header>
        <LoginForm onSubmit={handleLogin}>
          <InputContainer>
            <Input type="text" placeholder="ID" value={id} onChange={(e) => setId(e.target.value)} />
          </InputContainer>
          <InputContainer>
            <Input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
          </InputContainer>
          <Input type="submit" value="Log In" style={{ marginTop: "100px" }} />
          <LinkButton to="/signup">Create Account</LinkButton>
          {error && <p style={{ color: "red", marginLeft: "1rem" }}>{error}</p>}
          <FindPwButton onClick={() => navigate("/findpw")}>비밀번호 찾기</FindPwButton>
        </LoginForm>
      </Container>
    </BlackBg>
  );
};

export default Login;
