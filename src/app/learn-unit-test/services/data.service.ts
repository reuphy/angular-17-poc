import { Injectable } from '@angular/core';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor() { }

  getHomes() {
    return of([
      { id: 1, title: 'Home 1', image: 'assets/images/home-1.jpg', location: 'new york' },
      { id: 2, title: 'Home 2', image: 'assets/images/home-2.jpg', location: 'Location 2' },
      { id: 3, title: 'Home 3', image: 'assets/images/home-3.jpg', location: 'Location 3' }
    ])
  }
}
