import CurrentDate from '../components/current-date';
import Layout from '../components/layout';
import styles from '../styles/index.module.css';

export default function Home() {
  return (
    <Layout>
      <ul className={styles.Margins}>
        <p><a href="/nummifier">/nummifier</a></p>
      </ul>
      <CurrentDate />
    </Layout>
  )
}