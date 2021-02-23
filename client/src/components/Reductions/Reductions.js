import { useEffect } from "react";
import "./Reductions.css";

// re-renders on Query state change
// assumes QueryBar us handling input stripping
function Reductions(props) {
  const { query } = props;
  const pendingInput = <div>Pending input...</div>;
  let textContent = "";

  /**
   * @return {string} res - a string of the following format:
   * QUERY = AQ-99 = AQ-18 = AQ-9
   */
  const ReductionsJsx = () => {
    let res = `${query.toUpperCase()} = `;

    for (let cipher in props.ciphers) {
      if (props.selectedCiphers[cipher]) {
        for (let val of props.ciphers[cipher].reduce()) {
          res += `${cipher}-${val} = `;
        }
      }
    }
    // remove the last two superflous characters;
    res = res.slice(0, res.length - 2);
    return res;
  };

  useEffect(() => {
    //console.log(props.selectedCiphers)
  }, [props.selectedCiphers]);

  return (
    <div className="Reductions">
      <h2>Digital Reduction</h2>
      {query.length === 0 || !props.ciphers ? (
        pendingInput
      ) : (
        <div id="digitalReductions">
          <ul id="reductionjsx">
            <ReductionsJsx />
          </ul>
        </div>
      )}
    </div>
  );
}

export default Reductions;
