# nummifier

A js web app to aid in anorganic, numerical, and semiotic investigations

# screenshots

# build
```shell
git clone https://github.com/feydor/nummifier.git
cd nummifier
npm install
npm run dev
```

## pseudocode
### gematria
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

### tic-xenotation
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
