import { toSignal } from '@angular/core/rxjs-interop';
import { Component, EventEmitter, Output, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule } from '@angular/forms';
import { Subject, debounceTime, map } from 'rxjs';
import { GameService } from '../../services/game.service';

@Component({
  selector: 'app-search-input',
  standalone: true,
  imports: [CommonModule, MatInputModule, MatFormFieldModule, MatIconModule, FormsModule],
  templateUrl: './search-input.component.html',
  styleUrl: './search-input.component.css'
})
export class SearchInputComponent {
  searchTerm = '';
  searchTermChange$ = new Subject<string>();
  searchTermChange = toSignal(this.searchTermChange$
    .pipe(debounceTime(1000))
    .pipe(map(value => this.search(value))))

  private gameService = inject(GameService);

  onSearchTermChange() {
    this.searchTermChange$.next(this.searchTerm);
  }

  search(value: string) {
    this.gameService.getAllByName(value); 
  }
}
