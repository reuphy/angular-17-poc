import { Reservation } from './../models/reservation';
import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReservationService } from '../services/reservation.service';
import { Router, RouterModule } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { combineLatest, map, startWith, switchMap } from 'rxjs';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-reservation-list',
  standalone: true,
  imports: [CommonModule, RouterModule, ReactiveFormsModule, FormsModule],
  templateUrl: './reservation-list.component.html',
  styleUrl: './reservation-list.component.css'
})
export class ReservationListComponent {
  reservationService = inject(ReservationService)
  router = inject(Router)
  fb = inject(FormBuilder)


  search = this.fb.group({
    guestName: [''],
    room: ['']

  })

  reservations$ = combineLatest([
    this.reservationService.getReservations(),
    this.search.controls.guestName.valueChanges.pipe(startWith('')),
    this.search.controls.room.valueChanges.pipe(startWith(''))
  ])
    .pipe(
      map(([reservations, guestName, room]) => {
        if (reservations.value === undefined || guestName === null || room === null) return

        const value = reservations.value.filter(reservation => {
          return reservation.guestName.toLowerCase().includes(guestName.toLowerCase())
            && reservation.roomNumber.toString().includes(room.toLowerCase())
        })

        return { ...reservations, value }
      })
    )

  reservations = toSignal(
    // this.reservationService.getReservations()
    this.reservations$
  )

  deleteReservation(reservation: Reservation) {
    this.reservationService.deleteReservation(+reservation.id);
  }

  editReservation(reservation: Reservation) {
    this.router.navigate(['/reservation/edit/', reservation.id]);
    // this.router.navigate(['/reservation/new']);
  }
}
