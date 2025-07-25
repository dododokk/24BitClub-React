import React, { useContext } from "react";
import { UserContext } from "../context/UserContext";
import profile from "../image/profile.png";
import setting from "../image/setting.png";
import "../style/MyPage.css"

function MyPage(){
    const {userId, setUserId} = useContext(UserContext);

    return(
        <div id="myInfo">
            <img src={profile} id="profile"/>
            <span id="id">
                <span id="lv">Lv.1</span><br />
                <span id="idName">{userId}</span>
            </span>
            <span id="setting"><img src={setting} id="set" /></span>
        </div>
    );
}

export default MyPage;