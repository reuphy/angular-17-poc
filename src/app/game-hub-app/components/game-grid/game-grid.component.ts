import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { toSignal } from '@angular/core/rxjs-interop';
import { GameService } from '../../services/game.service';
import { FakeGameService } from '../../services/fake-game.service';
import { MatListModule } from '@angular/material/list';


@Component({
  selector: 'app-game-grid',
  standalone: true,
  imports: [CommonModule, MatListModule],
  templateUrl: './game-grid.component.html',
  styleUrl: './game-grid.component.css'
})
export class GameGridComponent {
  // private gameService = inject(GameService);
   private gameService = inject(FakeGameService);
  games = toSignal(this.gameService.getAll())
}
