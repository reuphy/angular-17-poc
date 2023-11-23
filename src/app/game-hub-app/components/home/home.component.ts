import { Component, inject } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { NavbarComponent } from '../navbar/navbar.component';
import { DarkModeService } from '../../services/dark-mode.service';
import { GameGridComponent } from '../game-grid/game-grid.component';
import { GenreListComponent } from '../genre-list/genre-list.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, NavbarComponent, GameGridComponent, NgOptimizedImage, GenreListComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  darkModeService = inject(DarkModeService);

}
