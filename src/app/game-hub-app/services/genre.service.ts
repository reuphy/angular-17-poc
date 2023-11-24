import { FetchGamesData } from '../interfaces/games';
import { HttpService } from './http.service';
import { Injectable, inject } from '@angular/core';
import { FakeGameService } from './mocks/fake-game.service';
import { FakeGenreService } from './mocks/fake-genres.service';
import { FetchGenreData } from '../interfaces/genres';
@Injectable({
  providedIn: 'root'
})
export class GenreService {
  useMocks = localStorage.getItem('mocks') === 'true';
  httpService = inject(HttpService)
  fakeGenreService = inject(FakeGenreService)
  private endPoint = '/genres';

  getAll() {
    if (this.useMocks) return this.fakeGenreService.getAll();

    return this.httpService.getAll<FetchGenreData>(this.endPoint)
  }
}
