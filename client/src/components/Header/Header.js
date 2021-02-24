import Navbar from "react-bootstrap/Navbar";
import Form from "react-bootstrap/Form";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import { Gear } from "react-bootstrap-icons";
import logo from "../../images/torus-inv.png";

import "./Header.css";
  
// constants
const PADDING_TOP = "10vh";

/**
 * a header with slidedown settings
 */
const Header = (props) => {

  return (
    <header>
      <Navbar expand="true" className="fixed-top">
        <Navbar.Brand href="#top">
          <img alt="logo" src={logo} className="d-inline-block align-top" />{" "}
        </Navbar.Brand>

        <Navbar.Brand href="#top">
          <p>ANS</p>
        </Navbar.Brand>

        <Navbar.Toggle onClick={toggleSettings}>
          <Gear />
        </Navbar.Toggle>
      </Navbar>

      <Navbar.Collapse id="basic-navbar-nav" style={{ display: "none", paddingTop: PADDING_TOP }}>
        <Container fluid id="settings" className="justify-content-center">
          <Row>
            <h5>Ciphers: </h5>
            <Form>
              <CipherSetting
                label="AQ"
                onChangeHandler={props.onChangeHandler}
                defaultChecked={true}
              />
            </Form>
            <Form>
              <CipherSetting
                label="GoN1"
                onChangeHandler={props.onChangeHandler}
                defaultChecked={false}
              />
            </Form>
          </Row>
        </Container>
      </Navbar.Collapse>
    </header>
  );
};

/**
 * A checkbox element that calls the 'onChangeHandler' param on click
 * @param {string} label - id and label
 * @param {function} setState - a setState function from react
 * class is set to 'cipher-setting'
 */
const CipherSetting = ({ label, onChangeHandler, defaultChecked }) => {
  return (
    <Form.Check
      type="switch"
      id={label}
      label={label}
      className="cipher-setting"
      onChange={onChangeHandler}
      defaultChecked={defaultChecked}
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
    // remove padding from div#container
    document.getElementById("container").style.paddingTop = 0;
  } else {
    settings.style.display = "none";
    // return padding to div#container
    document.getElementById("container").style.paddingTop = PADDING_TOP;
  }

}

export default Header;
