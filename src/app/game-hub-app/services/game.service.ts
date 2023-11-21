import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, map, of, shareReplay, startWith } from 'rxjs';
import { FetchGamesData } from '../interfaces/games';
import { HttpRequestState } from '../interfaces/httpRequestState';

@Injectable({
  providedIn: 'root'
})
export class GameService {
  private apiKey = '89dda7f3885d4946a0d9a012c391ae84';
  private http = inject(HttpClient);

  readonly loading$ = this.getGames().pipe(map(state => state.isLoading));
  readonly error$ = this.getGames().pipe(map(state => state.error));
  readonly myData$ = this.getGames().pipe(map(state => state.value));

  getGames(): Observable<HttpRequestState<FetchGamesData>> {
    const data = this.http.get<FetchGamesData>(`https://api.rawg.io/api/games?key=${this.apiKey}`)

    return data
      .pipe(
        map((value) => ({ isLoading: false, value })),
        catchError(error => of({ isLoading: false, error })),
        startWith({ isLoading: true }),
        shareReplay(1))
  }
}