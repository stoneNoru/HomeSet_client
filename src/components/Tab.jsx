import React from "react";
import styled from "styled-components";

const Wrap = styled.div`
  border: 1px solid white;
  border-radius: 15px;
  width: 40vw;
  height: 20vh;
  padding: 20px;
  box-sizing: border-box;
`;

const Transparent = styled.div`
  background: rgba(255, 255, 255, 0.25);
  box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37);
  backdrop-filter: blur(4px);
  -webkit-backdrop-filter: blur(4px);
  border-radius: 10px;
  border: 1px solid rgba(255, 255, 255, 0.18);
`;

const Content = styled.p`
  text-overflow: ellipsis;
`;

const Pic = styled.img``;

const Title = styled.h1`
  font-size: 24px;
`;

const Tab = ({ title, content }) => {
  return (
    <Wrap>
      <Title>{title}</Title>
      <Content>{content}</Content>
      <Pic></Pic>
    </Wrap>
  );
};

export default Tab;
