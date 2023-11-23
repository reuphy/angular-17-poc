import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, map, of, shareReplay, startWith } from 'rxjs';
import { FetchGamesData } from '../interfaces/games';
import { HttpRequestState } from '../interfaces/httpRequestState';
@Injectable({
  providedIn: 'root'
})
export class HttpService {

  // endPoint = '=';
  private http = inject(HttpClient);

  getAll<T>(endPoint:string): Observable<HttpRequestState<T>> {

    const data = this.http.get<T>(endPoint)

    return data
      .pipe(
        map((value) => ({ isLoading: false, value })),
        catchError(error => of({ isLoading: false, error })),
        startWith({ isLoading: true }),
      )
  }
}
