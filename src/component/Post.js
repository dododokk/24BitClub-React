import React, { useContext, useState, useEffect, useRef, use } from "react";
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
import testUtils from "react-dom/test-utils";



function Post() {
    const navigate = useNavigate();
    const {state} = useLocation();
    const postId = state?.postId;
    const {userId} = useContext(UserContext);

    const [post, setPost] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const [likeCount, setLikeCount] = useState(0);
    const [liked, setLiked] = useState(false);
    const [likePending, setLikePending] = useState(false); // 중복 클릭 방지

    const [comments, setComments] = useState([]);
    const [commentsLoading, setCommentsLoading] = useState(true);
    const [commentsError, setCommentsError] = useState(null);
    const [newComment, setNewComment] = useState('');
    const [submitPending, setSubmitPending] = useState(false);
    const listRef = useRef(null);

    useEffect(() =>{
        if(!postId){
            navigate('/board');
            return;
        }

        const fetchPost = async () => {
            try{
                setLoading(true);
                setError(null);

                const res = await fetch(`http://localhost:8080/api/posts/${postId}`);
                if(!res.ok) throw new Error('게시글 조회 실패');
                const data = await res.json();

                setPost(data);
                setLikeCount(data.likeCount ?? 0);
                setLiked(Boolean(data.likedByMe));
            }catch(e){
                setError(e.message || '에러 발생');
            }finally{
                setLoading(false);
            }
        }
        fetchPost();
    }, [postId, navigate]);

    useEffect(() => {
        if(!postId) return;
        const fetchComments = async () => {
            try{
                setCommentsLoading(true);
                setCommentsError(null);

                const res = await fetch(`http://localhost:8080/api/posts/${postId}/comments?sort=asc`);
                if(!res.ok) throw new Error('댓글 목록 조회 실패');
                const data = await res.json();
                setComments(data);
            }catch(e){
                setCommentsError(e.message || '댓글을 불러오지 못했습니다.');
            }finally{
                setCommentsLoading(false);
            }
        }
        fetchComments();
    }, [postId]);

    if (loading) return <main className={styles.main}><p>불러오는 중…</p></main>;
    if (error)   return <main className={styles.main}><p>{error}</p></main>;
    if (!post)   return <main className={styles.main}><p>글을 찾을 수 없어요.</p></main>;

    const handleLikeToggle = async () => {
        if(likePending) return;
        if(!userId){
            alert('로그인 필요');
            return;
        }
        const prevLiked = liked;
        const prevCount = likeCount;
        setLikePending(true);

        if(!liked){
            setLiked(true);
            setLikeCount((c) => c+1);
        }else{
            setLiked(false);
            setLikeCount((c) => Math.max(0, c-1));
        }

        try{
            let res;
            if(!prevLiked){
                res = await fetch(`http://localhost:8080/api/posts/${postId}/like`, {
                    method: 'POST',
                    headers: {'Content-Type':'application/json'},
                    body: JSON.stringify({postId, userId}),
                });
            }else{
                res = await fetch(`/api/posts/${postId}/like`, {
                    method: 'DELETE',
                    headers: {'Content-Type':'application/json'},
                })
            }

            if(!res.ok) throw new Error('좋아요 처리 실패');
            const data = await res.json();
            setLikeCount(data.likeCount);
            setLiked(!prevLiked);//최종상태확정
        }catch(e){
            setLiked(prevLiked);
            setLikeCount(prevCount);
            console.error(e);
            alert('좋아요 처리 오류 발생');
        }finally{
            setLikePending(false);
        }
    }


    const handleAddComment = async () => {
        if(!newComment.trim()) return;
        if(!userId){
            alert('로그인이 필요한 작업입니다.');
            return;
        }
        try{
            setSubmitPending(true);

            const res = await fetch('http://localhost:8080/api/posts/${postId}/comments', {
                method: 'POST',
                headers: {'Content-Type':'application/json'},
                body: JSON.stringify({
                    user: {id: userId},
                    content: newComment,
                })
            });
            if(!res.ok) throw new Error('댓글 작성 실패');

            const created = await res.json();
            const normalized = {
                commentid: created.id,
                userId: created.user?.id,
                username: created.username,
                content: created.content,
                createdAt: created.createdAt?.replace('T', ' ').slice(0, 16) || '',
                mine: true,
            };

            setComments(prev => [...prev, normalized]);
            setNewComment('');
            setTimeout(() => {
                listRef.current?.scrollTo({
                    top: listRef.current.scrollHeight,
                    behavior: 'smooth',
                });
            }, 0);
        }catch(e){
            console.error(e);
            alert(e.message || '오류 발생');
        }finally {
            setSubmitPending(false);
        }
    }

    const handleDeleteComment = async(commentId)=>{
        if(!window.confirm('정말 삭제하시겠습니까???!!?!!')) return;
        try{
            const res = await fetch(`/api/posts/${postId}/comments/${commentId}`,{
                method: 'DELETE'
            })
            if(!res.ok) throw new Error('댓글 삭제 실패');
            setComments(prev => prev.filter(c=> c.commentid != commentId));
        }catch(e){
            console.error(e);
            alert(e.message || '댓글 삭제 중 오류 발생');
        }
    }
    
    return (
        <main className={styles.main}>
            <div className={styles.bar}></div>
            <div className={styles['post-container']}>
                <div className={styles['post-header']}>
                    <div className={styles.writer}>
                        <img src={authorProfile} className={styles['author-profile']} />
                        <div className={styles.author}>{post.username}</div>
                    </div>
                    <button className={styles['contents-btn']} onClick={() => navigate('/board')}>목차</button>

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
                    <span className={styles.span}>
                        <img className={styles.heart} src={liked ? heartFilled : heart} onClick={handleLikeToggle} /> 
                        {post.likeCount}
                    </span>
                    <span className={styles.span}><img className={styles.chat} src={chat} /> {post.commentCount}</span>
                </div>
                <div className={styles['comment-section']}>
                    <div ref={listRef} className={styles['comment-list']}>
                        {commentsLoading && <p>댓글 불러오는 중...</p>}
                        {commentsError && <p>{commentsError}</p>}
                        {!commentsLoading && !commentsError && comments.length === 0 && (
                            <p>작성된 댓글이 없습니다. 댓글을 써보세요 지금 당장.</p>
                        )}
                        {!commentsLoading && !commentsError && comments.map((c)=>(
                            <div key = {c.commentid} className={styles['comment-item']}>
                                <img src={authorProfile} alt="user" className={styles['comment-profile']} />
                                <strong>{c.username}</strong>&nbsp;&nbsp;
                                {c.content}
                                {c.mine && (
                                    <button onClick={() => handleDeleteComment(c.commentid)}>삭제</button>
                                )}
                            </div>
                        ))}                            
                    </div>
                    <div className={styles['comment-input-box']}>
                        <input className={styles.commentInput} type="text" placeholder="댓글을 입력하세요..."
                            value={newComment} onChange={(e) => setNewComment(e.target.value)} disabled={submitPending}/>
                        <button className={styles.commentButton} onClick={handleAddComment} disabled={submitPending || !newComment.trim()}
                        >작성</button>
                    </div>
                </div>
            </div>

        </main>
    );
}

export default Post;