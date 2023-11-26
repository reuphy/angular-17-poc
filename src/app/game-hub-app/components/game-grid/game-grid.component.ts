import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { toSignal } from '@angular/core/rxjs-interop';
import { GameService } from '../../services/game.service';
import { GameCardComponent } from '../game-card/game-card.component';
import { GameCardSkeletonComponent } from '../game-card-skeleton/game-card-skeleton.component';
import { PlatformSelectorComponent } from '../platform-selector/platform-selector.component';
import { SortSelectorComponent } from '../sort-selector/sort-selector.component';

@Component({
  selector: 'app-game-grid',
  standalone: true,
  imports: [CommonModule, GameCardComponent, GameCardSkeletonComponent, PlatformSelectorComponent,
    SortSelectorComponent],
  templateUrl: './game-grid.component.html',
  styleUrl: './game-grid.component.css'
})
export class GameGridComponent {
  private gameService = inject(GameService);
  games = toSignal(this.gameService.getAll())
  moreGames = toSignal(this.gameService.loadMoreGames())

  ngOnInit() {
    this.gameService.refreshGames();
  }

  loadMore() {
    (this.gameService.loadMoreGames())
      .subscribe((games) => {
        this.games()?.value?.results.push(...(games.value?.results || []))
      })
  }
} 
