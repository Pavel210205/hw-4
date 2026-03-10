import React from 'react';
import { observer } from 'mobx-react-lite';
import { useQueryParams } from 'utils/hooks/useQueryParams';
import ProductsStore from 'store/ProductsStore'; // путь к хранилищу

import FilterPanel from './components/FilterPanel';
import HeaderElement from './components/HeaderElement';
import Text from 'components/Text';
import Card from 'components/Card';
import Button from 'components/Button';
import CardSkeleton from 'components/CardSkeleton';
import CardError from './components/CardError';
import Pagination from 'components/Pagination';

import s from './MainPage.module.scss';
const MainPage: React.FC = observer(() => {
  const { getParam, setMultipleParams } = useQueryParams();

  // Инициализация из URL при монтировании
  React.useEffect(() => {
    const pageFromUrl = Number(getParam('page') || '1');
    const searchFromUrl = getParam('search') || '';
    const categoriesFromUrl = getParam('categories')?.split(',') || [];

    ProductsStore.setPage(pageFromUrl);
    ProductsStore.setFilters({
      categories: categoriesFromUrl,
      search: searchFromUrl,
    });
    ProductsStore.loadProducts();
  }, []);

  // Синхронизация URL с состоянием хранилища
  React.useEffect(() => {
    setMultipleParams({
      page: ProductsStore.page.toString(),
      search: ProductsStore.filters.search || '',
      categories:
        ProductsStore.filters.categories.length > 0
          ? ProductsStore.filters.categories.join(',')
          : '',
    });
  }, [ProductsStore.page, ProductsStore.filters]);

  const handlePageChange = (newPage: number) => {
    ProductsStore.setPage(newPage);
  };

  return (
    <>
      <HeaderElement />
      <FilterPanel
        onFilterChange={ProductsStore.setFilters}
        initialFilters={ProductsStore.filters}
      />
      <main className={s.mainPage}>
        <div className={s.title}>
          <Text tag="h2" color="primary" view="subtitle" weight="bold">
            Total products
          </Text>
          <Text view="p-20" color="accent" weight="bold">
            {ProductsStore.total}
          </Text>
        </div>

        {ProductsStore.error ? (
          <CardError />
        ) : (
          <div className={s.cards}>
            {!ProductsStore.loading ? (
              ProductsStore.products.map((item, index) => (
                <Card
                  key={index}
                  id={item.documentId}
                  image={item.images[0]?.url || ''}
                  title={item.title}
                  subtitle={item.description}
                  captionSlot={item.productCategory?.title}
                  contentSlot={`${item.price}`}
                  actionSlot={<Button>Add to Cart</Button>}
                />
              ))
            ) : (
              <CardSkeleton />
            )}
          </div>
        )}

        <Pagination
          currentPage={ProductsStore.page}
          totalPages={ProductsStore.totalPages}
          onPageChange={handlePageChange}
          loading={ProductsStore.loading}
        />
      </main>
    </>
  );
});

export default MainPage;
