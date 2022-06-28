import styles from './layout.module.css';

export default function Layout({ children }) {
    const date = new Date();
    const [month, day, year] = [date.getMonth(), date.getDate(), date.getFullYear()]
    return (
    <div>
        <header className={styles.Header}>
            <p>ANS</p>
            <p>{month+1}.{day}.{year}</p>
            <p><em>INDEX</em></p>
        </header>
        {children}
    </div>
    );
}