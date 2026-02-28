import { Product } from '@/types/product.type';
import { createAction, props } from '@ngrx/store';

export const toggleWishlist = createAction(
  '[Wishlist] Toggle',
  props<{ product: Product }>()
);

export const clearWishlist = createAction('[Wishlist] Clear');
