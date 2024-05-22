import React, { useState, useRef, useEffect } from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown, faChevronUp, faStar as faStarSolid } from "@fortawesome/free-solid-svg-icons";
import { faStar as faStarRegular } from "@fortawesome/free-regular-svg-icons";
import { DeleteReview, DeleteSubBookmark, GetReview, RegistSubBookmark } from "../services/api";

const Tab = styled.li`
  position: relative;
  width: 100%;
  padding: 12px 16px;
  background-color: #1c1c26;
  box-sizing: border-box;
  box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.1);
  border-radius: 10px;
  color: black;
  margin-bottom: 12px;
  transition: all 0.3s;
  cursor: pointer;
`;

const Name = styled.h1`
  width: 70%;
  font-size: 18px;
  margin-bottom: 10px;
  color: #f0e2e2;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const Address = styled.h1`
  font-size: 14px;
  color: #978a8a;
  overflow: hidden;
`;

const Status = styled.span`
  position: absolute;
  top: 12px;
  right: 16px;
  font-size: 12px;
  padding: 2px 4px;
  color: white;
  background-color: #cf2d2d;
  border-radius: 5px;
`;

const DetailWrap = styled.div`
  height: ${(props) => (props.clicked ? `${props.scrollHeight}px` : "0")};
  overflow: hidden;
  transition: height 0.3s ease-in-out;
`;

const Chevron = styled.i`
  color: gray;
  position: absolute;
  bottom: 12px;
  right: 16px;
`;

const ToInfo = styled.a`
  padding: 5px 5px;
  background-color: #5f5f5f;
  border-radius: 5px;
  transition: all 0.3s;

  &:hover {
    background-color: #cf2d2d;
  }
`;

const ToWrap = styled.div`
  width: 100%;
  display: flex;
  gap: 16px;
  margin-top: 10px;
  align-items: center;
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;

  th,
  td {
    padding: 6px;
    text-align: left;
    color: #f0e2e2;
  }

  th {
    font-size: 14px;
    color: #fff;
  }

  td {
    font-size: 14px;
    color: #ccc;
  }
`;

const ReviewLists = styled.div`
  width: 100%;
  background-color: #1e1e1e;
  border-radius: 10px;
  padding: 16px;
  box-sizing: border-box;
`;

const Review = styled.div`
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.5);
  margin-bottom: 20px;
`;

const ReviewWriter = styled.h4`
  font-size: 16px;
  font-weight: 300;
  margin-bottom: 10px;
  color: #c2c2c2;
`;

const ReviewContent = styled.p`
  font-size: 14px;
`;

const ReviewDelete = styled.button`
  background-color: #333;
  color: white;
  text-decoration: none;
  padding: 10px;
  font-size: 14px;
  cursor: pointer;
  border-radius: 5px;
  margin-top: 10px;
  display: inline-block;
  transition: background-color 0.3s;
  white-space: nowrap;
  &:hover {
    background-color: #b1252c;
  }
