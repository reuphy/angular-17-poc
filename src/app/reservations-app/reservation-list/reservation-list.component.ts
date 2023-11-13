import { Reservation } from './../models/reservation';
import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReservationService } from '../services/reservation.service';
import { Router, RouterModule } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';

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
  reservations = toSignal(
    this.reservationService.getReservations() 
  )

  deleteReservation(reservation: Reservation) {
    this.reservationService.deleteReservation(+reservation.id);
  } 
  
  editReservation(reservation: Reservation) {
     this.router.navigate(['/reservation/edit/', reservation.id]);
    // this.router.navigate(['/reservation/new']);
  } 
}
