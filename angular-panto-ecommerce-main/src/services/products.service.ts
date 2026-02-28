import { ProductsFilters } from '@/types/filters.type';
import { Response } from '@/types/response.type';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ProductsService {
  readonly baseUrl = 'https://furniture-api.fly.dev/v1';

  constructor(private http: HttpClient) {}

  getProducts(filters?: Partial<ProductsFilters>): Observable<Response> {
    let httpParams = new HttpParams();

    if (filters) {
      for (const [key, value] of Object.entries(filters)) {
        // Check if the values are not undefined or null
        if (value !== undefined && value !== null) {
          // httpParams must be reassigned to avoid mutating the original object
          // Then we append the key and the value to the URL/URI.
          httpParams = httpParams.append(key, value.toString());
        }
      }
    }

    return this.http.get<Response>(`${this.baseUrl}/products`, {
      params: httpParams,
    });
  }
}
