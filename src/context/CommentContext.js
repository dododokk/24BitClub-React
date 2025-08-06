import React, { createContext, useState, useEffect } from 'react';

export const CommentContext = createContext();

export const CommentProvider = ({ children }) => {
  const [comments, setComments] = useState([]);

  // 초기 댓글 수 로드
  useEffect(() => {
    const fetchComments = async () => {
      const response = await fetch('/api/comments/count');
      const data = await response.json();
      setComments(data);
    };
    fetchComments();
  }, []);

  // 댓글 수 새로고침
  const refreshCommentCount = async (postId) => {
    const response = await fetch(`/api/comments/count?postId=${postId}`);
    const data = await response.json();

    setComments(prev =>
      prev.some(c => c.postId === postId)
        ? prev.map(c => (c.postId === postId ? { ...c, commentCount: data.commentCount } : c))
        : [...prev, { postId, commentCount: data.commentCount }]
    );
  };

  // 댓글 삭제
  const deleteComment = async (commentId, postId) => {
    await fetch(`/api/comments/${commentId}`, {
      method: 'DELETE'
    });
    await refreshCommentCount(postId);
  };

  return (
    <CommentContext.Provider value={{ comments, refreshCommentCount, deleteComment }}>
      {children}
    </CommentContext.Provider>
  );
};
