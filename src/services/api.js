import axios from "axios";

// const BASE_URL = "http://localhost:8080";
// const BASE_URL = "http://192.168.206.66:8080";
const BASE_URL = "http://183.107.121.150:8080";

// 183.107.121.150
// 192.168.206.66

const LoginPost = async (id, password) => {
  try {
    const response = await axios.post(`${BASE_URL}/users/login`, {
      id: id,
      password: password,
    });
    console.log(response.data);
  } catch (error) {
    console.log(error);
  }
};

const CheckDuplicated = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/users/check?id=ssafy`);
    console.log(response);
  } catch (error) {
    console.log(error);
  }
};

const GetUserData = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/users`);
    console.log(response);
  } catch (error) {
    console.log(error);
  }
};

const SignUp = async (id, password, email, nickname) => {
  try {
    const response = await axios.post(`${BASE_URL}/users`, {
      id: id,
      password: password,
      email: email,
      nickname: nickname,
    });
    console.log(response);
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
    const response = await axios.post(`${BASE_URL}/home`, null, {
      params: {
        keyword: keyword,
      },
    });

    // console.log(response);
    return response.data.data;
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
  LoginPost,
  CheckDuplicated,
  GetUserData,
  SignUp,
  CurrentSubscription,
  NewSubscription,
  KeywordTxSearch,
  fetchTxDatas,
  FinishedSubscription,
};
