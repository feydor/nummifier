import "./QueryBar.css";
import Button from "react-bootstrap/Button";

import nummificate from "../../algorithims/gematria/nummifier.js";

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
      props.setCiphers(nummificate(query)); // set ciphers state object
      props.setQuery(query); // IMPORTANT: set state variable 'query' last
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
        { props.query.length === 0 ?
          <Button
            variant="danger"
            id="query-save-button"
            onClick={handleSubmit}
            disabled
          >
            Input
          </Button>
          :
          <Button
            id="query-save-button"
            onClick={handleSubmit}
          >
            Save
          </Button>
        }
      </form>
    </div>
  );
}

export default QueryBar;
