import { Product } from '@/types/product.type';
import * as wishlistActions from '@/stores/wishlist/wishlist.actions';
import { createReducer, on } from '@ngrx/store';

export interface WishlistState {
  products: Product[];
}

export const initialWishlistState: WishlistState = {
  products: [],
};

export const wishlistReducer = createReducer(
  initialWishlistState,

  // Add or remove a product from the wishlist.
  on(wishlistActions.toggleWishlist, (state, { product }) => {
    const exists = state.products.some((p) => p.id === product.id);
    return {
      ...state,
      products: exists
        ? state.products.filter((p) => p.id !== product.id)
        : [...state.products, product],
    };
  }),

  // Clear the wishlist.
  on(wishlistActions.clearWishlist, (state) => ({
    ...state,
    products: [],
  }))
);
