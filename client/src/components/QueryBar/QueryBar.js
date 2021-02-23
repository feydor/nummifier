import "./QueryBar.css";
import Button from "../../elements/Button/Button";

/**
 * sets the query state variable, POSTs a word on button press
 * @param {function} handleQueryChange
 * @param {function} handleSaveWord
 */
function QueryBar(props) {
  const inputMaxLength = 30;

  return (
    <div id="QueryBar">
      <h2>Query</h2>
      <form>
        <input
          type="text"
          id={props.id}
          name="query"
          size={inputMaxLength / 2}
          maxLength={inputMaxLength}
          onKeyUp={props.handleQueryKeyUp}
          onKeyDown={props.handleQueryKeydown}
          autoComplete="off"
        />
        <br />
        { props.query.length === 0 ?
          <Button
            id="query-save-button"
            clicked={props.handleSaveWord}
            disabled
          >Input</Button>
          :
          <div>
            <Button
              id="query-save-button"
              clicked={props.handleSaveWord}
            >Save</Button>
            <Button
              id="query-clear-button"   
              clicked={handleClear}
            >Clear</Button>
          </div>
        }
      </form>
    </div>
  );
}

function handleClear() {
  document.getElementById("query-input").value = "";
}

export default QueryBar;
