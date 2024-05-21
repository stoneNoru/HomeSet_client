import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import styled from "styled-components";
import * as api from "../services/api"; // api.js의 모든 함수를 임포트합니다.
import { isAuthenticated } from "../utils/checkToken";

const Container = styled.div`
  padding: 20px 20px;
  border-radius: 15px;
  background-color: white;
  min-height: 620px;
  width: 440px;
`;

const Header = styled.header`
  margin: 90px 0px;
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

const LoginForm = styled.form`
  display: flex;
  flex-direction: column;
  margin: 0px 30px;
  a {
    font-size: 18px;
    display: block;
    text-align: center;
    text-decoration: none;
    padding: 10px 0px;
    background-color: #ff3838;
    color: white;
    border-radius: 5px;
    margin-bottom: 10px;
  }
`;

const Input = styled.input`
  border: none;
  padding: 15px 0px;
  font-size: 18px;
  margin-bottom: 25px;
  border-bottom: 2px solid rgba(0, 0, 0, 0.2);
  color: rgba(0, 0, 0, 0.6);
  transition: border-color 0.3s ease-in-out;
  padding-left: 10px;

  &:hover {
    border-color: #d62f2f;
  }

  &[type="submit"] {
    background-color: #f56157;
    cursor: pointer;
    padding: 20px 0px;
    border-radius: 5px;
    color: white;
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
      } else {
        setError(response.data.message);
      }
    } catch (error) {
      setError("Login failed. Please try again.");
      console.error("Login error:", error);
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
          <Input
            type="text"
            placeholder="ID"
            value={id}
            onChange={(e) => setId(e.target.value)}
          />
          <Input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Input type="submit" value="Log In" />
          <Link to="/signup">Create Account</Link>
          {error && <p style={{ color: "red", marginLeft: "1rem" }}>{error}</p>}
          <h1
            style={{ color: "black", cursor: "pointer" }}
            onClick={() => navigate("/findpw")}
          >
            비밀번호 찾기
          </h1>
        </LoginForm>
      </Container>
    </BlackBg>
  );
};

export default Login;
