import { Product } from '@/types/product.type';
import { Response } from '@/types/response.type';
import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class SearchService {
  private http = inject(HttpClient);

  searchProducts(userQuery: string): Observable<Response> {
    return this.http.get<Response>(
      `https://furniture-api.fly.dev/v1/products?name=${userQuery}`
    );
  }
}
