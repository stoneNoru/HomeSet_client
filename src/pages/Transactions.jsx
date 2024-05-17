import React, { useEffect, useState } from "react";
import styled from "styled-components";
import TxLi from "../components/TxLi";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { useRecoilValue } from "recoil";
import { houseState } from "../state/atoms";
import { Roadview } from "react-kakao-maps-sdk";
import { fetchTxDatas } from "../services/api.js";
import Chart from "../components/Chart.jsx";

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
  left: 500px;
  z-index: 3;
  position: fixed;
  background: rgba(0, 0, 0, 0.7);
  backdrop-filter: blur(9.5px);
  -webkit-backdrop-filter: blur(9.5px);
  border-radius: 20px;
  border: 1px solid rgba(255, 255, 255, 0.18);

  font-size: 30px;
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

const Transactions = () => {
  const [selected, setSelected] = useState(null); // 선택된 아파트의 상세 정보를 저장
  const [txDatas, setTxDatas] = useState([]);
  const [prices, setPrices] = useState([]);
  const houses = useRecoilValue(houseState);

  const fetchData = async (selectedAptCode) => {
    try {
      const response = await fetchTxDatas(selectedAptCode);
      console.log("거래리스트", response.data.data);
      setTxDatas(response.data.data.reverse()); // 응답 데이터에서 실제 데이터를 설정

      const pricesArray = response.data.data.map((houseData) => houseData.dealAmount);
      setPrices(pricesArray); // dealAmount 값을 한 번에 설정
    } catch (error) {
      console.error("데이터를 가져오는 중 오류 발생:", error);
    }
  };
  console.log(prices);

  useEffect(() => {
    if (selected) {
      fetchData(selected.aptCode);
    }
  }, [selected]);

  return (
    <>
      {selected && (
        <BlackBg>
          <DetailModal>
            <h2>부동산 상세 정보 - {selected.apartmentName}</h2>
            <p>상세 정보 표시</p>
            <span onClick={() => setSelected(null)}>close</span>
            <Chart txDatas={txDatas} />
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
