import styles from './results.module.css';

interface ResultsProps {
    input: string;
    cipher: string;
    reductions: number[];
    xenotations: string;
    matches: string[];
    onEmpty: () => void;
};

const Results = ({ input, cipher, reductions, xenotations, matches, onEmpty }: ResultsProps) => {
    if (reductions.length == 0) {
        onEmpty();
    }

    return (
    <div className={`${styles.All}`}>
        <div>
            <h2 className={styles.subtitle}><em>DIGITAL REDUCTION</em></h2>
            {input} = {reductions.map(n => `${cipher}-${n}`)
                                 .join(' = ')}
        </div>
        <div>
            <h2 className={styles.subtitle}><em>TIC-XENOTATION</em></h2>
            {xenotations}
        </div>
        <div>
            <h2 className={styles.subtitle}><em>HYPERGLOSSOLALARY</em></h2>
            <ul>
                {matches.length === 0 && '∅'}
                {matches.length !== 0 && '{ '}
                {matches.filter(x => x !== input)
                        .join(", ")}
                {matches.length !== 0 && ' }'}
            </ul>
        </div>
    </div>
    );
};

export default Results;