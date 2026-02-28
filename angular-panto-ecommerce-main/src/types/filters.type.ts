import { Category } from './category.type';
import { Finish } from './finish.type';
import { WoodType } from './woodtype.type';

export interface ProductsFilters {
  limit: number;
  offset: number;
  sort:
    | 'price_asc'
    | 'price_desc'
    | 'name_asc'
    | 'name_desc'
    | 'newest'
    | 'oldest';
  category: Category;
  wood_type: WoodType;
  finish: Finish;
  min_price: number;
  max_price: number;
  min_stock: number;
  max_stock: number;
  featured: boolean;
}
