import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { LoadingTextComponent } from '../loading-text/loading-text.component';

@Component({
  selector: 'app-sort-selector',
  standalone: true,
  imports: [CommonModule, MatFormFieldModule, MatSelectModule, MatInputModule, LoadingTextComponent],
  templateUrl: './sort-selector.component.html',
  styleUrl: './sort-selector.component.css'
})
export class SortSelectorComponent {
  // selected = 'pc';
  // platformService = inject(PlatformService)
  // platforms = toSignal(this.platformService.getAll())
  // gameService = inject(GameService)

  // filterByPlatform(platform:any) {
  //  this.gameService.getAllByPlatforms(platform.id);
  // }
}
