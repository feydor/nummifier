# Nummifier

A js web app to aid in anorganic, numerical, and semiotic investigations

# Screenshots
![](./examples/main.png)
![](./examples/function.png)

# Build
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

### Folder structure

```sh
nummifier/
├── client     # React.js app
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
└── server.js  # Back-end Node.js app
```

## Pseudocode
### Gematria
<pre><code><b>algorithm</b> gematria is
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
<pre><code><b>algorithim</b> reduce is
    <b>input:</b> a number <em>n</em>
    <b>output:</b> the same digitally reduced by one level

    <b>if</b> <en>n</em> is a single digit number then
        <b>return</b> <em>n</em>
    <b>else</b>
       <b>return</b> &#124;<em>n</em>&#124; mod 10 + reduce(<em>n</em> / 10 truncated)
</pre></code>

### Tic-Xenotation
<pre><code><b>algorithim</b> tx is
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
MIT, see the [LICENSE](./LICENSE) file.
