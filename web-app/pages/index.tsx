import Head from 'next/head';
import Image from 'next/image';
import { useState } from 'react';

import Layout from '../components/layout';
import Logo from '../components/logo';
import QueryBar from '../components/query-bar';
import Results from '../components/results';
// import styles from '../styles/home.module.css';

export default function Home() {
  let [input, setInput] = useState('');
  let [submitted, setSubmitted] = useState(false);

  function handleSubmit(input: string) {
    setInput(input);
    setSubmitted(true);
  }

  function handleInputChange(input: string) {
    setInput(input);
  }

  // digital reduction
  function reduce(x: string): number[] {
    // TODO: call rust wasm code?
    return [140, 5];
  }

  // xenotation
  function tx(x: string): string {
    // TODO: call rust wasm code?
    return "::((:))(::) ((:))";
  }

  return (
    <Layout>
      <section className='section'>
        <h1>Abysmal Nummification of the Signifier</h1>
        <section className='section'>
          {submitted ? <Results input={input} reductions={reduce(input)} xenotations={tx(input)}/> : <Logo />}
        </section>
        <section className='section'>
          {input}
          <QueryBar input={input} onInputChange={handleInputChange} onSubmit={handleSubmit}/>
        </section>
        <div className='section'>
          <h4>Instructions</h4>
          <p>Enter your query above. Select the desired cipher from the settings.</p>
        </div>
      </section>
      <section className='section'>

      </section>
    </Layout>
  )
}
