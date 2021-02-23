import style from './Description.module.css';

const Description = (props) => {
    return (
        <div className={style.Description}>
          {props.children}
        </div>
    );
};

export default Description;
