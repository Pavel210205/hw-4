import { makeObservable, observable, computed, action, reaction } from 'mobx';
import { setRequest } from 'config/setRequest';
import { api } from 'config/api.ts';
import type { Product } from 'types/Product/TypeProduct';
import type { Filters } from 'types/Filters/TypeFiltersCategory';

const LIMIT = 9;

type PrivateFields = '_products' | '_total' | '_loading' | '_error' | '_page' | '_filters';

class ProductsStore {
  private _products: Product[] = [];
  private _total: number = 0;
  private _loading: boolean = true;
  private _error: boolean = false;
  private _page: number = 1;
  private _filters: Filters = { categories: [], search: '' };

  // Храним ссылку на реакцию, чтобы можно было отменить её при необходимости
  private _loadProductsReaction: () => void;

  constructor() {
    makeObservable<ProductsStore, PrivateFields>(this, {
      _products: observable,
      _total: observable,
      _loading: observable,
      _error: observable,
      _page: observable,
      _filters: observable,

      products: computed,
      total: computed,
      loading: computed,
      error: computed,
      page: computed,
      filters: computed,
      totalPages: computed,

      loadProducts: action,
      setPage: action,
      setFilters: action,
      reset: action,
    });

    // Создаём реакцию: перезагружаем продукты при изменении страницы или фильтров
    this._loadProductsReaction = reaction(
      () => [this._page, this._filters],
      () => this.loadProducts(),
      {
        // Опция для предотвращения немедленного вызова при создании реакции
        fireImmediately: false,
      }
    );
  }

  // Метод для корректного уничтожения хранилища (опционально)
  dispose(): void {
    this._loadProductsReaction();
  }

  // Геттеры (без изменений)
  get products(): Product[] {
    return this._products;
  }

  get total(): number {
    return this._total;
  }

  get loading(): boolean {
    return this._loading;
  }

  get error(): boolean {
    return this._error;
  }

  get page(): number {
    return this._page;
  }

  get filters(): Filters {
    return this._filters;
  }

  get totalPages(): number {
    return Math.ceil(this._total / LIMIT);
  }

  setPage(newPage: number): void {
    this._page = newPage;
  }

  setFilters(newFilters: Filters): void {
    if (!newFilters) {
      this._filters = { categories: [], search: '' };
      return;
    }

    this._filters = {
      categories: newFilters.categories || [],
      search: newFilters.search || '',
    };
  }

  async loadProducts(): Promise<void> {
    this._loading = true;
    this._error = false;

    try {
      const params: any = {
        populate: ['images', 'productCategory'],
        'pagination[page]': this._page,
        'pagination[pageSize]': LIMIT,
      };

      if (this._filters.categories.length > 0) {
        params['filters[productCategory][title][$in]'] = this._filters.categories;
        params['pagination[page]'] = 1;
      }

      if (this._filters.search) {
        params['filters[title][$containsi]'] = this._filters.search;
        params['pagination[page]'] = 1;
      }

      const productsData = await setRequest.get(api.PRODUCTS, { params });

      this._products = productsData.data.data || [];
      this._total = productsData.data.meta?.pagination?.total || 0;
    } catch (err) {
      this._error = true;
      console.error('Не удалось загрузить продукты:', err);
    } finally {
      this._loading = false;
    }
  }

  reset(): void {
    this._products = [];
    this._total = 0;
    this._loading = true;
    this._error = false;
    this._page = 1;
    this._filters = { categories: [], search: '' };
  }
}

export default new ProductsStore();
