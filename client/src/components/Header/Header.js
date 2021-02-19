import Navbar from 'react-bootstrap/Navbar';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import { Gear } from 'react-bootstrap-icons';
import logo from '../../images/logo.svg';

import './Header.css';

/**
 * a header with slidedown settings
 */
const Header = ({ setSelectedCiphers }) => {
  return (
    <header>
      <Navbar expand="true">

        <Navbar.Brand href="/">
          <img 
            alt="logo"
            src={logo}
            className="d-inline-block align-top"
          />{' '}
        </Navbar.Brand>

        <Navbar.Brand href="/">
          <p>ANS</p>
        </Navbar.Brand>

        <Navbar.Toggle onClick={toggleSettings}>
          <Gear /> 
        </Navbar.Toggle>

      </Navbar>

      <Navbar.Collapse id="basic-navbar-nav" style={{display: "none"}}>
        <Container fluid id="settings" className="justify-content-center">
          <Row>
            <h5>Ciphers: </h5>
            <Form>
              <CipherSetting 
                label="AQ"
                setState={setSelectedCiphers}
                isChecked={true}
              />
            </Form>
            <Form>
              <CipherSetting 
                label="GoN1"
                setState={setSelectedCiphers}
                isChecked={false}
              />
            </Form>
          </Row>
        </Container>
      </Navbar.Collapse>
    </header>
  );
}

/**
 * A checkbox element that calls the 'setState' param on click
 * @param {string} label - id and label
 * @param {function} setState - a setState function from react
 * class is set to 'cipher-setting'
 */
const CipherSetting = ({ label, setState, isChecked }) => {
  /**
   * toggles and sets the state  
   */
  function handleClick(e) {
    let isChecked = document.getElementById(e.target.id).checked;
    setState(prevState => {
      let newState = {};
      let key = e.target.id;
      newState[key] = isChecked;
      return Object.assign(prevState, newState);
    });
  }

  return (
    <Form.Check 
      type="switch"
      id={label}
      label={label}
      className="cipher-setting"
      onClick={handleClick}
      defaultChecked={isChecked}
    />
  );
};

/**
 * toggles the slide-down settings area
 */
function toggleSettings() {
  let settings = document.getElementById("basic-navbar-nav");
  if (settings.style.display === "none") {
    settings.style.display = "";
  } else {
    settings.style.display = "none";
  }
}


export default Header;
