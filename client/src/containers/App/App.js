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
  const [aqUsed, setAqUsed] = useState(true);
  const [gon1Used, setGon1Used] = useState(false);
  const [ciphers, setCiphers] = useState({});

  return (
    <Container fluid className="baselevel">
      <Header />
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
                aqUsed={aqUsed}
                gon1Used={gon1Used}
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
              setCiphers={setCiphers}
            />
          </Row>
        </Container>

        <h2>———</h2>
        <Footer />
      </Container>
    </Container>
  );
}

function ShowMainGraphic({ query, glossaryWords, setGlossaryWords, isTyping, ciphers, aqUsed, gon1Used }) {
  if (query.length === 0) {
    return <img src={numogram} alt="a picture of the numogram" />;
  } else {
   return (
     <div>
       <Reductions query={query} />
       <Glossary
         query={query}
         glossaryWords={glossaryWords}
         setGlossaryWords={setGlossaryWords}
         isTyping={isTyping}
         aqUsed={aqUsed}
         gon1Used={gon1Used}
         ciphers={ciphers}
       />
     </div>
   ); 
  }
}


export default App;
