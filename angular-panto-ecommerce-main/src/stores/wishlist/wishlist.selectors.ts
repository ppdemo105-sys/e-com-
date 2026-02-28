import { createSelector } from '@ngrx/store';
import { RootState } from '@/stores';

export const selectWishlistState = (state: RootState) => state.wishlist;

export const selectWishlistProducts = createSelector(
  selectWishlistState,
  (wishlistState) => wishlistState?.products ?? []
);

export const selectWishlistProductLength = createSelector(
  selectWishlistProducts,
  (items) => items.length
);
