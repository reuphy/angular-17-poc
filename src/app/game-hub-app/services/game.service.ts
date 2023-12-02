import { toSignal } from '@angular/core/rxjs-interop';
import { FetchGamesData, Games } from '../interfaces/games';
import { HttpService } from './http.service';
import { Injectable, inject } from '@angular/core';
import { FakeGameService } from './mocks/fake-game.service';
import { BehaviorSubject, Subject, filter, map, pairwise, scan, switchMap, tap } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class GameService {
  useMocks = localStorage.getItem('mocks') === 'true';
  httpService = inject(HttpService)
  fakeGameService = inject(FakeGameService)
  private endPoint = '/games'
  private query = ''
  private refreshGames$ = new Subject<Games[]>();
  params: { [key: string]: string | number } = {};
  page = 1;
  games = toSignal(this.getAll())

  getAll() {
    if (this.useMocks) return this.refreshGames$.pipe(
      switchMap(() => this.fakeGameService.getAll()),
    )

    return this.refreshGames$.pipe(switchMap((previousGameList) => this.httpService.getAll<FetchGamesData>(this.endPoint, this.query)
      .pipe(
        map(games => {
          
          if (games.value?.results) games.value.results = [...previousGameList, ...games.value.results]

          return games;
        })
      )))
  }

  setQuery(query: string, id: number | string) {
    this.params[query] = id
    this.query = '&' + Object.keys(this.params).map(key => `${key}=${this.params[key]}`).join('&');
  }

  getAllByGenre(genreId: number) {
    if (this.useMocks) this.fakeGameService.getIndieGames();

    this.setQuery('genres', genreId);
    return this.refreshGames();
  }

  getAllByPlatforms(platform: string) {
    if (this.useMocks) this.fakeGameService.getIndieGames();

    this.setQuery('platforms', platform);
    return this.refreshGames();
  }

  getAllByOrder(order: string) {
    if (this.useMocks) this.fakeGameService.getIndieGames();

    this.setQuery('ordering', order);
    return this.refreshGames();
  }

  getAllByName(name: string) {
    if (this.useMocks) this.fakeGameService.filterGameByname(name);

    this.setQuery('search', name);
    return this.refreshGames();
  }

  refreshGames() {
    this.setQuery('page', 1);

    this.refreshGames$.next([]);
  }

  loadMoreGames() {
    if (this.useMocks) { this.fakeGameService.loadMoreGames(); this.refreshGames() }

    this.setQuery('page', ++this.page);
    this.refreshGames$.next(this.games()?.value?.results ?? []);
  }
}