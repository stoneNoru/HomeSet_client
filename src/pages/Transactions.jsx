import React from "react";
import styled from "styled-components";
import TxLi from "../components/TxLi";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";

const Form = styled.form`
  width: 100%;
  display: flex;
  align-items: center;
  margin-bottom: 10px;
  border: none;
`;
const Input = styled.input`
  flex-grow: 1;
  padding: 0.5em;
  border: none;
  border-bottom: 2px solid rgba(0, 0, 0, 0.2);
  border-radius: 4px 0 0 4px;
  height: 36px;
  box-sizing: border-box;
  background-color: whitesmoke;
  background-color: #333344; //다크모드

  transition: all 0.3s;
  &:hover {
    border-color: #e50914;
  }
`;

const Submit = styled.button`
  padding: 0.5em 1em;
  background-color: #e50914;
  border: none;
  border-radius: 0 4px 4px 0;
  color: white;
  cursor: pointer;
  height: 36px;
  box-sizing: border-box;
  transition: all 0.3s;

  &:hover {
    /* background-color: orange; */
  }
`;

const Text = styled.h1`
  font-size: 18px;
  margin: 20px 0;
`;

const Transactions = () => {
  return (
    <>
      <Form>
        <Input placeholder="원하는 지역 입력" />
        <Submit type="submit">
          <FontAwesomeIcon icon={faMagnifyingGlass} />
        </Submit>
      </Form>

      <div style={{ color: "black" }}>
        {/* <Text>🚩 실거래 정보</Text> */}
        <Text style={{ color: "#F6F8FA" }}>🚩 실거래 정보</Text>
        <ul>
          <TxLi />
          <TxLi />
          <TxLi />
          <TxLi />
          <TxLi />
          <TxLi />
          <TxLi />
          <TxLi />
          <TxLi />
          <TxLi />
          <TxLi />
          <TxLi />
          <TxLi />
          <TxLi />

          {/* 추가적인 TxLi 컴포넌트 주석 처리 */}
        </ul>
      </div>
    </>
  );
};

export default Transactions;
