import React, { useEffect, useState } from "react";
import { useNavigate, Outlet } from "react-router-dom";
import { GetMyInfo, DeleteAccount } from "../services/api";

const MyPage = () => {
  const [myData, setMyData] = useState({});
  const navigate = useNavigate();

  // 사용자 정보 조회
  useEffect(() => {
    const fetchMyInfo = async () => {
      try {
        const response = await GetMyInfo();
        setMyData(response);
        console.log("myData", response);
      } catch (error) {
        console.error("Failed to fetch my info:", error);
      }
    };

    fetchMyInfo();
  }, []);

  return (
    <div>
      <h1
        style={{ fontSize: "30px", marginBottom: "30px" }}
        onClick={() => {
          GetMyInfo();
        }}
      >
        내정보조회
      </h1>
      <h1
        style={{ fontSize: "30px", marginBottom: "30px" }}
        onClick={() => {
          navigate("/fix", { state: { myData } });
        }}
      >
        내정보수정
      </h1>
      <h1
        style={{ fontSize: "30px", marginBottom: "30px" }}
        onClick={() => {
          DeleteAccount();
        }}
      >
        회원탈퇴
      </h1>
      <h1 style={{ fontSize: "30px", marginBottom: "30px" }}>찜목록</h1>
      {myData && (
        <div>
          <p>ID: {myData.id}</p>
          <p>Email: {myData.email}</p>
          <p>Nickname: {myData.nickname}</p>
        </div>
      )}
      <ul></ul>
      <Outlet />
    </div>
  );
};

export default MyPage;
