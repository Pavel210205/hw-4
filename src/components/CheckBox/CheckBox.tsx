import React from 'react';
import s from './Checkbox.module.scss';

export type CheckBoxProps = Omit<
  React.InputHTMLAttributes<HTMLInputElement>,
  'onChange'
> & {
  /** Вызывается при клике на чекбокс */
  onChange: (checked: boolean) => void;
};

const CheckBox: React.FC<CheckBoxProps> = ({
  className,
  checked,
  onChange,
  disabled,
  ...props
}) => {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onChange(event.target.checked);
  };

  return (
    <label
      className={`${s.checkbox}, ${
        disabled && s['checkbox--disabled']
      } ${className}`}
    >
      <input
        type="checkbox"
        className={s.checkbox__input}
        checked={checked}
        onChange={handleChange}
        disabled={disabled}
        {...props}
      />
      <span className={s.checkbox__custom}>
        {checked && (
          <svg
            className={s.checkbox__icon}
            xmlns="http://www.w3.org/2000/svg"
            width="40"
            height="40"
            fill="none"
            viewBox="0 0 40 40"
          >
            <path
              d="M6.66663 19.3548L16.4625 30L33.3333 11.6667"
              stroke="#518581"
              strokeWidth="3.33333"
            />
          </svg>
        )}
      </span>
    </label>
  );
};

export default CheckBox;
