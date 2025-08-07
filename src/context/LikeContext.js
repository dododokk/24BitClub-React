import React, { createContext, useState, useEffect } from 'react';

export const LikeContext = createContext();

export const LikeProvider = ({ children }) => {
  const [likes, setLikes] = useState([]);

  // 초기 좋아요 데이터 불러오기
  useEffect(() => {
    const fetchLikes = async () => {
      const response = await fetch('/api/likes');
      const data = await response.json();
      setLikes(data);
    };
    fetchLikes();
  }, []);

  // 좋아요 토글
  const toggleLike = async (postId, userId, liked) => {
    if (!liked) {
      const response = await fetch('/api/like', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ postId, user_Id: userId })
      });
      const data = await response.json();
      updateLikeCount(postId, data.likeCount);
    } else {
      const response = await fetch('/api/like', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ postId, user_Id: userId })
      });
      const data = await response.json();
      updateLikeCount(postId, data.likeCount);
    }
  };

  const updateLikeCount = (postId, likeCount) => {
    setLikes(prev =>
      prev.map(like => (like.postId === postId ? { ...like, likeCount } : like))
    );
  };

  return (
    <LikeContext.Provider value={{ likes, toggleLike }}>
      {children}
    </LikeContext.Provider>
  );
};
