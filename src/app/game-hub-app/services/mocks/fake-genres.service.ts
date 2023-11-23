import { HttpRequestState } from './../../interfaces/httpRequestState';
import { Injectable } from '@angular/core';
import { of, map, catchError, startWith, Observable, delay } from 'rxjs';
import { genresMock } from './genres-mocks';
import { FetchGenreData } from '../../interfaces/genres';

@Injectable({
  providedIn: 'root'
})
export class FakeGenreService {

  genres:FetchGenreData = genresMock;

  getAll(): Observable<HttpRequestState<FetchGenreData>> {
    return of(this.genres)
      .pipe(delay(2000))
      .pipe(
        map((value) => ({ isLoading: false, value })),
        catchError(error => of({ isLoading: false, error })),
        startWith({ isLoading: true })
      );
  }
}