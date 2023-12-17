import styles from './options-bar.module.css';

export default function OptionsBar({ onCipherChange, onExportClick }) {

    function handleOnChange(event) {
        onCipherChange(event.target.value);
    }

    function handleOnExportClick(event) {
        onExportClick();
    }

    function cipherRadioButton(cipher, checked=false) {
        return (
        <div key={`cipherRadioButton-${cipher}`} className={`${styles.radioContainer}`}>
            <input id={`radio-${cipher}`} type='radio' name='cipher' value={`${cipher}`} defaultChecked={checked}/>
            <label htmlFor={`radio-${cipher}`}>{`${cipher} `}</label>
        </div>
        );
    }

    return (
        <div className={`${styles.optionsBar}`} onChange={handleOnChange}>
            <p>CIPHER:</p>
            {['AQ', 'Synx', 'EO', 'GoN1'].map(cipher => cipherRadioButton(cipher, cipher == 'AQ'))}
            <p>EXPORT:</p>
            <button onClick={handleOnExportClick}>JSON</button>
        </div>
    );
}
