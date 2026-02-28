import { Product } from '@/types/product.type';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { Component, inject, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Store } from '@ngrx/store';
import * as wishlistActions from '@/stores/wishlist/wishlist.actions';
import { selectWishlistProducts } from '@/stores/wishlist/wishlist.selectors';
import * as cartActions from '@/stores/cart/cart.actions';
import { selectCartProducts } from '@/stores/cart/cart.selectors';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-product-card',
  imports: [CurrencyPipe, RouterLink, CommonModule],
  templateUrl: './product-card.html',
  styleUrl: './product-card.css',
  standalone: true,
})
export class ProductCard {
  private store = inject(Store);
  private messageService = inject(MessageService);

  product = input.required<Product>();

  wishlistProducts = this.store.selectSignal(selectWishlistProducts);
  cartProducts = this.store.selectSignal(selectCartProducts);

  isFavorite(productId: string): boolean {
    return this.wishlistProducts().some((product) => product.id === productId);
  }

  isAlreadyOnCart(productId: string): boolean {
    return this.cartProducts().some((product) => product.id === productId);
  }

  productsStars(starsLength: number) {
    return Array.from({ length: starsLength }, (_, index) => index);
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

  addToCart(product: Product) {
    this.store.dispatch(cartActions.addToCart({ product }));

    this.messageService.add({
      severity: 'success',
      summary: 'Added',
      detail: 'Added to Cart successfully',
    });
  }
}
