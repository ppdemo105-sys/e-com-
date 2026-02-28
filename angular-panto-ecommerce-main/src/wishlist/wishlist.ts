import { Component, inject } from '@angular/core';
import { Container } from '@/layout/container/container';
import { CommonModule } from '@angular/common';
import { Store } from '@ngrx/store';
import { selectWishlistProducts } from '@/stores/wishlist/wishlist.selectors';
import { ProductCard } from '@/shared/product-card/product-card';

@Component({
  selector: 'app-wishlist',
  imports: [Container, CommonModule, ProductCard],
  templateUrl: './wishlist.html',
  styleUrl: './wishlist.css',
  standalone: true,
})
export class Wishlist {
  private store = inject(Store);
  wishlistProducts = this.store.selectSignal(selectWishlistProducts);
}
