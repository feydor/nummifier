import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container'
import numogram from '../images/numogram.png';
import './App.css';
import nummificate from './nummifier.js'

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
    console.log('handleSubmit (props.query):');
    console.log(props.query);
    console.log("nummificate(props.query)['AQ'].reduce():");
    console.log(nummificate(props.query)['AQ'].reduce().toString());

    fetch(`/gematria`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        word: "" + props.query + "",
        reductions: nummificate(props.query)['AQ'].reduce().toString(),
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Success:", data);
      })
      .catch((error) => {
        console.error("Error:", error);
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
        <Button
          id="query-save-button"
          onClick={handleSubmit}>
          Save
        </Button>
      </form>
    </div>
  );
}

// fetches a GET request on query state variable change
function Glossary(props) {
  // const [isLoading, setIsLoading] = useState(false);
  const { setGlossaryWords, glossaryWords, query, isTyping } = props;

  // the first reduction from the array returned by nummificate
  const QUERY = query.length === 0 ? "" : nummificate(query)['AQ'].reduce()[0];

  useEffect(() => {
    if (!isTyping) {
      console.log("GET request:");
      console.log(query);

      fetch(`/gematria/${QUERY}`, {
        headers: {
          accepts: "application/json",
        },
      })
        .then((res) => res.json())
        .then((response) => {
          // do stuff with response.matches
          console.log("Response (from GET):");
          console.log(response);
          let matchesArr = [];
          response.matches.forEach((res) => {
            matchesArr.push(res.word);
          });
          console.log(matchesArr);
          setGlossaryWords(matchesArr);
        })
        .catch((error) => console.log(error));
    }
  }, [QUERY, isTyping, query, setGlossaryWords]);

  return (
    <div id="Glossary">
      <h2>Hyperglossolalary</h2>
      {glossaryWords.length === 0 ? (
        <div>Pending response...</div>
      ) : (
        glossaryWords.map((word) => {
          return (
            <div key={word.toString()} className="GlossaryBar">
              {QUERY + "=" + word.toUpperCase()}
            </div>
          );
        })
      )}
    </div>
  );
}

// re-renders on Query state change
// assumes QueryBar us handling input stripping
function DigitalReductionBars(props) {
  const { query } = props;
  const pendingInput = <div>Pending input...</div>;

  /**
   * @return {string} res - a string of the following format:
   * QUERY = AQ-99 = AQ-18 = AQ-9
   */
  const ReductionsJsx = () => {
    let res = `${query.toUpperCase()} = `;
    let nummifiedQuery = nummificate(query);

    // TODO: users can set which cipher methods to show
    // Show AQ for now
    for (let val of nummifiedQuery['AQ'].reduce()) {
      res += `AQ-${val} = `;
    }

    // remove the last two superflous characters;
    res = res.slice(0, res.length - 2);

    return res;
  };

  return (
    <div id="DigitalReductionBars">
      <h2>Digital Reduction</h2>
      {query.length === 0 ? (
        pendingInput
      ) : (
        <div id="digitalReductionsAQ"> <ReductionsJsx /> </div>
      )}
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
  const [query, setQuery] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  const showMainGraphic =
    query.length === 0 ? (
      <MainGraphic className="fadeOut" />
    ) : (
      <div>
        <DigitalReductionBars query={query} />
        <Glossary
          query={query}
          glossaryWords={glossaryWords}
          setGlossaryWords={setGlossaryWords}
          isTyping={isTyping}
        />
      </div>
    );

  return (
    <Container className="App">
      <h1 id="title">Abysmal Nummification of the Signifier</h1>
      {isTyping === true ? "" : showMainGraphic}
      <QueryBar
        setQuery={setQuery}
        query={query}
        setIsTyping={setIsTyping}
        isTyping={isTyping}
      />
    </Container>
  );
}

// the webpage itself
function App() {
  return (
    <Container className="baselevel">
      <AbysmalNummificationOfTheSignifier />
      <h2>———</h2>
      <Credits />
    </Container>
  );
}

export default App;
// exports.App = App;
// exports.gematria = gematria;
// exports.reduce = reduce;
// exports.QueryBar = QueryBar;
