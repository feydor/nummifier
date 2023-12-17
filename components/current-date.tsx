import { romanize, testRomanize } from '../lib/rome';
import styles from './current-date.module.css';
export default function CurrentDate() {
    const date = new Date();
    const [month, day, year] = [date.getMonth(), date.getDate(), date.getFullYear()];
    return (
        <>
            <p className={styles.Date}>
                {romanize(month+1)}.{romanize(day)}.{romanize(year)}
            </p>
        </>
    );
}