import { useEffect, useState } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import numogram from '../../images/numogram.png';

import './App.css';

// components
import Header from '../../components/Header/Header.js';
import QueryBar from '../../components/QueryBar/QueryBar.js';
import Glossary from '../../components/Glossary/Glossary.js';
import Reductions from '../../components/Reductions/Reductions.js';
import Footer from '../../components/Footer/Footer.js';

// the webpage itself
function App() {
  const [glossaryWords, setGlossaryWords] = useState([]);
  const [query, setQuery] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [selectedCiphers, setSelectedCiphers] = useState({ AQ: true, GoN1: false, GoN2: false, GoN3: false });
  const [ciphers, setCiphers] = useState({});

  return (
    <Container fluid className="baselevel">
      <Header setSelectedCiphers={setSelectedCiphers} />
      <br />
      <Container className="flex-column">

        <Container className="App">
          <Row>
            <h1 id="title">Abysmal Nummification of the Signifier</h1>
          </Row>
          <Row className="justify-content-center">
            {
              isTyping === true ? "" : 
              <ShowMainGraphic 
                query={query}
                glossaryWords={glossaryWords} 
                setGlossaryWords={setGlossaryWords}
                isTyping={isTyping}
                selectedCiphers={selectedCiphers}
                ciphers={ciphers}
              />
            }
          </Row>
          <Row>
            <QueryBar
              setQuery={setQuery}
              query={query}
              setIsTyping={setIsTyping}
              isTyping={isTyping}
              ciphers={ciphers}
              setCiphers={setCiphers}
              selectedCiphers={selectedCiphers}
            />
          </Row>
        </Container>

        <h2>———</h2>
        <Footer />
      </Container>
    </Container>
  );
}

function ShowMainGraphic(props) {
  
  if (props.query.length === 0) {
    return <img src={numogram} alt="a picture of the numogram" />;
  } else {
   return (
     <div>
       <Reductions 
        query={props.query} 
        ciphers={props.ciphers}
        selectedCiphers={props.selectedCiphers}
       />
       <Glossary
         query={props.query}
         glossaryWords={props.glossaryWords}
         setGlossaryWords={props.setGlossaryWords}
         isTyping={props.isTyping}
         selectedCiphers={props.selectedCiphers}
         ciphers={props.ciphers}
       />
     </div>
   ); 
  }
}


export default App;
