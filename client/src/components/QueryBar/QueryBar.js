import "./QueryBar.css";
import Button from 'react-bootstrap/Button';
import styles from '../../elements/Button/Button.module.css';

/**
 * sets the query state variable, POSTs a word on button press
 * @param {function} handleQueryChange
 * @param {function} handleSaveWord
 */
function QueryBar(props) {
  const inputMaxLength = 30;

  const handleClear = () => {
    console.log(document.getElementById("query-input"));
    document.getElementById("query-input").value = "";
    props.handleQueryClear();
  }

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
        {props.query.length === 0 ? (
          <div>
          <Button className={styles.Button}
            id="query-save-button"
            onClick={props.handleSaveWord}
            disabled
          >
            INPUT
          </Button>
            <Button className={styles.Button} id="query-clear-button" onClick={handleClear}>
              CLEAR
            </Button>
          </div>
        ) : (
          <div>
            <Button className={styles.Button} id="query-save-button" onClick={props.handleSaveWord}>
              SAVE
            </Button>
            <Button className={styles.Button} id="query-clear-button" onClick={handleClear}>
              CLEAR
            </Button>
          </div>
        )}
      </form>
    </div>
  );
}

export default QueryBar;
