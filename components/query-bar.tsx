import { Fragment, useRef } from 'react';
import styles from './query-bar.module.css';

interface QueryBarProps {
    input: string;
    onInputChange: (s: string) => void;
    onClear: () => void;
    onSubmit: (s: string) => void;
};

export default function QueryBar({ input, onInputChange, onClear, onSubmit}: QueryBarProps) {
    const inputRef = useRef<HTMLInputElement>(null);
    const MAX_INPUT = 30;

    function handleQuery(event) {
        event.preventDefault();
        onSubmit(inputRef.current.value);
        inputRef.current.value = '';
    }

    // handles input sanitizing
    function handleOnChange() {
        const isNotAlphaNum = /[^A-Za-z|^" "]/g;
        onInputChange(inputRef.current.value.replace(isNotAlphaNum, '').trim());
    }

    return (
        <div className={styles.flexRow}>
            <form className={styles.flexRow} onSubmit={handleQuery}>
                <input type="text"
                    ref={inputRef}
                    size={MAX_INPUT}
                    maxLength={MAX_INPUT}
                    autoComplete='off'
                    value={input}
                    onChange={handleOnChange}
                    className={styles.input}/>
                <button className={styles.button}>INPUT</button>
            </form>
            <button className={styles.button} onClick={() => onClear()}>CLEAR</button>
        </div>
    );
}