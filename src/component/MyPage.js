import React, { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../context/UserContext";
import { AuthContext } from "../context/AuthContext";
import profile from "../image/profile.png";
import setting from "../image/setting.png";
import heart from "../image/heart.png";
import chat from "../image/chat.png";
import styles from "../style/MyPage.module.css"

function Label(props) {
    return (
        <label className={`${styles.menuItem} ${props.selected === props.menu ? styles.active : ""}`}
            onClick={() => props.onSelect(props.menu)}>
            {props.title}
        </label>
    )
}

function Content(props) {
    const { userId } = useContext(UserContext);
    const [posts, setPosts] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        if (props.title === "menu1") {
            //서버 연결
            const tempData = [
                { id: 1, title: "공지사항", author: userId, createdAt: "25.07.26", likeCount: 10, commentCount: 2 },
                { id: 2, title: "긴제목을만들어보기위해", author: userId, createdAt: "25.08.26", likeCount: 5, commentCount: 0 }
            ];
            // 혹시 author id 비교해야하는 상황이 생긴다면 아래 코드.
            // const myPosts = tempData.filter(post => post.authorId === userId);
            setPosts(tempData);
        }
        else if (props.title === "menu2") {
            //서버 연결
            const tempData = [
                { id: 1, title: "공지사항", author: "suho-lee", createdAt: "25.07.26", likeCount: 10, commentCount: 2, comContent: "안녕" },
                { id: 2, title: "긴제목을만들어보기위해", author: "24Bit", createdAt: "25.08.26", likeCount: 5, commentCount: 1, comContent: "화이팅이야" }
            ];
            setPosts(tempData);
        }
        else {
            //서버 연결
            const tempData = [

            ];
            setPosts(tempData);
        }
    }, [props.title, userId]); //props.title이나 userId 값이 바뀔 때만 실행. , [props.title, userId]

    let content;

    if (props.title === "menu1") {
        content = (
            <div>
                <hr id={styles.bold} />
                <div id={styles.tag}>
                    <span className={styles.tagContent} id={styles.order}>순서</span>
                    <span className={styles.tagContent} id={styles.title}>제목</span>
                    <span className={styles.tagContent} id={styles.author}>작성자</span>
                    <span className={styles.tagContent} id={styles.date}>작성일</span>
                </div>
                <hr id={styles.general} />
                {posts.length === 0 ? (
                    <p id={styles.empty}>작성한 게시물이 없습니다.</p>
                ) : (
                    <ul>
                        {posts.map(post => (
                            <li key={post.id}>
                                <span className={`${styles.postContent} ${styles.order}`}>{post.id}</span>
                                <span className={`${styles.postContent} ${styles.title}`} onClick={()=>navigate('/post')}>{post.title}</span>
                                <span className={`${styles.postContent} ${styles.author}`}>{post.author}</span>
                                <span className={`${styles.postContent} ${styles.date}`}>{post.createdAt}</span>
                                <span id={styles.wrap}>
                                    <span className={styles.data}><img src={heart} id={styles.heart} />{post.likeCount}</span>
                                    <span className={styles.data}><img src={chat} id={styles.chat} />{post.commentCount}</span>
                                    <button id={styles.fix} onClick={()=>navigate('/modify')}>수정</button>
                                    <button id={styles.delete}>삭제</button>
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
                <hr id={styles.bold} />
                <div id={styles.tag}>
                    <span className={styles.tagContent} id={styles.order}>순서</span>
                    <span className={styles.tagContent} id={styles.title}>제목</span>
                    <span className={styles.tagContent} id={styles.author}>작성자</span>
                    <span className={styles.tagContent} id={styles.date}>작성일</span>
                </div>
                <hr id={styles.general} />
                {posts.length === 0 ? (
                    <p id={styles.empty}>댓글 단 게시물이 없습니다.</p>
                ) : (
                    <ul>
                        {posts.map(post => (
                            <li key={post.id}>
                                <span className={`${styles.postContent} ${styles.order}`}>{post.id}</span>
                                <span className={`${styles.postContent} ${styles.title}`} onClick={()=>navigate('/post')}>{post.title}</span>
                                <span className={`${styles.postContent} ${styles.author}`}>{post.author}</span>
                                <span className={`${styles.postContent} ${styles.date}`}>{post.createdAt}</span>
                                <span id={styles.wrap}>
                                    <span className={styles.data}><img src={heart} id={styles.heart} />{post.likeCount}</span>
                                    <span className={styles.data}><img src={chat} id={styles.chat} />{post.commentCount}</span>
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
                <hr id={styles.bold} />
                <div id={styles.tag}>
                    <span className={styles.tagContent} id={styles.order}>순서</span>
                    <span className={styles.tagContent} id={styles.title}>제목</span>
                    <span className={styles.tagContent} id={styles.author}>작성자</span>
                    <span className={styles.tagContent} id={styles.date}>작성일</span>
                </div>
                <hr id={styles.general} />
                {posts.length === 0 ? (
                    <p id={styles.empty}>좋아요 누른 게시물이 없습니다.</p>
                ) : (
                    <ul>
                        {posts.map(post => (
                            <li key={post.id}>
                                <span className={`${styles.postContent} ${styles.order}`}>{post.id}</span>
                                <span className={`${styles.postContent} ${styles.title}`} onClick={()=>navigate('/post')}>{post.title}</span>
                                <span className={`${styles.postContent} ${styles.author}`}>{post.author}</span>
                                <span className={`${styles.postContent} ${styles.date}`}>{post.createdAt}</span>
                                <span id={styles.wrap}>
                                    <span className={styles.data}><img src={heart} id={styles.heart} />{post.likeCount}</span>
                                    <span className={styles.data}><img src={chat} id={styles.chat} />{post.commentCount}</span>
                                </span>
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        );
    }


    return (
        <div id={styles.content}>
            {content}
        </div>
    )
}

function MyPage() {
    const { userId, setUserId } = useContext(UserContext);
    const [selectedMenu, setSelectedMenu] = useState("menu1");

    return (
        <div id={styles.mypage}>
            <div id={styles.myInfo}>
                <img src={profile} id={styles.profile} />
                <span id={styles.id}>
                    <span id={styles.lv}>Lv.1</span><br />
                    <span id={styles.idName}>{userId}</span>
                </span>
                <span id={styles.setting}><img src={setting} id={styles.set} /></span>
            </div>
            <div id={styles.mywriteContent}>
                <div id={styles.mywrite}>
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