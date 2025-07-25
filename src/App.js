import React from "react";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from "./context/AuthContext";
import { UserProvider } from "./context/UserContext";
import { useNavigate } from "react-router-dom";
import Nav from "./component/Nav";
import Login from "./component/Login"
import Board from "./component/Board"
import Register from "./component/Register";
import './App.css';


function App() {
  const navigate = useNavigate();

  const handleHome = () => {
    navigate('/');
  };

  return (
    <div className="App">
      <header><h2 onClick={handleHome}>24BitClub</h2></header>
      <Nav />

      <main>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<Board />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </main>

      <footer />
    </div>
  );
}

export default App;
