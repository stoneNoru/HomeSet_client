import React from "react";
import styled from "styled-components";

const Wrap = styled.div`
  flex: 1;
  min-width: 100%; /* Notice가 한 번에 하나만 보이도록 설정 */
  border-radius: 8px;
  background-color: #202020;
  margin-bottom: 20px;
  border: 3px solid black;
  box-sizing: border-box;
  /* margin-left: 20px; */
`;

const Color = styled.div`
  background-color: #cf392e;
  /* background-color: #e50914; */
  border-top-right-radius: 8px;
  border-top-left-radius: 8px;
  padding: 5px 0px;
  padding-left: 16px;
`;

const ContentWrap = styled.div`
  padding: 16px;
`;

const Version = styled.h4`
  font-size: 16px;
  font-weight: 300;
`;

const Content = styled.p`
  font-size: 16px;
  line-height: 20px;
  color: #b3abab;
`;

const Notice = ({ version, content }) => {
  return (
    <Wrap>
      <Color>
        <Version>{version}</Version>
      </Color>
      <ContentWrap>
        <Content>{content}</Content>
      </ContentWrap>
    </Wrap>
  );
};

export default Notice;
