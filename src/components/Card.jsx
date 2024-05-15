import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const CardContainer = styled.div`
  display: flex;
  flex-direction: column;
  isolation: isolate;
  position: relative;
  width: 100%;
  height: 120px;
  background: #18181b;
  border-radius: 1rem;
  margin-bottom: 10px;
  overflow: hidden;
  font-family: "Gill Sans", "Gill Sans MT", Calibri, "Trebuchet MS", sans-serif;
  font-size: 16px;
  --gradient: linear-gradient(to bottom, #ff0000, #ff943d, #9861ff);
  --color: #ff9898;

  &:before {
    position: absolute;
    content: "";
    inset: 0.0625rem;
    border-radius: 0.9375rem;
    background: #18181b;
    z-index: 2;
  }

  &:after {
    position: absolute;
    content: "";
    width: 0.25rem;
    inset: 0.65rem auto 0.65rem 0.5rem;
    border-radius: 0.125rem;
    background: var(--gradient);
    transition: transform 300ms ease;
    z-index: 4;
  }

  &:hover:after {
    transform: translateX(0.15rem);
  }

  &:hover .title {
    transform: translateX(0.15rem);
  }

  &:hover .body {
    transform: translateX(0.15rem);
  }

  &:hover .glow {
    opacity: 0.1;
  }

  &:hover .borderGlow {
    opacity: 0.1;
  }
`;

const Glow = styled.div`
  position: absolute;
  width: 20rem;
  height: 20rem;
  transform: translate(-50%, -50%);
  background: radial-gradient(
    circle closest-side at center,
    white,
    transparent
  );
  opacity: 0;
  transition: opacity 300ms ease;
  z-index: 3;
`;

const BorderGlow = styled.div`
  position: absolute;
  width: 20rem;
  height: 20rem;
  transform: translate(-50%, -50%);
  background: radial-gradient(
    circle closest-side at center,
    white,
    transparent
  );
  opacity: 0;
  transition: opacity 300ms ease;
  z-index: 1;
`;

const Title = styled.div`
  margin-bottom: 10px;
  color: var(--color);
  padding: 0.65rem 0.25rem 0.4rem 1.25rem;
  font-weight: 500;
  font-size: 1.1rem;
  transition: transform 300ms ease;
  z-index: 5;
`;

const Body = styled.div`
  color: #99999d;
  padding: 0 1.25rem;
  transition: transform 300ms ease;
  z-index: 5;
`;

const Card = ({ id }) => {
  return (
    <Link to={`${id}`}>
      <CardContainer>
        <Glow className="glow"></Glow>
        <BorderGlow className="borderGlow"></BorderGlow>
        <Title className="title">무슨무슨 아파트</Title>
        <Body className="body">지역</Body>
      </CardContainer>
    </Link>
  );
};

export default Card;
