import { HttpService } from './http.service';
import { Injectable, inject } from '@angular/core';
import { FakePlatformService } from './mocks/fake-platform.service';
import { HttpRequestState } from '../interfaces/httpRequestState';
import { FetchPlatformData } from '../interfaces/platforms';
@Injectable({
  providedIn: 'root'
})
export class PlatformService {
  useMocks = localStorage.getItem('mocks') === 'true';
  httpService = inject(HttpService)
  fakePlatformService = inject(FakePlatformService) 
  private endPoint = '/platforms/lists/parents'

  getAll() {
    this.endPoint = `${this.endPoint}`;
    if (this.useMocks) return this.fakePlatformService.getAll();

    return this.httpService.getAll<FetchPlatformData>(this.endPoint)
  }
}
