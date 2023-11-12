import { Appointment } from '../models/appointment';
import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-appointments-list',
  standalone: true,
  //import forms module
  imports: [CommonModule, FormsModule],
  templateUrl: './appointments-list.component.html',
  styleUrl: './appointments-list.component.css'
})
export class AppointmentsListComponent {
  newAppointment:Appointment = {id: 0, title: '', date: null};
  // signal array
  appointments = signal<Appointment[] >([])

  addAppointment() {
    if (this.newAppointment.title.trim().length === 0 || this.newAppointment.date === null) return;
    
    this.appointments().push({...this.newAppointment, id: Date.now()});
  } 
  deleteAppointment(appointment: Appointment) {
    this.appointments().splice(this.appointments().indexOf(appointment), 1);
  }
}
