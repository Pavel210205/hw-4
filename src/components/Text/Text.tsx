import * as React from 'react';
import s from './Text.module.scss';
export type TextProps = {
  /** Дополнительный класс */
  className?: string;
  /** Стиль отображения */
  view?: 'title' | 'subtitle' | 'button' | 'p-20' | 'p-18' | 'p-16' | 'p-14';
  /** Html-тег */
  tag?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'div' | 'p' | 'span';
  /** Начертание шрифта */
  weight?: 'normal' | 'medium' | 'bold';
  /** Контент */
  children: React.ReactNode;
  /** Цвет */
  color?: 'primary' | 'secondary' | 'accent';
  /** Максимальное кол-во строк */
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
