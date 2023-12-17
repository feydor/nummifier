import { useState } from 'react';
import OptionsBar from '../../components/options-bar';
import QueryBar from '../../components/query-bar';
import Results from '../../components/results';
import styles from './index.module.css';
import Link from 'next/link';

import initNummifier from '../../lib/nummifier';
import xenotate from '../../lib/tx'
import glossaryMatches, { cipherGlossary } from '../../lib/hyperglossary';

const defaultCipher = 'AQ';

export default function Nummifier() {
  const [input, setInput] = useState('');
  const [cipher, setCipher] = useState(defaultCipher);
  const nummifier = initNummifier();
  let matches = [];


  function handleSubmit(input: string) {
    setInput(input);
  }

  function handleInputChange(input: string) {
    setInput(input);
  }

  function handleQueryClear() {
    setInput('');
  }

  function handleCipherChange(key: string) {
    setCipher(key);
  }

  // digital reduction
  function reduce(x: string): number[] {
    let res = nummifier[cipher].reduce(x);
    matches = glossaryMatches(res, cipher);
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

  function exportMatchesJson() {
    let matchesMap = cipherGlossary(cipher);
    let dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(matchesMap));
    let tempDownloadNode = document.createElement('a');
    tempDownloadNode.setAttribute("href", dataStr);
    tempDownloadNode.setAttribute("download", `export-${cipher}.json`);
    document.body.appendChild(tempDownloadNode);
    tempDownloadNode.click();
    tempDownloadNode.remove();
  }

  return (
    <div className={`${styles.PageLayout}`}>
      <section className={`${styles.SidebarLayout}`}>
        <OptionsBar onCipherChange={handleCipherChange} onExportClick={exportMatchesJson}/>
      </section>
      <section className={`${styles.MainLayout}`}>
          <h1>ABYSMAL NUMMIFICATION OF THE SIGNIFIER</h1>
          <section className={styles.ResultsLayout}>
            <Results
            input={input}
            cipher={cipher}
            reductions={reduce(input)}
            xenotations={tx(reduce(input)[0])}
            matches={matches}
            />
          </section>
          <section className={`${styles.querySection}`}>
              <QueryBar input={input} onInputChange={handleInputChange} onSubmit={handleSubmit} onClear={handleQueryClear}/>
          </section>
          <footer>
            <p>
              <Link href="/">
                <a>/</a>
              </Link>
            </p>
            </footer>
      </section>
    </div>
  )
}


