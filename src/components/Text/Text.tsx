import * as React from 'react';
import s from './Text.module.scss';
export type TextProps = {
  className?: string;
  view?: 'title' | 'subtitle' | 'button' | 'p-20' | 'p-18' | 'p-16' | 'p-14';
  tag?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'div' | 'p' | 'span';
  weight?: 'normal' | 'medium' | 'bold';
  children: React.ReactNode;
  color?: 'primary' | 'secondary' | 'accent';
  maxLines?: number;
};

const Text: React.FC<TextProps> = ({
  tag: Tag = 'p',
  className,
  children,
  view = 'p-16',
  weight = 'normal',
  color = 'primary',
  maxLines,
}) => {
  return (
    <Tag
      className={[s[weight], s[view], s[color], maxLines && s[`lines-${maxLines}`], className]
        .filter(Boolean)
        .join(' ')}
    >
      {children}
    </Tag>
  );
};

export default Text;
