// import numogram from '../src/numogram.png'

let _isTyping = false;
let _query = "";
const INPUTMAXLENGTH = 30;

buildHtml();

function buildHtml() {
  var rootElement = document.getElementById("root");
  rootElement.appendChild(createNummificatorNode());
  rootElement.appendChild(createLineBreakNode());
  rootElement.appendChild(createCreditsNode());
}

function createNummificatorNode() {
  var Nummificator = document.createElement("div");
  Nummificator.id = "App";

  // create and append the h2 title element
  let title = document.createElement("h1");
  title.id = "title";
  let titleText = document.createTextNode(
    "Abysmal Nummification of the Signifier"
  );
  title.appendChild(titleText);
  Nummificator.appendChild(title);

  // if is typing, show main graphic
  // main graphic is the numogram png if query === 0 or
  // a div containing the DigitalReductionBars and Glossary
  Nummificator.appendChild(createMainGraphicNode());

  Nummificator.appendChild(createQueryBarNode());
}

// for now only return a png
function createMainGraphicNode() {
  var mainGraphic = document.createElement("img");
  mainGraphic.src = "/numogram.png";
  return mainGraphic;
}

function createQueryBarNode() {
  var queryBar = document.createElement("div");
  queryBar.id = "QueryBar";

  // create a form and append its constituent elements
  let form = document.createElement("form");
  let textInput = document.createElement("input");
  textInput.type = "text";
  textInput.id = "query-input";
  textInput.name = "query";
  textInput.size = INPUTMAXLENGTH / 2;
  textInput.maxLength = INPUTMAXLENGTH;
  textInput.addEventListener("keyup", (event) => {
    if (event.isComposing || event.keyCode === 229) {
      return;
    }
    // TODO: do something
  });
  form.appendChild(textInput);

  // append a line break
  form.appendChild(document.createElement("br"));

  // create and append a button
  let button = document.createElement("input");
  button.type = "button";
  button.value = "Save";
  button.id = "query-save-button";
  button.addEventListener("click", (event) => {
    // TODO: do something
  });
  form.appendChild(button);

  // append form to queryBar and return
  queryBar.appendChild(form);
  return queryBar;
}

function createLineBreakNode() {
  var lineBreak = document.createElement("h2");
  lineBreak.innerHTML = "———";
  return lineBreak;
}

function createCreditsNode() {
  var credits = document.createElement("footer");
  credits.id = "Credits";

  let creditsParagraph = document.createTextNode("© 202X rosazhou");

  credits.appendChild(creditsParagraph);
  return credits;
}
