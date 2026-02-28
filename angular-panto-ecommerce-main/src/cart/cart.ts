import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { Container } from '@/layout/container/container';
import { Store } from '@ngrx/store';
import {
  selectWishlistProductLength,
  selectWishlistProducts,
} from '@/stores/wishlist/wishlist.selectors';
import {
  selectCartProducts,
  selectCartTotalItems,
  selectCartTotalPrice,
} from '@/stores/cart/cart.selectors';
import * as cartActions from '@/stores/cart/cart.actions';
import * as wishlistActions from '@/stores/wishlist/wishlist.actions';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { CartProduct } from '@/stores/cart/cart.reducer';
import { MessageService } from 'primeng/api';
import { Product } from '@/types/product.type';

@Component({
  selector: 'app-cart',
  imports: [Container, CurrencyPipe, CommonModule],
  templateUrl: './cart.html',
  styleUrl: './cart.css',
  standalone: true,
})
export class Cart {
  private store = inject(Store);
  private messageService = inject(MessageService);
  private router = inject(Router);

  cartProducts = this.store.selectSignal(selectCartProducts);
  wishlistProducts = this.store.selectSignal(selectWishlistProducts);
  wishlistCount = this.store.selectSignal(selectWishlistProductLength);
  cartProductCount = this.store.selectSignal(selectCartTotalItems);
  cartTotal = this.store.selectSignal(selectCartTotalPrice);

  isFavorite(productId: string): boolean {
    return this.wishlistProducts().some((product) => product.id === productId);
  }

  toggleWishlist(product: Product) {
    const wasFavorite = this.isFavorite(product.id);

    this.store.dispatch(wishlistActions.toggleWishlist({ product }));

    this.messageService.add({
      severity: wasFavorite ? 'warn' : 'success',
      summary: wasFavorite ? 'Removed' : 'Added',
      detail: wasFavorite
        ? 'Removed from Wishlist successfully'
        : 'Added to Wishlist successfully',
    });
  }

  addToCart(product: CartProduct) {
    const isAlreadyOnCart = this.cartProducts().some(
      (p) => p.id === product.id
    );

    this.store.dispatch(cartActions.addToCart({ product }));

    this.messageService.add({
      severity: isAlreadyOnCart ? 'success' : 'success',
      summary: isAlreadyOnCart
        ? 'Quantity Increased!'
        : 'Added to Cart successfully!',
      detail: isAlreadyOnCart
        ? 'Quantity Increased!'
        : 'Added to Cart successfully!',
    });
  }

  addToCartFromWishlist(product: Product) {
    this.store.dispatch(cartActions.addToCart({ product }));

    this.messageService.add({
      severity: 'success',
      summary: 'Added',
      detail: 'Added to Cart successfully',
    });
  }

  removeFromCart(productId: string) {
    this.store.dispatch(cartActions.removeFromCart({ productId }));

    this.messageService.add({
      severity: 'warn',
      summary: 'Removed',
      detail: 'Removed from Cart successfully',
    });
  }

  goToCheckout() {
    if (this.cartProducts().length === 0) {
      this.messageService.add({
        severity: 'warn',
        summary: 'Empty Cart',
        detail: 'Please add items to your cart before checkout',
      });
      return;
    }
    this.router.navigate(['/checkout']);
  }
}
