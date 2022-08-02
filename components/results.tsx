import { useEffect, useState } from 'react';
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
        <div className={styles.Result}>
            <h4>(define X &apos;{input})</h4>
        </div>
        <div className={styles.Result}>
            <h4 className={styles.subtitle}>(DIGITAL REDUCTION X) </h4>
            <p>
                = {reductions.map(n => `${cipher}-${n}`)
                                    .join(' = ')}
            </p>
        </div>
        <div className={styles.Result}>
            <h4 className={styles.subtitle}>(TIC-XENOTATION X) </h4>
            <p> = {xenotations}</p>
        </div>
        <div className={styles.Result}>
            <h4 className={styles.subtitle}>(HYPERGLOSSOLALARY X)</h4>
                <p>
                    {' = '}
                    {matches.length === 0 && '∅'}
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