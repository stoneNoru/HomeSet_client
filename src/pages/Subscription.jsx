import React, { useState } from "react";
import styled from "styled-components";
import { CurrentSubscription, NewSubscription } from "../services/api";
import Card from "../components/Card";

const RadioGroup = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 24px;
  margin-top: 20px;
  margin-bottom: 30px;
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

const Subscription = () => {
  const [selectedOption, setSelectedOption] = useState("ongoing");
  const id = 4;

  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
  };

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
            <Card id={id} />
          </div>
        )}
        {selectedOption === "ongoing" && (
          <div>
            <Card id={id} />
            <Card id={id} />
          </div>
        )}
        {selectedOption === "upcoming" && (
          <div>
            <Card id={id} />
            <Card id={id} />
            <Card id={id} />
          </div>
        )}
      </div>
    </SubscriptionContainer>
  );
};

export default Subscription;
