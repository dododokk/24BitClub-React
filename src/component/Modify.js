import { useLocation, useNavigate } from "react-router-dom";
import styles from "../style/Modify.module.css";
import { useEffect, useState } from "react";

function Modify() {
    const location = useLocation();
    // 현재 페이지의 URL 정보와 함께 이동할 때 전달된 데이터(state)를 읽을 수 있게 해줌.
    const navigate = useNavigate();
    const { id, userId } = location.state || {};

    const [newTitle, setNewTitle] = useState("");
    const [newContent, setNewContent] = useState("");

    useEffect(() => {
        if (id && userId) {
            //id랑 userId 넘기고 해당 포스트 내용 받기.
            const tempData = [
                {
                    id: 1,
                    user: {
                        id: 1,
                        username: userId,
                        password: "pass123",
                    },
                    title: "공지사항",
                    createdAt: "2025-07-30",
                    content: "하기싫다아ㅏ아ㅏ",
                    likeCount: 10,
                    commentCount: 2
                },
                {
                    id: 2,
                    user: {
                        id: 1,
                        username: userId,
                        password: "pass123",
                    },
                    title: "24BCBP",
                    createdAt: "2025-07-31",
                    content: "BCBP 조롱하지 마라",
                    likeCount: 5,
                    commentCount: 1
                }
            ];
            const targetPost = tempData.find((p) => p.id === id);
            setNewTitle(targetPost.title);
            setNewContent(targetPost.content);
        }
    },[]);

    const handleSubmit = ()=>{
        //서버로 수정 요청 보내기. id, userId, newTitle, newContent 활용
        navigate("/mypage");
    }

    return (
        <main>
            <div id={styles.bar}></div>
            <div className={styles['form-container']}>

                <label for="title">제목</label>
                <input type="text" name="title" value={newTitle}
                onChange={(e)=>setNewTitle(e.target.value)}/>
                <label for="content">내용</label>
                <div className={styles['editor-toolbar']}>
                    <select>
                        <option>글자 크기</option>
                        <option value="small">작게</option>
                        <option value="medium">보통</option>
                        <option value="large">크게</option>
                    </select>
                    <button><b>B</b></button>
                    <button><i>I</i></button>
                    <button><u>U</u></button>
                </div>
                <textarea id={styles.content} name="content" value={newContent}
                onChange={(e)=>setNewContent(e.target.value)} />
                <div className={styles['btn-container']}>
                    <button className={styles['submit-btn']} onClick={handleSubmit}>수정</button>
                </div>
            </div>
        </main>
    )
}

export default Modify;