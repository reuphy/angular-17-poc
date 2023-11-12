import { Routes } from '@angular/router';
import { AppointmentsListComponent } from './approintments-app/appointments-list/appointments-list.component';
import { ReservationListComponent } from './reservations-app/reservation-list/reservation-list.component';

export const routes: Routes = [
    {
        path: '',
        redirectTo: 'appointments',
        pathMatch: 'full'
    },
    {
        path: 'appointments',
        component: AppointmentsListComponent
    },
    {
        path: 'reservations',
        component: ReservationListComponent
    },
    // {
    //     path: '**',
    //     redirectTo: 'reservations'
    // }
];
