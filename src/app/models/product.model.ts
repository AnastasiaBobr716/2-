export interface IProduct {
  id: number;
  name: string;
  description: string;
  price: number;
  category: ProductCategory;
  inStock: boolean;
  createdAt: Date;
}

export enum ProductCategory {
  Electronics = 'Electronics',
  Clothing = 'Clothing',
  Food = 'Food',
  Books = 'Books',
  Other = 'Other'
}

export interface IProductCreateRequest {
  name: string;
  description: string;
  price: number;
  category: ProductCategory;
}

export interface IProductUpdateRequest extends Partial<IProductCreateRequest> {
  id: number;
}
