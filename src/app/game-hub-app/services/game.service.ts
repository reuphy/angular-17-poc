import { FetchGamesData } from '../interfaces/games';
import { HttpService } from './http.service';
import { Injectable, inject } from '@angular/core';
import { FakeGameService } from './mocks/fake-game.service';
import { Subject, switchMap } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class GameService {
  useMocks = localStorage.getItem('mocks') === 'true';
  httpService = inject(HttpService)
  fakeGameService = inject(FakeGameService)

  private endPoint = '/games'
  private query = ''
  private refreshGames$ = new Subject<void>();
  params: { [key: string]: string | number } = {};

  getAll() {
    if (this.useMocks) return this.refreshGames$.pipe(switchMap(() => this.fakeGameService.getAll()))

    return this.refreshGames$.pipe(switchMap(() => this.httpService.getAll<FetchGamesData>(this.endPoint, this.query)))
  }

  setQuery(query: string, id: number | string) { 
    this.params[query] = id
    this.query = '&'+Object.keys(this.params).map(key => `${key}=${this.params[key]}`).join('&');

    return this.refreshGames();
  }

  getAllByGenre(genreId: number) {
    if (this.useMocks) this.fakeGameService.getIndieGames();

    this.setQuery('genres', genreId);
  }

  getAllByPlatforms(platform: string) {
    if (this.useMocks) this.fakeGameService.getIndieGames();

    this.setQuery('platforms', platform);
  }

  getAllByOrder(order: string) {
    if (this.useMocks) this.fakeGameService.getIndieGames();

    this.setQuery('ordering', order);
  }

  getAllByName(name: string) {
    if (this.useMocks) this.fakeGameService.filterGameByname(name);

    this.setQuery('search', name);
  }

  refreshGames() {
    this.refreshGames$.next();
  }

}
