import { useCallback, useState } from 'react';

export function usePageParam(PAGE_PARAM = 'page') {
  const [page, _setPage] = useState<number>(() => {
    const params = new URLSearchParams(window.location.search);
    const pageFromUrl = params.get(PAGE_PARAM);
    const parsedPage = pageFromUrl ? parseInt(pageFromUrl, 10) : 1;
    return parsedPage;
  });

  const setPage = useCallback(
    (newPage: number) => {
      const params = new URLSearchParams(window.location.search);
      params.set(PAGE_PARAM, newPage.toString());
      window.history.pushState({}, '', '?' + params.toString());
      _setPage(newPage);
    },
    [PAGE_PARAM]
  );

  return [page, setPage] as const;
}
