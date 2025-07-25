//전역으로 로그인 아이디, 비밀번호 관리
import React, {createContext, useState} from "react";

export const UserContext = createContext();

export const UserProvider = ({children})=>{
    const [userId, setUserId] = useState("");
    const [userPw, setUserPw] = useState("");

    return(
        <UserContext.Provider value={{userId, setUserId, userPw, setUserPw}}>
            {children}
        </UserContext.Provider>
    );
};