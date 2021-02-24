import style from './Description.module.css';

const Description = (props) => {
    return (
        <article className={style.Description}>
          {props.children}
        </article>
    );
};

export default Description;
