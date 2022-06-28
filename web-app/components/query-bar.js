import { useRef } from 'react';
import styles from './query-bar.module.css';

const MAX_INPUT = 30;
const isNotAlphaNum = /[^A-Za-z|^" "]/g;

export default function QueryBar({ input, onInputChange, onSubmit}) {
    const inputRef = useRef();

    function clear() {
        onInputChange('');
    }

    function handleQuery(event) {
        event.preventDefault();
        onSubmit(inputRef.current.value);
        inputRef.current.value = '';
    }

    // handles input sanitizing
    function handleOnChange() {
        onInputChange(inputRef.current.value.replace(isNotAlphaNum, '').trim());
    }

    return (
        <form className={styles.form} onSubmit={handleQuery}>
            <input type="text"
                ref={inputRef}
                size={MAX_INPUT/2}
                maxLength={MAX_INPUT}
                autoComplete='off'
                value={input}
                onChange={handleOnChange}
                className={styles.input}/>
            <button className={styles.button}>INPUT</button>
            <button className={styles.button} onClick={clear}>CLEAR</button>
        </form>
    );
}