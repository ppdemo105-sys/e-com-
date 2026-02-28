import { ProductService } from '@/services/product.service';
import { Product as ProductType } from '@/types/product.type';
import { CommonModule } from '@angular/common';
import { Component, inject, OnDestroy, OnInit, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Container } from '@/layout/container/container';
import { ProductsService } from '@/services/products.service';
import { Category } from '@/types/category.type';
import { SkeletonCard } from '@/shared/skeleton-card/skeleton-card';
import { ProductCard } from '@/shared/product-card/product-card';
import { skeletonCards } from '@/utils/skeletonCards';
import { Store } from '@ngrx/store';
import * as wishlistActions from '@/stores/wishlist/wishlist.actions';
import { selectWishlistProducts } from '@/stores/wishlist/wishlist.selectors';
import { MessageService } from 'primeng/api';
import { Loader } from '@/shared/loader/loader';

@Component({
  selector: 'app-product',
  imports: [CommonModule, Container, SkeletonCard, ProductCard, Loader],
  templateUrl: './product.html',
  styleUrl: './product.css',
})
export class Product implements OnInit, OnDestroy {
  private store = inject(Store);
  private productService = inject(ProductService);
  private productsService = inject(ProductsService);
  private messageService = inject(MessageService);

  productSlug: string | '' = '';
  relatedCategory: Category | undefined = undefined;

  isLoading = signal<boolean>(false);
  errorState = signal<string | null>(null);
  product = signal<ProductType | null>(null);
  relatedProducts = signal<ProductType[]>([]);

  relatedProductsLimit = 4;
  skeletonCards = skeletonCards(this.relatedProductsLimit);

  wishlistProducts = this.store.selectSignal(selectWishlistProducts);

  isFavorite(productId: string): boolean {
    return this.wishlistProducts().some((product) => product.id === productId);
  }

  toggleWishlist(product: ProductType) {
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

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      const slug = params.get('productSlug');
      if (slug) {
        this.productSlug = slug;
        this.effect();
      }
    });
  }

  effect() {
    this.isLoading.set(true);
    document.body.classList.add('overflow-hidden');
    this.errorState.set(null);

    this.productService.getProduct(this.productSlug || '').subscribe({
      next: (product: ProductType) => {
        this.product.set(product);
        this.relatedCategory = product.category;
        this.isLoading.set(false);
        document.body.classList.remove('overflow-hidden');

        this.productsService
          .getProducts({
            limit: 4,
            offset: 0,
            category: product.category,
          })
          .subscribe({
            next: (data) => {
              this.relatedProducts.set(data.data);
            },
            error: (err) => {
              if (err instanceof Error) {
                console.error(err);
                this.errorState.set(err.message);
              }
            },
          });
      },
      error: (err) => {
        if (err instanceof Error) {
          console.error(err);
          this.errorState.set(err.message);
          this.isLoading.set(false);
        }
      },
    });
  }

  ngOnDestroy(): void {
    document.body.classList.remove('overflow-hidden');
  }
}
