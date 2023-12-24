import { Component } from '@angular/core';
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
  homes$ = of([
    { id: 1, title: 'Home 1', image: 'assets/images/home-1.jpg', location: 'new york' },
    { id: 2, title: 'Home 2', image: 'assets/images/home-2.jpg', location: 'Location 2' },
    { id: 3, title: 'Home 3', image: 'assets/images/home-3.jpg', location: 'Location 3' }
  ])
}
