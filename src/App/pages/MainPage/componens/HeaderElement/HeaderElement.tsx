import React from 'react';
import Text from 'components/Text';
import cn from 'classnames';
import s from './HeaderElement.module.scss';
type HeaderElementProps = {
  className?: string;
};

const HeaderElement: React.FC<HeaderElementProps> = ({ className }) => {
  return (
    <div className={cn(className, s.headerElement)}>
      <Text view="title" color="primary" weight="bold" className={s.title}>
        Products
      </Text>
      <Text view="p-20" color="secondary" className={s.subtitle}>
        We display products based on the latest products we have, if you want to see our old
        products please enter the name of the item
      </Text>
    </div>
  );
};

export default HeaderElement;
