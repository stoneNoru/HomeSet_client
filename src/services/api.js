import axios from "axios";

// const BASE_URL = "http://localhost:8080";
const BASE_URL = "http://192.168.206.66:8080";
// const BASE_URL = "http://183.107.121.150:8080";

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

export {
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
};
