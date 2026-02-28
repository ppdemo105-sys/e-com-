import { Component, inject, OnInit, signal } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Container } from '@/layout/container/container';
import { CategoryService } from '@/services/category.service';
import { Product } from '@/types/product.type';
import { ProductCard } from '@/shared/product-card/product-card';
import { SkeletonCard } from '@/shared/skeleton-card/skeleton-card';
import { Response } from '@/types/response.type';

import { skeletonCards } from '@/utils/skeletonCards';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-category',
  imports: [Container, ProductCard, SkeletonCard, CommonModule, RouterLink],
  templateUrl: './category.html',
  styleUrl: './category.css',
})
export class Category implements OnInit {
  private productsService = inject(CategoryService);

  categorySlug: string | null = '';
  isLoading = signal<boolean>(false);
  errorState = signal<string | null>(null);
  products = signal<Product[]>([]);
  skeletonCards = skeletonCards(10);

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      const slug = params.get('categorySlug');
      if (slug) {
        this.categorySlug = slug;
        this.effect();
      }
    });
  }

  effect() {
    this.isLoading.set(true);
    this.errorState.set(null);

    this.productsService
      .getCategoryProducts(this.categorySlug || '')
      .subscribe({
        next: (data: Response) => {
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
  }
}
