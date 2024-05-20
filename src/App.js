import { Route, Routes } from "react-router-dom";
import "./styles/App.css";
import Home from "./pages/Home";
import Onboarding from "./pages/Onboarding";
import MyPage from "./pages/MyPage";
import Error from "./pages/Error";
import Transactions from "./pages/Transactions";
import Subscription from "./pages/Subscription";
import TxDetail from "./components/TxDetail";
import SubsDetail from "./components/SubsDetail";
import SignUp from "./pages/SignUp";
import { RecoilRoot, atom, selector, useRecoilState, useRecoilValue } from "recoil";
import Login from "./pages/Login";
import FindPw from "./pages/FindPw";

function App() {
  return (
    <div className="App">
      <RecoilRoot>
        <Routes>
          <Route path="/" element={<Onboarding />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/findpw" element={<FindPw />} />
          <Route path="/mypage" element={<MyPage />} />
          <Route path="/home" element={<Home />}>
            <Route path="transactions" element={<Transactions />} />
            <Route path="subscription" element={<Subscription />} />
          </Route>
          <Route path="*" element={<Error />} />
        </Routes>
      </RecoilRoot>
    </div>
  );
}

export default App;
