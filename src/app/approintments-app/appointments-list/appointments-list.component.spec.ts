// import { ComponentFixture, TestBed } from '@angular/core/testing';

// import { AppointmentsListComponent } from './appointments-list.component';

// describe('AppointmentsListComponent', () => {
//   let component: AppointmentsListComponent;
//   let fixture: ComponentFixture<AppointmentsListComponent>;

//   beforeEach(async () => {
//     await TestBed.configureTestingModule({
//       imports: [AppointmentsListComponent] 
//     })
//     .compileComponents();
    
//     fixture = TestBed.createComponent(AppointmentsListComponent);
//     component = fixture.componentInstance;
//     fixture.detectChanges();
//   });

//   it('should create', () => {
//     const fixture = TestBed.createComponent(AppointmentsListComponent);
//     const app = fixture.componentInstance;
//     expect(app).toBeTruthy();
//   });
// });
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppointmentsListComponent } from './appointments-list.component';

describe('AppointmentsListComponent', () => {
  let component: AppointmentsListComponent;
  let fixture: ComponentFixture<AppointmentsListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppointmentsListComponent] 
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AppointmentsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
     expect(component).toBeTruthy();
  });

  it('should add new appointment', () => {
    component.newAppointment.title = 'Test Appointment';
    component.newAppointment.date = new Date();
    component.addAppointment();
    expect(component.appointments().length).toBe(1);
  });

  it('should not add new appointment if title is empty', () => {
    component.newAppointment.title = '';
    component.newAppointment.date = new Date();
    component.addAppointment();
    expect(component.appointments().length).toBe(0);
  });

  it('should not add new appointment if date is null', () => {
    component.newAppointment.title = 'Test Appointment';
    component.newAppointment.date = null;
    component.addAppointment();
    expect(component.appointments().length).toBe(0);
  });

  it('should delete appointment', () => {
    const appointment = {id: 1, title: 'Test Appointment', date: new Date()};
    component.appointments().push(appointment);
    component.deleteAppointment(appointment);
    expect(component.appointments().length).toBe(0);
  });
});