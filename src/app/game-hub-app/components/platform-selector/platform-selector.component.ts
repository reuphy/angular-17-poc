import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule} from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import {MatFormFieldModule} from '@angular/material/form-field';

@Component({
  selector: 'app-platform-selector',
  standalone: true,
  imports: [CommonModule, MatFormFieldModule, MatSelectModule, MatInputModule],
  templateUrl: './platform-selector.component.html',
  styleUrl: './platform-selector.component.css'
})
export class PlatformSelectorComponent {
  selected = 'platforms';

}
