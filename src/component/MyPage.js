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
    const { userId, userDistinctId } = useContext(UserContext);
    const [posts, setPosts] = useState([]);
    const navigate = useNavigate();
    const token = localStorage.getItem("token");

    useEffect(() => {
        if (props.title === "menu1") {
            //서버 연결
            fetch(`https://miraculous-sparkle-production.up.railway.app/api/posts/user/${userDistinctId}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                }
            })
                .then(res => {
                    if (!res.ok) {
                        throw new Error(`서버 오류: ${res.status}`);
                    }
                    return res.json();
                })
                .then(data => {
                    setPosts(data); // 서버에서 받은 게시글 목록 저장
                })
                .catch(err => {
                    console.error("게시글 불러오기 실패:", err);
                });
        }
        else if (props.title === "menu2") {
            //서버 연결
            fetch(`https://miraculous-sparkle-production.up.railway.app/api/posts/commented/user/${userDistinctId}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                }
            })
                .then(res => {
                    if (!res.ok) {
                        throw new Error(`서버 오류: ${res.status}`);
                    }
                    return res.json();
                })
                .then(data => {
                    setPosts(data); // 서버에서 받은 게시글 목록 저장
                })
                .catch(err => {
                    console.error("게시글 불러오기 실패:", err);
                });
        }
        else {
            //서버 연결
            fetch(`https://miraculous-sparkle-production.up.railway.app/api/posts/liked/user/${userDistinctId}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                }
            })
                .then(res => {
                    if (!res.ok) {
                        throw new Error(`서버 오류: ${res.status}`);
                    }
                    return res.json();
                })
                .then(data => {
                    setPosts(data); // 서버에서 받은 게시글 목록 저장
                })
                .catch(err => {
                    console.error("게시글 불러오기 실패:", err);
                });
        }
    }, [props.title, userId]); //props.title이나 userId 값이 바뀔 때만 실행. , [props.title, userId]

    let content;

     const handleDelete = async (postId) => {
    if (!postId) {
      console.error("postId 누락");
      return;
    }
    if (!window.confirm("정말 삭제할까요?")) return;

    try {
      const res = await fetch(
        `https://miraculous-sparkle-production.up.railway.app/api/posts/${postId}?userId=${encodeURIComponent(userDistinctId)}`,
        {
          method: "DELETE",
          headers: {
            ...(token && { Authorization: `Bearer ${token}` }), // Content-Type 제거
          },
        }
      );

      if (res.status !== 204) {
        const msg = await res.text().catch(() => "");
        throw new Error(msg || `삭제 실패 (status ${res.status})`);
      }

      // ✅ post.id가 아니라 post.postId로 비교해야 함
      setPosts(prev => prev.filter(p => p.postId !== postId));
    } catch (err) {
      console.error("삭제 에러:", err);
      alert(err.message || "삭제 중 오류가 발생했습니다.");
    }
  };

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
                        {posts.map((post, index) => (
                            <li key={post.postId}>
                                <span className={`${styles.postContent} ${styles.order}`}>{index + 1}</span>
                                <span className={`${styles.postContent} ${styles.title}`} onClick={() => navigate('/post', { state: { postId: post.postId, userId: post.userId } })}>{post.title}</span>
                                <span className={`${styles.postContent} ${styles.author}`}>{post.username}</span>
                                <span className={`${styles.postContent} ${styles.date}`}>{post.createdAt}</span>
                                <span id={styles.wrap}>
                                    <span className={styles.data}><img src={heart} id={styles.heart} />{post.likeCount}</span>
                                    <span className={styles.data}><img src={chat} id={styles.chat} />{post.commentCount}</span>
                                    <button id={styles.fix} onClick={() => navigate('/modify', { state: { postId: post.postId, userId: post.userId } })}>수정</button>
                                    <button id={styles.delete} onClick={() => handleDelete(post.postId, post.userId)}>삭제</button>
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
                        {posts.map((post, index) => (
                            <li key={post.postId}>
                                <span className={`${styles.postContent} ${styles.order}`}>{index + 1}</span>
                                <span className={`${styles.postContent} ${styles.title}`} onClick={() => navigate('/post', { state: { postId: post.postId, userId: post.userId } })}>{post.title}</span>
                                <span className={`${styles.postContent} ${styles.author}`}>{post.username}</span>
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
                        {posts.map((post, index) => (
                            <li key={post.postId}>
                                <span className={`${styles.postContent} ${styles.order}`}>{index + 1}</span>
                                <span className={`${styles.postContent} ${styles.title}`} onClick={() => navigate('/post', { state: { postId: post.postId, userId: post.userId } })}>{post.title}</span>
                                <span className={`${styles.postContent} ${styles.author}`}>{post.username}</span>
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