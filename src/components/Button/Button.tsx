import React from 'react';
import Loader from '../Loader';
import s from './Button.module.scss';
export type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  /** Состояние загрузки */
  loading?: boolean;
  /** Текст кнопки */
  children: React.ReactNode;
};

const Button: React.FC<ButtonProps> = ({
  className,
  loading = false,
  children,
  disabled,
  ...props
}) => {
  return (
    <button
      {...props}
      disabled={disabled || loading}
      className={`${className || ''} ${s.button} ${loading ? s.loading : ''} ${
        disabled ? s.disabled : ''
      }`}
    >
      {loading && <Loader className={s.loader} size="s" />}
      <span>{children}</span>
    </button>
  );
};

export default Button;
