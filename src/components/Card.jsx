import { faChevronDown, faChevronUp } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState, useRef, useEffect } from "react";
import styled from "styled-components";

const Tab = styled.li`
  position: relative;
  width: 100%;
  padding: 12px 16px;
  background-color: #1c1c26;
  box-sizing: border-box;
  box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.1);
  border-radius: 10px;
  color: black;
  margin-bottom: 12px;
  transition: all 0.3s;
  cursor: pointer;
`;

const Name = styled.h1`
  width: 70%;
  font-size: 18px;
  margin-bottom: 10px;
  color: #f0e2e2;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const Address = styled.h1`
  font-size: 14px;
  color: #978a8a;
  overflow: hidden;
`;

const Status = styled.span`
  position: absolute;
  top: 12px;
  right: 16px;
  font-size: 12px;
  padding: 2px 4px;
  color: white;
  background-color: #cf2d2d;
  border-radius: 5px;
`;

const DetailWrap = styled.div`
  height: ${(props) => (props.clicked ? `${props.scrollHeight}px` : "0")};
  overflow: hidden;
  transition: height 0.3s ease-in-out;
`;

const Chevron = styled.i`
  color: gray;
  position: absolute;
  bottom: 12px;
  right: 16px;
`;

const ToInfo = styled.a`
  padding: 5px 5px;
  background-color: #5f5f5f;
  border-radius: 5px;
  transition: all 0.3s;

  &:hover {
    background-color: #cf2d2d;
  }
`;

const ToWrap = styled.div`
  width: 100%;
  display: flex;
  gap: 20px;
  margin-top: 10px;
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;

  th,
  td {
    padding: 6px;
    text-align: left;
    color: #f0e2e2;
  }

  th {
    font-size: 14px;
    color: #fff;
  }

  td {
    font-size: 14px;
    color: #ccc;
  }
`;

const Card = ({
  status,
  houseManageNo,
  pblancNo,
  houseNm,
  hssplyAdres,
  bsnsMbyNm,
  houseSecdNm,
  totSuplyHshldco,
  rceptBgnde,
  rceptEndde,
  przwnerPresnatnDe,
  cntrctCnclsBgnde,
  cntrctCnclsEndde,
  mvnPrearngeYm,
  mdhsTelno,
  hmpgAdres,
  subscrptAreaCodeNm,
  pblancUrl,
}) => {
  if (status === "upcoming") {
    status = rceptBgnde
      ? rceptBgnde.replace(/-/g, ".").slice(2) + " 시작"
      : "정보 없음";
  } else if (status === "ongoing") {
    status = rceptEndde
      ? rceptEndde.replace(/-/g, ".").slice(2) + " 종료"
      : "정보 없음";
  } else if (status === "finished") {
    status = "종료";
  }

  const [clicked, setClicked] = useState(false);
  const detailRef = useRef(null);

  useEffect(() => {
    if (clicked) {
      detailRef.current.style.height = `${detailRef.current.scrollHeight}px`;
    } else {
      detailRef.current.style.height = "0";
    }
  }, [clicked]);

  return (
    <Tab>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <Name>{houseNm}</Name>
        <Status>{status}</Status>
      </div>

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          textAlign: "center",
        }}
      >
        <Address>{hssplyAdres}</Address>
      </div>
      <DetailWrap ref={detailRef} clicked={clicked}>
        <Table>
          <tbody>
            <tr>
              <th>주택 종류</th>
              <td>{houseSecdNm}</td>
            </tr>
            <tr>
              <th>공급 세대수</th>
              <td>{totSuplyHshldco}</td>
            </tr>
            <tr>
              <th>접수일</th>
              <td>
                {rceptBgnde
                  ? rceptBgnde.replace(/-/g, ".").slice(2)
                  : "정보 없음"}{" "}
                ~{" "}
                {rceptEndde
                  ? rceptEndde.replace(/-/g, ".").slice(2)
                  : "정보 없음"}
              </td>
            </tr>
            <tr>
              <th>당첨자 발표일</th>
              <td>
                {przwnerPresnatnDe
                  ? przwnerPresnatnDe.replace(/-/g, ".").slice(2)
                  : "정보 없음"}
              </td>
            </tr>
            <tr>
              <th>계약일</th>
              <td>
                {cntrctCnclsBgnde
                  ? cntrctCnclsBgnde.replace(/-/g, ".").slice(2)
                  : "정보 없음"}{" "}
                ~{" "}
                {cntrctCnclsEndde
                  ? cntrctCnclsEndde.replace(/-/g, ".").slice(2)
                  : "정보 없음"}
              </td>
            </tr>
            <tr>
              <th>모델하우스 전화번호</th>
              <td>{mdhsTelno}</td>
            </tr>
          </tbody>
        </Table>
        <ToWrap>
          <ToInfo href={hmpgAdres} target="_blank" rel="noopener noreferrer">
            홈페이지
          </ToInfo>
          <ToInfo href={pblancUrl} target="_blank" rel="noopener noreferrer">
            공고
          </ToInfo>
        </ToWrap>
      </DetailWrap>
      <Chevron>
        <FontAwesomeIcon
          icon={clicked ? faChevronUp : faChevronDown}
          onClick={() => setClicked(!clicked)}
        />
      </Chevron>
    </Tab>
  );
};

export default Card;
/*
{
  "houseManageNo": "2024000152",
  "pblancNo": "2024000152",
  "houseNm": "이천자이 더 레브",
  "hssplyAdres": "경기도 이천시 송정동 산31번지 일원",
  "bsnsMbyNm": "교보자산신탁(주)",
  "houseSecdNm": "APT",
  "totSuplyHshldco": 635,
  "rceptBgnde": "2024-05-20",
  "rceptEndde": "2024-05-22",
  "przwnerPresnatnDe": "2024-05-28",
  "cntrctCnclsBgnde": "2024-06-09",
  "cntrctCnclsEndde": "2024-06-11",
  "mvnPrearngeYm": "202704",
  "mdhsTelno": "18334465",
  "hmpgAdres": "http://xi.co.kr/irv",
  "subscrptAreaCodeNm": "경기",
  "pblancUrl": "https://www.applyhome.co.kr/ai/aia/selectAPTLttotPblancDetail.do?houseManageNo=2024000152&pblancNo=2024000152"
}
 */

// houseManageNo: 주택 관리 번호
// pblancNo: 공고 번호
// houseNm: 주택 이름
// hssplyAdres: 공급 주소
// bsnsMbyNm: 사업 주체 이름
// houseSecdNm: 주택 종류 (예: 아파트)
// totSuplyHshldco: 총 공급 세대 수
// rceptBgnde: 접수 시작일
// rceptEndde: 접수 종료일
// przwnerPresnatnDe: 당첨자 발표일
// cntrctCnclsBgnde: 계약 시작일
// cntrctCnclsEndde: 계약 종료일
// mvnPrearngeYm: 입주 예정 년월
// mdhsTelno: 모델하우스 전화번호
// hmpgAdres: 홈페이지 주소
// subscrptAreaCodeNm: 청약 지역 코드 이름
// pblancUrl: 공고 URL
