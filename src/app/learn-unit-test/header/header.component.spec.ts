import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderComponent } from './header.component';

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HeaderComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should show logo',() => {
    const compiled = fixture.nativeElement as HTMLElement;
    
    expect(compiled.querySelector('[data-test="logo"]')).toBeTruthy();
  })

  it('should show search',() => {
    const compiled = fixture.nativeElement as HTMLElement;
    
    expect(compiled.querySelector('[data-test="search"]')).toBeTruthy();
  })

  it('should show menu',() => {
    const compiled = fixture.nativeElement as HTMLElement;
    
    expect(compiled.querySelector('[data-test="menu"]')).toBeTruthy();
  })

  it('should show filters',() => {
    const compiled = fixture.nativeElement as HTMLElement;
    
    expect(compiled.querySelector('[data-test="home-type"]')).toBeTruthy();
    expect(compiled.querySelector('[data-test="dates"]')).toBeTruthy();
    expect(compiled.querySelector('[data-test="guests"]')).toBeTruthy();
    expect(compiled.querySelector('[data-test="price"]')).toBeTruthy();
    expect(compiled.querySelector('[data-test="rooms"]')).toBeTruthy();
    expect(compiled.querySelector('[data-test="amenities"]')).toBeTruthy();
  })
});
