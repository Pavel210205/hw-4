import React from 'react';
import { fetchProducts } from 'store/products';

import Text from 'components/Text';
import FullCard from './components/FullCard';
import Card from 'components/Card';
import Button from 'components/Button';
import ButtonBack from 'components/ButtonBack';

import s from './ProductPage.module.scss';

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

export default function ProductPage() {
  const arr = [1, 2, 3];
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState(false);
  const [data, setData] = React.useState<Product[]>([]);

  const loadProducts = React.useCallback(async () => {
    setLoading(true);
    setError(false);
    try {
      const productsData = await fetchProducts();
      setData(productsData.data);
    } catch (err) {
      console.error('Не удалось загрузить продукты:', err);
      setError(true);
    } finally {
      setLoading(false);
    }
  }, []);

  React.useEffect(() => {
    loadProducts();
  }, [loadProducts]);
  return (
    <main className={s.main}>
      <ButtonBack />
      <FullCard />
      <Text view="subtitle" color="primary" weight="bold" className={s.title__related}>
        Related Items
      </Text>
      <div className={s.relatedItems}>
        {data &&
          data.map((item, index) => (
            <Card
              key={index}
              id={item.documentId}
              image={item.images[0].url}
              title={item.title}
              subtitle={item.description}
              captionSlot={item.productCategory?.title}
              contentSlot={item.price}
              actionSlot={<Button>Action</Button>}
            />
          ))}
      </div>
    </main>
  );
}
