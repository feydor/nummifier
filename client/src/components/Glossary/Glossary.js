import "./Glossary.css";
import { useEffect } from "react";

/**
 * fetches and displays a list of matching words from the server
 * @param {array} glossary
 * @param {string} query
 * @param {function} setGlossary
 */
function Glossary(props) {

  // fetches a GET request on query or selectedCiphers state variable change
  /*
  useEffect(() => {
    props.setGlossary();
  }, [query, selectedCiphers]);
  */

  return (
    <div id="Glossary">
      <h2>Hyperglossolalary</h2>
      {props.glossary.length === 0 ? (
        <div>Pending response...</div>
      ) : (
        props.glossary.map((word) => {
          return (
            <div key={word.toString()} className="GlossaryBar">
              {props.query.toUpperCase() + "=" + word.toUpperCase()}
            </div>
          );
        })
      )}
    </div>
  );
}

export default Glossary;
