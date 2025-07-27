import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../style/Register.css"

function Input(props) {
    return (
        <div id="input">
            <p id="input-title">{props.title}
                {props.warning && (
                <span id={props.check ? "warning" : "safe"}>
                    {props.warning}
                </span>
            )}</p>
            <input type={props.type} value={props.value} onChange={props.onChange} />
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
        setCheckPw(confirmPw!==""&&confirmPw!==e.target.value);
    };
    const handlePwCheck = (e) => {
        setConfirmPw(e.target.value);
        setCheckPw(inputPw!==e.target.value);
    }

    const handleRegister = () => {
        if(!checkPw && inputId && inputPw && confirmPw){
            navigate('/login');
            // 서버에 회원가입 정보 전달
        }
    }

    return (
        <div id="register">
            <h2>회원가입</h2>
            <Input title="아이디" type="text" value={inputId} onChange={handleIdChange} />
            <Input title="비밀번호" type="password" value={inputPw} onChange={handlePwChange} />
            <Input title="비밀번호 확인" type="password" value={confirmPw} onChange={handlePwCheck} check={checkPw}
            warning = {checkPw ? "※ 비밀번호가 일치하지 않습니다." : "일치합니다!"} />
            <button id="idBtn" onClick={handleRegister}>회원가입</button>
        </div>
    );
}

export default Register;