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

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Onboarding />} />
        <Route path="/home" element={<Home />}>
          <Route path="transactions" element={<Transactions />} />
          <Route path="transactions/:id" element={<TxDetail />} />
          <Route path="subscription" element={<Subscription />} />
          <Route path="transactions/:id" element={<SubsDetail />} />
        </Route>
        <Route path="/mypage" element={<MyPage />} />
        <Route path="*" element={<Error />} />
      </Routes>
    </div>
  );
}

export default App;
