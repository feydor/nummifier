import { useEffect, useState } from 'react';

import Layout from '../components/layout';
import Logo from '../components/logo';
import OptionsBar from '../components/options-bar';
import QueryBar from '../components/query-bar';
import Results from '../components/results';
import styles from '../styles/home.module.css';

interface Cipher {
  name: string;
  // TODO: add array for a-z ciphering
};

const defaultCipher = 'aq';

export default function Home() {
  const [input, setInput] = useState('');
  const [cipher, setCipher] = useState<Cipher>({ name: defaultCipher });
  const [submitted, setSubmitted] = useState(false);


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
    setCipher({ name: key });
  }

  // digital reduction
function reduce(x: string): number[] {
    // TODO: call rust wasm code?
    return [];
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
        <section className={`${styles.querySection} section`}>
          {input}
          <QueryBar input={input} onInputChange={handleInputChange} onSubmit={handleSubmit} onClear={handleQueryClear}/>
          <OptionsBar onCipherChange={handleCipherChange}/>
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


