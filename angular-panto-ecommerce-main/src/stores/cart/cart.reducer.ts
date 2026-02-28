import { createReducer, on } from '@ngrx/store';
import { Product } from '@/types/product.type';
import * as cartActions from './cart.actions';

export interface CartProduct extends Product {
  quantity: number;
}

export interface CartState {
  products: CartProduct[];
}

export const initialCartState: CartState = {
  products: [],
};

export const CartReducer = createReducer(
  initialCartState,

  on(cartActions.addToCart, (state, { product }) => {
    const existingProduct = state.products.find((p) => p.id === product.id);

    // If the product is already in the cart, increment the quantity
    if (existingProduct) {
      return {
        ...state,
        products: state.products.map((p) =>
          p.id === product.id ? { ...p, quantity: p.quantity + 1 } : p
        ),
      };
    } else {
      // If the product is not in the cart, add it (the quantity is 1 by default)
      return {
        ...state,
        products: [...state.products, { ...product, quantity: 1 }],
      };
    }
  }),

  on(cartActions.removeFromCart, (state, { productId }) => {
    const existingProduct = state.products.find((p) => p.id === productId);

    if (!existingProduct) return state;

    // If the quantity is greater than 1, decrement the quantity
    if (existingProduct.quantity > 1) {
      return {
        ...state,
        products: state.products.map((p) =>
          p.id === productId ? { ...p, quantity: p.quantity - 1 } : p
        ),
      };
    } else {
      // If the quantity is 1, remove the product from the cart
      return {
        ...state,
        products: state.products.filter((p) => p.id !== productId),
      };
    }
  }),

  on(cartActions.clearCart, (state) => ({
    ...state,
    products: []
  }))
);
