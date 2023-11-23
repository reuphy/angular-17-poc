import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { toSignal } from '@angular/core/rxjs-interop';
import { GameService } from '../../services/game.service';
import { GameCardComponent } from '../game-card/game-card.component';
import { GameCardSkeletonComponent } from '../game-card-skeleton/game-card-skeleton.component';
import { PlatformSelectorComponent } from '../platform-selector/platform-selector.component';

@Component({
  selector: 'app-game-grid',
  standalone: true,
  imports: [CommonModule, GameCardComponent, GameCardSkeletonComponent, PlatformSelectorComponent],
  templateUrl: './game-grid.component.html',
  styleUrl: './game-grid.component.css'
})
export class GameGridComponent {
  private gameService = inject(GameService);
  games = toSignal(this.gameService.getAll())

  ngOnInit() {
    this.gameService.refreshGames();
  }



} 
