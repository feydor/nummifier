![](./examples/banner.png)

# Nummifier

![GitHub release (latest by date including pre-releases)](https://img.shields.io/github/v/release/feydor/nummifier?include_prereleases)
![GitHub last commit](https://img.shields.io/github/last-commit/feydor/nummifier)
![GitHub issues](https://img.shields.io/github/issues-raw/feydor/nummifier)
![GitHub stars](https://img.shields.io/github/stars/feydor/nummifier)
![GitHub](https://img.shields.io/github/license/feydor/nummifier)
![Github StandardJS](https://img.shields.io/badge/code_style-standard-brightgreen.svg)

A React.js web app to aid in anorganic, numerological, and lexical investigations. 

# Table of contents

- [Live Version](#liveversion)
- [Screenshots](#screenshots)
- [Installation](#installation)
- [Development](#development)
  - [Codebase](#codebase)
    - [Technologies](#technologies)
    - [Folder Structure](#folder-structure)
  - [Design Overview](#design-overview)
- [License](#license)

# Live Version
[(Back to top)](#table-of-contents)

![Heroku](https://heroku-badges.herokuapp.com/?app=nummifier&root=index.html)
![Go to live version.](https://nummifier.herokuapp.com/)

# Screenshots
[(Back to top)](#table-of-contents)

![](./examples/main.png)
![](./examples/function.png)

# Installation
[(Back to top)](#table-of-contents)

Clone this repository, navigate into the project folder, and build the dependencies by executing:

```sh
git clone https://github.com/feydor/nummifier.git
cd nummifier
npm install
```

After installing the dependencies, start the development server by executing:

```sh
npm start
```

By default a development server will start at ``http://localhost:3001``. 

To develop, set the appropriate environment variables in .env:

```sh
DB_URI='mongodb+srv://<user>:<password>@cluster0.rn8t3.mongodb.net/Glossary?retryWrites=true&w=majority'
PORT='3001'
```

# Development
[(Back to top)](#table-of-contents)

## Codebase

### Technologies

Technologies used in this mono repo include:

- Full-stack JavaScript: Backend uses Node.js, Frontend uses React.js.
- ExpressJS: RESTful api
- MongoDB: NoSQL database
- React-Bootstrap: CSS and HTML framework
- create-react-app: Web application bundler and setup
- Prettier: JS code style formatter
- Jest: Testing framework

### Folder Structure

```sh
nummifier/
├── client     # Front-end React.js app
│   ├── build               # Static build, served by server.js
│   ├── public              # HTML, favicons, etc
│   └── src                 # React components, containers, tests, numerological methods
│       ├── algorithims     # Gematria, Tic-Xenotation, digital reduction
│       ├── components      # Function components
│       ├── images          # gifs, resources
│       └── containers      # Stateful class container and entrypoint
├── db         # Database seeding functions
├── examples   # Screenshots and assorted images
├── models     # MongoDB schemas, models, and pre-hooks
└── server.js  # Back-end Express.js app
```

## Design Overview
[(Back to top)](#table-of-contents)

### Closure Optimization
On query input, a ``ciphers`` object is created and put into the state. The ``ciphers`` object is shown below:
```javascript
ciphers = {
  'AQ': {
    reduce: function() { /* return digital reduction */ }
  },
  'GoN1': {
    reduce: function() { ... }
  },
  ...
}
```

This object is passed to various event handler functions in order to compute digital reductions on-demand and only when strictly required. Since Object properties are iterable in JavaScript, new ciphers can be implemented simply by adding them to the ``ciphers`` object.

## Pseudocode
[(Back to top)](#table-of-contents)

### Gematria
The following is the gematric algorithim expressed in pseudocode:
<pre><code>
<b>algorithm</b> gematria is
    <b>input:</b> an alphanumeric string <em>str</em> without whitespace,
           a cipher <em>C</em> such that its relationship to the Alphanumericals <em>ALPHA</em> is injective
    <b>output:</b> the same returned as a qabbalastically encoded number <em>n</em>

    <em>(Note that cipher C will by default be AQ for meta-procedural reasons)</em>

    <b>if</b> <em>str</em> is empty <b>then</b>
        <b>return</b> 0
    <b>else</b>
        <b>return</b> <em>C</em>[ <em>ALPHA</em>[<em>str.pop()</em>] ] + gematria(<em>str</em>, <em>C</em>)
</pre></code>

### Digital Reduction, or Plexing
The following is the digital reduction algorithim expressed in pseudocode:
<pre><code>
<b>algorithim</b> reduce is
    <b>input:</b> a number <em>n</em>
    <b>output:</b> the same digitally reduced by one level

    <b>if</b> <en>n</em> is a single digit number then
        <b>return</b> <em>n</em>
    <b>else</b>
       <b>return</b> &#124;<em>n</em>&#124; mod 10 + reduce(<em>n</em> / 10 truncated)
</pre></code>

### Tic-Xenotation
And finally tic-xenotation expressed in pseudocode:
<pre><code>
<b>algorithim</b> tx is
    <b>input:</b> a number <em>n</em> where <em>n</em> > 1
    <b>output:</b> an array of strings and nested strings representing the input in TX
    
    <b>if</b> <em>n</em> < 2 then
        <b>return</b> an implextion, ['']
    <b>else</b> 
        let <em>F</em> be the prime factorization of <em>n</em>
        <b>return</b> [ <b>for each</b> factor <em>f</em> in <em>F</em> <b>do</b>
                        <b>if</b> <em>f</em> == 2 then return a tic, ':'
                        <b>else return</b> tx(the index of <em>n</em> on the prime number line) ]
</pre></code>
# License
[(Back to top)](#table-of-contents)

MIT, see the [LICENSE](./LICENSE) file.
