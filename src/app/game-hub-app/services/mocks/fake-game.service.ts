import { gamesMockIndie } from './games-mocks-indie';
import { Injectable } from '@angular/core';
import { of, delay, map, catchError, startWith, shareReplay, Observable } from 'rxjs';
import { FetchGamesData } from '../../interfaces/games';
import { HttpRequestState } from '../../interfaces/httpRequestState';
import { gamesMock } from './games-mocks';

@Injectable({
  providedIn: 'root'
})
export class FakeGameService {

  games = gamesMock as FetchGamesData;
  genre = 0;

  getAll(): Observable<HttpRequestState<FetchGamesData>> {
    return of(this.games)
      .pipe(delay(2000))
      .pipe(
        map((value) => ({ isLoading: false, value })),
        catchError(error => of({ isLoading: false, error })),
        startWith({ isLoading: true })
      );
  }

  getIndieGames() {
    this.genre++;
    if (this.genre % 2 === 0) this.games = gamesMock;

    else this.games = gamesMockIndie as unknown as FetchGamesData;
  }

}