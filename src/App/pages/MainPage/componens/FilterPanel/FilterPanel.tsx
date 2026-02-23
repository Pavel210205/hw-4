import React from 'react';

import MultiDropdown from 'components/MultiDropdown';
import Button from 'components/Button';
import Input from 'components/Input';

import type { Option } from 'components/MultiDropdown';

import s from './FilterPanel.module.scss';

import { api } from 'config/api.ts';
import { setRequest } from 'config/setRequest';

export type FilterPanelProps = {};

const FilterPanel: React.FC<FilterPanelProps> = () => {
  const [searchValue, setSearchValue] = React.useState('');
  const [categoriesValue, setCategoriesValue] = React.useState<Option[]>([]);

  const [data, setData] = React.useState<Option[]>([]);
  const loadCategories = React.useCallback(async () => {
    try {
      const productsData = await setRequest.get(api.CATEGORIES);
      setData(productsData.data.data);
    } catch (err) {
      console.error('Не удалось загрузить категории:', err);
    }
  }, []);

  React.useEffect(() => {
    loadCategories();
  }, []);

  const handleMultiDropdownChange = React.useCallback((newValue: Option[]) => {
    setCategoriesValue(newValue);
  }, []);
  const handleSearchChange = React.useCallback((value: string) => {
    setSearchValue(value);
  }, []);
  return (
    <div className={s.filters}>
      <div className={s.search}>
        <Input
          value={searchValue}
          onChange={(value) => handleSearchChange(value)}
          placeholder="Search product"
        />
        <Button loading={false}>Find now</Button>
      </div>

      <MultiDropdown
        className={s.filter}
        getTitle={(selected) =>
          selected.length > 0 ? selected.map((opt) => opt.title).join(', ') : 'Все категории'
        }
        options={data}
        value={categoriesValue}
        onChange={handleMultiDropdownChange}
      />
    </div>
  );
};

export default React.memo(FilterPanel);
