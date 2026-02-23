import React from 'react';
import s from './Input.module.scss';
export type InputProps = Omit<
  React.InputHTMLAttributes<HTMLInputElement>,
  'onChange' | 'value'
> & {
  /** Значение поля */
  value: string;
  /** Callback, вызываемый при вводе данных в поле */
  onChange: (value: string) => void;
  /** Слот для иконки справа */
  afterSlot?: React.ReactNode;
};

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ value, onChange, afterSlot, ...props }, ref) => {
    const handleChange = React.useCallback(
      (event: React.ChangeEvent<HTMLInputElement>) => {
        onChange(event.target.value);
      },
      [onChange]
    );
    return (
      <label
        className={`${s.input} ${props.disabled ? s.input__disabled : ''}  ${
          props.className ? props.className : ''
        } `}
      >
        <input
          type="text"
          className={`${s.input_field} `}
          {...props}
          ref={ref}
          value={value}
          onChange={(event) => handleChange(event)}
        />
        {afterSlot && <div className={s.input_after}>{afterSlot}</div>}
      </label>
    );
  }
);

export default Input;
