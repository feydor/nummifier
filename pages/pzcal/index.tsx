import Link from 'next/link';
import pzcalc from "../../lib/pzcal";

export default function Pzcal() {
    return (
        <div style={{marginLeft: "10px"}}>
            {pzcalc().map(s => <p key={s}>{s}</p>)}
            <footer>
                <p>
                <Link href="/">
                    <a>/</a>
                </Link>
                </p>
            </footer>
        </div>
    );
}
