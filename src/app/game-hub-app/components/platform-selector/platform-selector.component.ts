import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule} from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import {MatFormFieldModule} from '@angular/material/form-field';
import { PlatformService } from '../../services/platform.service';
import { toSignal } from '@angular/core/rxjs-interop';
import { GameService } from '../../services/game.service';
import { LoadingTextComponent } from '../loading-text/loading-text.component';

@Component({
  selector: 'app-platform-selector',
  standalone: true,
  imports: [CommonModule, MatFormFieldModule, MatSelectModule, MatInputModule, LoadingTextComponent],
  templateUrl: './platform-selector.component.html',
  styleUrl: './platform-selector.component.css'
})
export class PlatformSelectorComponent {
  selected = 'pc';
  platformService = inject(PlatformService)
  platforms = toSignal(this.platformService.getAll())
  gameService = inject(GameService)

  filterByPlatform(platform:any) {
   this.gameService.getAllByPlatforms(platform.id);
  }
}
