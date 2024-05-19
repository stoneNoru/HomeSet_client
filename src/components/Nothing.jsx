import React from "react";
import styled from "styled-components";

const Wrap = styled.div`
  width: 100%;
  height: 200px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Text = styled.h4`
  font-size: 20px;
  color: #91919c;
`;

const Nothing = ({ status }) => {
  if (status === "ongoing") {
    status = "진행 중인 ";
  } else if (status === "finished") {
    status = "최근 종료된 ";
  } else if (status === "upcoming") {
    status = "한 달 내 진행 예정인 ";
  }
  return (
    <Wrap>
      <Text>{status}청약이 없어요</Text>
    </Wrap>
  );
};

export default Nothing;
