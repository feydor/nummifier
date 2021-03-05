import React from "react";
import Loader from "react-loader-spinner";

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import torus from "../../images/torus-pink.gif";

import * as nmu from "../../algorithims/gematria/nummifier";
import * as TX from "../../algorithims/ticxenotation/ticxenotation";

import "./App.css";

// components
import Header from "../../components/Header/Header.js";
import QueryBar from "../../components/QueryBar/QueryBar.js";
import Glossary from "../../components/Glossary/Glossary.js";
import Reductions from "../../components/Reductions/Reductions.js";
import Footer from "../../components/Footer/Footer.js";
import Description from "../../components/Description/Description.js";
import TicXenotation from "../../components/TicXenotation/TicXenotation.js";

// globals
let gTypingTimer;
const gTypingInterval = 1000;

// the webpage itself
class App extends React.Component {
  state = {
    glossary: [],
    query: "",
    isTyping: false,
    selectedCiphers: { AQ: true, GoN1: false, GoN2: false, GoN3: false },
    ciphers: {},
    loading: false,
    error: false,
  };

  /**
   * toggles the selectedCiphers state object when a checkbox is clicked
   * passed to Header
   */
  handleSelectedCiphersChange = (e) => {
    let isChecked = document.getElementById(e.target.id).checked;
    let newState = {};
    let key = e.target.id;
    newState[key] = isChecked;
    this.setState(
      {
        selectedCiphers: { ...this.state.selectedCiphers, ...newState },
      },
      () => console.log(this.state.selectedCiphers)
    );
  };

