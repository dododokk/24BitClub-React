import React from "react";
import { BrowserRouter, Routes, Route} from 'react-router-dom';
import { AuthProvider } from "./context/AuthContext";
import {UserProvider} from "./context/UserContext";
import Nav from "./component/Nav";
import Login from "./component/Login"
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <UserProvider>
          <div className="App">
          <header><h2>24BitClub</h2></header>
          <Nav />
          
          <main>
            <Routes>
             <Route path="/login" element={<Login />}/>
            </Routes>
          </main>

          <footer />
          </div>
        </UserProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
