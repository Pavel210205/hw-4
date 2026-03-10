import { routes } from 'config/routes';

import { Link } from 'react-router-dom';
import Button from 'components/Button';
import Text from 'components/Text';

import s from './CardError.module.scss';

export default function CardError() {
  return (
    <div className={s.cardError}>
      <Text view="subtitle" weight="bold" color="primary" className={s.title}>
        Something went wrong
      </Text>
      <Text view="p-20" color="secondary" className={s.subtitle}>
        We display products based on the latest products we have, if you want to see our old
        products please enter the name of the item
      </Text>
      <Link to={routes.main.mask}>
        <Button className={s.button}>Go to main page</Button>
      </Link>
    </div>
  );
}
