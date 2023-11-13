import { Injectable } from '@angular/core';
import { Reservation } from '../models/reservation';
import { delay, of, map, catchError, startWith, Observable } from 'rxjs';
export interface Error {
  message: string;
  status: number;
}

export interface HttpRequestState<T> {
  isLoading: boolean;
  value?: T;
  error?: Error
}
export interface FetchTodoResponse<T> {
  message: string;
  taksList: T;
}
@Injectable({
  providedIn: 'root'
})
export class ReservationService {

  constructor() { }

  private reservations: Reservation[] = [
    {
      id: '1',
      checkInDate: new Date('2020-01-01'),
      checkOutDate: new Date('2020-01-02'),
      guestName: 'John',
      guestEmail: 'test@co.com',
      roomNumber: 1
    },
    {
      id: '3',
      checkInDate: new Date('2020-01-01'),
      checkOutDate: new Date('2020-01-02'),
      guestName: 'okkkkk',
      guestEmail: 'test@co.com',
      roomNumber: 3
    }
  ];

  getReservations(): Observable<HttpRequestState<Reservation[]>> {
    return of(this.reservations).pipe(
      delay(1000),
      map((value) => ({ isLoading: false, value })),
      catchError(error => of({ isLoading: false, error })),
      startWith({ isLoading: true })
    )
  }

  getReservation(id: number) {
    return this.reservations.find(reservation => +reservation.id === id);
  }

  addReservation(reservation: Reservation) {
    reservation.id = Date.now().toString();
    this.reservations.push(reservation);
  }

  deleteReservation(id: number) {
    const index = this.reservations.findIndex(reservation => +reservation.id === id);
    this.reservations.splice(index, 1);
  }

  updateReservation(reservation: Reservation) {
    const index = this.reservations.findIndex(r => +r.id === +reservation.id);
    this.reservations[index] = reservation;
  }
}
