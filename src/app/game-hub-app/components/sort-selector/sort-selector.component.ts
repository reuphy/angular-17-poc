import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { LoadingTextComponent } from '../loading-text/loading-text.component';
import { GameService } from '../../services/game.service';

@Component({
  selector: 'app-sort-selector',
  standalone: true,
  imports: [CommonModule, MatFormFieldModule, MatSelectModule, MatInputModule, LoadingTextComponent],
  templateUrl: './sort-selector.component.html',
  styleUrl: './sort-selector.component.css'
})
export class SortSelectorComponent {
   selected = '';
   sortOrders = [
    { value: '', label: 'Relevance' },
    { value: '-added', label: 'Date added' },
    { value: 'name', label: 'name' },
    { value: '-released', label: 'Release date' },
    { value: '-metacritic', label: 'Popularity' },
    { value: '-rating', label: 'Average rating' },
  ];

   gameService = inject(GameService)

  filterBysortOder(sort:string) { 
    this.gameService.getAllByOrder(sort);
  }
}
