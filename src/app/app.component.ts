import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, RouterOutlet } from '@angular/router';
import { AppointmentsListComponent } from './approintments-app/appointments-list/appointments-list.component';

@Component({
  selector: 'app-root',
  standalone: true,
  // Can't bind to 'routerLink' with angular 17
  imports: [CommonModule, RouterOutlet, AppointmentsListComponent, RouterModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'angular-poc-17';
}
