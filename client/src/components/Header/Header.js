import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { Sliders } from 'react-bootstrap-icons';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import logo from '../../images/logo.svg';

import './Header.css';

const Header = ({ aqSelected, gon1Selected }) => {
  return (
    <Navbar bg="dark" expand="true" className="d-flex justify-content-between">

      <Navbar.Brand href="/">
        <img 
          alt="logo"
          src={logo}
          width="30"
          height="30"
          className="d-inline-block align-top"
        />{' '}
        ANS
      </Navbar.Brand>

      <Navbar.Toggle aria-controls="basic-navbar-nav" />

      <Navbar.Collapse id="basic-navbar-nav">
        <Container fluid id="settings" className="settings-hidden justify-content-center">
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

    </Navbar>
  );
}

export default Header;
