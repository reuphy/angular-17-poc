import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GenreService } from '../../services/genre.service';
import { toSignal } from '@angular/core/rxjs-interop';
import { getCroppedImageUrl } from '../../services/image-utils';
import { DarkModeService } from '../../services/dark-mode.service';

@Component({
  selector: 'app-genre-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './genre-list.component.html',
  styleUrl: './genre-list.component.css'
})
export class GenreListComponent {
  private genreService = inject(GenreService);
  darkModeService = inject(DarkModeService);

  genres:any = toSignal(this.genreService.getAll())

  getCroppedImageUrl(imageUrl: string) {
    return getCroppedImageUrl(imageUrl)
  }
}
