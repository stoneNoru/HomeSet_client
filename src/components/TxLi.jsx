import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const Tab = styled.li`
  /* cursor: pointer; */
  border-bottom: 2px solid lightcoral;
  border-right: 3px solid lightcoral;
  position: relative;
  width: 100%;
  padding: 12px 16px;
  background-color: white;
  box-sizing: border-box;
  box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.1);
  border-radius: 10px;
  color: black;
  margin-bottom: 12px;
  transition: all 0.3s;

  &:hover {
    background-color: #eee;
  }
`;

const Name = styled.h1`
  font-size: 18px;
  margin-bottom: 20px;
`;

const Price = styled.h1`
  font-size: 22px;
`;

const Trade = styled.span`
  position: absolute;
  top: 12px;
  right: 16px;
  font-size: 12px;
  padding: 2px 4px;
  color: white;
  background-color: #ff7373;
  border-radius: 5px;
`;

const GrayText = styled.p`
  color: #5a5a76;
  font-size: 16px;
`;

const TxLi = () => {
  return (
    <Link>
      <Tab>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <Name>무슨무슨 아파트</Name>
          <Trade>24.01.01</Trade>
        </div>

        <div style={{ display: "flex", justifyContent: "space-between", textAlign: "center" }}>
          <Price>10억</Price>
          <GrayText>7층 32평</GrayText>
        </div>
      </Tab>
    </Link>
  );
};

export default TxLi;
