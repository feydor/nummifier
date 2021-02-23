import classes from './Button.module.css';

const Button = (props) => {
    return (
        <button
          className={classes.Button}
          id={props.id}
          onClick={props.clicked}
        >
          {props.children}
        </button>
    );
};

export default Button;