`;

const Card = ({
  status,
  houseManageNo,
  pblancNo,
  houseNm,
  hssplyAdres,
  bsnsMbyNm,
  houseSecdNm,
  totSuplyHshldco,
  rceptBgnde,
  rceptEndde,
  przwnerPresnatnDe,
  cntrctCnclsBgnde,
  cntrctCnclsEndde,
  mvnPrearngeYm,
  mdhsTelno,
  hmpgAdres,
  subscrptAreaCodeNm,
  pblancUrl,
  bookmark,
}) => {
  if (status === "upcoming") {
    status = rceptBgnde ? rceptBgnde.replace(/-/g, ".").slice(2) + " 시작" : "정보 없음";
  } else if (status === "ongoing") {
    status = rceptEndde ? rceptEndde.replace(/-/g, ".").slice(2) + " 종료" : "정보 없음";
  } else if (status === "finished") {
    status = "종료";
  }

  const [clicked, setClicked] = useState(false);
  const [star, setStar] = useState(bookmark);
  const [reviews, setReviews] = useState([]);
  const [reviewClicked, setReviewClicked] = useState(false);

  const detailRef = useRef(null);

  useEffect(() => {
    if (clicked) {
      fetchReviews();
    }
  }, [clicked]);

  //To Do : scrollHeight조정
  // useEffect(() => {
  //   if (clicked) {
  //     detailRef.current.style.height = `${detailRef.current.scrollHeight}px`;
  //   } else {
  //     detailRef.current.style.height = "0";
  //   }
  // }, [clicked]);

  const fetchReviews = async () => {
    try {
      const response = await GetReview(houseManageNo);
      console.log("리뷰 목록:", response);
      setReviews(response);
    } catch (error) {
      console.log("리뷰 리스트 가져오는 중 에러", error);
    }
  };

  const handleToggleClick = () => {
    setClicked(!clicked);
  };

  return (
    <Tab>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <Name>{houseNm}</Name>
        <Status>{status}</Status>
      </div>

      <div style={{ display: "flex", justifyContent: "space-between", textAlign: "center" }}>
        <Address>{hssplyAdres}</Address>
      </div>
      <DetailWrap ref={detailRef} clicked={clicked}>
        <Table>
          <tbody>
            <tr>
              <th>주택 종류</th>
              <td>{houseSecdNm}</td>
            </tr>
            <tr>
              <th>사업 주체</th>
              <td>{bsnsMbyNm}</td>
            </tr>
            <tr>
              <th>공급 세대수</th>
              <td>{totSuplyHshldco}</td>
            </tr>
            <tr>
              <th>접수일</th>
              <td>
                {rceptBgnde ? rceptBgnde.replace(/-/g, ".").slice(2) : "정보 없음"} ~ {rceptEndde ? rceptEndde.replace(/-/g, ".").slice(2) : "정보 없음"}
              </td>
            </tr>
            <tr>
              <th>당첨자 발표일</th>
              <td>{przwnerPresnatnDe ? przwnerPresnatnDe.replace(/-/g, ".").slice(2) : "정보 없음"}</td>
            </tr>
            <tr>
              <th>계약일</th>
              <td>
                {cntrctCnclsBgnde ? cntrctCnclsBgnde.replace(/-/g, ".").slice(2) : "정보 없음"} ~ {cntrctCnclsEndde ? cntrctCnclsEndde.replace(/-/g, ".").slice(2) : "정보 없음"}
              </td>
            </tr>
            <tr>
              <th>모델하우스 전화번호</th>
              <td>{mdhsTelno}</td>
            </tr>
          </tbody>
        </Table>
        <ToWrap>
          <ToInfo href={hmpgAdres} target="_blank" rel="noopener noreferrer">
            홈페이지
          </ToInfo>
          <ToInfo href={pblancUrl} target="_blank" rel="noopener noreferrer">
            공고
          </ToInfo>
          <p
            onClick={() => {
              setReviewClicked(!reviewClicked);
            }}
          >
            댓글 ({reviews.length})
          </p>

          {star === 0 ? (
            <FontAwesomeIcon
              icon={faStarRegular}
              onClick={async () => {
                await RegistSubBookmark(houseManageNo);
                setStar(1);
              }}
            />
          ) : (
            <FontAwesomeIcon
              style={{ color: "yellow" }}
              icon={faStarSolid}
              onClick={async () => {
                await DeleteSubBookmark(houseManageNo);
                setStar(0);
              }}
            />
          )}
        </ToWrap>
        {reviewClicked ? (
          <ReviewLists>
            {reviews.map((review, i) => (
              <Review key={i}>
                <ReviewWriter>{review.nickname}</ReviewWriter>
                <ReviewContent>{review.content}</ReviewContent>
                {review.isMyReview ? <ReviewDelete onClick={() => DeleteReview(review.id)}>삭제</ReviewDelete> : null}
              </Review>
            ))}
          </ReviewLists>
        ) : null}
      </DetailWrap>
      <Chevron>
        <FontAwesomeIcon icon={clicked ? faChevronUp : faChevronDown} onClick={handleToggleClick} />
      </Chevron>
    </Tab>
  );
};

export default Card;
