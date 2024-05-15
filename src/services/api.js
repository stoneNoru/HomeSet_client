const BASE_URL = "http://localhost:8080";

export function fetchData() {
  return fetch("").then((response) => response.json());
}

const LoginPost = (id, password) => {
  axios
    .post(`${BASE_URL}/users/login`, {
      id: id,
      password: password,
    })
    .then((response) => console.log(response.data))
    .catch((error) => {
      console.log(error);
    });
};

const CheckDuplicated = () => {
  axios
    .get(`${BASE_URL}/users/check?id=ssafy`)
    .then((response) => {
      console.log(response.data);
    })
    .catch((error) => {
      console.log(error);
    });
};

const GetUserData = () => {
  axios
    .get(`${BASE_URL}/users`)
    .then((response) => console.log(response.data))
    .catch((error) => console.log(error));
};

const SignUp = (id, password, email, nickname) => {
  axios.post(`${BASE_URL}/users`, {
    id: id,
    password: password,
    email: email,
    nickname: nickname,
  });
};

//청약정보
const CurrentSubscription = () => {
  axios
    .get(`${BASE_URL}/applies/current`)
    .then((response) => console.log(response.data))
    .catch((error) => console.log(error));
};

const NewSubscription = () => {
  axios
    .get(`${BASE_URL}/applies/new`)
    .then((response) => console.log(response))
    .catch((error) => console.log(error));
};

export {
  LoginPost,
  CheckDuplicated,
  GetUserData,
  SignUp,
  CurrentSubscription,
  NewSubscription,
};
