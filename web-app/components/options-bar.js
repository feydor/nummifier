import styles from './options-bar.module.css';

export default function OptionsBar() {
    return (
        <div className={styles.optionsBar} class='control'>
            <p>cipher: </p>
            <label className={`${styles.label} `}>
                AQ
                <input type='radio' name='cipher' defaultChecked/>
            </label>
            <label className={`${styles.label}`}>
                GoN1
                <input type='radio' name='cipher'/>
            </label>
        </div>
    );
}