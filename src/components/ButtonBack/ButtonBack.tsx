import React from 'react';
import s from './ButtonBack.module.scss';
import ArrowRightIcon from 'components/icons/ArrowRightIcon';
import Text from 'components/Text';
import { Link } from 'react-router-dom';
import { routes } from 'config/routes';

export default function ButtonBack() {
  return (
    <Link to={routes.main.mask}>
      <div className={s.back}>
        <ArrowRightIcon className={s.back__icon} />
        <Text view="p-20" color="primary" className={s.back__text}>
          Назад
        </Text>
      </div>
    </Link>
  );
}
