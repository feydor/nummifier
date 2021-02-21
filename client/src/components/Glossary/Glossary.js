import "./Glossary.css";
import { useEffect } from "react";

/**
 * fetches and displays a list of matching words from the server
 * @param {array} glossaryWords
 * @param {function} setGlossaryWords
 * @param {string} query
 * @param {boolean} isTyping
 * @param {Object} ciphers { "AQ": { "method":string, "reduce":function  }, ... }
 * @param {Object} selectedCiphers { "AQ": true, "GoN1": false, ... }
 */
function Glossary({ setGlossaryWords, glossaryWords, query, isTyping, ciphers, selectedCiphers }) {
  // const [isLoading, setIsLoading] = useState(false);

  // add used reduction arrays to queries
  let queries = [];

  // fetches a GET request on query or selectedCiphers state variable change
  useEffect(() => {
    if (isTyping) {
      return;
    }

    if (query.length !== 0) {
      for (let cipher in ciphers) {
        if (selectedCiphers[cipher]) {
          queries = [...queries, ...ciphers[cipher].reduce()];
        }
      }
    }

    console.log("GET request:");
    console.log(queries.toString().replace(/,/g, "-"));

    fetch(`/gematria/${queries.toString().replace(/,/g, "-")}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then(res => res.json())
      .then(response => handleQueryResponse(response, query, setGlossaryWords))
      .catch(error => console.error(error));

  }, [query, selectedCiphers]);

  return (
    <div id="Glossary">
      <h2>Hyperglossolalary</h2>
      {glossaryWords.length === 0 ? (
        <div>Pending response...</div>
      ) : (
        glossaryWords.map((word) => {
          return (
            <div key={word.toString()} className="GlossaryBar">
              {query.toUpperCase() + "=" + word.toUpperCase()}
            </div>
          );
        })
      )}
    </div>
  );
}

/**
 * sets glossary words from query response
 * @param {Object} json - { matches:array[strings] }
 */
function handleQueryResponse(json, query, setGlossaryWords) {
  console.log("Response (from GET):");
  console.log(json.glossary);

  // filter out the query from the results
  json.glossary = json.glossary.filter(word => word !== query );
  setGlossaryWords(json.glossary);
}

export default Glossary;
