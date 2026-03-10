export const routes = {
  main: {
    mask: '/',
    create: () => '/',
  },
  empty: {
    mask: '*',
    create: () => '*',
  },
  product: {
    mask: '/product/:id',
    create: (id: string) => `/product/${id}`,
  },
  cart: {
    mask: '/cart',
    create: () => `/cart`,
  },
  categories: {
    mask: '/categories',
    create: () => `/categories`,
  },
  about: {
    mask: '/about',
    create: () => `/about`,
  },
  users: {
    mask: '/users',
    create: () => '/users',
  },
  user: {
    mask: '/users/:id',
    create: (id: number) => `/users/${id}`,
  },
};
