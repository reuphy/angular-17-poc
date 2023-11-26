import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-game-score',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './game-score.component.html',
  styleUrl: './game-score.component.css'
})
export class GameScoreComponent {
  @Input() metacritic!: string;
}
