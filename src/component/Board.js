// import logo from './logo.svg';
import React, { useContext, useState, useEffect } from "react";
import { UserContext } from "../context/UserContext";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { LikeContext } from '../context/LikeContext';
import { CommentContext } from '../context/CommentContext';
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
  const { isLoggedIn } = useContext(AuthContext);
  const { likes } = useContext(LikeContext);
  const { comments } = useContext(CommentContext);

  const [posts, setPosts] = useState([]);
  const [pageInfo, setPageInfo] = useState({
    totalPages: 0,
    currentPage: 0,
    isFirst: true,
    isLast: true
  });
  const [searchKeyword, setSearchKeyword] = useState("");

  // 서버 연결
  const fetchPosts = (page = 0) => {
  const token = localStorage.getItem("token"); // 토큰 가져오기

  fetch(`https://miraculous-sparkle-production.up.railway.app/api/posts?page=${page}&size=5&sort=createdAt,desc`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`, // 토큰 넣기
    },
  })
    .then(res => {
      if (!res.ok) {
        return res.text().then(text => {
          throw new Error(text || "서버 오류");
        });
      }
      return res.json();
    })
    .then(data => {
      setPosts(data.content);
      setPageInfo({
        totalPages: data.totalPages,
        currentPage: data.number,
        isFirst: data.first,
        isLast: data.last,
      });
    })
    .catch(err => console.error("게시글 로드 실패:", err));
};


  useEffect(() => {
    fetchPosts(0); //서버 연결시 첫 페이지 로드
  }, [userId]); // userId가 바뀔 때만 실행됨


  const handleSearch = () => {
    if (!searchKeyword.trim()) {
      fetchPosts(0);
      return;
    }

    fetch(`https://miraculous-sparkle-production.up.railway.app/api/posts/search?title=${encodeURIComponent(searchKeyword)}`)
      .then(res => res.json())
      .then(data => {
        setPosts(data.content);
        setPageInfo({
          totalPages: data.totalPages,
          currentPage: data.number,
          isFirst: data.first,
          isLast: data.last
        });
      })
      .catch(err => console.error("검색 실패:", err));
  }

  return (
    <div>
      <main className={styles.main}>
        <div className={styles.content}>
          <div className={styles.searchBox}>
            <div className={styles.searchBar}>
              <img className={styles.searchIcon} src={searchIcon} />
              <input className={styles.searchInput} type="text" name="search"
                value={searchKeyword} onChange={(e) => setSearchKeyword(e.target.value)} />
            </div>
            <button className={styles.searchButton} onClick={handleSearch}>검색</button>
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
                  <td colSpan="5" id={styles.empty}>작성된 글이 없습니다.</td>
                </tr>
              ) : (
                posts.map((post, index) => {
                  // const postLike = likes.find(l => l.postId === post.id);
                  // const postComments = comments.find(c => c.postId === post.id);
                  return (
                    <tr key={post.postId}>
                      <td className={styles.postId}>{pageInfo.currentPage * 5 + index + 1}</td>
                      <td className={styles.title} onClick={() => { isLoggedIn ? navigate('/post', { state: { postId: post.postId, userId: post.userId } }) : alert("로그인이 필요한 기능입니다.") }}>{post.title}</td>
                      <td className={styles.author}>{post.username}</td>
                      <td className={styles.createdAt}>{post.createdAt}</td>
                      <td className={styles.meta}>
                        <span><img id={styles.heart} src={heart} />
                          {post.likeCount}
                          {/* {postLike ? postLike.likeCount : 0} */}
                        </span>
                        <span><img id={styles.chat} src={chat} />
                          {post.commentCount}
                          {/* {postComments ? postComments.commentCount : 0} */}
                        </span>
                      </td>
                    </tr>
                  )
                })


              )}
            </tbody>
          </table>
          <div className={styles.pagination}>
            <span className={pageInfo.isFirst ? styles.disabled : ""}
              onClick={() => !pageInfo.isFirst && fetchPosts(pageInfo.currentPage - 1)}>
              이전
            </span>

            {Array.from({ length: pageInfo.totalPages }, (_, i) => (
              <span
                key={i}
                className={`${styles.pageNum} ${pageInfo.currentPage === i ? styles.active : ""}`}
                onClick={() => fetchPosts(i)}
              >
                {i + 1}
              </span>
            ))}

            <span className={pageInfo.isLast ? styles.disabled : ""}
              onClick={() => !pageInfo.isLast && fetchPosts(pageInfo.currentPage + 1)}>
              다음
            </span>
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
          <button id={styles.newpost} onClick={() => { isLoggedIn ? navigate('/write', { state: { userId } }) : alert("로그인이 필요한 기능입니다.") }}>
            + 게시물 작성
          </button>
        </aside>
      </main>
    </div>

  );
}

export default Board;
