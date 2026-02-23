import React from 'react';
import { fetchProducts } from 'store/products';
import { Link } from 'react-router-dom';
import { routes } from 'config/routes';

import FullCardErr from './components/FullCardErr';
import Text from 'components/Text';
import FullCard from './components/FullCard';
import Card from 'components/Card';
import Button from 'components/Button';
import ButtonBack from 'components/ButtonBack';
import CardSkeleton from 'components/CardSkeleton';

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
      {error ? <FullCardErr /> : <FullCard />}
      <Text view="subtitle" color="primary" weight="bold" className={s.title__related}>
        Related Items
      </Text>
      <div className={s.relatedItems}>
        {!loading ? (
          data.map((item, index) => (
            <Card
              key={index}
              id={item.documentId}
              image={item.images[0].url}
              title={item.title}
              subtitle={item.description}
              captionSlot={item.productCategory?.title}
              contentSlot={item.price}
              actionSlot={<Button>Add to Cart</Button>}
            />
          ))
        ) : (
          <CardSkeleton countSceletons={3} />
        )}
      </div>
    </main>
  );
}
