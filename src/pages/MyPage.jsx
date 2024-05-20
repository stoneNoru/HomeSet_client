import React from "react";

import { GetMyInfo, DeleteAccount } from "../services/api";

const MyPage = () => {
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
      <h1 style={{ fontSize: "30px", marginBottom: "30px" }}>내정보수정</h1>
      <h1
        style={{ fontSize: "30px", marginBottom: "30px" }}
        onClick={() => {
          DeleteAccount();
        }}
      >
        회원탈퇴
      </h1>
      <h1 style={{ fontSize: "30px", marginBottom: "30px" }}>찜목록</h1>
      <ul></ul>
    </div>
  );
};

export default MyPage;
