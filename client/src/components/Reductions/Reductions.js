import './Reductions.css';

import nummificate from "../../algorithims/gematria/nummifier.js";

// re-renders on Query state change
// assumes QueryBar us handling input stripping
function Reductions(props) {
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

export default Reductions;
