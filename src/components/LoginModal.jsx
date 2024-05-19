import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

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

const LoginModal = () => {
  return (
    <BlackBg>
      <Container>
        <Header>
          <h1>Welcome</h1>
          <p>Log in or create Account</p>
        </Header>
        <LoginForm>
          <Input type="text" placeholder="Email" />
          <Input type="password" placeholder="Password" />

          <Input type="submit" value="Log In" />
          <Link to="/signup">Create Account</Link>
          {/* {error && <p style={{ color: "red", marginLeft: "1rem" }}>{error}</p>} */}
        </LoginForm>
      </Container>
    </BlackBg>
  );
};

export default LoginModal;
