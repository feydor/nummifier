import { useState } from "react";
//import logo from "./logo.svg";
import "./App.css";

let AQ = [
    ["A", 10],
    ["B", 11],
    ["C", 12],
    ["D", 13],
    ["E", 14],
    ["F", 15],
    ["G", 16],
    ["H", 17],
    ["I", 18],
    ["J", 19],
    ["K", 20],
    ["L", 21],
    ["M", 22],
    ["N", 23],
    ["O", 24],
    ["P", 25],
    ["Q", 26],
    ["R", 27],
    ["S", 28],
    ["T", 29],
    ["U", 30],
    ["V", 31],
    ["W", 32],
    ["X", 33],
    ["Y", 34],
    ["Z", 35],
];

let currentGematria = "AQ"; // TODO: Refactor into react state variable (to switch between gematria)

// neoroman nummification
// AQ, GoN, EQ...
// input: neoroman encoded string
// output: number
function gematria(str) {
    let iterations = [];
    let strArr = [...str];
    let finalReduction = strArr.reduce((acc, curr) => {
        let currReduction = AQ.find(
            (gematria) => gematria[0].toLowerCase() === curr.toLowerCase()
        );
        iterations.push(acc + currReduction[1]);
        return acc + currReduction[1];
    }, 0);
    // console.log(finalReduction);
    return finalReduction;
}

// reduces an n digit number by summation
// ex: 78 => 15
// ex: 9999 => 36
// input: n digit number
// output: n-1 digit number
function reduce(num) {
    let arr = [];
    while (num !== 0) {
        let currDigit = num % 10;
        arr.push(currDigit);
        num = Math.trunc(num / 10);
    }
    return arr.reduce((acc, curr) => {
        return acc + curr;
    });
}

// input: neoroman encoded string
// output: array containing a complete digital reduction [n, n-1, n-2, ...]
function toAQ(query) {
    let initialNummificated = gematria(query);
    // reduce until single digit, keep track of reductions
    let reduction = initialNummificated; // initial value
    let reductionHistory = [initialNummificated];
    while (reduction >= 10) {
        reduction = reduce(reduction);
        reductionHistory.push(reduction);
    }
    console.log(reductionHistory);
    return reductionHistory;
}

function QueryBar(props) {
    // handler function for QueryBar
    // extracts input from onChange event, strips it of invalid characters,
    // and calls the appropriate gematric method
    function handleQuery(e) {
        let query = e.target.value;
        query = query.match(/[A-Z]/gi);
        // console.log(query);
        let reductions = [];
        if (query !== null && currentGematria === "AQ")
            reductions = toAQ(query);

        if (reductions.length !== 0) {
            props.setReductions(reductions);
        } else {
            console.log("Gematric encoding failed!");
        }
    }

    return (
        <div id="QueryBar">
            <h2>Query:</h2>
            <input type="text" id="query" name="query" onChange={handleQuery} />
        </div>
    );
}

function Glossary() {
    return (
        <div id="Glossary">
            <h2>Hyperglossolalary</h2>
        </div>
    );
}

function DigitalReductionBars(props) {
    const reductions = props.reductions;
    return (
        <div id="DigitalReductionBars">
            <h2>Digital Reduction:</h2>
            {reductions.map((curr, idx) => (
                <div key={idx} class="DigitalReductionBar">
                    {curr}
                </div>
            ))}
        </div>
    );
}

function App() {
    const [reductions, setReductions] = useState([]);

    return (
        <div className="App">
            <h1 id="title">Abysmal Nummification of the Signifier</h1>
            <QueryBar setReductions={setReductions} />
            <DigitalReductionBars reductions={reductions} />
            <Glossary />
        </div>
    );
}

export default App;
