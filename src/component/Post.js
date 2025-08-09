import React, { useContext, useState, useEffect, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { UserContext } from "../context/UserContext";
import { LikeContext } from '../context/LikeContext';
import { CommentContext } from '../context/CommentContext';
import authorProfile from "../image/author-profile.png";
import profile from "../image/profile.png";
import heart from "../image/heart.png";
import chat from "../image/chat.png";
import heartFilled from "../image/heart filled.png";
import styles from "../style/Post.module.css";



function Post() {
    const navigate = useNavigate();
    const location = useLocation();
    const { post } = location.state || {};
    // const { userId } = useContext(UserContext);
    const { toggleLike, likes } = useContext(LikeContext);
    const { deleteComment, refreshCommentCount } = useContext(CommentContext);
    const inputRef = useRef(null);
    // const [currentPost, setCurrentPost] = useState(post || {});
    // const { userId } = useContext(UserContext);
    const { id, userId } = location.state || {};
    const [posts, setPosts] = useState("");

    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState("");
    const [liked, setLiked] = useState(false);
    const [newTitle, setNewTitle] = useState("");
    const [newContent, setNewContent] = useState("");

    // const currentLike = likes.find(like => like.postId === post.id);

    useEffect(() => {
        if (id && userId) {
            //id랑 userId 넘기고 해당 포스트 내용 받기.
            const tempData = [
                {
                    "postId": 45, //게시글 아이디 -> post_id
                    "title": "첫 번째 게시글",
                    "userId": 1,
                    "username": "정화진",
                    "content": "바부",
                    "createdAt": "2025-07-30",
                    "likeCount": 1,
                    "commentCount": 1
                },
                {
                    "postId": 48,
                    "title": "세 번째 게시글",
                    "userId": 1,
                    "username": "정화진",
                    "content": "일해라 이수호 문효진",
                    "createdAt": "2025-07-30",
                    "likeCount": 1,
                    "commentCount": 1
                }
                // ...
            ]
            const targetPost = tempData.find((p) => p.postId === id);
            setNewTitle(targetPost.title);
            setNewContent(targetPost.content);
            setPosts(targetPost);

            if (inputRef.current) {
                inputRef.current.innerHTML = targetPost.content;
            }
        }
    }, []);


    // useEffect(() => {
    //     const fetchComments = async () => {
    //         const response = await fetch(`/api/comments?postId=${post.id}`);
    //         const data = await response.json();
    //         setComments(data);
    //     };
    //     if (post?.id) fetchComments();
    // }, [post.id]);

    // const handleLike = () => {
    //     toggleLike(post.id, userId, liked);
    //     setLiked(!liked);
    // };

    // const handleAddComment = async () => {
    //     if (!newComment.trim()) return;
    //     const response = await fetch('/api/comments', {
    //         method: 'POST',
    //         headers: { 'Content-Type': 'application/json' },
    //         body: JSON.stringify({ post: { id: post.id }, user: { id: userId }, content: newComment })
    //     });
    //     await response.json();
    //     setNewComment("");
    //     refreshCommentCount(post.id);
    // };

    // const handleDeleteComment = async (commentId) => {
    //     await deleteComment(commentId, post.id);
    //     setComments(prev => prev.filter(c => c.id !== commentId));
    // };
    // const filteredComments = comments.filter(comment => comment.post.id === post.postId);
    const filteredComments = comments.filter(
        comment => comment.post?.id === post?.postId
    );




    // useEffect(()=>{
    //     if(post){
    //         setCurrentPost(post);
    //     }
    // }, [post]);
    useEffect(() => {
        const tempComments = [
            { id: 1, post: { id: 5 }, content: "BCBPㅋㅋㅋㅋㅠㅠㅠ플플ㅋㅋㅋㅋㅋ키키ㅋㅋㅋ", user: { id: 1, username: "정화진" }, createdAt: "25.07.26" },
            { id: 2, post: { id: 5 }, content: "프로필이미지 변수추가해라 이수호 ", user: { id: 2, username: "문효진" }, createdAt: "25.08.26" },
            { id: 3, post: { id: 5 }, content: "댓글 스크롤바 확인 ", user: { id: 2, username: "문효진" }, createdAt: "25.08.26" },
            { id: 4, post: { id: 5 }, content: "4개부터 스크롤바 ", user: { id: 2, username: "문효진" }, createdAt: "25.08.26" },
            { id: 5, post: { id: 5 }, content: "슈루룽 ", user: { id: 2, username: "문효진" }, createdAt: "25.08.26" },
            { id: 6, post: { id: 6 }, content: "시프도 터지고", user: { id: 3, username: "이수호" }, createdAt: "25.08.27" },
            { id: 7, post: { id: 6 }, content: "알고도 터지고", user: { id: 4, username: "김도은" }, createdAt: "25.08.27" }
        ];
        setComments(tempComments);
    }, []); // userId가 바뀔 때만 실행됨
    // useEffect(() => {
    //     const tempLikes = [
    //         { postId: 5, likeCount: 12 },
    //         { postId: 6, likeCount: 8 }
    //     ]
    //     setLikes(tempLikes);
    // }, []);

    // //LIKE 서버 연결
    // useEffect(() => {
    //     // 서버에서 좋아요 데이터 요청
    //     const fetchLikes = async () => {
    //         const response = await fetch(`/api/likes?postId=${post.id}`);
    //         const data = await response.json(); 
    //         setLikes(data);

    //         // 좋아요 개수 설정
    //         const postLikeData = data.find(like => like.postId === post.id);
    //         setLikeCount(postLikeData ? postLikeData.likeCount : 0);

    //         // 로그인한 유저가 이미 좋아요 눌렀는지 확인
    //         const userLike = data.find(like => like.postId === post.id && like.user_Id === userId);
    //         setLiked(!!userLike);
    //     };

    //     if (post.id && userId) {
    //         fetchLikes();
    //     }
    // }, [post.id, userId]);

    // const handleLike = async () => {
    //     if(!liked){
    //         //좋아요 누르기 API 연동 & 상태갱신
    //         const response = await fetch('/api/like', {
    //             method: 'POST',
    //             headers: { 'Content-Type': 'application/json' },
    //             body: JSON.stringify({postId: post.id, user_Id: userId})
    //         });

    //         const data = await response.json();
    //         setLikeCount(data.likeCount);
    //         setLiked(true);
    //     } else{
    //         //좋아요 취소 API 연동 및 상태 갱신
    //         const response = await fetch('/api/like', {
    //             method: 'DELETE',
    //             headers: { 'Content-Type': 'application/json' },
    //             body: JSON.stringify({ postId: post.id, user_Id: userId })
    //         });

    //         const data = await response.json();
    //         setLikeCount(data.likeCount);
    //         setLiked(false);
    //     }
    // }

    // //COMMENT 서버 연결
    // //댓글 목록 조회
    // useEffect(() => {
    //     const fetchComments = async () => {
    //         const response = await fetch(`/api/comments?postId=${post.id}`);
    //         const data = await response.json();
    //         setComments(data);
    //     };

    //     if (post.id) {
    //         fetchComments();
    //     }
    // }, [post.id]);
    // //댓글 작성
    // const handleAddComment = async () => {
    //     if (!newComment.trim()) return;

    //     const response = await fetch('/api/comments', {
    //         method: 'POST',
    //         headers: { 'Content-Type': 'application/json' },
    //         body: JSON.stringify({
    //             post: { id: post.id },
    //             user: { id: userId },
    //             content: newComment
    //         })
    //     });

    //     const newCommentData = await response.json();
    //     setComments(prev => [...prev, newCommentData]);
    //     setNewComment("");
    // };
    // //댓글 삭제
    // const handleDeleteComment = async (commentId) => {
    //     await fetch(`/api/comments/${commentId}`, {
    //         method: 'DELETE'
    //     });

    //     setComments(prev => prev.filter(comment => comment.id !== commentId));
    // };

    return (
        <main className={styles.main}>
            <div className={styles.bar}></div>
            <div className={styles['post-container']}>
                <div className={styles['post-header']}>
                    <div className={styles.writer}>
                        <img src={authorProfile} className={styles['author-profile']} />
                        <div className={styles.author}>{posts.username}</div>
                    </div>
                    <button className={styles['contents-btn']} onClick={() => navigate('/board')}>목차</button>

                </div>
                <div className={styles['post-content']}>
                    <div className={styles['post-title']}>
                        &nbsp;&nbsp;제목 : <span className={styles.title}>{posts.title}</span>
                    </div>
                    <div className={styles['post-body']}>
                        {posts.content}
                    </div>
                </div>
                <div className={styles.meta}>
                    <span className={styles.span}><img className={styles.heart} src={liked ? heartFilled : heart}
                    //onClick={handleLike} 
                    /> {posts.likeCount}
                        {/* {currentLike ? currentLike.likeCount : 0} */}
                    </span>
                    <span className={styles.span}><img className={styles.chat} src={chat} /> {posts.commentCount}</span>
                </div>
                <div className={styles['comment-section']}>

                    <div className={styles['comment-list']}>
                        {filteredComments.length === 0 ? (
                            <p>작성된 댓글이 없습니다. 댓글을 써보세요 지금 당장.</p>
                        ) : (
                            filteredComments.map(comment => (
                                <div className={styles['comment-item']} key={comment.id}>
                                    <img src={authorProfile} alt="user" className={styles['comment-profile']} />
                                    <strong>{comment.user.username}&nbsp;&nbsp;</strong>
                                    {comment.content}
                                    {comment.user?.id === userId && (
                                        <button
                                        //onClick={() => handleDeleteComment(comment.id)}
                                        >삭제</button>
                                    )}
                                </div>
                            ))

                        )}

                    </div>
                    <div className={styles['comment-input-box']}>
                        <input className={styles.commentInput} type="text" placeholder="댓글을 입력하세요..."
                            value={newComment}
                        //onChange={(e) => setNewComment(e.target.value)}
                        />
                        <button className={styles.commentButton}
                        //onClick={handleAddComment}
                        >작성</button>
                    </div>
                </div>
            </div>

        </main>
    );
}

export default Post;