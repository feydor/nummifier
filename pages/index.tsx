import { useEffect, useState } from 'react';

import Layout from '../components/layout';
import Logo from '../components/logo';
import OptionsBar from '../components/options-bar';
import QueryBar from '../components/query-bar';
import Results from '../components/results';
import styles from '../styles/home.module.css';

import initNummifier from '../lib/nummifier';
import xenotate from '../lib/tx'
import glossaryMatches from '../lib/hyperglossary';

const defaultCipher = 'AQ';

export default function Home() {
  const [input, setInput] = useState('');
  const [cipher, setCipher] = useState(defaultCipher);
  const [submitted, setSubmitted] = useState(false);
  const nummifier = initNummifier();
  let matches = [];


  function handleSubmit(input: string) {
    setInput(input);
    setSubmitted(true);
  }

  function handleInputChange(input: string) {
    setInput(input);
  }

  function handleQueryClear() {
    setInput('');
    setSubmitted(false);
  }

  function handleCipherChange(key: string) {
    setCipher(key);
  }

  function handleResultsIsEmpty() {
    setSubmitted(false);
  }

  // digital reduction
  function reduce(x: string): number[] {
    let res = nummifier[cipher].reduce(x);
    matches = glossaryMatches(res, cipher);
    console.log(matches);
    return res;
  }

  // xenotation
  function tx(x: number): string {
    try {
      return xenotate(x);
    } catch (e) {
      return '';
    }
  }


  return (
    <Layout>
      <section className='section'>
        <h1 className={styles.title}>Abysmal Nummification of the Signifier</h1>
        <section className='section'>
          {submitted ?
          <Results
            input={input}
            cipher={cipher}
            reductions={reduce(input)}
            xenotations={tx(reduce(input)[0])}
            matches={matches}
            onEmpty={handleResultsIsEmpty}
          />
          : <Logo />}
        </section>
        <section className={`${styles.querySection} section`}>
          <QueryBar input={input} onInputChange={handleInputChange} onSubmit={handleSubmit} onClear={handleQueryClear}/>
          <OptionsBar onCipherChange={handleCipherChange}/>
        </section>
        <div className='section'>
          <p>enter your query above. select the desired cipher.</p>
        </div>
      </section>
      <section className='section'>

      </section>
    </Layout>
  )
}


