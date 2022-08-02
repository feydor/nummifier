import { Fragment } from "react";
import romanize from '../lib/rome';
import pzcalc from "../lib/pzcal";
import styles from './current-date.module.css';
export default function CurrentDate() {
    const date = new Date();
    const [month, day, year] = [date.getMonth(), date.getDate(), date.getFullYear()];
    return (
        <Fragment>
            <p className={styles.Date}>{romanize(month+1)}.{romanize(day)}.{romanize(year)}</p>
            {pzcalc().map(s => <p>{s}</p>)}
        </Fragment>
    );
}