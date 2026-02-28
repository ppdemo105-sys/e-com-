import { ActionReducerMap } from '@ngrx/store';
import { wishlistReducer, WishlistState } from './wishlist/wishlist.reducer';
import { CartReducer, CartState } from './cart/cart.reducer';

export interface RootState {
  wishlist: WishlistState;
  cart: CartState;
}

export const reducers: ActionReducerMap<RootState> = {
  wishlist: wishlistReducer,
  cart: CartReducer,
};
