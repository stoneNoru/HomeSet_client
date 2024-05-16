import axios from "axios";

const BASE_URL = "http://localhost:8080";
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
    console.log(response);
  } catch (error) {
    console.log(error);
  }
};

const NewSubscription = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/applies/new`);
    console.log(response);
  } catch (error) {
    console.log(error);
  }
};

export { LoginPost, CheckDuplicated, GetUserData, SignUp, CurrentSubscription, NewSubscription };
