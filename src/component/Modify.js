import { useLocation, useNavigate } from "react-router-dom";
import styles from "../style/Modify.module.css";
import { useEffect, useState, useRef } from "react";

function Modify() {
    const location = useLocation();
    // 현재 페이지의 URL 정보와 함께 이동할 때 전달된 데이터(state)를 읽을 수 있게 해줌.
    const navigate = useNavigate();
    const inputRef = useRef(null);
    const { post } = location.state || {};
    const [currentPost, setCurrentPost] = useState(post || {});
    // const { id, userId } = location.state || {};

    const [newTitle, setNewTitle] = useState("");
    const [newContent, setNewContent] = useState("");

    useEffect(() => {
        if (post) {
            setCurrentPost(post);
            setNewTitle(currentPost.title);
            setNewContent(currentPost.content);

            if (inputRef.current) {
                inputRef.current.innerHTML = post.content;
            }
        }
    }, [post]);
    // useEffect(() => {
    //     if (id && userId) {
    //         //id랑 userId 넘기고 해당 포스트 내용 받기.
    //         const tempData = [
    //             {
    //                 id: 5,
    //                 user: {
    //                     id: 1,
    //                     username: "정화진",
    //                     password: "pass123",
    //                 },
    //                 title: "공지사항",
    //                 createdAt: "2025-07-26",
    //                 content: "아오진짜로 개힘들 아 엄살이아니고 아 엄살인가 모르겠는데 개빡치고 잦응나",
    //                 likeCount: 10,
    //                 commentCount: 2
    //             },
    //             {
    //                 id: 6,
    //                 user: {
    //                     id: 2,
    //                     username: "tlqkf",
    //                     password: "pass123",
    //                 },
    //                 title: "긴제목을만들어보기위해",
    //                 createdAt: "2025-08-26",
    //                 content: "BCBP 조롱하지 마라",
    //                 likeCount: 5,
    //                 commentCount: 1
    //             }
    //         ];
    //         const targetPost = tempData.find((p) => p.id === id);
    //         setNewTitle(targetPost.title);
    //         setNewContent(targetPost.content);
    //     }
    // },[]);

    const handleSubmit = async () => {
        setNewContent(inputRef.current.innerHTML);
        const postId = currentPost.id;
        const userId = currentPost.user.id;

        // try {
        //     const response = await fetch(
        //         `/api/posts/${postId}?userId=${userId}&title=${encodeURIComponent(newTitle)}`,
        //         {
        //             method: "PUT",
        //             headers: {
        //                 "Content-Type": "application/json"
        //             },
        //             body: JSON.stringify({
        //                 content: newContent
        //             })
        //         }
        //     );

        //     if (!response.ok) {
        //         throw new Error("게시글 수정 실패");
        //     }

        //     const result = await response.json();
        //     console.log("수정 성공:", result);

        //     navigate("/mypage");
        // }catch(err){
        //     console.error("에러 발생:",err);
        // }
        // 서버로 수정 요청 보내기
    };

    const applyStyle = (command, value = null) => {
        document.execCommand(command, false, value);
        inputRef.current.focus();
    };

    return (
        <main>
            <div id={styles.bar}></div>
            <div className={styles['form-container']}>

                <label for="title">제목</label>
                <input type="text" name="title" value={newTitle}
                    onChange={(e) => setNewTitle(e.target.value)} />
                <label for="content">내용</label>
                <div className={styles['editor-toolbar']}>
                    <select onChange={(e) => applyStyle('fontSize', e.target.value)}>
                        <option value="" disabled hidden selected>글자 크기</option>
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
                // dangerouslySetInnerHTML={{__html: newContent}}
                ></div>
                {/* <textarea id={styles.content} name="content" value={newContent}
                onChange={(e)=>setNewContent(e.target.value)} /> */}
                <div className={styles['btn-container']}>
                    <button className={styles['submit-btn']} onClick={handleSubmit}>수정</button>
                </div>
            </div>
        </main>
    )
}

export default Modify;