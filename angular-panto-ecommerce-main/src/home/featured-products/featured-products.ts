import { Component, effect, inject, signal } from '@angular/core';
import { Container } from '@/layout/container/container';
import { ProductCard } from '@/shared/product-card/product-card';
import { ProductsService } from '@/services/products.service';
import { Product } from '@/types/product.type';
import { SkeletonCard } from '@/shared/skeleton-card/skeleton-card';
import { Category } from '@/types/category.type';
import { CommonModule } from '@angular/common';
import { Response } from '@/types/response.type';
import { skeletonCards } from '@/utils/skeletonCards';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-featured-products',
  imports: [Container, ProductCard, SkeletonCard, CommonModule, RouterLink],
  templateUrl: './featured-products.html',
  styleUrl: './featured-products.css',
  standalone: true,
})
export class FeaturedProducts {
  private productsService = inject(ProductsService);

  isLoading = signal<boolean>(false);
  errorState = signal<string | null>(null);
  featuredProducts = signal<Product[]>([]);
  activeCategory = signal<Category>('chair');

  productsLimit = 8;
  skeletonCards = skeletonCards(this.productsLimit);

  categories: { label: string; value: Category }[] = [
    { label: 'Chairs', value: 'chair' },
    { label: 'Lamps', value: 'lamp' },
    { label: 'Desks', value: 'desk' },
    { label: 'Garden', value: 'garden' },
  ];

  constructor() {
    // effect() is equal to the useEffect with dependencies in ⚛️ React
    // Whereas without dependencies it's equal to NgOnInit()
    effect(() => {
      this.isLoading.set(true);
      this.errorState.set(null);

      this.productsService
        .getProducts({
          limit: this.productsLimit,
          category: this.activeCategory(),
          featured: true,
          offset: 0,
        })
        .subscribe({
          next: (data: Response) => {
            if (Array.isArray(data.data) && data.data.length > 0)
              this.featuredProducts.set(data.data);
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
}
