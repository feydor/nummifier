import { useEffect, useState } from "react";
import numogram from './numogram.png'
import "./App.css";

const API_URL = "http://localhost:44243/gematria/";

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
// output: number, or 0 if error
function gematria(str) {
    // test for invalid input
    // empty string (null or undefined), whitespace, number, array, object (in that order)
    if (str === undefined || str === null || str.length === 0) {
        //~ console.error("ERROR: \'" + str + "\'" + "is empty or null.");
        return 0;
    } else if (/\s/.test(str)) {
        //~ console.error("ERROR: \'" + str + "\'" + "contains whitespace.");
        return 0;
    } else if (/\d/.test(str)) {
        //~ console.error("ERROR: \'" + str + "\'" + "contains a number.");
        return 0;
    } else if (Array.isArray(str)) {
        //~ console.error("ERROR: \'" + str + "\'" + "is an array.");
        return 0;
    } else if (typeof str === 'object') {
        //~ console.error("ERROR: \'" + str + "\'" + "is an object.");
        return 0;
    }

    let strArr = [...str];
    // console.log(finalReduction);
    return strArr.reduce((acc, curr) => {
        let currReduction = AQ.find(
            // TODO: dynamic gematria selection
            (gematria) => gematria[0].toLowerCase() === curr.toLowerCase()
        );
        return acc + currReduction[1];
    }, 0);
}

// reduces an n digit number by summation
// ex: 78 => 15
// ex: 9999 => 36
// input: positive n digit number
// output: positive n-1 digit number
//~ function reduceNonNegative(num) {
//~ let arr = [];
//~ // add each seperate digit into arr
//~ // ex: 999 => [9, 9, 9]
//~ while (num !== 0) {
//~ let currDigit = num % 10;
//~ arr.push(currDigit);
//~ num = Math.trunc(num / 10);
//~ }
//~ // sum up the digits in arr
//~ return arr.reduce((acc, curr) => {
//~ return acc + curr;
//~ });
//~ }

// reduces an n digit number by summation
// ex: 78 => 15
// ex: 9999 => 36
// input: n digit number
// output: n-1 digit number
function reduce(num) {
    let arr = [];
    // stringify num and spread into an array,
    // split each char into a separate nested array,
    // parse ints and push into arr
    let parsedArr = [...num.toString()];
    let nestedparsedArr = parsedArr.map((elem) => {
        return [elem];
    });
    // takes the first two elements (the leading digit and the number's sign)
    // and concatenates them at the front of the array
    // example input: -123
    if (num < 0) {
        let flippedSignNum = nestedparsedArr[0].concat(nestedparsedArr[1]).join(""); // output: "-1"
        nestedparsedArr = nestedparsedArr.slice(2); // slice off the first two characters
        nestedparsedArr = [flippedSignNum, ...nestedparsedArr]; // attach flippedSign to nestedArr
    }
    nestedparsedArr.forEach((char) => {
        arr.push(parseInt(char));
    });
    // sum up the digits in arr
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
    let reductionHistory = [initialNummificated]; // add initial value to history array
    while (reduction >= 10) { // keep reducing until we reach a single digit
        reduction = reduce(reduction);
        reductionHistory.push(reduction);
    }
    //~ console.log('toAQ (a complete digital reduction): '); 
    //~ console.log(reductionHistory);
    return reductionHistory;
}

