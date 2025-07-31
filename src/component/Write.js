import { useNavigate } from "react-router-dom";
import { useRef } from "react";
import styles from "../style/Write.module.css";
function Write() {
    const navigate = useNavigate();
    const inputRef = useRef(null);

    const applyStyle = (command, value = null) => {
        document.execCommand(command, false, value);
        inputRef.current.focus();
    };

    return (
        <main>
            <div id={styles.bar}></div>
            <div className={styles['form-container']}>

                <label for="title">제목</label>
                <input type="text" name="title" />
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
                // onInput={(e)=>setNewContent(e.currentTarget.innerHTML)}
                // dangerouslySetInnerHTML={{ __html: newContent }}
                ></div>

                <div className={styles['btn-container']}>
                    <button className={styles['submit-btn']} onClick={() => navigate('/board')}>등록</button>
                </div>
            </div>
        </main>
    )
}

export default Write;