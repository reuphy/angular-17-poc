import { FetchGamesData } from '../interfaces/games';
import { HttpService } from './http.service';
import { Injectable, inject } from '@angular/core';
@Injectable({
  providedIn: 'root'
})
export class GameService {
  httpService = inject(HttpService)
  private apiKey = '89dda7f3885d4946a0d9a012c391ae84';
  private endPoint = 'https://api.rawg.io/api/games?key=';
  
  constructor() {
    this.httpService.endPoint = `${this.endPoint}${this.apiKey}`;
  }
  getAll() {
    return this.httpService.getAll<FetchGamesData>()
  }
}
