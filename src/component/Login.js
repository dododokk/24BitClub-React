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

    const handleLogin = async () => {
        if (inputId && inputPw) {
            setUserId(inputId);
            setInputPw(inputPw);
            setIsLoggedIn(true);
            navigate('/');
            //나중에 서버에 전송
            // try {
            //     const response = await fetch("/api/login", {
            //         method: "POST",
            //         headers: {
            //             "Content-Type": "application/json"
            //         },
            //         body: JSON.stringify({
            //             username: inputId,
            //             password: inputPw
            //         })
            //     });

            //     if (response.ok) {
            //         const data = await response.json();

            //         // 로그인 성공 처리
            //         setUserId(data.user_id); // user_id는 숫자일 가능성 있음
            //         setUserPw(inputPw);      // 필요 시 저장, 보통은 token만 저장
            //         setIsLoggedIn(true);

            //         // 토큰 저장 (예: localStorage 또는 context)
            //         localStorage.setItem("token", data.token);

            //         navigate("/");
            //     } else {
            //         alert("로그인 실패: 아이디나 비밀번호가 틀렸습니다.");
            //     }
            // } catch (error) {
            //     console.error("로그인 중 오류 발생:", error);
            //     alert("서버 오류가 발생했습니다. 다시 시도해주세요.");
            // }
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