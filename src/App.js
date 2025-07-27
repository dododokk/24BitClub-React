import React, {useContext} from "react";
import { Routes, Route } from 'react-router-dom';
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { AuthContext } from "./context/AuthContext";
import Nav from "./component/Nav";
import Login from "./component/Login"
import Board from "./component/Board"
import Register from "./component/Register";
import MyPage from "./component/MyPage";
import './App.css';


function App() {
  const navigate = useNavigate();
  const location = useLocation();
  const { isLoggedIn } = useContext(AuthContext);

  const handleHome = () => {
    navigate('/');
  };

  return (
    <div className="App">
      <header><h2 onClick={handleHome}>24BitClub</h2></header>
      <Nav />

      <main className={location.pathname==="/login" || location.pathname==="/register"
        ? "center" : "no-center"}>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<Board />} />
          <Route path="/register" element={<Register />} />
          <Route path="/mypage" element={isLoggedIn ? <MyPage /> : <Board />} />
        </Routes>
      </main>

      <footer />
    </div>
  );
}

export default App;
