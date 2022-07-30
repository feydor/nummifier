import Header from "./header";
import styles from "./layout.module.css";

export default function Layout({ children }) {
    return (
        <div className={styles.Margins}>
            <Header />
            {children}
        </div>
    );
}