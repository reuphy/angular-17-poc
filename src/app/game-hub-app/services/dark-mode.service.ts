import { Injectable, signal } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DarkModeService {
  darkModeClass = signal('light-mode');

  toggleDarkMode() {
    if(this.darkModeClass() === 'light-mode') this.darkModeClass.set('dark-mode')
    else this.darkModeClass.set('light-mode');
  }

  reset() {
    this.darkModeClass.set('light-mode');
  }
}