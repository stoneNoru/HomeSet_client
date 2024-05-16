import React, { useEffect, useState } from "react";
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

const DetailModal = styled.div`
  width: 50%;
  background-color: gray;
  height: 90%;
  top: 5%;
  left: 0;
  right: 0;
  margin: auto;
  z-index: 3;
  position: fixed;
  background: rgba(0, 0, 0, 0.5);
  box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37);
  backdrop-filter: blur(9.5px);
  -webkit-backdrop-filter: blur(9.5px);
  border-radius: 10px;
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
  const [selected, setSelected] = useState(0); //클릭한 아파트의 id

  const ids = [1, 2, 3, 4, 5, 6, 7];

  //선택 아파트 변경시 실행, axios
  useEffect(() => {}, [selected]);

  return (
    <>
      {/* 0이면 안보임 */}
      {selected !== 0 ? (
        <DetailModal>
          <h2>부동산 상세 정보 - ID: {selected}</h2>
          <p>상세 정보 표시</p>
          <span onClick={() => setSelected(0)}>close</span>
        </DetailModal>
      ) : null}
      <Form>
        <Input placeholder="원하는 지역 입력" />
        <Submit type="submit">
          <FontAwesomeIcon icon={faMagnifyingGlass} />
        </Submit>
      </Form>

      <div style={{ color: "black" }}>
        {/* <Text>🚩 실거래 정보</Text> */}
        <Text style={{ color: "#F6F8FA" }} onClick={() => setSelected(0)}>
          🚩 실거래 정보
        </Text>
        <ul>
          {ids.map((id) => {
            return (
              <div
                key={id}
                onClick={() => {
                  setSelected(id);
                }}
              >
                <TxLi key={id} id={id} />
              </div>
            );
          })}

          {/* 추가적인 TxLi 컴포넌트 주석 처리 */}
        </ul>
      </div>
    </>
  );
};

export default Transactions;
