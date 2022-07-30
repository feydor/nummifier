import Image from '../node_modules/next/image';
import romanize from '../lib/rome';
import styles from './header.module.css';

export default function Header() {
    const date = new Date();
    const [month, day, year] = [date.getMonth(), date.getDate(), date.getFullYear()];
    return (
    <div>
        <header className={styles.Header}>
            <Image src="/images/multi35.jpg" width={35} height={35}/>
            <p>{romanize(month+1)}.{romanize(day)}.{romanize(year)}</p>
        </header>
    </div>
    );
}