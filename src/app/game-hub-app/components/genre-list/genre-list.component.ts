import { GameService } from './../../services/game.service';
import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GenreService } from '../../services/genre.service';
import { toSignal } from '@angular/core/rxjs-interop';
import { getCroppedImageUrl } from '../../services/image-utils';
import { DarkModeService } from '../../services/dark-mode.service';
import { LoadingTextComponent } from '../loading-text/loading-text.component';

@Component({
  selector: 'app-genre-list',
  standalone: true,
  imports: [CommonModule, LoadingTextComponent],
  templateUrl: './genre-list.component.html',
  styleUrl: './genre-list.component.css'
})
export class GenreListComponent {
  private genreService = inject(GenreService);
  private gameService = inject(GameService);
  darkModeService = inject(DarkModeService);

  genres = toSignal(this.genreService.getAll())
  
  getCroppedImageUrl(imageUrl: string) {
    return getCroppedImageUrl(imageUrl)
  }

  getAllByGenre(genreId: number) {
    this.gameService.getAllByGenre(genreId); 
  }
  
}
