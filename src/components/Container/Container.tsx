import React from 'react';
import cn from 'classnames';
import s from './Container.module.scss';
export type ContainerProps = {
  className?: string;
  children: React.ReactNode;
};

const Container: React.FC<ContainerProps> = ({ className, children }) => {
  return <div className={cn(s.container, className)}> {children}</div>;
};

export default Container;
