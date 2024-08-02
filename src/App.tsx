import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Header from "./components/Header";
import Tset from "./pages/Tset";
import { useSelector } from "react-redux";
import { RooteState } from "./store/Store";
import Login from "./pages/Login";
import Register from "./pages/Register";

const App = () => {
  const { user } = useSelector((state: RooteState) => state.user);
  return (
    <BrowserRouter>
      <Header />
      <ToastContainer />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/tset" element={user ? <Tset /> : <Login />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
