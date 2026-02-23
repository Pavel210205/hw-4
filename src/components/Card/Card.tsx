import React from 'react';
import s from './Card.module.scss';
import Text from '../Text';
import { Link } from 'react-router-dom';
import { routes } from 'config/routes';
import cn from 'classnames';
export type CardProps = {
  className?: string;
  image: string;
  captionSlot?: React.ReactNode;
  title: React.ReactNode;
  subtitle: React.ReactNode;
  contentSlot?: React.ReactNode;
  onClick?: React.MouseEventHandler;
  actionSlot?: React.ReactNode;
  id: string;
};

const Card: React.FC<CardProps> = ({
  className,
  image,
  captionSlot,
  title,
  subtitle,
  contentSlot,
  onClick,
  actionSlot,
  id,
  ...props
}) => {
  return (
    <Link
      to={routes.product.create(id)}
      {...props}
      className={cn(s.card, className)}
      onClick={onClick}
    >
      <div className={s.card__img}>
        <img src={image} alt="card" className={s.img} />
      </div>

      <div className={s.card__container}>
        {captionSlot && (
          <Text view="p-14" weight="medium" color="secondary">
            {captionSlot}
          </Text>
        )}

        {title && (
          <Text maxLines={2} view="p-20" weight="bold" color="primary" className={s.title}>
            {title}
          </Text>
        )}

        {subtitle && (
          <Text maxLines={3} view="p-16" color="secondary" className={s.subtitle}>
            {subtitle}
          </Text>
        )}

        <div className={s.card__flex}>
          {contentSlot && (
            <Text weight="bold" view="p-18">
              ${contentSlot}
            </Text>
          )}
          {actionSlot && actionSlot}
        </div>
      </div>
    </Link>
  );
};

export default Card;
