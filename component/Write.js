import { useNavigate } from "react-router-dom";
import styles from "../style/Write.module.css";
function Write(){
    const navigate = useNavigate();

    return (
    <main>
        <div id={styles.bar}></div>
        <div className={styles['form-container']}>
            
            <label for="title">제목</label>
            <input type="text" name="title"/>
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
            <textarea id={styles.content} name="content"></textarea>

            <div className={styles['btn-container']}>
                <button className={styles['submit-btn']} onClick={()=> navigate('/board')}>등록</button>
            </div>
        </div>
    </main>
    )
}

export default Write;