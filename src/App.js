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
function gematria(str) {
    let iterations = [];
    let strArr = [...str]
    let finalReduction = strArr.reduce((acc, curr) => {
        let currReduction = AQ.find(
            (gematria) => gematria[0].toLowerCase() === curr.toLowerCase()
        );
        iterations.push(acc + currReduction[1]);
        return acc + currReduction[1];
    }, 0);
    console.log(finalReduction);
    return finalReduction;
    // return ([ finalReduction, iterations ]);
}

// reduces a two digit (or lower) number by summation
// ex: 78 => 15
// ex: 9 => 9
function reduce(num) {
    let arr = [];
    while (num !== 0) {
        let currDigit = num % 10;
        arr.push(currDigit);
        num = Math.trunc(num / 10);
    }
    return arr.reduce((acc, curr) => { return acc + curr });
}

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
}

// handler function for QueryBar
// extracts input from onChange event, strips it of invalid characters,
// and calls the appropriate gematric method
function handleQuery(e) {
    let query = e.target.value;
    query = query.match(/[A-Z]/ig);
    // console.log(query);
    if (query !== null && currentGematria === "AQ") toAQ(query);
}

function QueryBar() {
    return (
        <div id="QueryBar">
            <input type="text" id="query" name="query" onChange={handleQuery} />
        </div>
    );
}

function Glossary() {
    return <div id="Glossary"></div>;
}

function DigitalReductionBar() {
    return <div id="DigitalReductionBar"></div>;
}

function App() {

    return (
        <div className="App">
            <h1 id="title">Abysmal Nummification of the Signifier</h1>
            <QueryBar />
            <DigitalReductionBar />
            <DigitalReductionBar />
            <DigitalReductionBar />
            <DigitalReductionBar />
            <DigitalReductionBar />
            <Glossary />
        </div>
    );
}

export default App;
