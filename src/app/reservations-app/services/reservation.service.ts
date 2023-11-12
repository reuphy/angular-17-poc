import { Injectable } from '@angular/core';
import { Reservation } from '../models/reservation';

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

  getReservations() {
    return this.reservations;
  }
  getReservation(id: number) {
    return this.reservations.find(reservation => +reservation.id === id);
  }

  addReservation(reservation: Reservation) {
    reservation.id = (this.reservations.length + 1).toString();
    this.reservations.push(reservation);
    console.log(this.reservations);
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
