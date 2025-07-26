import React, { useContext, useState, useEffect } from "react";
import { UserContext } from "../context/UserContext";
import profile from "../image/profile.png";
import setting from "../image/setting.png";
import heart from "../image/heart.png";
import chat from "../image/chat.png";
import "../style/MyPage.css"

function Label(props) {
    return (
        <label className={`menu-item ${props.selected === props.menu ? "active" : ""}`}
            onClick={() => props.onSelect(props.menu)}>
            {props.title}
        </label>
    )
}

function Content(props) {
    const { userId } = useContext(UserContext);
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        if (props.title === "menu1") {
            //서버 연결
            const tempData = [
                { id: 1, title: "공지사항", author: userId, createdAt: "25.07.26", like: 10, comment: 2 },
                { id: 2, title: "긴제목을만들어보기위해", author: userId, createdAt: "25.08.26", like: 5, comment: 0 }
            ];
            // 혹시 author id 비교해야하는 상황이 생긴다면 아래 코드.
            // const myPosts = tempData.filter(post => post.authorId === userId);
            setPosts(tempData);
        }
        else if (props.title === "menu2") {
            //서버 연결
            const tempData = [
                { id: 1, title: "공지사항", author: "suho-lee", createdAt: "25.07.26", like: 10, comment: 2, comContent: "안녕" },
                { id: 2, title: "긴제목을만들어보기위해", author: "24Bit", createdAt: "25.08.26", like: 5, comment: 1, comContent: "화이팅이야" }
            ];
            setPosts(tempData);
        }
        else{
            //서버 연결
            const tempData = [

            ];
            setPosts(tempData);
        }
    }); //props.title이나 userId 값이 바뀔 때만 실행. , [props.title, userId]

    let content;

    if (props.title === "menu1") {
        content = (
            <div>
                <hr id="bold" />
                <div id="tag">
                    <span className="tag-content" id="order">순서</span>
                    <span className="tag-content" id="title">제목</span>
                    <span className="tag-content" id="author">작성자</span>
                    <span className="tag-content" id="date">작성일</span>
                </div>
                <hr id="general" />
                {posts.length === 0 ? (
                    <p id="empty">작성한 게시물이 없습니다.</p>
                ) : (
                    <ul>
                        {posts.map(post => (
                            <li key={post.id}>
                                <span className="post-content order">{post.id}</span>
                                <span className="post-content title">{post.title}</span>
                                <span className="post-content author">{post.author}</span>
                                <span className="post-content date">{post.createdAt}</span>
                                <span id="wrap">
                                    <span className="data"><img src={heart} id="heart" />{post.like}</span>
                                    <span className="data"><img src={chat} id="chat" />{post.comment}</span>
                                    <button id="fix">수정</button>
                                    <button id="delete">삭제</button>
                                </span>
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        );
    }
    else if (props.title === "menu2") {
        content = (
            <div>
                <hr id="bold" />
                <div id="tag">
                    <span className="tag-content" id="order">순서</span>
                    <span className="tag-content" id="title">제목</span>
                    <span className="tag-content" id="author">작성자</span>
                    <span className="tag-content" id="date">작성일</span>
                </div>
                <hr id="general" />
                {posts.length === 0 ? (
                    <p id="empty">댓글 단 게시물이 없습니다.</p>
                ) : (
                    <ul>
                        {posts.map(post => (
                            <li key={post.id}>
                                <span className="post-content order">{post.id}</span>
                                <span className="post-content title">{post.title}</span>
                                <span className="post-content author">{post.author}</span>
                                <span className="post-content date">{post.createdAt}</span>
                                <span id="wrap">
                                    <span className="data"><img src={heart} id="heart" />{post.like}</span>
                                    <span className="data"><img src={chat} id="chat" />{post.comment}</span>
                                </span>
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        );
    }
    else {
        content = (
            <div>
                <hr id="bold" />
                <div id="tag">
                    <span className="tag-content" id="order">순서</span>
                    <span className="tag-content" id="title">제목</span>
                    <span className="tag-content" id="author">작성자</span>
                    <span className="tag-content" id="date">작성일</span>
                </div>
                <hr id="general" />
                {posts.length === 0 ? (
                    <p id="empty">좋아요 누른 게시물이 없습니다.</p>
                ) : (
                    <ul>
                        {posts.map(post => (
                            <li key={post.id}>
                                <span className="post-content order">{post.id}</span>
                                <span className="post-content title">{post.title}</span>
                                <span className="post-content author">{post.author}</span>
                                <span className="post-content date">{post.createdAt}</span>
                                <span id="wrap">
                                    <span className="data"><img src={heart} id="heart" />{post.like}</span>
                                    <span className="data"><img src={chat} id="chat" />{post.comment}</span>
                                </span>
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        );
    }


    return (
        <div id="content">
            {content}
        </div>
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
                    {selectedMenu === "menu1" && <Content title="menu1" />}
                    {selectedMenu === "menu2" && <Content title="menu2" />}
                    {selectedMenu === "menu3" && <Content title="menu3" />}
                </article>
            </div>
        </div>
    );
}

export default MyPage;