import { FetchGamesData } from '../interfaces/games';
import { HttpService } from './http.service';
import { Injectable, inject } from '@angular/core';
import { FakeGameService } from './mocks/fake-game.service';
@Injectable({
  providedIn: 'root'
})
export class GameService {
  useMocks = localStorage.getItem('mocks') === 'true';
  httpService = inject(HttpService)
  fakeGameService = inject(FakeGameService)
  private apiKey = '89dda7f3885d4946a0d9a012c391ae84';
  private endPoint = 'https://api.rawg.io/api/games?key=';
  // https://api.rawg.io/api/games?key=89dda7f3885d4946a0d9a012c391ae84&genres=3

  constructor() {
    this.httpService.endPoint = `${this.endPoint}${this.apiKey}`;
  } 
  
  getAll() {
    if (this.useMocks) return this.fakeGameService.getAll();

    return this.httpService.getAll<FetchGamesData>()
  }
   
}
 