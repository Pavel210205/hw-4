import type { RouteObject } from 'react-router';
import { routes } from './routes';
import App from '../App';
import MainPage from 'App/pages/MainPage';
import PageEmpty from 'App/pages/PageEmpty';
import ProductPage from 'App/pages/ProductPage';

export const routesConfig: RouteObject[] = [
  {
    path: routes.main.mask,
    element: <App />,
    children: [
      {
        path: routes.main.mask,
        element: <MainPage />,
      },
      {
        path: routes.empty.mask,
        element: <PageEmpty />,
      },
      {
        path: routes.product.mask,
        element: <ProductPage />,
      },
    ],
  },
];
