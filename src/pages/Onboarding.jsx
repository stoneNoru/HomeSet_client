import React from "react";
import Tab from "../components/Tab";
import styled from "styled-components";

const Wrap = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
`;

const Title = styled.h1`
  font-size: 50px;
  font-weight: 600;
  padding: 50px;
`;

const Onboarding = () => {
  return (
    <Wrap>
      <Title>Title</Title>
      <Tab title={"금요일"} content={"집가자"} />
    </Wrap>
  );
};

export default Onboarding;
