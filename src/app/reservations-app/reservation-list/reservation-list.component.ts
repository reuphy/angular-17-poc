import { Reservation } from './../models/reservation';
import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReservationService } from '../services/reservation.service';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-reservation-list',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './reservation-list.component.html',
  styleUrl: './reservation-list.component.css'
})
export class ReservationListComponent {
  reservationService = inject(ReservationService)
  router = inject(Router)
  reservations = signal<Reservation[]>(
    this.reservationService.getReservations()
  )

  deleteReservation(Reservation: Reservation) {
    this.reservationService.deleteReservation(+Reservation.id);
  } 
  
  editReservation(Reservation: Reservation) {
    // this.router.navigate(['/reservations', Reservation.id]);
    this.router.navigate(['/reservation/new']);
  } 
}
