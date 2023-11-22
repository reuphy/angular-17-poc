import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from '../navbar/navbar.component';
import { DarkModeService } from '../../services/dark-mode.service';
import { GameGridComponent } from '../game-grid/game-grid.component';
import { GenreService } from '../../services/genre.service';
import { toSignal } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, NavbarComponent, GameGridComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  darkModeService = inject(DarkModeService);
  private genreService = inject(GenreService);
  genres:any = toSignal(this.genreService.getAll())
}
