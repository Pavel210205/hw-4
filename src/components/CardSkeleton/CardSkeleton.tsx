import React from 'react';
import s from './CardSkeleton.module.scss';

interface CardSkeletonProps {
  countSceletons?: number;
}

const CardSkeleton: React.FC<CardSkeletonProps> = ({ countSceletons = 9 }) => {
  const skeletons = Array.from({ length: countSceletons }, (_, index) => (
    <div key={index} className={s.card}>
      <div>
        <div className={s.card__img}></div>
      </div>

      <div className={s.card__container}>
        <div className={s.caption}></div>
        <div className={s.title}></div>
        <div className={s.subtitle}></div>
        <div className={s.subtitle}></div>
        <div className={s.subtitle}></div>
        <div className={s.card__flex}>
          <div className={s.price}></div>
          <div className={s.btn}></div>
        </div>
      </div>
    </div>
  ));

  return <>{skeletons}</>;
};

export default CardSkeleton;
