// Nav.js
import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { UserContext } from '../context/UserContext';
import styles from "../style/Nav.module.css";

function Nav() {
  const navigate = useNavigate();
  const { isLoggedIn, setIsLoggedIn } = useContext(AuthContext);
  const { setUserId, setUserPw } = useContext(UserContext);

  const handleLogin = () => {
    navigate('/login');
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    setUserId("");
    setUserPw("");
    navigate('/');
  };

  const handleMyPage = () => {
    navigate('/mypage');
  };

  const handleRegister = () => {
    navigate('/register');
  };

  return (
    <nav>
      {isLoggedIn ? (
        <>
          <button onClick={handleLogout}>로그아웃</button>
          <button onClick={handleMyPage}>마이페이지</button>
        </>
      ) : (
        <>
          <button onClick={handleLogin}>로그인</button>
          <button onClick={handleRegister}>회원가입</button>
        </>
      )}
    </nav>
  );
}

export default Nav;