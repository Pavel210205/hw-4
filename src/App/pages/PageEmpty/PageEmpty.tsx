import React from 'react';

import Text from 'components/Text';
import Button from 'components/Button';

import s from './PageEmpty.module.scss';
import { Link } from 'react-router-dom';

export default function PageEmpty() {
  return (
    <main className={s.main}>
      <Text view="title" color="primary" weight="bold" className={s.title}>
        Page not found
      </Text>
      <Text view="p-20" color="secondary" className={s.subtitle}>
        We display products based on the latest products we have, if you want to see our old
        products please enter the name of the item
      </Text>
      <Link to={'/'}>
        <Button className={s.button}>Go to main page</Button>
      </Link>
    </main>
  );
}
