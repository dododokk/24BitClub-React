import { useLocation, useNavigate } from "react-router-dom";
import styles from "../style/Modify.module.css";
import { useEffect, useState, useRef } from "react";

function Modify() {
    const location = useLocation();
    // 현재 페이지의 URL 정보와 함께 이동할 때 전달된 데이터(state)를 읽을 수 있게 해줌.
    const navigate = useNavigate();
    const inputRef = useRef(null);
    // const { post } = location.state || {};
    // const [currentPost, setCurrentPost] = useState(post || {});
    const { postId, userId } = location.state || {};

    const [newTitle, setNewTitle] = useState("");
    const [newContent, setNewContent] = useState("");
    const [fontSize, setFontSize] = useState("");

    useEffect(() => {
        if (postId && userId) {
            //id랑 userId 넘기고 해당 포스트 내용 받기.
            fetch(`https://miraculous-sparkle-production.up.railway.app/api/posts/${postId}`)
                .then(res => res.json())
                .then(data => {
                    setNewTitle(data.title);
                    setNewContent(data.content);

                    if (inputRef.current) {
                        inputRef.current.innerHTML = data.content;
                    }
                })
                .catch(err => console.error("포스트 불러오기 실패:", err));
        }
    }, []);

    const handleSubmit = async () => {
        const latestContent = inputRef.current.innerHTML;

        try {
            const response = await fetch(
                `https://miraculous-sparkle-production.up.railway.app/api/posts/${postId}`,
                {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                        "X-USER-ID": userId // 백엔드에서 @RequestHeader로 받음
                    },
                    body: JSON.stringify({
                        title: newTitle,
                        content: latestContent
                    })
                }
            );

            if (!response.ok) {
                throw new Error("게시글 수정 실패");
            }

            const result = await response.json();
            console.log("수정 성공:", result);

            navigate("/mypage");
        } catch (err) {
            console.error("에러 발생:", err);
        }
    };

    const applyStyle = (command, value = null) => {
        document.execCommand(command, false, value);
        inputRef.current.focus();
    };

    return (
        <main>
            <div id={styles.bar}></div>
            <div className={styles['form-container']}>

                <label htmlFor="title">제목</label>
                <input type="text" name="title" value={newTitle}
                    onChange={(e) => setNewTitle(e.target.value)} />
                <label htmlFor="content">내용</label>
                <div className={styles['editor-toolbar']}>
                    <select
                        value={fontSize}
                        onChange={(e) => {
                            setFontSize(e.target.value);
                            applyStyle('fontSize', e.target.value)
                        }}>
                        <option value="" disabled hidden>글자 크기</option>
                        <option value="1">작게</option>
                        <option value="3">보통</option>
                        <option value="5">크게</option>
                    </select>
                    <button onClick={() => applyStyle('bold')}><b>B</b></button>
                    <button onClick={() => applyStyle('italic')}><i>I</i></button>
                    <button onClick={() => applyStyle('underline')}><u>U</u></button>
                </div>
                <div
                    ref={inputRef}
                    id={styles.content}
                    contentEditable
                    suppressContentEditableWarning={true}
                    onInput={(e) => setNewContent(e.currentTarget.innerHTML)}
                ></div>
                <div className={styles['btn-container']}>
                    <button className={styles['submit-btn']} onClick={handleSubmit}>수정</button>
                </div>
            </div>
        </main>
    )
}

export default Modify;