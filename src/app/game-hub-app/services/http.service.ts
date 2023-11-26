import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, map, of, shareReplay, startWith } from 'rxjs';
import { FetchGamesData } from '../interfaces/games';
import { HttpRequestState } from '../interfaces/httpRequestState';
@Injectable({
  providedIn: 'root'
})
export class HttpService {

  private http = inject(HttpClient);
  private apiKey = '?key=' + '89dda7f3885d4946a0d9a012c391ae84';
  private endPoint = 'https://api.rawg.io/api'
  getAll<T>(param:string, query:string = ''): Observable<HttpRequestState<T>> {
    const data = this.http.get<T>(this.endPoint + param + this.apiKey + query)

    return data
      .pipe(
        map((value) => ({ isLoading: false, value })),
        catchError(error => of({ isLoading: false, error })),
        startWith({ isLoading: true }),
      )
  }
}
