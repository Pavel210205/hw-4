import Text from 'components/Text';
import s from './FullCardErr.module.scss';
const FullCardErr = () => {
  return (
    <div className={s.fullCard}>
      <Text view="title" color="primary" weight="bold" className={s.title}>
        Продукт не найден
      </Text>
    </div>
  );
};
export default FullCardErr;
