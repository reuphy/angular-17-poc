import { ReservationService } from './../services/reservation.service';
import { Component, Inject, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators, FormControl, AbstractControl } from '@angular/forms';
import { Reservation } from '../models/reservation';

// Custom validator
function greaterThanZero(control: AbstractControl) {
  const value = control.value;
  if (value <= 0) {
    return { notGreaterThanZero: true };
  }
  return null;
}

@Component({
  selector: 'app-reservation-form',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './reservation-form.component.html',
  styleUrl: './reservation-form.component.css'
})
export class ReservationFormComponent {

  fb = inject(FormBuilder)
  reservationService = inject(ReservationService)

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
    if (this.reservationForm.valid) {
      this.reservationService.addReservation(this.reservationForm.value as unknown as Reservation) 
      this.reservationForm.reset();
    }
  }

  checkrequired(controlName: keyof typeof this.reservationForm.controls) {
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
