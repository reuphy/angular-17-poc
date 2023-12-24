import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomesComponent } from './homes.component';

describe('HomesComponent', () => {
  let component: HomesComponent;
  let fixture: ComponentFixture<HomesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HomesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(HomesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
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
    // ?.innerHTML
    // ?.toLowerCase()
    // .includes('assets/images'.toLowerCase())) 
    // .toBe(true); 

  });
});
