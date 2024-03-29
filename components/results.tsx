import styles from './results.module.css';

interface ResultsProps {
    input: string;
    cipher: string;
    reductions: number[];
    xenotations: string;
    matches: string[];
};

const Results = ({ input, cipher, reductions, xenotations, matches }: ResultsProps) => {
    return (
    <div className={`${styles.All}`}>
        <div className={styles.Result}>
            <h4 className={styles.subtitle}>DIGITAL REDUCTION</h4>
            <p>
                {input.length > 0 ? reductions.map(n => `${cipher}-${n}`).join(' = ')
                                  : ""
                }
            </p>
        </div>
        <div className={styles.Result}>
            <h4 className={styles.subtitle}>TIC-XENOTATION</h4>
            <p>{xenotations}</p>
        </div>
        <div className={styles.Result}>
            <h4 className={styles.subtitle}>HYPERGLOSSOLALARY</h4>
                <p>
                    {matches.length === 0 && '{}'}
                    {matches.length !== 0 && '{ '}
                    {matches.filter(x => x !== input)
                            .join(", ")}
                    {matches.length !== 0 && ' }'}
                </p>
        </div>
    </div>
    );
};

export default Results;