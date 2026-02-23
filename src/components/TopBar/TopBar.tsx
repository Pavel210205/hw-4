import cn from 'classnames';
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { routes } from 'config/routes';

import LogoComponent from 'components/LogoComponent';
import MenuNavigate from './MenuNavigate';
import UserIcon from 'components/icons/UserIcon';
import BagIcon from 'components/icons/BagIcon';

import s from './TopBar.module.scss';

export type TopBarProps = {
  className?: string;
};

const TopBar: React.FC<TopBarProps> = ({ className }) => {
  const [open, setOpen] = React.useState(false);
  // закрывает меню бургер при переходе на другую страницу
  React.useEffect(() => {
    setOpen(false);
  }, [useLocation()]);
  return (
    <menu className={cn(s.topbar, className)}>
      <LogoComponent href={routes.main.mask} />
      <MenuNavigate isOpened={open} />
      <div className={s.icons}>
        <Link to={routes.cart.mask} className={s.icon}>
          <BagIcon />
        </Link>
        <Link to={routes.user.mask} className={s.icon}>
          <UserIcon />
        </Link>
        <div
          className={cn(s.menu__burger, open && s.open)}
          onClick={() => setOpen(!open)}
          aria-label={open ? 'Закрыть меню' : 'Открыть меню'}
          role="button"
          tabIndex={0}
        >
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>
    </menu>
  );
};

export default TopBar;