// sets the query state variable onChange,
// fetches a POST request on button press
function QueryBar(props) {
    const inputMaxLength = 30;
    let timeout = undefined;

    // handler function for QueryBar
    // extracts input from onKeyUp event, strips it of invalid characters,
    // and sets the Query state variable
    // output: sets query state to a string
    function handleQuery(event) {
        clearTimeout(timeout);

        // wait 1 second after the last keyUp event
        timeout = setTimeout(function () {
            let query = event.target.value.match(/[A-Z]/gi); // returns an array if query is not empty, else null
            query = query === null ? '' : query.join(''); // removes spaces, invalid characters, etc
            if (query === null) query = ''; // query must never be null
            props.setQuery(query);
            toggleIsTyping();
        }, 1000);

    }

    // to be called by setTimeout(() => toggleIsTyping(), 100)
    function toggleIsTyping() {
        if (props.setIsTyping === false) {
            props.setIsTyping(true);
        } else {
            props.setIsTyping(false);
        }
    }

    function handleSubmit() {
        console.log("handleSubmit (props.query):");
        console.log(props.query);
        console.log("toAQ(props.query):");
        console.log(toAQ(props.query).toString());

        fetch(API_URL, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({"word": "" + props.query + "", "reductions": toAQ(props.query).toString()})
        })
            .then(response => response.json())
            .then(data => {
                console.log('Success:', data);
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    }

    return (
        <div id="QueryBar">
            <h2>Query</h2>
            <form>
                <input
                    type="text"
                    id="query-input"
                    name="query"
                    size={inputMaxLength / 2}
                    maxLength={inputMaxLength}
                    onKeyUp={handleQuery}
                />
                <br />
                <input type="button" value='Save' id="query-save-button" onClick={handleSubmit}/>
            </form>
        </div>
    );
}

// fetches a GET request on query state variable change
function Glossary(props) {
    // const [isLoading, setIsLoading] = useState(false);
    const {setGlossaryWords, glossaryWords, query, isTyping} = props;
    // the first reduction from the array returned by toAQ
    const QUERY = (query.length === 0) ? '' : toAQ(query)[0];

    useEffect(
        () => {
            if (!isTyping) {
                console.log("GET request:");
                console.log(query);
                console.log(API_URL + QUERY);
                fetch(API_URL + QUERY, {
                    method: "GET",
                    headers: new Headers({
                        Accept: "application/json",
                    }),
                })
                    .then((res) => res.json())
                    .then((response) => {
                        // do stuff with response.matches
                        console.log("Response (from GET):")
                        console.log(response);
                        let matchesArr = [];
                        response.matches.forEach(res => {
                            matchesArr.push(res.word);
                        });
                        console.log(matchesArr);
                        setGlossaryWords(matchesArr);
                    })
                    .catch((error) => console.log(error));
            }
        },
        [QUERY, isTyping, query, setGlossaryWords]
    );

    return (
        <div id="Glossary">
            <h2>Hyperglossolalary</h2>
            {glossaryWords.length === 0 ? (
                <div>Pending response...</div>
            ) : (
                glossaryWords.map((word) => {
                    return <div key={word.toString()} className="GlossaryBar">{QUERY + '=' + word.toUpperCase()}</div>;
                })
            )}
        </div>
    );
}

// re-renders on Query state change
// assumes QueryBar us handling input stripping
function DigitalReductionBars(props) {
    const {query} = props;
    const pendingInput = <div>Pending input...</div>;

    // digitalReductions should contain a string of the following format:
    // QUERY = AQ-99 = AQ-18 = AQ-9
    let digitalReductionsAQ = query.toUpperCase() + " = ";
    toAQ(query).forEach((curr) => {
        digitalReductionsAQ += "AQ-" + curr + " = ";
    });
    // remove the last two characters (the last space and equal sign)
    digitalReductionsAQ = digitalReductionsAQ.slice(0, digitalReductionsAQ.length - 2);

    return (
        <div id="DigitalReductionBars">
            <h2>Digital Reduction</h2>
            {query.length === 0 ? pendingInput : <div id="digitalReductionsAQ">{digitalReductionsAQ}</div> }
        </div>
    );
}

function MainGraphic() {
    return (
        // eslint-disable-next-line jsx-a11y/img-redundant-alt
        <img src={numogram} alt="a picture of the numogram" />
    );
}

function Credits() {
    return (
        <footer id="Credits">
            <p>© 202X rosazhou</p>
        </footer>
    );
}

// holds the calculator itself
function AbysmalNummificationOfTheSignifier() {
    const [glossaryWords, setGlossaryWords] = useState([]);
    const [query, setQuery] = useState('');
    const [isTyping, setIsTyping] = useState(false);
    const showMainGraphic = query.length === 0 ? <MainGraphic className="fadeOut" />
                            : <div>
                                    <DigitalReductionBars query={query} />
                                    <Glossary
                                        query={query}
                                        glossaryWords={glossaryWords}
                                        setGlossaryWords={setGlossaryWords}
                                        isTyping={isTyping}
                                    />
                                </div>;

    return (
        <div className="App">
            <h1 id="title">Abysmal Nummification of the Signifier</h1>
            {isTyping === true ? '' : showMainGraphic}
            <QueryBar setQuery={setQuery} query={query} setIsTyping={setIsTyping} isTyping={isTyping}/>

        </div>
    );
}

// the webpage itself
function App() {
    return (
        <div className="baselevel">
            <AbysmalNummificationOfTheSignifier/>
            <h2>———</h2>
            <Credits/>
        </div>
    );
}

export default App;
// exports.App = App;
// exports.gematria = gematria;
// exports.reduce = reduce;
// exports.toAQ = toAQ;
// exports.QueryBar = QueryBar;
// exports.API_URL = API_URL;
