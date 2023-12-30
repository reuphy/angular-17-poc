import { DataService } from './../services/data.service';
import { Component, inject, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { of } from 'rxjs';

@Component({
  selector: 'app-homes',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './homes.component.html',
  styleUrl: './homes.component.css'
})
export class HomesComponent {

  dataService = inject(DataService)
  homes$ = this.dataService.getHomes();
 
}
