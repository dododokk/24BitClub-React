import React from "react";
import { BrowserRouter, Routes, Route} from 'react-router-dom';
import { AuthProvider } from "./context/AuthContext";
import Nav from "./component/Nav";
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <div className="App">
        <header><h2>24BitClub</h2></header>
        <Nav />
        <footer />
        </div>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
