import { useState, useEffect } from "react";
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

// let currentGematria = "AQ"; // TODO: Refactor into react state variable (to switch between gematria)

// neoroman nummification
// AQ, GoN, EQ...
// input: neoroman encoded string
// output: number
function gematria(str) {
    let iterations = [];
    let strArr = [...str];
    let finalReduction = strArr.reduce((acc, curr) => {
        let currReduction = AQ.find(
            // TODO: dynamic gematria selection
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
    // console.log(reductionHistory);
    return reductionHistory;
}

// sets the query state variable onChange,
// fetches a POST request on button press
function QueryBar(props) {
    const API_URL = "http://localhost:51230/gematria/";

    // handler function for QueryBar
    // extracts input from onChange event, strips it of invalid characters,
    // and sets the Query state variable
    function handleQuery(e) {
        let query = e.target.value;
        props.setQuery(query.match(/[A-Z]/gi));
    }

    useEffect(() => {
        fetch(API_URL, {
            method: "POST",
            header: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ word: props.query, reductions: toAQ(props.query) }),
        }).then((data) => {
            console.log(data); // JSON data parsed by `data.json()` call
        });
    });

    return (
        <div id="QueryBar">
            <h2>Query:</h2>
            <form>
                <input
                    type="text"
                    id="query"
                    name="query"
                    onChange={handleQuery}
                />
                <button type="submit">Save</button>
            </form>
        </div>
    );
}

// fetches a GET request on query state variable change
function Glossary(props) {
    // const [isLoading, setIsLoading] = useState(false);
    const API_URL = "http://localhost:51230/gematria/";
    const DEFAULT_QUERY = 140;

    useEffect(
        (props) => {
            fetch(API_URL + DEFAULT_QUERY, {
                method: "GET",
                header: new Headers({
                    Acccept: "application/gematria",
                }),
            })
                .then((res) => res.json())
                .then((response) => {
                    // do stuff with response.items
                    props.setGlossaryWords(response.items);
                })
                .catch((error) => console.log(error));
        },
        [props.query]
    );

    return (
        <div id="Glossary">
            <h2>Hyperglossolalary</h2>
            {props.glossaryWords === null ? (
                <div>Pending response...</div>
            ) : (
                props.glossaryWords.map((elem) => {
                    return <div>{elem}</div>;
                })
            )}
        </div>
    );
}

// re-renders on Query state change
// assumes QueryBar us handling input stripping
function DigitalReductionBars(props) {
    return (
        <div id="DigitalReductionBars">
            <h2>Digital Reduction:</h2>
            {props.query === null ? (
                <div>Pending input...</div>
            ) : (
                toAQ(props.query).map((curr, idx) => (
                    <div key={idx} className="DigitalReductionBar">
                        {curr}
                    </div>
                ))
            )}
        </div>
    );
}

function App() {
    const [glossaryWords, setGlossaryWords] = useState(null);
    const [query, setQuery] = useState(null);

    return (
        <div className="App">
            <h1 id="title">Abysmal Nummification of the Signifier</h1>
            <QueryBar setQuery={setQuery} query={query} />
            <DigitalReductionBars query={query} />
            <Glossary
                query={query}
                glossaryWords={glossaryWords}
                setGlossaryWords={setGlossaryWords}
            />
        </div>
    );
}

export default App;
