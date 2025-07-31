// import logo from './logo.svg';
import React, { useContext, useState, useEffect } from "react";
import { UserContext } from "../context/UserContext";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import heart from "../image/heart.png";
import chat from "../image/chat.png";
import filter from "../image/filter.png";
import searchIcon from "../image/search-icon.png";
import searchButton from "../image/search-button.png";
import profile from "../image/profile.png";
import styles from '../style/Board.module.css';

function Board() {
  const navigate = useNavigate();
  const { userId } = useContext(UserContext);
  const { isLoggedIn, setIsLoggedIn } = useContext(AuthContext);
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    const tempData = [
      {
        id: 5,
        user: {
          id: 1,
          username: "정화진",
          password: "pass123",
        },
        title: "공지사항",
        createdAt: "2025-07-26",
        content: "아오진짜로 개힘들 아 엄살이아니고 아 엄살인가 모르겠는데 개빡치고 잦응나",
        likeCount: 10,
        commentCount: 2
      },
      {
        id: 6,
        user: {
          id: 2,
          username: "tlqkf",
          password: "pass123",
        },
        title: "긴제목을만들어보기위해",
        createdAt: "2025-08-26",
        content: "BCBP 조롱하지 마라",
        likeCount: 5,
        commentCount: 1
      }
    ];
    setPosts(tempData);
  }, [userId]); // userId가 바뀔 때만 실행됨

  return (
    <div>
      <main className={styles.main}>
        <div className={styles.content}>
          <div className={styles.searchBox}>
            <div className={styles.searchBar}>
              <img className={styles.searchIcon} src={searchIcon} />
              <input className={styles.searchInput} type="text" name="search" />
            </div>
            <button className={styles.searchButton}>검색</button>
          </div>
          <table border="1">
            <thead>
              <tr>
                <th>번호</th>
                <th>제목</th>
                <th>작성자</th>
                <th>작성일</th>
                <th className={styles.filter}><img src={filter} /></th>
              </tr>
            </thead>
            <tbody>
              {posts.length === 0 ? (
                <tr>
                  <td colSpan="5" id={styles.empty}>글이 없습니다. 첫 작성자가 되어보셈</td>
                </tr>
              ) : (
                posts.map((post, index) => (
                  <tr key={post.id}>
                    <td className={styles.postId}>{index+1}</td>
                    <td className={styles.title} onClick={() => { isLoggedIn ? navigate('/post', { state: { id: post.id, userId: post.user.id} }) : alert("로그인이 필요한 기능입니다.") }}>{post.title}</td>
                    <td className={styles.author}>{post.user.username}</td>
                    <td className={styles.createdAt}>{post.createdAt}</td>
                    <td className={styles.meta}>
                      <span><img id={styles.heart} src={heart} /> {post.likeCount}</span>
                      <span><img id={styles.chat} src={chat} /> {post.commentCount}</span>
                    </td>
                  </tr>
                ))

              )}
            </tbody>
          </table>
          <div className={styles.pagination}>
            <span>이전</span>
            <span className={styles.active}>1</span>
            <span>2</span>
            <span>3</span>
            <span>4</span>
            <span>5</span>
            <span>다음</span>
          </div>


        </div>
        <aside className={styles.aside}>
          <div className={styles.mypage}>
            {!isLoggedIn && <div className={styles.overlay}><p id={styles.warning}><span id={styles.needLogin} onClick={() => navigate('/login')}>로그인</span>이 필요한 기능입니다.</p></div>}
            <div id={styles.info}>
              <img src={profile} />
              <div id={styles.id}>
                <p id={styles.level}>Lv. 1</p>
                <p id={styles.idName}>{userId}</p>
              </div>

            </div>
            <div id={styles.button}>
              <button id={styles.mypage} onClick={() => navigate('/mypage')}>마이페이지</button>
              <button id={styles.modify}>회원정보수정</button>
            </div>
          </div>
          <button id={styles.newpost} onClick={() => { isLoggedIn ? navigate('/write') : alert("로그인이 필요한 기능입니다.") }}>
            + 게시물 작성
          </button>
        </aside>
      </main>
    </div>

  );
}

export default Board;
