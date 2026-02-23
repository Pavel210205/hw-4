import { api } from 'config/api.ts';
import { setRequest } from '../config/setRequest';

export const fetchCategories = async () => {
  try {
    const response = await setRequest.get(api.CATEGORIES);
    return response.data;
  } catch (error) {
    console.error('Ошибка при загрузке продуктов:', error);
    throw error;
  }
};
