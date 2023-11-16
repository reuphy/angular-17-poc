import { Injectable } from '@angular/core';
import { Product } from '../models/product';
import { Observable, catchError, delay, map, of, startWith } from 'rxjs';
import { HttpRequestState } from '../../reservations-app/services/reservation.service';

export function asRequestState<T>(source: Observable<T>): Observable<HttpRequestState<T>> {
  return source.pipe(
    map((value) => ({ isLoading: false, value })),
    catchError(error => of({ isLoading: false, error })),
    startWith({ isLoading: true })
  );
}

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor() { }
  products: Product[] = [
    {
      id: 1,
      name: 'product 1',
      price: 799,
      imageUrl: 'assets/images/Product_01.jpg',
    },
    {
      id: 2,
      name: 'product 2',
      price: 699,
      imageUrl: 'assets/images/Product_02.jpg',
    },
    {
      id: 3,
      name: 'product 3',
      price: 299,
      imageUrl: 'assets/images/Product_03.jpg',
    },
    {
      id: 4,
      name: 'product 4',
      price: 400,
      imageUrl: 'assets/images/Product_04.jpg',
    },
    {
      id: 5,
      name: 'product 5',
      price: 500,
      imageUrl: 'assets/images/Product_05.jpg',
    },
    {
      id: 6,
      name: 'product 6',
      price: 600,
      imageUrl: 'assets/images/Product_06.jpg',
    },
  ]

  getProducts(): Observable<HttpRequestState<Product[]>> {
    return asRequestState(of(this.products).pipe(delay(2000))) 
  }
}
