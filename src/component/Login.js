import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../context/UserContext";
import { AuthContext } from "../context/AuthContext";
import styles from "../style/Login.module.css";

function Input(props) {
    return (
        <div className={styles.inputdiv}>
            <p className={styles['input-p']}>{props.title}</p>
            <input className={styles.input} type={props.type} value={props.value} onChange={props.onChange} />
        </div>
    );
}

function Login() {
    const { setUserId, setUserPw } = useContext(UserContext);
    const { isLoggedIn, setIsLoggedIn } = useContext(AuthContext);
    const [inputId, setInputId] = useState("");
    const [inputPw, setInputPw] = useState("");
    const navigate = useNavigate();

    const handleIdChange = (e) => setInputId(e.target.value);
    const handlePwChange = (e) => setInputPw(e.target.value);

    const handleLogin = () => {
        if (inputId && inputPw) {
            setUserId(inputId);
            setInputPw(inputPw);
            setIsLoggedIn(true);
            navigate('/');
            //나중에 서버에 전송
        }
    }

    const handleRegis = () => {
        navigate('/register');
    };

    return (
        <div className={styles.login}>
            <h2 className={styles.h2}>로그인</h2>
            <Input title="아이디" type="text" value={inputId} onChange={handleIdChange} />
            <Input title="비밀번호" type="password" value={inputPw} onChange={handlePwChange} />
            <button className={styles.idBtn} onClick={handleLogin}>로그인</button>
            <p className={styles.find}><span className={styles.findCur}>아이디 찾기</span><span> | </span><span className={styles.findCur}>비밀번호 찾기</span></p>
            <p className={styles.regis} onClick={handleRegis}>아직 회원이 아니신가요?</p>
        </div>
    );
}

export default Login;