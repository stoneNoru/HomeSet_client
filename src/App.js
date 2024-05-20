import { Route, Routes } from "react-router-dom";
import "./styles/App.css";
import Home from "./pages/Home";
import Onboarding from "./pages/Onboarding";
import MyPage from "./pages/MyPage";
import Error from "./pages/Error";
import Transactions from "./pages/Transactions";
import Subscription from "./pages/Subscription";
import SignUp from "./pages/SignUp";
import Login from "./pages/Login";
import FindPw from "./pages/FindPw";
import FixUserData from "./pages/FixUserData";
import PrivateRoute from "./auth/PrivateRoute";
import { RecoilRoot } from "recoil";

function App() {
  return (
    <div className="App">
      <RecoilRoot>
        <Routes>
          <Route path="/" element={<Onboarding />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/findpw" element={<FindPw />} />
          <Route
            path="/mypage"
            element={
              <PrivateRoute>
                <MyPage />
              </PrivateRoute>
            }
          />
          <Route
            path="/fix"
            element={
              <PrivateRoute>
                <FixUserData />
              </PrivateRoute>
            }
          />
          <Route path="/home" element={<Home />}>
            <Route
              path="transactions"
              element={
                <PrivateRoute>
                  <Transactions />
                </PrivateRoute>
              }
            />
            <Route
              path="subscription"
              element={
                <PrivateRoute>
                  <Subscription />
                </PrivateRoute>
              }
            />
          </Route>
          <Route path="*" element={<Error />} />
        </Routes>
      </RecoilRoot>
    </div>
  );
}

export default App;
