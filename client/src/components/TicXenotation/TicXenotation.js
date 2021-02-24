import styles from './TicXenotation.module.css';

const TicXenotation = (props) => {
  return (
    <div className={styles.TicXenotation}>
      <h2>Tic-Xenotation</h2>
      <div>
        {props.ciphers && Object.keys(props.ciphers).length > 0 
          ? props.getTics().map(tic => <p key={tic}>{tic}</p>) : ""}
      </div>
    </div>
  );
};

export default TicXenotation;
