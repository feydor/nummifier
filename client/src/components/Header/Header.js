import Navbar from 'react-bootstrap/Navbar';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import { Gear } from 'react-bootstrap-icons';
import logo from '../../images/logo.svg';

import './Header.css';

const Header = ({ aqSelected, gon1Selected }) => {
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
              <Form.Check 
                type="switch"
                id="switch-aq"
                label="AQ"
              />
            </Form>
            <Form>
              <Form.Check 
                type="switch"
                id="switch-gon1"
                label="GoN1"
              />
            </Form>
          </Row>
        </Container>
      </Navbar.Collapse>
    </header>
  );
}

function toggleSettings() {
  let settings = document.getElementById("basic-navbar-nav");
  if (settings.style.display === "none") {
    settings.style.display = "";
  } else {
    settings.style.display = "none";
  }
}

export default Header;
