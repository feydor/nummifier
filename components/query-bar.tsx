import { Fragment, useRef } from 'react';
import styles from './query-bar.module.css';

interface QueryBarProps {
    input: string;
    onInputChange: (s: string) => void;
    onClear: () => void;
    onSubmit: (s: string) => void;
};

export default function QueryBar({ input, onInputChange, onClear, onSubmit}: QueryBarProps) {
    const inputRef = useRef<HTMLTextAreaElement>(null);
    const MAX_INPUT = 333;

    function handleQuery(e) {
        if (e.keyCode === 13 && e.shiftKey === false) {
            e.preventDefault();
            onSubmit(inputRef.current.value);
        }

    }

    // handles input sanitizing
    function handleOnChange() {
        const isNotAlphaNum = /[^A-Za-z0-9\s]/g;
        inputRef.current.value = inputRef.current.value.replace(isNotAlphaNum, '').toUpperCase();
        onInputChange(inputRef.current.value);
    }

    function handleOnClear() {
        inputRef.current.value = "";
        onClear();
    }

    return (
        <div className={styles.All}>
            <form onSubmit={handleQuery}>
                <textarea
                    ref={inputRef}
                    maxLength={MAX_INPUT}
                    autoComplete='off'
                    onChange={handleOnChange}
                    onKeyDown={handleQuery}
                    className={`${styles.textInput}`}/>
            </form>
            <button className={styles.clearButton} onClick={handleOnClear}>∅</button>
        </div>
    );
}