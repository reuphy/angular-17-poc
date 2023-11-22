import { FetchGamesData } from '../interfaces/games';
import { HttpService } from './http.service';
import { Injectable, inject } from '@angular/core';
import { FakeGameService } from './mocks/fake-game.service';
import { FakeGenreService } from './mocks/fake-genres.service';
@Injectable({
  providedIn: 'root'
})
export class GenreService {
  useMocks = localStorage.getItem('mocks') === 'true';
  httpService = inject(HttpService)
  fakeGenreService = inject(FakeGenreService)
  private apiKey = '89dda7f3885d4946a0d9a012c391ae84';
  private endPoint = 'https://api.rawg.io/api/genres?key=';

  constructor() {
    this.httpService.endPoint = `${this.endPoint}${this.apiKey}`;
  }

  getAll() {
    if (this.useMocks) return this.fakeGenreService.getAll();

    return this.httpService.getAll<any>()
  }
}
