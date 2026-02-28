import { Response } from '@/types/response.type';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class CategoryService {
  readonly baseUrl = 'https://furniture-api.fly.dev/v1/products?category=';

  constructor(private http: HttpClient) {}

  getCategoryProducts(categoryslug: string) {
    return this.http.get<Response>(`${this.baseUrl}${categoryslug}`);
  }
}
