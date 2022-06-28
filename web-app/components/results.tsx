
interface ResultsProps {
    input: string;
    reductions: number[];
    xenotations: string;
};

const Results = ({ input, reductions, xenotations }: ResultsProps) => {
    return (
    <div className='section'>
        <div>
            <h2>Digital Reduction</h2>
            {input} = {reductions.map(num => `AQ-${num} `)}
        </div>
        <div>
            <h2>Tic-Xenotation</h2>
            {xenotations}
        </div>
    </div>
    );
};

export default Results;