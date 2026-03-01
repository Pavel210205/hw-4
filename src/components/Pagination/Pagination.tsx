import React from 'react';
import ReactPaginate from 'react-paginate';
import s from './Pagination.module.scss';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  loading?: boolean;
}

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
  loading = false,
}) => {
  const handlePageChange = (selectedItem: { selected: number }) => {
    onPageChange(selectedItem.selected + 1);
  };

  if (totalPages <= 1) return null;

  return (
    <div className={s.paginationContainer}>
      <ReactPaginate
        previousLabel="‹"
        nextLabel="›"
        breakLabel="..."
        pageCount={totalPages}
        marginPagesDisplayed={1}
        onPageChange={handlePageChange}
        initialPage={currentPage - 1}
        containerClassName={s.pagination}
        activeClassName={s.active}
        disabledClassName={s.disabled}
        pageClassName={s.pageItem}
        previousClassName={s.arrow}
        nextClassName={s.arrow}
        breakClassName={s.break}
        // disabled={loading}
      />
    </div>
  );
};
export default Pagination;
