import qs from 'qs';
import { api } from 'config/api.ts';
import { setRequest } from 'config/setRequest';

interface FetchProductsOptions {
  filters?: Record<string, any>;
  populate?: string[];
  pagination?: {
    page?: number;
    pageSize?: number;
  };
  productCategory?: { title: string };
}

export const fetchProducts = async (options: FetchProductsOptions = {}) => {
  try {
    const {
      filters = {},
      populate = ['images', 'productCategory'],
      pagination = {},
      productCategory = {},
    } = options;

    const response = await setRequest.get(api.PRODUCTS, {
      params: {
        populate,
        ...filters,
        pagination,
        productCategory,
      },
    });

    return response.data;
  } catch (error) {
    console.error('Ошибка при загрузке продуктов:', error);
    throw error;
  }
};
