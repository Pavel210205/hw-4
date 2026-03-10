import React from 'react';
import cn from 'classnames';

import Input from '../Input';
import ArrowDownIcon from '../icons/ArrowDownIcon';

import s from './MultiDropdown.module.scss';

export type Option = {
  documentId: string;
  title: string;
};

export type MultiDropdownProps = {
  className?: string;
  options: Option[];
  value: Option[];
  onChange: (value: Option[]) => void;
  disabled?: boolean;
  getTitle: (value: Option[]) => string;
  placeholder?: string;
};

const MultiDropdown: React.FC<MultiDropdownProps> = ({
  className,
  options = [],
  value,
  onChange,
  disabled,
  getTitle,
}) => {
  const wrapperRef = React.useRef<HTMLDivElement>(null);
  const ref = React.useRef<HTMLInputElement>(null);

  const [filter, setFilter] = React.useState('');

  const [isOpened, setIsOpened] = React.useState(false);

  const open = () => {
    setIsOpened(true);
  };

  React.useEffect(() => {
    const handlerClick = (e: MouseEvent) => {
      if (!wrapperRef.current?.contains(e.target as HTMLElement)) {
        setIsOpened(false);
      }
    };

    window.addEventListener('click', handlerClick);

    return () => {
      window.removeEventListener('click', handlerClick);
    };
  }, []);

  React.useEffect(() => {
    if (isOpened) {
      setFilter('');
    }
  }, [isOpened]);

  const title = React.useMemo(() => getTitle(value), [getTitle, value]);
  const isEmpty = value.length === 0;

  const filteredOptions = React.useMemo(() => {
    const str = filter.toLocaleLowerCase();

    return options.filter((o) => o.title.toLocaleLowerCase().includes(str));
  }, [filter, options]);
  const selectedKeysSet = React.useMemo<Set<Option['documentId']>>(
    () => new Set(value.map(({ documentId }) => documentId)),
    [value]
  );

  const onSelect = React.useCallback(
    (option: Option) => {
      if (disabled) {
        return;
      }
      if (selectedKeysSet.has(option.documentId)) {
        onChange([...value].filter(({ documentId }) => documentId !== option.documentId));
      } else {
        onChange([...value, option]);
      }
      ref.current?.focus();
    },
    [disabled, onChange, value, selectedKeysSet]
  );

  const opened = isOpened && !disabled;

  return (
    <div
      ref={wrapperRef}
      className={`${s.multiDropdown} ${opened ? s.open : ''} ${className ? className : ''}`}
    >
      <Input
        ref={ref}
        className={`${s.input} ${opened ? s.open : ''} ${disabled ? s.disabled : ''}`}
        value={opened ? filter : isEmpty ? '' : title}
        onChange={setFilter}
        onClick={open}
        afterSlot={
          <ArrowDownIcon color="secondary" className={cn(s.icon, isOpened && s.icon__active)} />
        }
        disabled={disabled}
        placeholder={title}
      />
      {opened && (
        <ul className={s.link}>
          {filteredOptions.map((option) => (
            <li
              className={`${s.list} ${value.some((o) => o.documentId === option.documentId) ? s.active : ''}`}
              key={option.documentId}
              onClick={() => onSelect(option)}
            >
              {option.title}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default React.memo(MultiDropdown);
