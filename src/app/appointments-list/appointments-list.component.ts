import { Appointment } from './../models/appointment';
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-appointments-list',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './appointments-list.component.html',
  styleUrl: './appointments-list.component.css'
})
export class AppointmentsListComponent {
  newAppointment:Appointment = {id: 0, title: '', date: new Date()};
  appointment:Appointment[] = [
    {id: 1, title: 'Appointment 1', date: new Date('2020-01-01')},
  ]
}
