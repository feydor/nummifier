import styles from "./TicXenotation.module.css";

const TicXenotation = (props) => {
  return (
    <div className={styles.TicXenotation}>
      <h2>Tic-Xenotation</h2>
      <p>
        {props.ciphers && Object.keys(props.ciphers).length > 0
          ? props.getTics().map((tic) => <span key={tic}>{tic} </span>)
          : ""}
      </p>
    </div>
  );
};

export default TicXenotation;