  /**
   * handler function to set the glossary state variable
   * sets the state variables: glossary, loading, and error
   */
  setGlossary = () => {
    if (this.state.isTyping) return;

    // for each cipher used, load the results into queries
    let queries = [];
    if (this.state.query.length !== 0) {
      for (let cipher in this.state.ciphers) {
        if (this.state.selectedCiphers[cipher]) {
          queries = [...queries, ...this.state.ciphers[cipher].reduce()];
        }
      }
    }

    // append each dash-seperated query to url
    let url = `/gematria/${queries.toString().replace(/,/g, "-")}`;

    this.setState(
      {
        glossary: [],
        loading: true,
        error: false,
        /**
         * fetches the current glossary from the server
         * @param {string} url - e.g. /gematria/140-5
         * sets the state variables: glossary, loading, and error
         */
      },
      function fetchGlossary() {
        fetch(url, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        })
          .then((res) => res.json())
          .then((response) => {
            // throw error on non-200 status codes
            if (response.status === 400)
              throw new Error(`${response.status}: ${response.statusTxt}`);
            console.log("Response (from GET):");
            console.log(response.glossary);

            // filter out the query from the results
            response.glossary = response.glossary.filter(
              (word) => word !== this.state.query
            );

            this.setState({
              glossary: response.glossary,
              loading: false,
              error: false
            });
          })
          .catch((error) => {
            console.error(error);
            this.setState({
              loading: false,
              error: true,
            });
          });
      }
    );
  };

  /**
   * saves this.state.query to server glossary
   * sets the state variables: loading, error
   */
  handleSaveWord = () => {
    console.log("handleSaveWord (this.state.query):");
    console.log(this.state.query);

    // for each cipher used, load the results into reductions
    let reductions = [];
    for (let cipher in this.state.ciphers) {
      if (this.state.selectedCiphers[cipher]) {
        reductions = [...reductions, ...this.state.ciphers[cipher].reduce()];
      }
    }
    console.log(reductions);

    this.setState(
      {
        loading: true,
        error: false,
      },
      function postWord() {
        fetch(`/gematria`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            word: `${this.state.query}`,
            reductions: reductions.toString(),
          }),
        })
          .then((response) => response.json())
          .then((data) => {
            console.log(data.status);
            // status code is not 20X
            if (data.status === 400) {
              throw new Error(`${data.status}: ${data.statusTxt}`);
            }

            console.log("Success:", data);
            this.setState({
              loading: false,
            });
          })
          .catch((error) => {
            console.error("Error:", error);
            this.setState({
              loading: false,
              error: true,
            });
          });
      }
    );
  };

  /**
   * event handler for query change, onKeyUp
   * sets a timer for 'typingInterval' ms
   */
  handleQueryKeyUp = () => {
    clearTimeout(gTypingTimer);
    gTypingTimer = setTimeout(this.handleQueryChange, gTypingInterval);
  };

  /**
   * event handler for query change, onKeyDown
   * resets the timer set by handleQueryKeyUp
   * sets isTyping to true
   */
  handleQueryKeyDown = () => {
    clearTimeout(gTypingTimer);
    this.setState({
      isTyping: true,
    });
  };

  /**
   * handler function for query change
   * extracts input from onKeyUp event, strips it of invalid characters
   * sets the state variables: query, ciphers, isTyping
   */
  handleQueryChange = () => {
    // returns an array if query is not empty, else null
    let query = undefined;
    try {
      query = document.getElementById("query-input").value.match(/[A-Z]/gi).join("");
    } catch (err) {
      console.log(err);
    }
    if (!query) query = "";

    // first set the query state, then the ciphers
    this.setState(
      {
        query: query,
        isTyping: false,
      },
      function setCiphers() {
        this.setState({
          ciphers: nmu.nummificate(query),
        });
      }
    );
    this.setGlossary();
  };

  handleQueryClear = () => {
    this.setState({
      query: "",
      glossary: [],
    });
  };

  /**
   * Returns an array of TX encoded strings
   * @example:
   * - getTics() = ['(:)', ':::'], where ciphers['AQ'].reduce() = [3, 8]
   */
  getTics = () => {
    let tics = [];
    for (let cipher in this.state.ciphers) {
      if (this.state.selectedCiphers[cipher]) {
        tics = [...tics, ...this.state.ciphers[cipher].reduce()];
      }
    }

    return tics.map((n) => TX.convert(n));
  };
  
  /**
   * Returns an array of RTX encoded strings
   * @example:
   * - getReducedTics() = ['(((0)))', '((0))((0))((0))'], where ciphers['AQ'].reduce() = [3, 8]
   */
  getReducedTics = () => {
    let rtics = [];
    for (let cipher in this.state.ciphers) {
      if (this.state.selectedCiphers[cipher]) {
        rtics = [...rtics, ...this.state.ciphers[cipher].reduce()];
      }
    }

    return rtics.map((n) => TX.reduce(n));
  };

  render() {
    let content = <img src={torus} alt="a picture of a torus" />;
    if (this.state.loading) {
      content = (
        <Loader
          type="Grid"
          color="#ff0266"
          height={100}
          width={100}
          timeout={3000}
        />
      );
    } else if (this.state.error) {
      // TODO: <ErrorNotice onClickHandler={this.tryAgainHandler}/>
      content = <h2>Error: Try again.</h2>;
    } else if (this.state.glossary.length > 0) {
      content = (
        <div>
          <Reductions
            query={this.state.query}
            ciphers={this.state.ciphers}
            selectedCiphers={this.state.selectedCiphers}
          />
          <TicXenotation ciphers={this.state.ciphers} getTics={this.getTics} getReducedTics={this.getReducedTics} />
          <Glossary query={this.state.query} glossary={this.state.glossary} />
        </div>
      );
    } else if (this.state.query !== "" && this.state.glossary.length === 0) {
      content = (
        <div>
          <Reductions
            query={this.state.query}
            ciphers={this.state.ciphers}
            selectedCiphers={this.state.selectedCiphers}
          />
          <TicXenotation ciphers={this.state.ciphers} query={this.state.query} getTics={this.getTics} getReducedTics={this.getReducedTics}/>
        </div>
      );
    }

    return (
      <div className="baselevel">
        <Header onChangeHandler={this.handleSelectedCiphersChange} />
        <div id="top"></div>
        <div
          id="container"
          className="flex-column"
          style={{ paddingTop: "10vh" }}
        >
          <Container className="App shadow">
            <Row>
              <h1 id="title">Abysmal Nummification of the Signifier</h1>
            </Row>
            <Row className="main-content">
              {content}
              <QueryBar
                id="query-input"
                query={this.state.query}
                handleQueryKeyUp={this.handleQueryKeyUp}
                handleQueryKeyDown={this.handleQueryKeyDown}
                handleSaveWord={this.handleSaveWord}
                handleQueryClear={this.handleQueryClear}
              />
            </Row>
            <Row>
              <Description>
                <h4>Instructions</h4>
                <p>
                  Enter your query above. Select the desired cipher from the
                  settings.
                </p>
              </Description>
            </Row>
          </Container>

          <Container>
            <Description>
              <h2>Gematrixography for the Perplexed</h2>
              <h3>Digital Reduction, or Plexing</h3>
              <p>
                Plexing is the act of reducing a number from an <code>n</code>
                -digit number to a single-digit number via accumulation (
                <code>418 = 13 = 4</code>). The act of a number 'collapsing into
                itself' continously reintroduces the problematic of overcoding.
                That semiotics is 'always already cryptography' is plexing's
                original and only Weltanschauung. To reduce further, into its
                contituent <code>1</code>'s (its 'tics') would fall under the
                category of Tic-Xenotation.{" "}
              </p>
              <h3>Tic-Xenotation</h3>
              <p>
                A numerical system developed by Dr. D.C. Barker wherein notation
                and arithemtical operation is reduced to the concepts of
                tic-clusters (<code>:</code>) and implextions (<code>()</code>).
                Primes constitute a magnitude value (the absolute value) and an
                ordinate value (its place on the prime number line), thus primes
                can be represented as tic-clusters and further implextions of
                tic-clusters (
                <code>
                  32 = 2<sup>5</sup> = :::::
                </code>
                ). Implextion is the operation of transforming a magnitude into
                an ordinate value (
                <code>
                  11 = 5<sup>th</sup> prime = (((((:))))); (11) = ((((((:))))))
                  = 6<sup>th</sup> prime=13
                </code>
                ) Non-primes can also be implexted (
                <code>
                  8 = :::; (8) = (:::) = 8<sup>th</sup> prime=19
                </code>
                ); and compounds are products of their prime factors (
                <code>
                  15 = 5 x 3 = 3<sup>rd</sup> prime x 2<sup>nd</sup> prime =
                  ((:))(:)
                </code>
                ). Finally to constitute <code>1</code> and <code>0</code>,
                there is the deplextion operator (<code>-P</code>), which
                decreases a TX-value's ordinate value (
                <code>1 = (-P):; 0 = ((-P)):</code>).
              </p>
              <h3>Qabbala</h3>
              <p>
                A class of 'rigourously constructible procedures' intended to
                explicate a 'signal from the Outside' in which discovering and
                correcting 'formal errors' are a 'procedural requirement'
                intended for its 'continued development'. Roughly equivalent to
                the bio-scientific pursuit for epistimological verification,
                Qabbala's gnoetic goals are distinguishable from its
                'verifiable' content in much the same way as the theory of
                causality stands to a plain, 'transcendently aware' description
                of events. To have reached the level of certainty at the
                'procedural-problematic' level is to have said enough. Anything
                further, and it would have to be classified in that unfortunate
                grouping of ideas whose forms are beautiful but whose content
                remains empty sophistry.
              </p>

              <footer>
                <em>
                  Quotations taken from COLLAPSE I, ed. R. Mackay (Oxford:
                  Urbanomic, September 2007)
                </em>
              </footer>
            </Description>
          </Container>

          <h2>———</h2>

          <Footer />
        </div>
      </div>
    );
  }
}

export default App;
