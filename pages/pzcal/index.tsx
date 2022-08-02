import { Fragment } from "react";
import pzcalc from "../../lib/pzcal";

export default function Pzcal() {
    return (
        <Fragment>
            {pzcalc().map(s => <p>{s}</p>)}
        </Fragment>
    );
}