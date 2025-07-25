import React, {useState, useContext} from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../context/UserContext";
import "../style/Login.css";

function Input(props){
    return(
        <div id="input">
        <p>{props.title}</p>
        <input type={props.type} value={props.value} onChange={props.onChange} />
        </div>
    );
}

function Login(){
    const {setUserId, setUserPw} = useContext(UserContext);
    const [inputId, setInputId] = useState("");
    const [inputPw, setInputPw] = useState("");
    const navigate = useNavigate();

    const handleIdChange = (e) => setInputId(e.target.value);
    const handlePwChange = (e) => setInputPw(e.target.value);

    const handleLogin = () => {
        setUserId(inputId);
        setInputPw(inputPw);
        //나중에 서버에 전송
    }

    const handleRegis = () => {
        navigate('/register');
    };

    return(
        <div id="login">
            <h2>로그인</h2>
            <Input title="아이디" type="text" value={inputId} onChange={handleIdChange} />
            <Input title="비밀번호" type="password" value={inputPw} onChange={handlePwChange} />
            <button id="idBtn" onClick={handleLogin}>로그인</button>
            <p id="find"><span className="findCur">아이디 찾기</span><span> | </span><span className="findCur">비밀번호 찾기</span></p>
            <p id="regis" onClick={handleRegis}>아직 회원이 아니신가요?</p>
        </div>
    );
}

export default Login;