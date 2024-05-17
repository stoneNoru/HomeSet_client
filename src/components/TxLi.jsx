import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const Tab = styled.li`
  /* cursor: pointer; */
  /* border-bottom: 2px solid #e50914;
  border-right: 3px solid #e50914; */
  position: relative;
  width: 100%;
  padding: 12px 16px;
  background-color: #333344;
  background-color: #1c1c26;
  box-sizing: border-box;
  box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.1);
  border-radius: 10px;
  color: black;
  margin-bottom: 12px;
  transition: all 0.3s;
  cursor: pointer;

  &:hover {
    background-color: #857b7b;
  }
`;

const Name = styled.h1`
  font-size: 18px;
  margin-bottom: 20px;
  color: #f1dfdf;
`;

const Price = styled.h1`
  font-size: 22px;
  color: #978a8a;
`;

const Date = styled.span`
  position: absolute;
  top: 12px;
  right: 16px;
  font-size: 12px;
  padding: 2px 4px;
  color: white;
  background-color: #cf2d2d;
  border-radius: 5px;
`;

const GrayText = styled.p`
  color: #91919c;
  font-size: 16px;
`;

const TxLi = ({ no, dongCode, dealAmount, dealYear, dealMonth, dealDay, floor, area, apartmentName, aptCode, lng, lat, date }) => {
  return (
    <Tab>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <Name>{apartmentName}</Name>
        <Date>
          {dealYear}.{dealMonth}.{dealDay}
        </Date>
      </div>

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          textAlign: "center",
        }}
      >
        <Price>{Number(dealAmount.replace(",", "")) / 10000}억</Price>
        <GrayText>
          {floor}층 {parseInt(area / 3.3)}평
        </GrayText>
      </div>
    </Tab>
  );
};

export default TxLi;

/* 
{
  "no": 115902109000055, //1씩 올라가는 숫자? 실거래 번호
  "dongCode": "1159010600",
  "dealAmount": "138,000",
  "dealYear": 2021,
  "dealMonth": 9,
  "dealDay": 16,
  "floor": "7",
  "area": "84.98",
  "apartmentName": "이수교KCC스위첸",
  "aptCode": 11590000000048, //아파트이름
  "lng": "126.981316289093",
  "lat": "37.4975236970888",
  "date": "2021-9-16"
}
*/
