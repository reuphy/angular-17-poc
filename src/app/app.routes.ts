import { Routes } from '@angular/router';
import { AppointmentsListComponent } from './approintments-app/appointments-list/appointments-list.component';
import { ReservationListComponent } from './reservations-app/reservation-list/reservation-list.component';
import { ReservationHomeComponent } from './reservations-app/reservation-home/reservation-home.component';
import { ReservationFormComponent } from './reservations-app/reservation-form/reservation-form.component';
import { ProductListComponent } from './product-app/components/product-list/product-list.component';
import { CartViewComponent } from './product-app/components/cart-view/cart-view.component';
import { HomeComponent } from './game-hub-app/components/home/home.component';

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
        component: ReservationHomeComponent
    },
    {
        path: 'reservation/new',
        component: ReservationFormComponent
    },
    {
        path: 'reservation/list',
        component: ReservationListComponent
    },
    {
        path: 'reservation/edit/:id',
        component: ReservationFormComponent
    },
    {
        path: 'products',
        component: ProductListComponent
    },
    {
        path: 'cart',
        component: CartViewComponent
    },
    {
        path: 'game-hub',
        component: HomeComponent
    },

    // {
    //     path: '**',
    //     redirectTo: 'reservations'
    // }
];
