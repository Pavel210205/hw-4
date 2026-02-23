import { api } from 'config/api.ts';
import { setRequest } from 'config/setRequest';

export const fetchProduct = async (id: string) => {
  try {
    const response = await setRequest.get(api.PRODUCT(id));
    return response.data.data;
  } catch (error) {
    console.error('Ошибка при загрузке продуктов:', error);
    throw error;
  }
};
