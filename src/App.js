import { Route, Routes } from "react-router-dom";
import "./styles/App.css";
import Home from "./pages/Home";
import Onboarding from "./pages/Onboarding";
import MyPage from "./pages/MyPage";
import Error from "./pages/Error";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Onboarding />} />
        <Route path="/home" element={<Home />} />
        <Route path="/mypage" element={<MyPage />} />
        <Route path="*" element={<Error />} />
      </Routes>
    </div>
  );
}

export default App;
