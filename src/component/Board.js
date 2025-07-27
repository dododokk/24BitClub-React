// import logo from './logo.svg';
import '../style/Board.css';
import { useState } from 'react';
import heart from "../image/heart.png";
import chat from "../image/chat.png";
import filter from "../image/filter.png";
import searchIcon from "../image/search-icon.png";
import searchButton from "../image/search-button.png";
import profile from "../image/profile.png";

function Board() {

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
                    <button id="search-button"></button>
                    {/* 이거 사진으로 한거 아니고 직접 도형으로 한거라 바꿔주면 좋을 것 같아여 사진이면 조금 어색해서 */}
                </div>
                <table border="1">
                    <thead>
                        <tr>
                            <th>번호</th>
                            <th>title</th>
                            <th>작성자</th>
                            <th>작성일</th>
                            <th className="filter"><img src={filter}/></th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>{번호[0]}</td>
                            <td>{title[0]}</td>
                            <td>{작성자[0]}</td>
                            <td>{작성일[0]}</td>
                            <td className="meta">
                                <span><img id="heart" src={heart}/> {likeCount[0]}</span>
                                <span><img id="chat" src={chat}/> {commentCount[0]}</span>
                            </td>
                        </tr>
                        {/* 추가행동 */}
                        <tr>
                            <td>{번호[1]}</td>
                            <td>{title[1]}</td>
                            <td>{작성자[1]}</td>
                            <td>{작성일[1]}</td>
                            <td className="meta">
                                <span><img id="heart" src={heart}/> {likeCount[1]}</span>
                                <span><img id="chat" src={chat}/> {commentCount[1]}</span>
                            </td>
                        </tr>
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
                        <button id='mypage'>마이페이지</button>
                        <button id='modify'>회원정보수정</button>
                    </div>
                </div>
                <button id='newpost'>
                  + 게시물 작성
                </button>
            </aside>
      </main>
    </div>
    
  );
}

export default Board;
