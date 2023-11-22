import { Injectable } from '@angular/core';
import { of, delay, map, catchError, startWith, shareReplay, Observable } from 'rxjs';
import { FetchGamesData } from '../../interfaces/games';
import { HttpRequestState } from '../../interfaces/httpRequestState';
import { gamesMock } from './games-mocks';
import { genresMock } from './genres-mocks';

@Injectable({
  providedIn: 'root'
})
export class FakeGenreService {

  genres = genresMock;

  getAll() {
    return of(this.genres)
      // .pipe(delay(2000))
      .pipe(
        map((value) => ({ isLoading: false, value })),
        catchError(error => of({ isLoading: false, error })),
        startWith({ isLoading: true })
      );
  }
}