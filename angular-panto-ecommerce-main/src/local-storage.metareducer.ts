import { ActionReducer, INIT, UPDATE } from '@ngrx/store';
import { RootState } from '@/stores';
import { initialWishlistState } from './stores/wishlist/wishlist.reducer';
initialWishlistState;
import { initialCartState } from './stores/cart/cart.reducer';

export function localStorageMetaReducer(
  reducer: ActionReducer<RootState>
): ActionReducer<RootState> {
  return (state, action) => {
    if (action.type === INIT || action.type === UPDATE) {
      try {
        const wishlistState = localStorage.getItem('wishlist');
        const cartState = localStorage.getItem('cart');

        const parsedWishlist = wishlistState ? JSON.parse(wishlistState) : {};
        const parsedCart = cartState ? JSON.parse(cartState) : {};

        const newState: RootState = {
          ...reducer(undefined, { type: INIT }),
          wishlist: {
            ...initialWishlistState,
            ...parsedWishlist,
          },
          cart: {
            ...initialCartState,
            ...parsedCart,
          },
        };

        return newState;
      } catch (error) {
        console.error('Errore nel parsing del localStorage:', error);
        localStorage.removeItem('wishlist');
        localStorage.removeItem('cart');
        return reducer(undefined, { type: INIT });
      }
    }

    const nextState = reducer(state, action);

    try {
      if (nextState.wishlist) {
        localStorage.setItem('wishlist', JSON.stringify(nextState.wishlist));
      }
      if (nextState.cart) {
        localStorage.setItem('cart', JSON.stringify(nextState.cart));
      }
    } catch (error) {
      console.error('Errore nel salvataggio nel localStorage:', error);
    }

    return nextState;
  };
}
