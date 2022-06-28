import styles from './options-bar.module.css';

export default function OptionsBar({ onCipherChange }) {
    function handleOnChange(event) {
        onCipherChange(event.target.value);
    }

    return (
        <div className={`${styles.optionsBar}`} onChange={handleOnChange}>
            <p>CIPHER - </p>
            <label className={`${styles.label} `}>
                {'AQ '}
                <input type='radio' name='cipher' value='AQ' defaultChecked/>
            </label>
            <label className={`${styles.label}`}>
                {'GoN1 '}
                <input type='radio' name='cipher' value='GoN1'/>
            </label>
        </div>
    );
}