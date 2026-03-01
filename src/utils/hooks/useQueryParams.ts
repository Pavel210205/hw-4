// hooks/useQueryParams.ts
import { useSearchParams, useNavigate } from 'react-router-dom';
import { useState, useCallback } from 'react';

export const useQueryParams = <T extends Record<string, string>>() => {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();

  const getParam = (key: string): string | undefined => {
    return searchParams.get(key) || undefined;
  };

  const setParam = useCallback(
    (key: string, value: string | null) => {
      const newParams = new URLSearchParams(searchParams);
      if (value === null) {
        newParams.delete(key);
      } else {
        newParams.set(key, value);
      }
      navigate(`?${newParams.toString()}`, { replace: true });
    },
    [searchParams, navigate]
  );

  const setMultipleParams = useCallback(
    (params: Partial<T>, resetPage: boolean = false) => {
      const newParams = new URLSearchParams(searchParams);

      // Если нужно сбросить на первую страницу
      if (resetPage) {
        newParams.set('page', '1');
      }

      Object.entries(params).forEach(([key, value]) => {
        if (value === null || value === undefined) {
          newParams.delete(key);
        } else {
          newParams.set(key, String(value));
        }
      });

      navigate(`?${newParams.toString()}`, { replace: true });
    },
    [searchParams, navigate]
  );

  return {
    searchParams,
    getParam,
    setParam,
    setMultipleParams,
  };
};
