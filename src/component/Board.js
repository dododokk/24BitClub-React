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
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    const tempData = [
      { id: 1, title: "공지사항", author: "정화진", createdAt: "25.07.26", likeCount: 10, commentCount: 2 },
      { id: 2, title: "긴제목을만들어보기위해", author: "tlqkf", createdAt: "25.08.26", likeCount: 5, commentCount: 0 }
    ];
    setPosts(tempData);
  }, [userId]); // userId가 바뀔 때만 실행됨

  return (
    <div>
      <main className={styles.main}>
        <div className={styles.content}>
                <div className={styles.searchBox}>
                    <div className={styles.searchBar}>
                      <img className={styles.searchIcon} src={searchIcon}/>
                      <input className={styles.searchInput} type="text" name="search"/>
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
                            <th className={styles.filter}><img src={filter}/></th>
                        </tr>
                    </thead>
                    <tbody>
                      {posts.length === 0 ? (
                        <tr>
                          <td colSpan="5" id={styles.empty}>글이 없습니다. 첫 작성자가 되어보셈</td>
                        </tr>
                      ) : (
                          posts.map(post => (
                            <tr key={post.id}>
                              <td className={styles.postId}>{post.id}</td>
                              <td className={styles.title} onClick={()=> navigate('/post')}>{post.title}</td>
                              <td className={styles.author}>{post.author}</td>
                              <td className={styles.createdAt}>{post.createdAt}</td>
                              <td className={styles.meta}>
                                <span><img id={styles.heart} src={heart}/> {post.likeCount}</span>
                                <span><img id={styles.chat} src={chat}/> {post.commentCount}</span>
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
                    <div id={styles.info}>
                      <img src={profile}/>
                      <div id={styles.id}>
                        <p id={styles.level}>Lv. 1</p>
                        <p id={styles.idName}>{userId}</p>
                      </div>
                      
                    </div>
                    <div id={styles.button}>
                        <button id={styles.mypage} onClick={()=> navigate('/mypage')}>마이페이지</button>
                        <button id={styles.modify}>회원정보수정</button>
                    </div>
                </div>
                <button id={styles.newpost} onClick={()=> navigate('/write')}>
                  + 게시물 작성
                </button>
            </aside>
      </main>
    </div>
    
  );
}

export default Board;
