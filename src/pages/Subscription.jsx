import React, { useEffect, useState } from "react";
import styled from "styled-components";
import {
  CurrentSubscription,
  NewSubscription,
  FinishedSubscription,
} from "../services/api";
import Card from "../components/Card";
import Nothing from "../components/Nothing";
import { faCircleInfo } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const RadioGroup = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 24px;
  margin-top: 20px;
  margin-bottom: 20px;
`;

const RadioLabel = styled.label`
  display: inline-block;
  position: relative;
  padding-left: 24px;
  font-size: 16px;
  color: #fff;
  cursor: pointer;
  transition: all 0.1s cubic-bezier(0.23, 1, 0.32, 1);

  &:hover .custom-radio {
    transform: translateY(-50%) scale(1.1);
    border-color: #f5524c;
    box-shadow: 0 0 10px #fffb0080;
  }
`;

const RadioInput = styled.input`
  position: absolute;
  opacity: 0;
  width: 0;
  height: 0;

  &:checked + ${RadioLabel} .custom-radio {
    transform: translateY(-50%) scale(0.9);
    border: 2px solid #f5524c;
    color: #f5524c;
  }

  &:checked + ${RadioLabel} {
    color: #f5524c;
  }
`;

const CustomRadio = styled.span`
  position: absolute;
  top: 50%;
  left: 0;
  transform: translateY(-50%);
  width: 10px;
  height: 10px;
  border-radius: 50%;
  border: 2px solid #555;
  margin-right: 8px;
  transition: all 0.3s cubic-bezier(0.23, 1, 0.32, 1);
`;

const SubscriptionContainer = styled.div`
  color: white;
`;

const Info = styled.div`
  width: 100%;
  height: 30px;
  color: #727272;
`;

const Subscription = () => {
  const [selectedOption, setSelectedOption] = useState("ongoing");
  const [finished, setFinished] = useState([]);
  const [ongoing, setOngoing] = useState([]);
  const [upcoming, setUpcoming] = useState([]);

  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
  };

  useEffect(() => {
    const fetchData = async () => {
      if (selectedOption === "ongoing") {
        const response = await CurrentSubscription();
        setOngoing(response);
      } else if (selectedOption === "upcoming") {
        const response = await NewSubscription();
        setUpcoming(response);
      } else if (selectedOption === "finished") {
        const response = await FinishedSubscription();
        setFinished(response);
      }
    };

    fetchData();
  }, [selectedOption]);

  if (upcoming.length != 0) {
    console.log(upcoming);
  }

  return (
    <SubscriptionContainer>
      <RadioGroup>
        <div>
          <RadioInput
            type="radio"
            id="finished"
            value="finished"
            checked={selectedOption === "finished"}
            onChange={handleOptionChange}
          />
          <RadioLabel htmlFor="finished">
            종료
            <CustomRadio className="custom-radio" />
          </RadioLabel>
        </div>
        <div>
          <RadioInput
            type="radio"
            id="ongoing"
            value="ongoing"
            checked={selectedOption === "ongoing"}
            onChange={handleOptionChange}
          />
          <RadioLabel htmlFor="ongoing">
            진행 중
            <CustomRadio className="custom-radio" />
          </RadioLabel>
        </div>
        <div>
          <RadioInput
            type="radio"
            id="upcoming"
            value="upcoming"
            checked={selectedOption === "upcoming"}
            onChange={handleOptionChange}
          />
          <RadioLabel htmlFor="upcoming">
            진행 예정
            <CustomRadio className="custom-radio" />
          </RadioLabel>
        </div>
      </RadioGroup>
      <div>
        {selectedOption === "finished" && (
          <div>
            <Info>한 달 내 종료된 청약 정보만 제공해요</Info>
            <ul>
              {finished.length !== 0 ? (
                finished.map((item) => (
                  <Card
                    status={selectedOption}
                    houseManageNo={item.houseManageNo}
                    pblancNo={item.pblancNo}
                    houseNm={item.houseNm}
                    hssplyAdres={item.hssplyAdres}
                    bsnsMbyNm={item.bsnsMbyNm}
                    houseSecdNm={item.houseSecdNm}
                    totSuplyHshldco={item.totSuplyHshldco}
                    rceptBgnde={item.rceptBgnde}
                    rceptEndde={item.rceptEndde}
                    przwnerPresnatnDe={item.przwnerPresnatnDe}
                    cntrctCnclsBgnde={item.cntrctCnclsBgnde}
                    cntrctCnclsEndde={item.cntrctCnclsEndde}
                    mvnPrearngeYm={item.mvnPrearngeYm}
                    mdhsTelno={item.mdhsTelno}
                    hmpgAdres={item.hmpgAdres}
                    subscrptAreaCodeNm={item.subscrptAreaCodeNm}
                    pblancUrl={item.pblancUrl}
                  />
                ))
              ) : (
                <Nothing status={selectedOption} />
              )}
            </ul>
          </div>
        )}
        {selectedOption === "ongoing" && (
          <ul>
            {ongoing.length !== 0 ? (
              ongoing.map((item) => (
                <Card
                  status={selectedOption}
                  houseManageNo={item.houseManageNo}
                  pblancNo={item.pblancNo}
                  houseNm={item.houseNm}
                  hssplyAdres={item.hssplyAdres}
                  bsnsMbyNm={item.bsnsMbyNm}
                  houseSecdNm={item.houseSecdNm}
                  totSuplyHshldco={item.totSuplyHshldco}
                  rceptBgnde={item.rceptBgnde}
                  rceptEndde={item.rceptEndde}
                  przwnerPresnatnDe={item.przwnerPresnatnDe}
                  cntrctCnclsBgnde={item.cntrctCnclsBgnde}
                  cntrctCnclsEndde={item.cntrctCnclsEndde}
                  mvnPrearngeYm={item.mvnPrearngeYm}
                  mdhsTelno={item.mdhsTelno}
                  hmpgAdres={item.hmpgAdres}
                  subscrptAreaCodeNm={item.subscrptAreaCodeNm}
                  pblancUrl={item.pblancUrl}
                />
              ))
            ) : (
              <Nothing status={selectedOption} />
            )}
          </ul>
        )}
        {selectedOption === "upcoming" && (
          <ul>
            {upcoming.length !== 0 ? (
              upcoming.map((item) => (
                <Card
                  status={selectedOption}
                  houseManageNo={item.houseManageNo}
                  pblancNo={item.pblancNo}
                  houseNm={item.houseNm}
                  hssplyAdres={item.hssplyAdres}
                  bsnsMbyNm={item.bsnsMbyNm}
                  houseSecdNm={item.houseSecdNm}
                  totSuplyHshldco={item.totSuplyHshldco}
                  rceptBgnde={item.rceptBgnde}
                  rceptEndde={item.rceptEndde}
                  przwnerPresnatnDe={item.przwnerPresnatnDe}
                  cntrctCnclsBgnde={item.cntrctCnclsBgnde}
                  cntrctCnclsEndde={item.cntrctCnclsEndde}
                  mvnPrearngeYm={item.mvnPrearngeYm}
                  mdhsTelno={item.mdhsTelno}
                  hmpgAdres={item.hmpgAdres}
                  subscrptAreaCodeNm={item.subscrptAreaCodeNm}
                  pblancUrl={item.pblancUrl}
                />
              ))
            ) : (
              <Nothing status={selectedOption} />
            )}
          </ul>
        )}
      </div>
    </SubscriptionContainer>
  );
};

export default Subscription;
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
