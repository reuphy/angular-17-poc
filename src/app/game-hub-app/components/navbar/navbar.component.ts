import { Component, effect, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';
import { DarkModeToggleComponent } from '../dark-mode-toggle/dark-mode-toggle.component';
import { DarkModeService } from '../../services/dark-mode.service';
import { SearchInputComponent } from '../search-input/search-input.component';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, MatToolbarModule, DarkModeToggleComponent, SearchInputComponent],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  darkModeService = inject(DarkModeService);
}
