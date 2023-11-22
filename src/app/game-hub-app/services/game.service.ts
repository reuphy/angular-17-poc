import { FetchGamesData } from '../interfaces/games';
import { HttpService } from './http.service';
import { Injectable, inject } from '@angular/core';
import { FakeGameService } from './mocks/fake-game.service';
@Injectable({
  providedIn: 'root'
})
export class GameService {
  private useMocks = true; // Set this to false to use real HTTP calls
  httpService = inject(HttpService)
  fakeGameService = inject(FakeGameService)
  private apiKey = '89dda7f3885d4946a0d9a012c391ae84';
  private endPoint = 'https://api.rawg.io/api/games?key=';
  
  constructor() {
    this.httpService.endPoint = `${this.endPoint}${this.apiKey}`;
  }
  getAll() {
    if (this.useMocks) return this.fakeGameService.getAll();

    return this.httpService.getAll<FetchGamesData>()
  }
}
