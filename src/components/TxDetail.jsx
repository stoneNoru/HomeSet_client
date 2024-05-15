import React from "react";
import styled from "styled-components";
import { useParams } from "react-router-dom";

const DetailContainer = styled.div`
  background-color: white;
  padding: 20px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  border-radius: 10px;
  margin: 20px 0;
`;

const TxDetail = () => {
  const { id } = useParams();
  return (
    <DetailContainer>
      <h2>부동산 상세 정보 - ID: {id}</h2>
      <p>여기에 부동산에 대한 상세 정보를 표시합니다.</p>
    </DetailContainer>
  );
};

export default TxDetail;
