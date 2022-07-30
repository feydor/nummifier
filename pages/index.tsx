import CurrentDate from '../components/current-date';
import Layout from '../components/layout';
import styles from '../styles/index.module.css';
import Link from '../node_modules/next/link';

export default function Home() {
  return (
    <Layout>
      <ul className={styles.Margins}>
        <p>
          <Link href="/nummifier">
            <a>/nummifier</a>
          </Link>
        </p>
      </ul>
      <CurrentDate />
    </Layout>
  )
}