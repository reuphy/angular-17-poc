import { Injectable } from '@angular/core';
import { gamesMock } from './mocks';
import { of, delay, map, catchError, startWith, shareReplay, Observable } from 'rxjs';
import { FetchGamesData } from '../interfaces/games';
import { HttpRequestState } from '../interfaces/httpRequestState';

@Injectable({
  providedIn: 'root'
})
export class FakeGameService {

  games: FetchGamesData = (gamesMock)

  getAll(): Observable<HttpRequestState<FetchGamesData>> {
    return of(this.games)
      .pipe(delay(1000))
      .pipe(
        map((value) => ({ isLoading: false, value })),
        catchError(error => of({ isLoading: false, error })),
        startWith({ isLoading: true }),
      )
  }
}