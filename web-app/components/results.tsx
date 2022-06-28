
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
            {input} = {reductions.map(n => `${cipher}-${n}`)
                                 .join(' = ')}
        </div>
        <div>
            <h2>Tic-Xenotation</h2>
            {xenotations}
        </div>
        <div>
            <h2>Hyperglossolalary</h2>
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