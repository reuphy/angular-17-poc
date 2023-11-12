import { AbstractControl } from "@angular/forms";

// Custom validator
export function greaterThanZero(control: AbstractControl) {
    const value = control.value;
    if (value <= 0) {
      return { notGreaterThanZero: true };
    }
    return null;
  }