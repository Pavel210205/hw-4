import React from 'react';
import { fetchProducts } from 'store/products';

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
  const [loading, setLoading] = React.useState(true);
  const [data, setData] = React.useState<Product[]>([]);
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
