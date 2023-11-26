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
  // make a deep copy of the gamesMock so we can reset the games to the original list
  gamesMockCopy = JSON.parse(JSON.stringify(gamesMock));
  
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

  filterGameByname(name: string) {
    // filter game by name but reset the games to the original list if user deletes the search input
    this.games.results = this.gamesMockCopy.results;

    const games = this.games.results.filter(game => game.name.toLowerCase().includes(name.toLowerCase()));

    this.games.results = games;
  }

}