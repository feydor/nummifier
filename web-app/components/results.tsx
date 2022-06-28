
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
    <div className='section'>
        <div>
            <h2>Digital Reduction</h2>
            {input} = {reductions
                        .map((n, i) => i < reductions.length-1 ? `${cipher}-${n} = `
                                                               : `${cipher}-${n}`)}
        </div>
        <div>
            <h2>Tic-Xenotation</h2>
            {xenotations}
        </div>
        <div>
            <h2>Hyperglossolalary</h2>
            <ul>
                {matches.map(match => input !== match ? <li>{input} = {match}</li> : '')}
            </ul>
        </div>
    </div>
    );
};

export default Results;