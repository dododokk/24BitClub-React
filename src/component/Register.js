import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "../style/Register.module.css"

function Input(props) {
    return (
        <div className={styles.inputdiv}>
            <p className={styles['input-title']}>{props.title}
                {props.warning && (
                    <span id={props.check ? styles.warning : styles.safe}>
                        {props.warning}
                    </span>
                )}</p>
            <input className={styles.input} type={props.type} value={props.value} onChange={props.onChange} />
        </div>
    );
}

function Register() {
    const [inputId, setInputId] = useState("");
    const [inputPw, setInputPw] = useState("");
    const [confirmPw, setConfirmPw] = useState("");
    const [checkPw, setCheckPw] = useState(false);
    const navigate = useNavigate();

    const handleIdChange = (e) => setInputId(e.target.value);
    const handlePwChange = (e) => {
        setInputPw(e.target.value);
        setCheckPw(confirmPw !== "" && confirmPw !== e.target.value);
    };
    const handlePwCheck = (e) => {
        setConfirmPw(e.target.value);
        setCheckPw(inputPw !== e.target.value);
    }

    const handleRegister = async () => {
        if (!checkPw && inputId && inputPw && confirmPw) {
            navigate('/login');
            // 서버에 회원가입 정보 전달
            // 서버에 회원가입 정보 전달
            //나중에 서버에 전송
            // try {
            //     const response = await fetch(`/api/users?username=${inputId}&password=${inputPw}`, {
            //         method: "POST"
            //     });

            //     if (response.ok) {
            //         const data = await response.json();
            //         navigate("/login");
            //     } else {
            //         const errorText = await response.text(); // 서버가 에러 메시지 응답할 경우
            //         alert(`회원가입 실패: ${errorText}`);
            //     }
            // } catch (error) {
            //     console.error("회원가입 오류:", error);
            //     alert("서버 오류가 발생했습니다. 다시 시도해주세요.");
            // }
        }

        
    }

    return (
        <div className={styles.register}>
            <h2 className={styles.h2}>회원가입</h2>
            <Input title="아이디" type="text" value={inputId} onChange={handleIdChange} />
            <Input title="비밀번호" type="password" value={inputPw} onChange={handlePwChange} />
            <Input title="비밀번호 확인" type="password" value={confirmPw} onChange={handlePwCheck} check={checkPw}
                warning={confirmPw === "" ? "" : checkPw ? "※ 비밀번호가 일치하지 않습니다." : "일치합니다!"} />
            <button className={styles.idBtn} onClick={handleRegister}>회원가입</button>
        </div>
    );
}

export default Register;