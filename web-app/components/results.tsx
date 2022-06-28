
interface ResultsProps {
    input: string;
    reductions: number[];
    xenotations: string;
    onEmpty: () => void;
};

const Results = ({ input, reductions, xenotations, onEmpty }: ResultsProps) => {
    if (reductions.length == 0) {
        onEmpty();
    }

    return (
    <div className='section'>
        <div>
            <h2>Digital Reduction</h2>
            {input} = {reductions
                        .map((n, i) => i < reductions.length-1 ? `AQ-${n} = ` : `AQ-${n}`)}
        </div>
        <div>
            <h2>Tic-Xenotation</h2>
            {xenotations}
        </div>
    </div>
    );
};

export default Results;