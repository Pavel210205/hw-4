import cn from 'classnames';
import React from 'react';
import { NavLink } from 'react-router-dom';
import { routes } from 'config/routes';

import s from './MenuNavigate.module.scss';

export type MenuNavigateProps = {
  isOpened?: boolean;
};

const MenuNavigate: React.FC<MenuNavigateProps> = ({ isOpened }) => {
  return (
    <nav>
      <ul className={cn(s.menu, isOpened && s.menu__open)}>
        <li>
          <NavLink
            to={routes.main.mask}
            className={({ isActive }) => cn(s.item, isActive && s.active)}
          >
            Products
          </NavLink>
        </li>
        <li>
          <NavLink
            to={routes.categories.mask}
            className={({ isActive }) => cn(s.item, isActive && s.active)}
          >
            Categories
          </NavLink>
        </li>
        <li>
          <NavLink
            to={routes.about.mask}
            className={({ isActive }) => cn(s.item, isActive && s.active)}
          >
            About us
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default MenuNavigate;
