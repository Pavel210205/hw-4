export const api = {
  PRODUCTS: '/api/products?populate[0]=images&populate[1]=productCategory',
  PRODUCT: (id: string) => `/api/products/${id}?populate[0]=images&populate[1]=productCategory`,
  CATEGORIES: '/api/product-categories',
};
