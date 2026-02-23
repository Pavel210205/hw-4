import React from 'react';
import cn from 'classnames';
import { useParams } from 'react-router';

import { fetchProduct } from 'store/product';

import Text from 'components/Text';
import Button from 'components/Button';
import Slider from 'components/Slider';

import s from './FullCard.module.scss';
import { log } from 'utils/log';

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

const FullCard: React.FC = () => {
  const arr = [1, 2, 3];
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState(false);
  const [data, setData] = React.useState<Product>();
  const { id } = useParams();

  const loadProducts = React.useCallback(async (productId: string) => {
    setLoading(true);
    setError(false);
    try {
      const productData = await fetchProduct(productId);
      setData(productData);
    } catch (err) {
      console.error('Не удалось загрузить продукты:', err);
      setError(true);
    } finally {
      setLoading(false);
      log(data);
    }
  }, []);
  log(data);
  React.useEffect(() => {
    if (id) loadProducts(id);
  }, [loadProducts]);
  return (
    <div className={s.fullCard}>
      <div className={s.slider}>
        <img src={data?.images[0].url} alt="product" />
      </div>

      <div className={s.fullCard__container}>
        <Text view="title" color="primary" weight="bold" className={s.title}>
          {data?.title}
        </Text>
        <Text view="p-20" color="secondary" className={s.subtitle}>
          {data?.description}
        </Text>
        <Text view="title" color="primary" weight="bold" className={s.price}>
          ${data?.price}
        </Text>
        <div className={s.buttons}>
          <Button className={s.button}>В корзину</Button>
          <Button className={cn(s.button, s.button__secondary)}>Подробнее</Button>
        </div>
      </div>
    </div>
  );
};
export default FullCard;
