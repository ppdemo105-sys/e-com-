import { Product } from '@/types/product.type';
import { createAction, props } from '@ngrx/store';

export const addToCart = createAction(
  '[Cart] Add to Cart',
  props<{ product: Product }>()
);

export const removeFromCart = createAction(
  '[Cart] Remove from Cart',
  props<{ productId: string }>()
);

export const clearCart = createAction(
  '[Cart] Clear Cart'
);
