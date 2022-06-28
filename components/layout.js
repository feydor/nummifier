import Image from '../node_modules/next/image';
import styles from './layout.module.css';

export default function Layout({ children }) {
    const date = new Date();
    const [month, day, year] = [date.getMonth(), date.getDate(), date.getFullYear()]
    return (
    <div>
        <header className={styles.Header}>

            <Image src="/images/multi35.jpg" width={35} height={35}/>
            <p>{month+1}.{day}.{year}</p>
            <p><em>INDEX</em></p>
            
        </header>
        {children}
    </div>
    );
}