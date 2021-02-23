import React from "react";
import Loader from "react-loader-spinner";

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import torus from "../../images/torus-pink.gif";

import nummificate from "../../algorithims/gematria/nummifier";

import "./App.css";

// components
import Header from "../../components/Header/Header.js";
import QueryBar from "../../components/QueryBar/QueryBar.js";
import Glossary from "../../components/Glossary/Glossary.js";
import Reductions from "../../components/Reductions/Reductions.js";
import Footer from "../../components/Footer/Footer.js";
import Description from "../../components/Description/Description.js";

// globals
let typingTimer;
const typingInterval = 1000;

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
            if (response.status !== 200)
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
    clearTimeout(typingTimer);
    typingTimer = setTimeout(this.handleQueryChange, typingInterval);
  };

  /**
   * event handler for query change, onKeyDown
   * resets the timer set by handleQueryKeyUp
   * sets isTyping to true
   */
  handleQueryKeyDown = () => {
    clearTimeout(typingTimer);
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
    let query = document.getElementById("query-input").value.match(/[A-Z]/gi);
    query = !query ? "" : query.join(""); // removes spaces, invalid characters, etc
    if (query === null) query = ""; // query must never be null

    // first set the query state, then the ciphers
    this.setState(
      {
        query: query,
        isTyping: false,
      },
      function setCiphers() {
        this.setState({
          ciphers: nummificate(query),
        });
      }
      );
    this.setGlossary();
  };

  handleQueryClear = () => {
    this.setState({
      query: "",
      glossary: []
    });
  }

  render() {
    let content = <img src={torus} alt="a picture of a torus" />;
    if (this.state.loading) {
      content = <Loader 
        type="Grid"
        color="#ff0266"
        height={100}
        width={100}
        timeout={3000} />;
    } else if (this.state.error) {
      // TODO: <ErrorNotice onClickHandler={this.tryAgainHandler}/>
      content = <h2>Error</h2>;
    } else if (this.state.glossary.length > 0) {
      content = (
        <div>
          <Reductions
            query={this.state.query}
            ciphers={this.state.ciphers}
            selectedCiphers={this.state.selectedCiphers}
          />
          <Glossary
            query={this.state.query}
            glossary={this.state.glossary}
            setGlossary={this.state.setGlossary}
          />
        </div>
      );
    }

    return (
      <div className="baselevel">
        <Header onChangeHandler={this.handleSelectedCiphersChange} />
        <div className="flex-column">
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
                <p>Enter your query above. Select the desired cipher from the settings.</p>
              </Description>
            </Row>
          </Container>

          <Container>
            <Description>
              <h3>Cumulation</h3>
              <p>Cumulation is the operation used to define the value of the gates of the numogram,each of which opens their respective channel (which in turn is defined by plexing).</p>
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
