import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HomesComponent } from './homes.component';
import { DataService } from '../services/data.service';
import { of } from 'rxjs';

const mockDataService = {
  getHomes: () => of(
    [
      { id: 1, title: 'Home 1', image: 'assets/images/home-1.jpg', location: 'new york' },
      { id: 2, title: 'Home 2', image: 'assets/images/home-2.jpg', location: 'Location 2' },
      { id: 3, title: 'Home 3', image: 'assets/images/home-3.jpg', location: 'Location 3' }
    ]
  )
}

describe('HomesComponent', () => {
  let component: HomesComponent;
  let fixture: ComponentFixture<HomesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HomesComponent],
      providers: [
        { provide: DataService, useValue: mockDataService },
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(HomesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });



  it('should show no homes', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    component.homes$ = of([]);
    fixture.detectChanges();
    expect(compiled.querySelectorAll('[data-test="home"]').length).toBe(0);
  });

  it('should show homes', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelectorAll('[data-test="home"]').length).toBe(3);
  });

  it('should show home info', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const home = compiled.querySelector('[data-test="home"]');

    expect(home?.querySelector('[data-test="title"]')
      ?.textContent
      ?.toLowerCase()
      .includes('Home'.toLowerCase()))
      .toBe(true);

    expect(home?.querySelector('[data-test="location"]')
      ?.textContent
      ?.toLowerCase()
      .includes('new york'.toLowerCase()))
      .toBe(true);

    expect(home?.querySelector('[data-test="image"]')).toBeTruthy()
  });
});
