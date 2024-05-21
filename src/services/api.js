import axios from "axios";

// const BASE_URL = "http://localhost:8080";
const BASE_URL = "http://192.168.206.66:8080";
//const BASE_URL = "http://183.107.121.150:8080";

// 183.107.121.150
// 192.168.206.66

const LoginPost = async (id, password) => {
  try {
    const response = await axios.post(`${BASE_URL}/users/login`, {
      id: id,
      password: password,
    });
    console.log(response.data.data);
    const accessToken = response.data.data["access-token"];
    localStorage.setItem("accessToken", accessToken);
    return response;
  } catch (error) {
    console.log(error);
  }
};

const FindPassword = async (id, email) => {
  try {
    const response = await axios.post(`${BASE_URL}/users/find-password`, {
      id: id,
      email: email,
    });
    console.log(response.data);
  } catch (error) {
    console.log(error);
  }
};

const LogOutAPI = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/users/logout`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
    });
    console.log(response);
    localStorage.removeItem("accessToken");
  } catch (error) {
    console.error(error);
  }
};

//마이페이지
const GetMyInfo = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/users`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
    });
    console.log(response.data.data);
    return response.data.data;
  } catch (error) {
    console.log(error);
  }
};

const DeleteAccount = () => {
  try {
    const response = axios.delete(`${BASE_URL}/users`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
    });
    console.log(response.data.message);
    localStorage.removeItem("accessToken");
  } catch (error) {
    console.log(error);
  }
};

const CheckDuplicated = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/users/check?id=ssafy`);
    console.log(response);
    return response;
  } catch (error) {
    console.log(error);
  }
};

const GetUserData = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/users`);
    console.log(response);
    return response;
  } catch (error) {
    console.log(error);
  }
};

const SignUpAPI = async (id, password, email, nickname) => {
  try {
    const response = await axios.post(`${BASE_URL}/users`, {
      id: id,
      password: password,
      email: email,
      nickname: nickname,
    });
    console.log(response);
    return response;
  } catch (error) {
    console.log(error);
  }
};

const ModifyUserData = async (id, email, nickname, password) => {
  try {
    const response = await axios.put(
      `${BASE_URL}/users`,
      {
        id: id,
        email: email,
        nickname: nickname,
        password: password,
      },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      }
    );
    console.log(response);
    return response;
  } catch (error) {
    console.log(error);
  }
};

//청약정보
const CurrentSubscription = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/applies/current`);
    console.log("ongoing", response.data.data);
    return response.data.data;
  } catch (error) {
    console.log(error);
  }
};

const NewSubscription = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/applies/new`);
    console.log("upcoming", response.data.data);
    return response.data.data;
  } catch (error) {
    console.log(error);
  }
};

const FinishedSubscription = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/applies/end`);
    console.log("finished", response);
    return response.data.data;
  } catch (error) {
    console.log(error);
  }
};

/*실거래정보*/
const KeywordTxSearch = async (keyword) => {
  try {
    const response = await axios.get(`${BASE_URL}/home?keyword=${keyword}`);

    console.log("검색", response.data.data);
    // return response.data.data;
  } catch (error) {
    console.log(error);
  }
};

//특정 아파트 거래정보
const fetchTxDatas = async (aptCode) => {
  try {
    const response = await axios.get(`${BASE_URL}/home/${aptCode}`);
    // console.log(response.data.data);
    return response;
  } catch (error) {
    console.log(error);
  }
};

//공지사항
const GetNotice = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/notices`);
    console.log(response.data.data);
    return response.data.data;
  } catch (error) {
    console.log(error);
  }
};

/* 청약 리뷰 */
//리뷰 작성
const RegistReview = async (houseManageNo, content) => {
  try {
    const response = await axios.post(
      `${BASE_URL}/reviews`,
      {
        houseManageNo: houseManageNo,
        content: content,
      },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      }
    );
    console.log(response.data.data);

    return response.data.data;
  } catch (error) {
    console.log(error);
  }
};
//리뷰 조회
const GetReview = async (houseManageNo) => {
  try {
    const response = await axios.get(`${BASE_URL}/reviews/${houseManageNo}`);
    console.log(response.data.data);

    return response.data.data;
  } catch (error) {
    console.log(error);
  }
};
//리뷰 삭제
const DeleteReview = async (houseManageNo) => {
  try {
    const response = await axios.delete(`${BASE_URL}/reviews/${houseManageNo}`);
    console.log(response.data.data);

    return response.data.data;
  } catch (error) {
    console.log(error);
  }
};

/* 청약 북마크 */
//북마크 저장
const RegistSubBookmark = async (houseManageNo) => {
  try {
    const response = await axios.post(
      `${BASE_URL}/applies/bookmarks`,
      {
        houseManageNo: houseManageNo,
      },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      }
    );
    console.log(response.data.data);

    return response.data.data;
  } catch (error) {
    console.log(error);
  }
};

//내 북마크 조회
const GetSubBookmark = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/applies/bookmarks`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
    });
    console.log(response.data.data);

    return response.data.data;
  } catch (error) {
    console.log(error);
  }
};
//북마크 삭제
const DeleteSubBookmark = async (houseManageNo) => {
  try {
    const response = await axios.delete(`${BASE_URL}/applies/bookmarks/${houseManageNo}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
    });
    console.log(response.data.data);

    return response.data.data;
  } catch (error) {
    console.log(error);
  }
};

/* 아파트 북마크 */

//실거래가 찜하기
const RegistAPTBookmark = async (aptCode) => {
  try {
    const response = await axios.post(
      `${BASE_URL}/home/bookmarks`,
      {
        aptCode: aptCode,
      },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      }
    );
    console.log(response.data.data);

    return response.data.data;
  } catch (error) {
    console.log(error);
  }
};

//찜한 실거래가 리스트 확인
const GetAPTBookmark = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/home/bookmarks`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
    });
    console.log(response.data.data);

    return response.data.data;
  } catch (error) {
    console.log(error);
  }
};

//북마크 삭제
const DeleteAPTBookmark = async (aptCode) => {
  try {
    const response = await axios.delete(`${BASE_URL}/home/bookmarks/${aptCode}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
    });
    console.log(response.data.data);

    return response.data.data;
  } catch (error) {
    console.log(error);
  }
};

//특정 아파트 찜했는지 확인
const GetPersonAPTBookmark = async (aptCode) => {
  try {
    const response = await axios.get(`${BASE_URL}/home/bookmarks/${aptCode}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
    });
    console.log(response.data.data);
    return response.data.data;
  } catch (error) {
    console.log(error);
  }
};

const GetPersonSubBookmark = async (houseManageNo) => {
  try {
    const response = await axios.get(`${BASE_URL}/applies/bookmarks/${houseManageNo}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
    });
    console.log(response.data.data);

    return response.data.data;
  } catch (error) {
    console.log(error);
  }
};

export {
  GetPersonAPTBookmark,
  GetPersonSubBookmark,
  //아파트 북마크
  RegistAPTBookmark,
  GetAPTBookmark,
  DeleteAPTBookmark,
  //청약 북마크
  RegistSubBookmark,
  GetSubBookmark,
  DeleteSubBookmark,
  //리뷰
  RegistReview,
  GetReview,
  DeleteReview,
  GetNotice,
  LogOutAPI,
  SignUpAPI,
  GetMyInfo,
  DeleteAccount,
  LoginPost,
  CheckDuplicated,
  FindPassword,
  GetUserData,
  CurrentSubscription,
  NewSubscription,
  KeywordTxSearch,
  fetchTxDatas,
  FinishedSubscription,
  ModifyUserData,
};
