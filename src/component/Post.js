import React, { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../context/UserContext";

import authorProfile from "../image/author-profile.png";
import profile from "../image/profile.png";
import heart from "../image/heart.png";
import chat from "../image/chat.png";
import heartFilled from "../image/heart filled.png";
import styles from "../style/Post.module.css";
function Post(){
    const navigate = useNavigate();
    const { userId } = useContext(UserContext);
    const [comments, setComments] = useState([]);
      useEffect(() => {
        const tempComments = [
          { id: 1, postId: 1, content: "BCBPㅋㅋㅋㅋㅠㅠㅠ플플ㅋㅋㅋㅋㅋ키키ㅋㅋㅋ", author: "정화진", createdAt: "25.07.26"},
          { id: 2, postId: 1, content: "프로필이미지 변수추가해라 이수호 ", author: "문효진", createdAt: "25.08.26"}
        ];
        setComments(tempComments);
      }, [userId]); // userId가 바뀔 때만 실행됨

    const [post, setPost] = useState({});
    useEffect(() => {const tempData = 
          { id: 1, title: "공지사항", author: "정화진", createdAt: "25.07.26", likeCount: 10, commentCount: 2, content: "아오진짜로 개힘들 아 엄살이아니고 아 엄살인가 모르겠는데 개빡치고 잦응나"
           };
        
        setPost(tempData);
      }, [userId]);

    const handleLike = (id) => {
        if(liked){
            setPost({...post, likeCount: post.likeCount -1});
        } else{
            setPost({...post, likeCount: post.likeCount+1});
        }
        setLiked(!liked);
    }

    const [liked, setLiked] = useState(false);

    return (
    <main className={styles.main}>
        <div className={styles.bar}></div>
        <div className={styles['post-container']}>
            <div className={styles['post-header']}>
                <div className={styles.writer}>
                    <img src={authorProfile} className={styles['author-profile']}/>
                    <div className={styles.author}>{post.author}</div>
                </div>
                <button className={styles['contents-btn']} onClick={()=> navigate('/board')}>목차</button>

            </div>
            <div className={styles['post-content']}>
                <div className={styles['post-title']}>
                    &nbsp;&nbsp;제목 : <span className={styles.title}>{post.title}</span>
                </div>
                <div className={styles['post-body']}>
                    {post.content}
                </div>
            </div>
            <div className={styles.meta}>
                <span className={styles.span}><img className={styles.heart} src={liked ? heartFilled : heart} onClick={handleLike}/> {post.likeCount}</span>
                <span className={styles.span}><img className={styles.chat} src={chat}/> {post.commentCount}</span>
            </div>
            <div className={styles['comment-section']}>
                
                <div className={styles['comment-list']}>
                    {comments.length === 0 ?(
                        <p>작성된 댓글이 없습니다. 댓글을 써보세요 지금 당장.</p>
                    ) : (
                        comments.map(comment => (
                            <div className={styles['comment-item']} key={comment.id}>
                                <img src={authorProfile} alt="user" className={styles['comment-profile']} />
                                <strong>{comment.author}&nbsp;&nbsp;</strong>
                                {comment.content}
                            </div>
                        ))
                        
                    )}
                    
                </div>
                <div className={styles['comment-input-box']}>
                    <input className={styles.commentInput} type="text" placeholder="댓글을 입력하세요..." />
                    <button className={styles.commentButton}>작성</button>
                </div>
            </div>
        </div>
        
    </main>
    );
}

export default Post;