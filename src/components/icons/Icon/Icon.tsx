import * as React from 'react';
import s from './Icon.module.scss';
export type IconProps = React.SVGAttributes<SVGElement> & {
  className?: string;
  color?: 'primary' | 'secondary' | 'accent';
  // width?: number;
  // height?: number;
};

const Icon: React.FC<React.PropsWithChildren<IconProps>> = ({
  className,
  width = 24,
  height = 24,
  color = 'primary',
  children,
  ...props
}) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox={`0 0 24 24`}
      xmlns="http://www.w3.org/2000/svg"
      className={[className, s[color]].filter(Boolean).join(' ')}
      fill="none"
      preserveAspectRatio="xMidYMid meet"
      {...props}
    >
      {children}
    </svg>
  );
};

export default Icon;
