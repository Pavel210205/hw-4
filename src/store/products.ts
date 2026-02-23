import { api } from 'config/api.ts';
import { setRequest } from 'config/setRequest';

export const fetchProducts = async () => {
  try {
    const response = await setRequest.get(api.PRODUCTS);
    return response.data;
  } catch (error) {
    console.error('Ошибка при загрузке продуктов:', error);
    throw error;
  }
};
