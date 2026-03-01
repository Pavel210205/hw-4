export type ProductFilters = {
  title?: string;
  price?: {
    min?: number;
    max?: number;
  };
  discountPercent?: {
    min?: number;
    max?: number;
  };
  rating?: {
    min?: number;
    max?: number;
  };
  isInStock?: boolean;
  productCategory?: {
    documentId?: string;
  };
};
export type ProductSort = {
  field: 'title' | 'price' | 'discountPercent' | 'rating' | 'createdAt';
  order: 'asc' | 'desc';
};
