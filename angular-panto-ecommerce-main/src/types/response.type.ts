import { Product } from './product.type';

export interface Response {
  count: number;
  data: Product[];
  success: boolean;
}
