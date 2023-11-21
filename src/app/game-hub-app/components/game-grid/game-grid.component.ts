import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { toSignal } from '@angular/core/rxjs-interop';
import { GameService } from '../../services/game.service';
import { FakeGameService } from '../../services/mocks/fake-game.service';
import { MatListModule } from '@angular/material/list';
import { MatCardModule } from '@angular/material/card';


@Component({
  selector: 'app-game-grid',
  standalone: true,
  imports: [CommonModule, MatListModule, MatCardModule],
  templateUrl: './game-grid.component.html',
  styleUrl: './game-grid.component.css'
})
export class GameGridComponent {
  // private gameService = inject(GameService);
   private gameService = inject(FakeGameService);
  games = toSignal(this.gameService.getAll())
} 
