import { Response } from '@/types/response.type';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ProductService {
  readonly baseUrl = 'https://furniture-api.fly.dev/v1/products?name=';

  constructor(private http: HttpClient) {}

  getProduct(productSlug: string) {
    return this.http
      .get<Response>(`${this.baseUrl}${productSlug}`)
      .pipe(map((response) => response.data[0] || null));
  }
}

/*
@ Pipe allows us to transform the data before it's emitted,
@ where as map allows us to transform the data, in this case
@ it only takes data (the first item) from the response (count and success are excluded.)
*/
