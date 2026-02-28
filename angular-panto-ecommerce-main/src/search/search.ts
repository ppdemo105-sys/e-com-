import { Container } from '@/layout/container/container';
import { SearchService } from '@/services/search.service';
import { Product } from '@/types/product.type';
import { Component, effect, inject, signal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductCard } from '@/shared/product-card/product-card';
import { skeletonCards } from '@/utils/skeletonCards';
import { SkeletonCard } from '@/shared/skeleton-card/skeleton-card';

@Component({
  selector: 'app-search',
  imports: [Container, ProductCard, SkeletonCard],
  templateUrl: './search.html',
  styleUrl: './search.css',
  standalone: true,
})
export class Search {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private searchService = inject(SearchService);

  readonly userQuery = signal<string>('');
  products = signal<Product[]>([]);
  isLoading = signal<boolean>(false);
  errorState = signal<string | null>(null);

  productsLimit = 8;
  skeletonCards = skeletonCards(this.productsLimit);

  constructor() {
    this.route.queryParams.subscribe((params) => {
      this.userQuery.set(params['query'] || '');
    });

    effect(() => {
      this.isLoading.set(true);
      this.errorState.set(null);

      const query = this.userQuery().trim();

      if (!query) {
        this.products.set([]);
        return;
      }

      this.searchService.searchProducts(query).subscribe({
        next: (data) => {
          this.products.set(data.data);
          this.isLoading.set(false);
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

  onSearchChange(newQuery: string) {
    this.router.navigate([], {
      queryParams: { query: newQuery },
      queryParamsHandling: 'merge',
    });
  }
}
