import "./Glossary.css";
import { useEffect } from "react";

/**
 * fetches and displays a list of matching words from the server
 * @param {array} glossaryWords
 * @param {function} setGlossaryWords
 * @param {string} query
 * @param {boolean} isTyping
 * @param {Object} ciphers { "AQ": { "method":string, "reduce":function  }, ... }
 * @param {boolean} aqUsed
 * @param {boolean} gon1Used
 */
function Glossary({ setGlossaryWords, glossaryWords, query, isTyping, ciphers, aqUsed, gon1Used }) {
  // const [isLoading, setIsLoading] = useState(false);

  // add used reduction arrays to queries
  const queries = [];

  // fetches a GET request on query state variable change
  useEffect(() => {
    if (isTyping) {
      return;
    }

    if (query.length !== 0) {
      if (aqUsed) {
        queries.push(ciphers['AQ'].reduce());
      } 

      if (gon1Used) {
        queries.push(ciphers['GoN1'].reduce());
      }
    }

    console.log("GET request:");
    console.log(query);

    for (let query of queries) {
      fetch(`/gematria/glossary`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ reduction: query }),
      })
        .then(res => res.json())
        .then(response => handleQueryResponse(response, setGlossaryWords))
        .catch(error => console.error(error));
    }
  }, [query]);

  return (
    <div id="Glossary">
      <h2>Hyperglossolalary</h2>
      {glossaryWords.length === 0 ? (
        <div>Pending response...</div>
      ) : (
        glossaryWords.map((word) => {
          return (
            <div key={word.toString()} className="GlossaryBar">
              {query + "=" + word.toUpperCase()}
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
function handleQueryResponse(json, setGlossaryWords) {
  console.log("Response (from GET):");
  console.log(json);
  
  /*
  let matches = [];
  json.matches.forEach(res => {
    matches.push(res.word);
  });

  console.log(matches);
  */
  
  setGlossaryWords(json.glossary);
}

export default Glossary;
