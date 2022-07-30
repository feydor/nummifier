import Image from '../node_modules/next/image';
import styles from './header.module.css';

export default function Header() {
    return (
    <div>
        <header className={styles.Header}>
            <p>slithy toves</p>
        </header>
    </div>
    );
}