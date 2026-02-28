import { createFeatureSelector, createSelector } from '@ngrx/store';
import { CartState } from './cart.reducer';

export const selectCartState = createFeatureSelector<CartState>('cart');

export const selectCartProducts = createSelector(
  selectCartState,
  (state) => state?.products ?? []
);

export const selectCartTotalItems = createSelector(
  selectCartProducts,
  (products) => products.reduce((acc, p) => acc + p.quantity, 0)
);

export const selectCartTotalPrice = createSelector(
  selectCartProducts,
  (products) => products.reduce((acc, p) => acc + p.quantity * p.price, 0)
);
