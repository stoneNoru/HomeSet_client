import React, { useEffect, useState } from "react";
import styled from "styled-components";
import TxLi from "../components/TxLi";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMagnifyingGlass,
  faTimesCircle,
} from "@fortawesome/free-solid-svg-icons";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { houseState, markerState } from "../state/atoms";
import { fetchTxDatas } from "../services/api.js";
import Chart from "../components/Chart.jsx";
import { Map } from "react-kakao-maps-sdk";
import RoadView from "../components/RoadView.jsx";

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

const DetailModal = styled.div`
  box-sizing: border-box;
  padding: 30px;
  width: 1300px;
  height: 90%;
  top: 5%;
  left: 50%;
  transform: translateX(-50%);
  z-index: 3;
  position: fixed;
  background: rgba(0, 0, 0, 0.7);
  backdrop-filter: blur(9.5px);
  -webkit-backdrop-filter: blur(9.5px);
  border-radius: 20px;
  border: 1px solid rgba(255, 255, 255, 0.18);

  font-size: 30px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
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

const DetailName = styled.h1`
  font-size: 50px;
  margin-bottom: 20px;
`;

const DetailContent = styled.h4`
  font-size: 28px;
  font-weight: 500;
  margin-bottom: 15px;
`;

const TabWrap = styled.div`
  width: 100%;
  gap: 50px;
  height: 60%;
  /* height: 70%; */
  box-sizing: border-box;
  display: flex;
  justify-content: space-around;
  margin-top: auto;
`;

const ModalTab = styled.div`
  position: relative;
  width: 50%;
  padding: 15px;
  background-color: #3d3d3d;
  border-radius: 15px;
  box-sizing: border-box;
`;

const ModalTitle = styled.span`
  z-index: 3;
  position: absolute;
  top: 10px;
  left: 10px;
  padding: 5px 10px;
  border-radius: 10px;
  font-size: 20px;
  background-color: #f76969;
  margin-bottom: 50px;
`;

const Transactions = () => {
  const [selected, setSelected] = useState(null); // 선택된 아파트의 상세 정보를 저장
  const [txDatas, setTxDatas] = useState([]);
  const [prices, setPrices] = useState([]);
  const houses = useRecoilValue(houseState);
  const selectedMarker = useRecoilValue(markerState); //카카오맵에서 클릭한 마커 번호
  const setMarker = useSetRecoilState(markerState);

  const fetchData = async (selectedAptCode) => {
    try {
      const response = await fetchTxDatas(selectedAptCode);
      console.log("거래리스트", response.data.data);
      setTxDatas(response.data.data.reverse()); // 응답 데이터에서 실제 데이터를 설정
      console.log(response.data.data);
      const pricesArray = response.data.data.map(
        (houseData) => houseData.dealAmount
      );
      setPrices(pricesArray); // dealAmount 값을 한 번에 설정
    } catch (error) {
      console.error("데이터를 가져오는 중 오류 발생:", error);
    }
  };

  useEffect(() => {
    if (selectedMarker) {
      const selectedHouse = houses.find(
        (house) => house.aptCode === selectedMarker
      );
      setSelected(selectedHouse);
      console.log("selected", selectedHouse);
    }
  }, [selectedMarker, houses]);

  useEffect(() => {
    if (selected) {
      fetchData(selected.aptCode);
    }
  }, [selected]);
  //   {
  //     "no": 115002108000132,
  //     "dongCode": "1150010300",
  //     "dealAmount": "49,500",
  //     "dealYear": 2021,
  //     "dealMonth": 8,
  //     "dealDay": 14,
  //     "floor": "4",
  //     "area": "84.85",
  //     "apartmentName": "웰라이빌",
  //     "aptCode": "11500000000276",
  //     "lng": "126.842384319394",
  //     "lat": "37.5285659999317",
  //     "date": "2021-8-14"
  // }
  return (
    <>
      {selected && txDatas.length > 0 && (
        <BlackBg>
          <DetailModal>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <DetailName>{selected.apartmentName}</DetailName>
              <span
                onClick={() => {
                  setMarker(null);
                  setSelected(null);
                }}
              >
                <FontAwesomeIcon icon={faTimesCircle} />
              </span>
            </div>

            <div style={{ width: "50%" }}>
              <p>뭐넣지</p>
              <p>뭐넣지</p>
              <p>뭐넣지</p>

              {/* <DetailContent>{`마지막 거래일 : ${
                txDatas[txDatas.length - 1].dealYear
              }.${txDatas[txDatas.length - 1].dealMonth}.${
                txDatas[txDatas.length - 1].dealDay
              }`}</DetailContent> */}
            </div>

            <TabWrap>
              <ModalTab>
                <RoadView lat={selected.lat} lng={selected.lng} />
              </ModalTab>
              <ModalTab>
                <Chart txDatas={txDatas} />
              </ModalTab>
            </TabWrap>
          </DetailModal>
        </BlackBg>
      )}
      <Form>
        <Input placeholder="원하는 지역 입력" />
        <Submit type="submit">
          <FontAwesomeIcon icon={faMagnifyingGlass} />
        </Submit>
      </Form>

      <div style={{ color: "black" }}>
        <Text style={{ color: "#F6F8FA" }} onClick={() => setSelected(null)}>
          🚩 실거래 정보
        </Text>
        <ul>
          {houses.map((house, i) => (
            <div
              key={i}
              onClick={() => setSelected(house)} // 아파트 클릭 시 selected 상태가 변경됨
            >
              <TxLi
                no={house.no}
                dongCode={house.dongCode}
                dealAmount={house.dealAmount}
                dealYear={house.dealYear}
                dealMonth={house.dealMonth}
                dealDay={house.dealDay}
                floor={house.floor}
                area={house.area}
                apartmentName={house.apartmentName}
                aptCode={house.aptCode}
                lng={house.lng}
                lat={house.lat}
                date={house.date}
              />
            </div>
          ))}
        </ul>
      </div>
    </>
  );
};

export default Transactions;
