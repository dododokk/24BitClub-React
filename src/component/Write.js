import { useNavigate, useLocation } from "react-router-dom";
import { useRef, useState } from "react";
import styles from "../style/Write.module.css";
function Write() {
    const navigate = useNavigate();
    const location = useLocation();
    const inputRef = useRef(null);
    const { userId } = location.state || {};
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");

    const applyStyle = (command, value = null) => {
        document.execCommand(command, false, value);
        inputRef.current.focus();
    };

    const handleSubmit = async () => {
        setContent(inputRef.current.innerHTML);
        if(title===""){
            alert("제목을 입력해주세요.");
            return;
        }
        
        navigate('/board');
        // 서버 보내기
        // try{
        //     const response = await fetch(
        //         `/api/posts?userId=${userId}&title=${encodeURIComponent(title)}`,
        //         {
        //             method: "POST",
        //             headers:{
        //                 "Content-Type":"application/json",
        //             },
        //             body: JSON.stringify({content}),
        //         }
        //     );

        //     if(response.ok){
        //         navigate('/board');
        //     }
        // }catch(error){
        //     console.error("Error: ", error);
        // }
    }

    return (
        <main>
            <div id={styles.bar}></div>
            <div className={styles['form-container']}>

                <label for="title">제목</label>
                <input type="text" name="title" value={title}
                    onChange={(e) => setTitle(e.target.value)} />
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
                    onInput={(e) => setContent(e.currentTarget.innerHTML)}
                // dangerouslySetInnerHTML={{ __html: newContent }}
                ></div>

                <div className={styles['btn-container']}>
                    <button className={styles['submit-btn']} onClick={handleSubmit}>등록</button>
                </div>
            </div>
        </main>
    )
}

export default Write;