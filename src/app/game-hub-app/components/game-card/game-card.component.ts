import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatListModule } from '@angular/material/list';
import { MatCardModule } from '@angular/material/card';
import { SvgIconComponent } from '../svg-icon/svg-icon.component';

@Component({
  selector: 'app-game-card',
  standalone: true,
  imports: [CommonModule, MatListModule, MatCardModule, SvgIconComponent],
  templateUrl: './game-card.component.html',
  styleUrl: './game-card.component.css'
})
export class GameCardComponent {
  @Input() game: any;
}
