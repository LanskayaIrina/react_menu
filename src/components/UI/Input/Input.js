import classes from './Input.module.css';

export const Input = ({input, label}) => {
  return (
    <div className={classes.input}>
      <label htmlFor={input.id}>{label}</label>
      <input
        {...input}
      />
    </div>
  );
};
