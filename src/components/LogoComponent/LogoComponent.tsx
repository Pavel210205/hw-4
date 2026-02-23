import React from 'react';
import cn from 'classnames';
import { Link } from 'react-router-dom';

import LogoIcon from 'components/icons/LogoIcon';

import s from './LogoComponent.module.scss';

export type LogoProps = {
  className?: string;

  href: string;
};

const Container: React.FC<LogoProps> = ({ className, href }) => {
  return (
    <Link to={href} className={cn(s.logo, className)}>
      <LogoIcon width={42} height={42} viewBox="0 0 42 42" />
      <p className={s.text}>Lalasia</p>
    </Link>
  );
};

export default Container;
