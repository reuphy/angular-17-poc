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

  getAll() {
    if (this.useMocks) return this.refreshGames$.pipe(switchMap(() => this.fakeGameService.getAll()))

    return this.refreshGames$.pipe(switchMap(() => this.httpService.getAll<FetchGamesData>(this.endPoint, this.query)))
  }

  getAllByGenre(genreId: number) {
    if (this.useMocks) this.fakeGameService.getIndieGames();

    this.query =`&genres=${genreId}`;
    return this.refreshGames();
  }

  getAllByPlatforms(platform:string) {
    if (this.useMocks) this.fakeGameService.getIndieGames();
    
    this.query = `&platforms=${platform}`;
    return this.refreshGames();
  }

  refreshGames() {
    this.refreshGames$.next();
  }
  
}
