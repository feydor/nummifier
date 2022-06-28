import styles from './options-bar.module.css';

export default function OptionsBar({ onCipherChange }) {
    function handleOnChange(event) {
        onCipherChange(event.target.value);
    }

    return (
        <div className={styles.optionsBar} class='control' onChange={handleOnChange}>
            <p>cipher: </p>
            <label className={`${styles.label} `}>
                AQ
                <input type='radio' name='cipher' value='aq' defaultChecked/>
            </label>
            <label className={`${styles.label}`}>
                GoN1
                <input type='radio' name='cipher' value='gon1'/>
            </label>
        </div>
    );
}