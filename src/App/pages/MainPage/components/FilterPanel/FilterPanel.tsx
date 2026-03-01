import React from 'react';
import MultiDropdown from 'components/MultiDropdown';
import Button from 'components/Button';
import Input from 'components/Input';
import { useDebounce } from 'utils/hooks/useDebounse';
import type { Option } from 'components/MultiDropdown';
import s from './FilterPanel.module.scss';
import { api } from 'config/api.ts';
import { setRequest } from 'config/setRequest';
import { observer } from 'mobx-react-lite';

interface FilterPanelProps {
  onFilterChange: (filters: { categories: string[]; search: string }) => void;
  initialFilters: { categories: string[]; search: string };
}

const FilterPanel: React.FC<FilterPanelProps> = ({ onFilterChange, initialFilters }) => {
  const [searchValue, setSearchValue] = React.useState(initialFilters.search);
  const [categoriesValue, setCategoriesValue] = React.useState<Option[]>(
    initialFilters.categories.map((cat) => ({ documentId: cat, title: cat, value: cat }))
  );
  const [data, setData] = React.useState<Option[]>([]);
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);

  // Дебаунс для поиска с задержкой 500 мс
  const debouncedSearch = useDebounce(searchValue, 500);

  const loadCategories = React.useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const productsData = await setRequest.get(api.CATEGORIES);
      setData(productsData.data.data);
    } catch (err) {
      setError('Не удалось загрузить категории');
    } finally {
      setLoading(false);
    }
  }, []);

  React.useEffect(() => {
    loadCategories();
  }, [loadCategories]);

  // Мемоизированный обработчик изменения категорий
  const handleMultiDropdownChange = React.useCallback((newValue: Option[]) => {
    setCategoriesValue(newValue);
  }, []);

  // Мемоизированный обработчик поиска
  const handleSearchChange = React.useCallback((value: string) => {
    setSearchValue(value);
  }, []);

  // Эффект для отправки фильтров только при изменении debouncedSearch или categoriesValue
  React.useEffect(() => {
    const newCategories = categoriesValue.map((cat) => cat.title);

    // Отправляем фильтры, если они изменились
    onFilterChange({
      categories: newCategories,
      search: debouncedSearch,
    });
  }, [debouncedSearch, categoriesValue, onFilterChange]);

  // Обработчик сброса фильтров
  const handleResetFilters = React.useCallback(() => {
    setSearchValue('');
    setCategoriesValue([]);
    onFilterChange({ categories: [], search: '' });
  }, [onFilterChange]);

  return (
    <div className={s.filters}>
      <div className={s.search}>
        <Input value={searchValue} onChange={handleSearchChange} placeholder="Search product" />
        <Button
          loading={false}
          onClick={() =>
            onFilterChange({
              categories: categoriesValue.map((cat) => cat.title),
              search: searchValue,
            })
          }
        >
          Find now
        </Button>
      </div>

      {error && <div className={s.error}>{error}</div>}

      <MultiDropdown
        className={s.filter}
        getTitle={(selected) =>
          selected.length > 0 ? selected.map((opt) => opt.title).join(', ') : 'Все категории'
        }
        options={data}
        value={categoriesValue}
        onChange={handleMultiDropdownChange}
      />

      {(categoriesValue.length > 0 || searchValue) && (
        <Button className={s.resetButton} onClick={handleResetFilters}>
          Сбросить фильтры
        </Button>
      )}
    </div>
  );
};

export default observer(FilterPanel);
