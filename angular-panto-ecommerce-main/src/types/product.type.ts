import { Category } from './category.type';
import { Finish } from './finish.type';
import { WoodType } from './woodtype.type';

export interface Product {
  id: string;
  name: string;
  category: Category;
  description: string;
  wood_type: WoodType;
  finish: Finish;
  dimensions: {
    depth: number;
    width: number;
    height: number;
  };
  price: number;
  weight: number;
  image_path: string;
  stock: number;
  sku: string;
  status: 'active' | 'inactive';
  created_at: string;
  updated_at: string;
  featured: boolean;
  discount_price?: number;
  tags?: string[] | null;
}
