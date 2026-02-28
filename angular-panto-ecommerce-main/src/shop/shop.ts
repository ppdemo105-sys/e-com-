import { Component, effect, inject, signal } from '@angular/core';
import { Container } from '@/layout/container/container';
import { ProductsService } from '@/services/products.service';
import { Product } from '@/types/product.type';
import { SkeletonCard } from '@/shared/skeleton-card/skeleton-card';
import { ProductCard } from '@/shared/product-card/product-card';
import { Response } from '@/types/response.type';
import { CommonModule } from '@angular/common';
import { ProductsFilters } from '@/types/filters.type';
import { Category } from '@/types/category.type';
import { Filters } from './filters/filters';
import { skeletonCards } from '@/utils/skeletonCards';

type sortValue = Pick<ProductsFilters, 'sort'>;

@Component({
  selector: 'app-shop',
  imports: [Container, SkeletonCard, ProductCard, CommonModule, Filters],
  templateUrl: './shop.html',
  styleUrl: './shop.css',
  standalone: true,
})
export class Shop {
  private productsService = inject(ProductsService);

  isLoading = signal<boolean>(false);
  errorState = signal<string | null>(null);
  products = signal<Product[]>([]);
  currentPage = signal<number>(1);
  productsCount = signal<number>(0);
  totalPages = signal<number>(0);

  productsLimit = 8;
  skeletonCards = skeletonCards(this.productsLimit);

  selectedSort = signal<ProductsFilters['sort'] | ''>('');
  selectedCategory = signal<Category | ''>('');

  // OnChange Method
  onFilterChange({
    type,
    value,
  }: {
    type: 'sort' | 'category';
    value: string;
  }) {
    // Checks if the type received is 'sort' or 'category' and set the value of the signals selectedSort or selectedCategory.
    if (type === 'sort') {
      this.selectedSort.set(value as sortValue['sort']);
    } else {
      this.selectedCategory.set(value as Category);
    }
  }

  goToPrevPage() {
    if (this.currentPage() > 1) this.currentPage.update((prev) => prev - 1);
  }

  goToNextPage() {
    if (this.currentPage() < this.totalPages())
      this.currentPage.update((prev) => prev + 1);
  }

  constructor() {
    effect(() => {
      this.isLoading.set(true);
      this.errorState.set(null);
      this.productsService
        .getProducts({
          // Limit and Offset are always sent to the URL params
          limit: this.productsLimit,
          offset: (this.currentPage() - 1) * this.productsLimit,

          /*
          - "Sort" and "Category" are optional since they're not selected by default (their value is '').
          - Hence, if not selected (''), they will be null.
          - This prevents requests like ?sort=&category= from being sent.
          */
          sort: (this.selectedSort() as ProductsFilters['sort']) || null,
          category: (this.selectedCategory() as Category) || null,
        })
        .subscribe({
          next: (data: Response) => {
            if (Array.isArray(data.data) && data.data.length > 0) {
              this.products.set(data.data);
              this.productsCount.set(data.count);
              this.totalPages.set(Math.ceil(data.count / this.productsLimit));
              this.isLoading.set(false);
            }
          },
          error: (err) => {
            if (err instanceof Error) {
              console.error(err);
              this.errorState.set(err.message);
              this.isLoading.set(false);
            }
          },
        });
    });
  }
}
