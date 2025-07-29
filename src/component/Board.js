// import logo from './logo.svg';
import React, { useContext, useState, useEffect } from "react";
import { UserContext } from "../context/UserContext";
import { AuthContext } from "../context/AuthContext";
import '../style/Board.css';
import { useNavigate } from "react-router-dom";
import heart from "../image/heart.png";
import chat from "../image/chat.png";
import filter from "../image/filter.png";
import searchIcon from "../image/search-icon.png";
import searchButton from "../image/search-button.png";
import profile from "../image/profile.png";

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

  let [번호, a] = useState([1, 2]);
  let [title, b] = useState(['24BitClub', 'BCBPㅋㅋ']);
  let [작성자, c] = useState(['bitclub', '수호천사']);
  let [작성일, d] = useState(['25.07.17', '25.07.23']);

  let [likeCount, estate변경함수] = useState([30, 15]);
  let [commentCount, f] = useState([2, 5]);
  let [login, g] = useState(['로그인', '로그아웃']);
  let [signup, h] = useState(['회원가입', '마이페이지']);

  let [mypost, getmypost] = useState(['post']);
  return (
    <div>
      <main id="main" className="main">
        <div id="content" className="content">
                <div id="search-box">
                    <div id="search-bar">
                      <img id="search-icon" src={searchIcon}/>
                      <input type="text" name="search"/>
                    </div>
                    <button id="search-button">검색</button>
                </div>
                <table border="1">
                    <thead>
                        <tr>
                            <th>번호</th>
                            <th>제목</th>
                            <th>작성자</th>
                            <th>작성일</th>
                            <th className="filter"><img src={filter}/></th>
                        </tr>
                    </thead>
                    <tbody>
                      {posts.length === 0 ? (
                        <tr>
                          <td colSpan="5" id="empty">글이 없습니다. 첫 작성자가 되어보셈</td>
                        </tr>
                      ) : (
                          posts.map(post => (
                            <tr key={post.id}>
                              <td>{post.id}</td>
                              <td className="title" onClick={()=> navigate('/post')}>{post.title}</td>
                              <td>{post.author}</td>
                              <td>{post.createdAt}</td>
                              <td className="meta">
                                <span><img id="heart" src={heart}/> {post.likeCount}</span>
                                <span><img id="chat" src={chat}/> {post.commentCount}</span>
                              </td>
                            </tr>
                          ))
                          
                      )}
                    </tbody>
                </table>
                <div className="pagination">
                    <span>이전</span>
                    <span className="active">1</span>
                    <span>2</span>
                    <span>3</span>
                    <span>4</span>
                    <span>5</span>
                    <span>다음</span>
                </div>


            </div>
            <aside className="aside">
                <div className="mypage">
                    <div id="info">
                      <img src={profile}/>
                      <div id="id">
                        <p id="level">Lv. 1</p>
                        <p id="id-name">BitClub</p>
                      </div>
                      
                    </div>
                    <div id='button'>
                        <button id='mypage' onClick={()=> navigate('/mypage')}>마이페이지</button>
                        <button id='modify'>회원정보수정</button>
                    </div>
                </div>
                <button id='newpost' onClick={()=> navigate('/write')}>
                  + 게시물 작성
                </button>
            </aside>
      </main>
    </div>
    
  );
}

export default Board;
