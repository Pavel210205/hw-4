import React from 'react';
import { fetchProducts } from 'store/products';
import { Navigate } from 'react-router-dom';

import FilterPanel from './componens/FilterPanel';
import HeaderElement from './componens/HeaderElement';
import Text from 'components/Text';
import Card from 'components/Card';
import Button from 'components/Button';
import CardSkeleton from 'components/CardSkeleton';

import s from './MainPage.module.scss';
interface Images {
  url: string;
}

type Product = {
  documentId: string;
  title: string;
  price: number;
  description: string;
  productCategory?: { title: string };
  images: Images[];
  rating?: {
    rate: number;
    count: number;
  };
};

const MainPage: React.FC = () => {
  const arr = new Array(100).fill(1);
  const [loading, setLoading] = React.useState(true);
  const [data, setData] = React.useState<Product[]>([]);
  const [search, setSearch] = React.useState('');
  const [category, setCategory] = React.useState('');
  const [sort, setSort] = React.useState('');
  const [total, setTotal] = React.useState(0);
  const loadProducts = React.useCallback(async () => {
    setLoading(true);
    try {
      const productsData = await fetchProducts();
      setData(productsData.data);
      setTotal(productsData.data.length);
    } catch (err) {
      console.error('Не удалось загрузить продукты:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  React.useEffect(() => {
    loadProducts();
  }, [loadProducts]);

  // Обработчики для фильтров
  const handleSearchChange = (value: string) => {
    setSearch(value);
    // Здесь можно добавить фильтрацию данных
  };

  const handleCategoryChange = (value: string) => {
    setCategory(value);
    // Здесь можно добавить фильтрацию по категории
  };

  const handleSortChange = (value: string) => {
    setSort(value);
    // Здесь можно добавить сортировку данных
  };
  return (
    <>
      <HeaderElement />
      <FilterPanel />
      <main className={s.mainPage}>
        <div className={s.title}>
          <Text tag="h2" color="primary" view="subtitle" weight="bold">
            Total products
          </Text>
          <Text view="p-20" color="accent" weight="bold">
            {total}
          </Text>
        </div>
        <div className={s.cards}>
          {!loading ? (
            data.map((item, index) => (
              <Card
                key={index}
                id={item.documentId}
                image={item.images[0].url}
                title={item.title}
                subtitle={item.description}
                captionSlot={item.productCategory?.title}
                contentSlot={`$${item.price}`}
                actionSlot={<Button>Add to Cart</Button>}
              />
            ))
          ) : (
            <CardSkeleton />
          )}
        </div>
      </main>
    </>
  );
};

export default MainPage;
