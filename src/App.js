import { useState, useEffect } from "react";
//import logo from "./logo.svg";
import "./App.css";

const API_URL = "http://localhost:42469/gematria/";

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
	// empty string, whitespace, number, array, object (in that order)
	if (str.length === 0 || str === null) {
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
	} else if (typeof str === 'object' && str !== null) {
		//~ console.error("ERROR: \'" + str + "\'" + "is an object.");
		return 0;
	} 
	
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
	if (num < 0) {
		let flippedSignNum = nestedparsedArr[0].concat(nestedparsedArr[1]).join("");
		nestedparsedArr = nestedparsedArr.slice(2);
		nestedparsedArr = [flippedSignNum, ...nestedparsedArr].flat();
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

    // handler function for QueryBar
    // extracts input from onChange event, strips it of invalid characters,
    // and sets the Query state variable
    // output: sets query state to a string
    function handleQuery(e) {
        let query = e.target.value.match(/[A-Z]/gi); // returns an array if query is not empty, else null
        query = query === null ? '' : query.join(''); // removes spaces, invalid characters, etc
        if (query === null) query = ''; // query must never be null
        props.setQuery(query);
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
            body: JSON.stringify({ "word": "" + props.query + "", "reductions": toAQ(props.query).toString() })
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
            <h2>Query:</h2>
            <form>
                <input
                    type="text"
                    id="query"
                    name="query"
                    onChange={handleQuery}
                />
                <input type="button" value='Save' onClick={handleSubmit} />
            </form>
        </div>
    );
}

// fetches a GET request on query state variable change
function Glossary(props) {
    // const [isLoading, setIsLoading] = useState(false);
    const { setGlossaryWords, glossaryWords, query } = props;
    // the first reduction from the array returned by toAQ
    const QUERY = (query.length === 0) ? '' : toAQ(query)[0]; 
    
    useEffect(
        () => {
			console.log("GET request:");
			console.log(query);
			console.log(API_URL + QUERY);
            fetch(API_URL + QUERY, {
                method: "GET",
                headers: new Headers({
                    Acccept: "application/json",
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
        },
        [query]
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
    const { query } = props;
    return (
        <div id="DigitalReductionBars">
            <h2>Digital Reduction:</h2>
            {query.length === 0 ? (
                <div>Pending input...</div>
            ) : (
                toAQ(query).map((curr, idx) => (
                    <div key={idx} className="DigitalReductionBar">
                        {curr}
                    </div>
                ))
            )}
        </div>
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
function AbysmalNummificationOfTheSignifier(props) {
    const [glossaryWords, setGlossaryWords] = useState([]);
    const [query, setQuery] = useState('');
    
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

// the webpage itself
function App() {
	
    
    return (
        <div className="baselevel">
            <AbysmalNummificationOfTheSignifier />
            <Credits />
        </div>
    );
}

export default App;
//~ exports.App = App;
//~ exports.gematria = gematria;
//~ exports.reduce = reduce;
//~ exports.toAQ = toAQ;
//~ exports.QueryBar = QueryBar;
//~ exports.API_URL = API_URL;
