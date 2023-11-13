import { ReservationService } from './../services/reservation.service';
import { Component, Inject, Input, OnInit, inject } from '@angular/core';
import { CommonModule, formatDate } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators, FormControl, AbstractControl } from '@angular/forms';
import { Reservation } from '../models/reservation';
import { greaterThanZero } from '../helpers/validators';
import { Router } from '@angular/router';

@Component({
  selector: 'app-reservation-form',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './reservation-form.component.html',
  styleUrl: './reservation-form.component.css'
})
export class ReservationFormComponent implements OnInit {
  @Input() id = '';
  reservationService = inject(ReservationService)
  fb = inject(FormBuilder)
  router = inject(Router)
  ngOnInit() {
    if (this.id) {
      const reservation = this.reservationService.getReservation(+this.id) as Reservation;
      const { roomNumber, checkInDate, checkOutDate, guestEmail, guestName } = reservation;

      if (reservation)
        this.reservationForm.patchValue({
          checkOutDate: formatDate(checkOutDate, 'yyyy-MM-dd', 'en'),
          guestName,
          guestEmail,
          roomNumber: roomNumber + '',
          checkInDate: formatDate(checkInDate, 'yyyy-MM-dd', 'en')
        });
    }
  }

  reservationForm = this.fb.group({
    checkInDate: new FormControl('', [Validators.required]),
    checkOutDate: new FormControl('', [Validators.required]),
    guestName: new FormControl('', [Validators.required]),
    guestEmail: new FormControl('', [
      Validators.required,
      Validators.email,
    ]),
    roomNumber: new FormControl('', [Validators.required, greaterThanZero])
  });

  onSubmit() {
    if (!this.reservationForm.valid) return;

    if (!this.id)
      this.reservationService.addReservation(this.reservationForm.value as unknown as Reservation)
    else {
      this.reservationService.updateReservation({ id: this.id, ...this.reservationForm.value } as unknown as Reservation)
      this.router.navigate(['/reservation/list']);
    }
    this.reservationForm.reset();
  }

  checkRequired(controlName: keyof typeof this.reservationForm.controls) {
    return this.reservationForm.controls[controlName].errors?.['required'] && this.reservationForm.controls[controlName].touched;
  }

  checkCustomValidation(controlName: keyof typeof this.reservationForm.controls, validationName: string) {
    return this.reservationForm.controls[controlName].errors?.[validationName] && this.reservationForm.controls[controlName].touched;
  }

  checkValid(controlName: keyof typeof this.reservationForm.controls) {
    return this.reservationForm.controls[controlName].invalid && this.reservationForm.controls[controlName].touched;
  }

  get roomNumber() {
    return this.reservationForm.get('roomNumber')?.value;
  }
}
