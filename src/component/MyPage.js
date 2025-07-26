import React, { useContext, useState } from "react";
import { UserContext } from "../context/UserContext";
import profile from "../image/profile.png";
import setting from "../image/setting.png";
import "../style/MyPage.css"

function Label(props) {
    return (
        <label className={`menu-item ${props.selected === props.menu ? "active" : ""}`}
            onClick={() => props.onSelect(props.menu)}>
            {props.title}
        </label>
    )
}

function MyPage() {
    const { userId, setUserId } = useContext(UserContext);
    const [selectedMenu, setSelectedMenu] = useState("menu1");

    return (
        <div id="mypage">
            <div id="myInfo">
                <img src={profile} id="profile" />
                <span id="id">
                    <span id="lv">Lv.1</span><br />
                    <span id="idName">{userId}</span>
                </span>
                <span id="setting"><img src={setting} id="set" /></span>
            </div>
            <div id="mywrite-content">
                <div id="mywrite">
                    <Label selected={selectedMenu} menu="menu1" onSelect={setSelectedMenu} title="내 게시물" />
                    <Label selected={selectedMenu} menu="menu2" onSelect={setSelectedMenu} title="댓글 단 게시물" />
                    <Label selected={selectedMenu} menu="menu3" onSelect={setSelectedMenu} title="좋아요 누른 게시물" />
                </div>
                <article>
                    {selectedMenu === "menu1" && <p>menu1</p>}
                    {selectedMenu === "menu2" && <p>menu2</p>}
                    {selectedMenu === "menu3" && <p>menu3</p>}
                </article>
            </div>
        </div>
    );
}

export default MyPage;