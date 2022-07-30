import { Fragment } from "react";
import romanize from '../lib/rome';
export default function CurrentDate() {
    const date = new Date();
    const [month, day, year] = [date.getMonth(), date.getDate(), date.getFullYear()];
    return (
        <Fragment>
            <p style={[{fontSize: "18px"}, {marginTop: "5px"}]}>{romanize(month+1)}.{romanize(day)}.{romanize(year)}</p>
        </Fragment>
    );
}